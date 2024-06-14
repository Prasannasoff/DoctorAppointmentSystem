import React from 'react'
import style from '../styles/LandingPage.module.css'
import { useNavigate } from 'react-router-dom'
import doctorImage from '../assets/pngimg.com - doctor_PNG16022 (1).png'
function LandingPage() {
    const navigate = useNavigate();
    return (
        <div className={style.MainPage}>
            <div className={style.left}>
                <div className={style.title}>
                <div className={style.font1}>Book</div>
                <div className={style.font2}>Your</div>
                <div className={style.font3}>Appointment</div>
                <div className={style.font4}>Online.</div>
              

                </div>
                <div className={style.caption}>Connect instantly with a 24x7 specialist or book your appointments to a particular doctor.</div>
                <div className={style.loginButtons}>
                    <button onClick={()=>navigate('/login')} className={style.userLogin}>User Login</button>
                    <button onClick={()=>navigate('/doctorlogin')} className={style.doctorLogin}>Doctor Login</button>

                </div>

            </div>

            <div className={style.right}>
                <img src={doctorImage}></img>
                
                <div className={style.round}></div>

                
            </div>
        </div>
    )
}

export default LandingPage