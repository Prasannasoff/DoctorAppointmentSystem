import React, { useEffect, useState } from 'react';
import Layout from '../../Components/Layout';
import axios from 'axios';
import style from '../../styles/appointmentBooked.module.css';

function AppointmentsBooked() {
    const [bookDetails, setBookDetails] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(
                    "https://doctorappointmentsystem-3.onrender.com/api/user/getAllBookings",
                    {
                        headers: {
                            Authorization: token
                        }
                    }
                );
                setBookDetails(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        getData();
    }, [token]);

    return (
        <Layout>
            <div className={style.container}>
                {bookDetails.length > 0 ? (
                    bookDetails.map((detail, index) => (
                        <div key={index} className={style.booking}>
                            <h3>Name: {detail.doctorName}</h3>
                            <p>Date: {detail.date}</p>
                            <p className={`${style.status} ${style[detail.status.toLowerCase()]}`}>
                                Status: {detail.status}
                            </p>
                            <div className={style.details}>
                                <span>Reason: {detail.reason}</span>

                            </div>
            
                        </div>
                    ))
                ) : (
                    <p className={style.noBookings}>No bookings found.</p>
                )}
            </div>
        </Layout>
    );
}

export default AppointmentsBooked;
