
import React from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from '../../styles/Login.module.css';
import ProfileImage from '../../assets/user_149071.png'
import ClipLoader from 'react-spinners/ClipLoader';

function DoctorLogin() {
    localStorage.clear();
    const [loading, setloading] = useState(false)
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const navigate = useNavigate();


    const onFinish = async () => {
        const user = {
            email,
            password,
        };

        try {
            setloading(true);
            const response = await axios.post("https://doctorappointmentsystem-3.onrender.com/api/doctor/login", user);

            setloading(false);
            const { token, user: userData } = response.data;
            if (userData) {
                if (userData.status == "accepted") {
                    toast.success("Login Successful!");
                    localStorage.setItem("token", token);
                    localStorage.setItem("data", JSON.stringify(userData));

                    navigate('/doctor')


                }
                else if (userData.status == "pending") {
                    toast.error("Still Your Account is in Queue");
                }
                else {
                    toast.error("Your Account Got rejected");
                }
            }
            else {
                toast.error(response.data);
            }







        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={style.LoginMain}>
            {loading && (
                <div className={style.loader_overlay}>
                    <ClipLoader color="#2AA7FF" size={50} />
                </div>
            )}
            <div className={style.LoginBox}>
                <div className={style.LoginHeader}>
                    <div className={style.Loginimage}><img src={ProfileImage}></img></div>
                    <div className={style.LoginHead}>Login</div></div>
                <div className={style.LoginContent}>

                    <div className={style.email}>
                        <i class="ri-mail-line"></i>
                        <input type="text" placeholder="email" value={email} onChange={(e) => { setemail(e.target.value) }} />
                    </div>
                    <div className={style.password}>
                        <i class="ri-lock-line"></i>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => { setpassword(e.target.value) }} />
                    </div>

                    <button onClick={onFinish} className={style.LoginButton}>Login</button>
                    <Link to="/applydoctor" className="anchor mt-2">
                        CLICK HERE TO REGISTER
                    </Link>


                </div>
            </div>
        </div>


    );
}

export default DoctorLogin;
