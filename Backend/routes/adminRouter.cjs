const express = require("express")
const router = express.Router();
const User = require("../models/userModel.cjs");
const Doctor = require("../models/doctorModel.cjs");


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