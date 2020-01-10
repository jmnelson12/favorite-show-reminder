import { Request, Response, NextFunction } from 'express';
import { findUserByQuery } from '../../controllers/user';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.headers;
        console.log({ token });
        const user = await findUserByQuery({ token });

        if (user) {
            res.locals.user = user;
            next();
        } else {
            throw "";
        }
    } catch (e) {
        res.status(403).json({ success: false, message: "Unauthorized" });
    }
}