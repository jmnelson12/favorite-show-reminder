import { Request, Response } from 'express';
import isEmail from 'isemail';
import { Container } from 'typedi';
import { IUser } from "../../interfaces/IUser";
import { saltHashPassword, isValidPassword, genToken } from "../utils/crypto";

// db stuff 
export async function findUserByQuery(query: any) {
    const User: any = Container.get('userModel');

    const user = await User.findOne(query);
    return user;
}
async function saveUserToDB(user: IUser): Promise<IUser | boolean> {
    const User: any = Container.get('userModel');

    try {
        const newUser = new User(user);
        return await newUser.save();
    } catch (e) {
        console.error(e.message);
        return false;
    }
}
async function updateUser(email: string, query: any) {
    const User: any = Container.get('userModel');

    try {
        await User.findOneAndUpdate({ email }, query, { upsert: true });
    } catch (e) {
        console.error('updateUser: ', e.message);
    }
}

// Validation
function validateEmail(email: string): boolean {
    return email !== "" && isEmail.validate(email);
}
function validatePasswords(password1: string, password2: string): boolean {
    const minPasswordLen = 8;
    if (!password1 || password1.length <= minPasswordLen) return false;
    if (!password2 || password2.length <= minPasswordLen) return false;
    return password1 === password2;
}
async function validateRegistration({ email, password, confirmPassword }: { email: string, password: string, confirmPassword: string }): Promise<{ success: boolean, message: string }> {
    if (!validateEmail(email)) {
        return {
            success: false,
            message: "Invalid email."
        };
    }

    let user = await findUserByQuery({ email });
    if (user) {
        return {
            success: false,
            message: "Email already in use."
        };
    }

    if (!validatePasswords(password, confirmPassword)) {
        return {
            success: false,
            message: "Please double check passwords match and have more than 8 characters."
        };
    }

    return {
        success: true,
        message: ""
    }
}
async function validateLogin({ email, password }: { email: string, password: string }): Promise<{ success: boolean, message: string }> {
    const user: IUser = await findUserByQuery({ email });
    const defaultErrorMessage = "Invalid user credentials.";

    if (user) {
        const { password: passwordHash, salt } = user;

        if (!isValidPassword({ password, passwordHash, salt })) {
            return {
                success: false,
                message: defaultErrorMessage
            }
        }

        return {
            success: true,
            message: ""
        };
    }

    return {
        success: false,
        message: defaultErrorMessage
    }
}

// Called from endpoints
export async function register(req: Request, res: Response) {
    try {
        const { email, password, confirmPassword } = req.body;
        const { success, message } = await validateRegistration({ email, password, confirmPassword });

        if (success) {
            const { passwordHash, salt } = saltHashPassword(password);
            const saveUser = await saveUserToDB({
                email,
                password: passwordHash,
                salt,
                loggedIn: true
            });

            if (saveUser) {
                res.status(200).json({
                    success,
                    message: "User Registered"
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: 'Server Error: Unable to register user :( Please refresh and try again.'
                });
            }
        } else {
            res.status(400).json({
                success,
                message
            });
        }
    } catch (e) {
        res.status(501).json({
            success: false,
            message: 'Server Error: Couldn\'t register user :( Please refresh and try again.'
        });
    }
}
export async function login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { success, message } = await validateLogin({ email, password });

    if (success) {
        const token = genToken(email);

        res.status(200).json({
            success: true,
            message: "Logged In!",
            user: {
                email,
                token
            }
        });

        updateUser(email, { loggedIn: true, token });
    } else {
        res.status(400).json({ success, message });
    }
}
export async function verify(req: Request, res: Response) {
    res.status(200).json({ success: true });
}
export async function logout(req: Request, res: Response) {
    const { user } = res.locals;

    updateUser(user.email, { loggedIn: false, token: "" });
    res.status(200).json('logged out');
}