
import React from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from 'react-redux';
// import { loginUser } from "../redux/userSlice";
import style from '../../styles/Login.module.css'
function Login() {
    // const dispatch = useDispatch();
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
            const response = await axios.post("https://doctorappointmentsystem-3.onrender.com/api/user/login", user);

            setloading(false);

            const { token, user: userData } = response.data;
            if (userData) {
                localStorage.setItem("token", token);
                localStorage.setItem("data", JSON.stringify(userData));
                toast.success("Login Successfull!");
                if (userData.isAdmin) {
                    navigate('/admin');
                }
                else if (userData) {
                    navigate('/bookAppointments');
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
            <div className={style.LoginBox}>
                <div className={style.LoginHeader}>
                <div className={style.Loginimage}><img src="src/assets/user_149071.png"></img></div>
                <div className={style.LoginHead}>Login</div></div>
                <div className={style.LoginContent}>
                    {loading && (<h1>Loading</h1>)}
                    <div className={style.email}>
                        <i class="ri-mail-line"></i>
                        <input type="text" placeholder="email" value={email} onChange={(e) => { setemail(e.target.value) }} />
                    </div>
                    <div className={style.password}>
                        <i class="ri-lock-line"></i>
                        <input type="text" placeholder="Password" value={password} onChange={(e) => { setpassword(e.target.value) }} />
                    </div>

                    <button onClick={onFinish} className={style.LoginButton}>Login</button>
                    <Link to="/register" className="anchor mt-2">
                        CLICK HERE TO REGISTER
                    </Link>


                </div>
            </div>
        </div>



    );
}

export default Login;
