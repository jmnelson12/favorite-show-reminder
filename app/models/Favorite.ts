import mongoose from 'mongoose';

const Favorite = new mongoose.Schema(
    {
        id: Number,
        type: String
    }
);

export default mongoose.model<{ id: number, type: string } & mongoose.Document>('Favorite', Favorite);