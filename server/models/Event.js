import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide an event name"],
    },
    about: {
      type: String,
      required: [true, "Please provide details about event"],
    },
    attended: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("event", EventSchema);

export default Event;
