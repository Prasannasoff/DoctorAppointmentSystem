const express = require("express")
const router = express.Router();
const User = require("../models/userModel.cjs");
const bcrypt = require("bcryptjs");
const Doctor = require("../models/doctorModel.cjs");

const jwt = require("jsonwebtoken");
router.post("/register", async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res
                .status(200)
                .send({ message: "User already exists", success: false });
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newuser = new User(req.body);
        await newuser.save();
        res
            .status(200)
            .send({ message: "User created successfully", success: true });
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ message: "Error creating user", success: false, error });
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.send("Invalid Email or Password");
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.send("Invalid Email or Password");
        } else {
            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
                expiresIn: "1d",
            });
            console.log(token)
            res.send({ token, user }); // Send user details along with token
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error logging in", success: false, error });
    }
});

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
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

router.post('/getuser', async (req, res) => {
    const email = req.user.email;

    const UserDetails = await User.find({ email: email });
    if (!UserDetails) {
        return res.json({ message: 'No User Found' });
    }
    return res.send(UserDetails);
});

router.get('/getAllDoctor', async (req, res) => {
    try {
        const doctorData = await Doctor.find({});
        const filteredDoctors = doctorData.filter(doctor => doctor.status !== 'pending');

        res.send(filteredDoctors);
    }
    catch (error) {
        res.status(200).send(error)
    }
})
router.post('/bookAppointment', async (req, res) => {
    try {
        const BookDetails = await Doctor.findOne({ email: req.body.DocDetails.email });
        console.log(req.body.UserDetails)
        BookDetails.AppointmentNotifications.push(req.body.appointment);
        await BookDetails.save();
        res.send("Success");
    }
    catch (error) {
        res.send(error);
    }

})
router.post('/saveAppointment', async (req, res) => {
    try {
        const BookDetails = await User.findOne({ email: req.body.UserDetails.email });

        BookDetails.bookings.push(...req.body.bookings);
        await BookDetails.save();
        res.send("UserBookedSuccessfully");
    }
    catch (error) {
        res.send(error);
    }

})
router.get('/getAllBookings', async (req, res) => {
    try {
        const email = req.user.email;
        console.log(email)
        const getBookings = await User.findOne({ email: email });
        console.log(getBookings.bookings);
        res.send(getBookings.bookings);
    }
    catch (error) {
        res.send(error);
    }
})
router.post('/getNotifications',async(req,res)=>{
    try{
    
    const notifi=await User.findOne({email:req.user.email});

    res.send(notifi.Notifications)
}
catch(error){
    res.send(error);
}
    
})
router.post('/getAllRequest', async (req, res) => {

    const Admin = await User.findOne({ isAdmin: true });
    res.send(Admin.Notifications);


})
router.post('/acceptRequest', async (req, res) => {
    try {

        const doctorData = await Doctor.findOne({ email: req.body.email });
        doctorData.status = "accepted";
        await doctorData.save();
        res.send("Accepted Successfully");
    }
    catch (error) {
        return res.status(400).json({ error });
    }

})
router.post('/denyRequest', async (req, res) => {
    try {

        const doctorData = await Doctor.findOne({ email: req.body.email });
        doctorData.status = "rejected";
        await doctorData.save();
        res.send("Rejected Successfully");
    }
    catch (error) {
        return res.status(400).json({ error });
    }

});
router.get('/getAllUser',async(req,res)=>{
    const response=await User.find({});
    res.send(response)
})
module.exports = router