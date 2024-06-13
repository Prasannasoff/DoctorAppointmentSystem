const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the AppointmentNotification schema
const AppointmentNotificationSchema = new Schema({
    UserDetails: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        image: { type: String, default: null },
        phone: { type: Number, required: true },
    },
    date: { type: String, required: true },
    reason: { type: String, required: true },
  
    DoctorResponded: { type: Boolean, default: false }
});

// Define the Doctor schema
const doctorSchema = new Schema(
    {
        firstName: {
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
        phoneNumber: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        specialization: {
            type: String,
            required: true,
        },
        experience: {
            type: String,
            required: true,
        },
        feesPerCunsaltation: {
            type: Number,
            required: true,
        },
        workHours: {
            startWorkTime: {
                type: Object,
                required: [true, "Start work time is required"],
            },
            endWorkTime: {
                type: Object,
                required: [true, "End work time is required"],
            },
        },
        status: {
            type: String,
            default: "pending",
        },
        AppointmentNotifications: {
            type: [AppointmentNotificationSchema], // Use the defined schema here
            default: []
        },
        image: {
            type: String, // Assuming you'll store the path to the image file
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const DoctorModel = mongoose.model("doctors", doctorSchema);
module.exports = DoctorModel;
