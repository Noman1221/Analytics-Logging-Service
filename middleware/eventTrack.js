import Event from "../models/event.model.js";

const EventOccurs = async (event, userId, userDetails = {}, timeStamp = new Date()) => {
    try {
        const newEvent = new Event({
            event,
            userId,
            userDetails,
            timeStamp,
        })
        await newEvent.save();

    } catch (error) {
        console.error("Event tracking error:", error.message);
    }
}
export default EventOccurs;