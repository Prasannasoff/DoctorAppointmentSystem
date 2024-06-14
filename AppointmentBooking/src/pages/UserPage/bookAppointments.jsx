import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout';
import axios from 'axios';
import style from '../../styles/bookAppointments.module.css'
import BookModal from '../../Components/bookModal'
import { Tag } from 'antd';

export default function bookAppointments() {
    const [doctorData, setdoctorData] = useState([])
    const [modal, setModal] = useState(false);
    const [doc, setdoc] = useState('');

    const token = localStorage.getItem("token");
    useEffect(() => {
        const getDoctor = async () => {
            const response = await axios.get("https://doctorappointmentsystem-3.onrender.com/api/user/getAllDoctor",
                {
                    headers: {
                        Authorization: token
                    },
                }
            );

            setdoctorData(response.data);

        }
        getDoctor();
    }, []
    )
    const AssignValue = (doctor) => {
        setModal(true);
        setdoc(doctor);
    }
    return (
        <div className={style.Main}>
            {modal && <BookModal closeModal={setModal} DoctorDetails={doc} />}
            <Layout>
                <div className={style.Container}>
                    <div className={style.headFont}>DoctorList</div>
                    {doctorData.map(doctor => (
                        <div className={style.content}>
                            <div className={style.content2}>
                            <div className={style.fee}>Rs.{doctor.feesPerCunsaltation}</div>
                            <div className={style.header}>
                                <img src={doctor.image} className={style.doctorImage}></img>
                                <div className={style.headerContent}>
                                    <div className={style.name}>Dr.{doctor.firstName}</div>
                                    <div className={style.dimfont}>{doctor.specialization}</div>
                                    <div className={style.dimfont}>{doctor.address}</div>
                                    <div className={style.dimfont}>{doctor.experience} Years of Experience</div>
                                    <div className={style.status}>
                                    <div className={style.buttonTag}>Available</div>
                                    <div className={style.buttonTag2}>{doctor.workHours.startWorkTime}-{doctor.workHours.endWorkTime}</div>
                                    </div>



                                </div>




                        </div>
                            </div>
                                <div className={style.right}>

                                    <button type="button" onClick={() => AssignValue(doctor)} className="btn btn-primary">Book Appointment</button>
                                </div>
                        </div>

                    ))}


                </div>

            </Layout>

        </div>



    )
}
