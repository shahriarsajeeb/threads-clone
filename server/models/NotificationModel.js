const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        creator:{
            type: Object,
        },
        type:{
            type: String,
        },
        title:{
            type: String,
        },
        postId:{
            type:String,
        },
        userId:{
            type: String,
        }
    },{timestamps: true}
);

module.exports = mongoose.model("Notification", notificationSchema);