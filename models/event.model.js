import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
    event: { type: String, required: true },
    userId: { type: String, required: true },
    userDetails: { type: String, required: true },
    timeStamp: { type: Date, default: Date.now() },
});

const Event = mongoose.model("Event", eventSchema);
export default Event;