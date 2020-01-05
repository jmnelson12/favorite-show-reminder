import { IUser } from '../../interfaces/IUser';
import mongoose from 'mongoose';

const User = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Please enter a email'],
            lowercase: true,
            unique: true,
            index: true,
        },
        password: String,
        salt: String,
        loggedIn: {
            type: Boolean,
            default: false
        },
        token: String
    }
);

export default mongoose.model<IUser & mongoose.Document>('User', User);