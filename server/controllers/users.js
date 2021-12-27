import User from "../models/User"
import { StatusCodes } from "http-status-codes";

export const getAllUsers = async (req, res) =>{
    try {
        const users = await User.find({})
        res.status(StatusCodes.OK).json({ users, count: users.length });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({error})
    }
}