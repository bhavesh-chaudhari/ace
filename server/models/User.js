import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minlength: 3,
      maxlength: 50,
    },
    contactNumber: {
      type: String,
      required: [true, "Please provide a contact number"],
      match: [/^[6-9]\d{9}$/, "Please provide a valid contact number"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide valid email",
      ],
      unique: [true, "email should be unique"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password length must be greater than 6"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", UserSchema);

export default User;
