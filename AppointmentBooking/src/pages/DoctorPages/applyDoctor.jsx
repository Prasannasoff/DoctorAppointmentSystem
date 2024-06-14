import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { TimePicker } from 'antd';
import { useState } from "react";
import style from '../../styles/applyDoctor.module.css'
const ApplyDoctor = () => {
    const [selectedStartTime, setSelectedStartTime] = useState(null);
    const [selectedEndTime, setSelectedEndTime] = useState(null);
    const [firstName, setfirstName] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [address, setaddress] = useState('');
    const [specialization, setspecialization] = useState('');
    const [experience, setexperience] = useState('');
    const [feesPerCunsaltation, setfeesPerCunsaltation] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();





    //handle form
    const handleFinish = async () => {
        try {
            const details = {
                firstName,
                email,
                password,
                phoneNumber,
                address,
                specialization,
                experience,
                feesPerCunsaltation,
                image
            }

            const res = await axios.post(
                "https://doctorappointmentsystem-3.onrender.com/api/doctor/register2",
                {
                    ...details,
                    workHours: {
                        startWorkTime: selectedStartTime.format("HH:mm"),
                        endWorkTime: selectedEndTime.format("HH:mm"),
                    }
                }
            );
            try {
                const res2 = await axios.post("https://doctorappointmentsystem-3.onrender.com/api/doctor/doctorRequest", {
                    ...details,
                    workHours: {
                        startWorkTime: selectedStartTime.format("HH:mm"),
                        endWorkTime: selectedEndTime.format("HH:mm"),
                    }
                });
                console.log(res2.data);
                toast.success("Request Sent Successfully!");
                navigate("/doctorlogin");
            }
            catch (error) {
                console.log(error);
            }








        } catch (error) {

            console.log(error);

        }
    };
    return (
        <div className={style.container}>


            <h4>Personal Details :</h4>
            <div className={style["input-container"]}>
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" required placeholder="your first name" value={firstName}
                    onChange={(e) => { setfirstName(e.target.value) }} />
            </div>
            <div className={style["input-container"]}>

                <label for="phone">Phone No:</label>
                <input type="text" id="phone" name="phone" placeholder="your contact no" required value={phoneNumber}
                    onChange={(e) => { setphoneNumber(e.target.value) }} />
            </div>
            <div className={style["input-container"]}>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required placeholder="your email address" value={email}
                    onChange={(e) => { setemail(e.target.value) }} />
            </div>
            <div className={style["input-container"]}>

                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required placeholder="your Password" value={password}
                    onChange={(e) => { setpassword(e.target.value) }} />
            </div>

            <h4>Professional Details:</h4>
            <div className={style["input-container"]}>

                <label for="specialization">Specialization:</label>
                <input type="text" id="specialization" name="specialization" placeholder="your specialization" required value={specialization}
                    onChange={(e) => { setspecialization(e.target.value) }} />
            </div>
            <div className={style["input-container"]}>

                <label for="address">Address:</label>
                <input type="text" id="address" name="address" placeholder="your Address" required value={address}
                    onChange={(e) => { setaddress(e.target.value) }} />
            </div>
            <div className={style["input-container"]}>

                <label for="experience">Experience:</label>
                <input type="text" id="experience" name="experience" placeholder="your experience" required value={experience}
                    onChange={(e) => { setexperience(e.target.value) }} />
            </div>
            <div className={style["input-container"]}>

                <label for="feesPerCunsaltation">Fees Per Cunsaltation:</label>
                <input type="text" id="feesPerCunsaltation" name="feesPerCunsaltation" placeholder="Fee" required value={feesPerCunsaltation}
                    onChange={(e) => { setfeesPerCunsaltation(e.target.value) }} />
            </div>
            <div className={style["input-container"]}>

                <label for="StartTime">Start Time:</label>
                <TimePicker
                    value={selectedStartTime}
                    onChange={(time) => { setSelectedStartTime(time) }}
                    format="HH:mm"
                    required
                    placeholder="Select start time"
                    allowClear={false}
                /><br></br>
            </div>
            <div className={style["input-container"]}>

                <label for="endTime">End Time:</label>
                <TimePicker
                    value={selectedEndTime}
                    onChange={(time) => { setSelectedEndTime(time) }}
                    format="HH:mm"
                    required
                    placeholder="Select end time"
                    allowClear={false}
                />
            </div>
            <div className={style["input-container"]}>

                <input type="text" className="form-control" placeholder="Enter Image Url" value={image} onChange={(e) => { setImage(e.target.value) }} />
            </div>
            <div className={style["input-container"]}>

                <button type="submit" onClick={handleFinish}>Submit</button>
            </div>

        </div>

    );
};

export default ApplyDoctor;