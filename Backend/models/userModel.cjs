const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    Notifications: {
        type: Array,
        default: [],
    },
    bookings: {
        type: [
            {
                status: { type: String, default: 'pending' },
                doctorName: { type: String },
                date: { type: String },
                reason: { type: String }
            }
        ],
        _id: false,
        default:[]
    },
    image: {
        type: String, // Assuming you'll store the path to the image file
        default: null,
    },
    phone: {
        type: Number,
        required: true,
    },


},
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel; // Export as default
