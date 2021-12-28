import User from "../models/User.js"
import { StatusCodes } from "http-status-codes";

export const getAllUsers = async (req, res) =>{
    try {
        const users = await User.find({})
        res.status(StatusCodes.OK).json({ users, count: users.length });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({error})
    }
}

export const updateUser = async (req, res)=>{
    const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });

    if(!user){
        res.status(StatusCodes.NOT_FOUND).json({message: `No user found with id ${req.params.find}`})
    }

    res.status(StatusCodes.OK).json({ user });
}