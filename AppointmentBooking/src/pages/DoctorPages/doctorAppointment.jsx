import React from 'react'
import Layout from '../../Components/Layout';
import { useEffect, useState } from 'react';
import DoctorMessage from '../../Components/DoctorMessage';
import axios from 'axios';
import toast from "react-hot-toast";

import style from '../../styles/doctorAppointments.module.css';
import { Tag } from 'antd';
function doctorAppointment() {
    const [appointmentDetail, setappointmentDetail] = useState([]);

    const Doctoruser = JSON.parse(localStorage.getItem('data'));

    const token = localStorage.getItem('token');

    const [modal, setModal] = useState(false);
    const [user, setUser] = useState('');
    useEffect(() => {
        const getRequest = async () => {

            const response = await axios.post("https://doctorappointmentsystem-3.onrender.com/api/doctor/getAllAppointments",
                {},
                {
                    headers: {
                        Authorization: token
                    }
                }
            )
            console.log(response.data)
            setappointmentDetail(response.data);

        }
        getRequest();
    }, []
    )
    const acceptRequest = async (user) => {
        try {
            console.log(Doctoruser.firstName)
            console.log("clicked");
            setModal(true);
            setUser(user)

        }
        catch (error) {
            console.log(error)

        }

    }
    const denyRequest = async (user) => {
        console.log("clicked");
        const userEmail = user.UserDetails.email;
        const userDate = user.date;
        const id = user._id;
        const response = await axios.post("https://doctorappointmentsystem-3.onrender.com/api/doctor/denyAppointment",
            {
                userEmail,
                userDate,
                id


            },
            {
                headers: {
                    Authorization: token
                }
            }
        );
        toast.success(response.data)
        setTimeout(() => window.location.reload(), 2000);

    }
    return (
        <Layout>
            {modal && <DoctorMessage closeModal={setModal} User={user} />}
            <div className={style.container}>
                <p className={style.heading}>Patient Appointment</p>
                <div className={style.main}>
                    <div className={style.tableContainer}>

                        <table className={style.maintable}>
                            <thead className={style.tableHead}>
                                <tr><th>PatientName</th>
                                    <th>Email</th>
                                    <th>ApptDate</th>
                                    <th>Purpose</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody className={style.tableBody}>
                                {appointmentDetail.map(user => (
                                    <tr className={style.tableContent}>
                                        <td>
                                            <div className={style.imageContainer}>
                                                <img src={user.UserDetails.image}></img>
                                                <div className={style.userDetails}>
                                                    <p> {user.UserDetails.name}</p>
                                                    <p className={style.phone}>{user.UserDetails.phone}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td>{user.UserDetails.email}</td>
                                        <td >{user.date}</td>
                                        <td>{user.reason}</td>



                                        <td>
                                            <div className={style.doctorButtons}>
                                                {user.DoctorResponded ? <div className={style.doctorButtonResponded}> Responded </div> : <><button type="button" className={style.doctorButtonDeny} onClick={() => denyRequest(user)}>Deny</button>
                                                    <button type="button" className={style.doctorButtonAccept} onClick={() => acceptRequest(user)} >Accept</button></>}
                                            </div>
                                        </td>
                                        <hr />
                                    </tr>

                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default doctorAppointment