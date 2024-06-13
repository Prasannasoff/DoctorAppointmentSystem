const express = require("express")
const router = express.Router();
const Doctor = require("../models/doctorModel.cjs");
const User = require("../models/userModel.cjs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
router.post("/login", async (req, res) => {
    try {
        const user = await Doctor.findOne({ email: req.body.email });

        if (!user) {
            return res.send("Invalid Email or Password");
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.send("Invalid Email or Password");
        } else {
            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET2, {
                expiresIn: "1d",
            });

            res.send({ token, user }); // Send user details along with token

        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error logging in", success: false, error });
    }
});
router.post("/register2", async (req, res) => {
    try {
        const userExists = await Doctor.findOne({ email: req.body.email });
        if (userExists) {
            return res
                .status(200)
                .send({ message: "User already exists", success: false });
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newuser = new Doctor(req.body);
        await newuser.save();
        res.send(newuser);
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ message: "Error creating user", success: false, error });
    }
});

router.post('/doctorRequest', async (req, res) => {

        const Admin = await User.findOne({ isAdmin: true });
        console.log(Admin);
        Admin.Notifications.push(req.body);
        console.log(Admin.Notifications)
        await Admin.save()
        res.send(Admin);
 
});
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET2);
    } catch (error) {
        throw new Error('Invalid token');
    }
};

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'User not allowed' });
    }

    try {
        const decodedToken = verifyToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: 'Invalid token' });
    }
};

router.use(authenticateUser);

router.post('/getdoctor', async (req, res) => {
    const email = req.user.email;
    const UserDetails = await Doctor.findOne({ email: email });
    if (!UserDetails) {
        return res.json({ message: 'No User Found' });
    }
    return res.send(UserDetails);
});
router.post('/getAllAppointments', async (req, res) => {
    try {
        const email = req.user.email;
        const User = await Doctor.findOne({ email: email });
        res.send(User.AppointmentNotifications);
    }
    catch (error) {
        res.send(error);
    }

})
router.post('/acceptAppointment', async (req, res) => {
    try {
        const { userEmail, userDate, id } = req.body;

        // Find the user based on the email
        const userData = await User.findOne({ email: userEmail });

        // Iterate through each booking of the user
        for (const booking of userData.bookings) {
            // Check if the booking date matches the provided date
            if (booking.date == userDate) {
                // Update the status of the booking
                //  console.log(booking.date);

                booking.status = "accepted";
            }

        }
        userData.Notifications.push(req.body.Notification);

        // Save the changes to the user data

        await userData.save();
        const email = req.user.email;
        const DoctorData = await Doctor.findOne({ email: email });

        // Update DoctorResponded field
        DoctorData.AppointmentNotifications.forEach(notification => {
            if (notification._id == id) {

                notification.DoctorResponded = true;
            }
        });
        await DoctorData.save();

        // Send a success response
        res.send("Accepted Successfully");
    } catch (error) {
        // Handle errors
        return res.status(400).json({ error });
    }
});
router.post('/denyAppointment', async (req, res) => {
    try {
        const { userEmail, userDate, id } = req.body;

        // Find the user based on the email
        const userData = await User.findOne({ email: userEmail });

        // Iterate through each booking of the user
        for (const booking of userData.bookings) {
            // Check if the booking date matches the provided date
            if (booking.date == userDate) {
                // Update the status of the booking
                //  console.log(booking.date);

                booking.status = "rejected";
            }

        }
        await userData.save();
        const email = req.user.email;
        const DoctorData = await Doctor.findOne({ email: email });

        // Update DoctorResponded field
        DoctorData.AppointmentNotifications.forEach(notification => {
            if (notification._id == id) {

                notification.DoctorResponded = true;
            }
        });
        await DoctorData.save();



        // Send a success response
        res.send("Denied Successfully");
    } catch (error) {
        // Handle errors
        return res.status(400).json({ error });
    }
});


module.exports = router
