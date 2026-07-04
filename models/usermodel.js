const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);
const taskSchema = new mongoose.Schema({
    title: String,
    details: String,
    pinned: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("usermodel", taskSchema);