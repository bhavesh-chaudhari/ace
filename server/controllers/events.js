import Event from "../models/Event.js"
import StatusCodes from "http-status-codes"

export const getAllEvents = async (req, res)=>{
    try {
      const events = await Event.find({});
      res.status(StatusCodes.OK).json({ events, count: events.length });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({message: error})
    }
}

export const createEvent = async (req, res)=>{
    try {
      const event = await Event.create(req.body);
      res.status(StatusCodes.CREATED).json({ event });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: error });
    }
}

export const getEvent = async (req, res) => {
  try {
    console.log(req.params);
    const eventId = req.params.id;
    const job = await Event.findOne({ _id: eventId });

    if(!job){
      res.status(StatusCodes.NOT_FOUND).json({message: `No event with id ${eventId}`})
    }

    res.status(StatusCodes.OK).json({job})
  } catch (error) {
     res.status(StatusCodes.BAD_REQUEST).json({ message: error });
  }
};

export const updateEvent = async (req, res) => {
  try {
    res.send("update event");
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({message: error})
  }
};

export const deleteEvent = async (req, res) => {
  try {
    res.send("delete event");
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error });
  }
};