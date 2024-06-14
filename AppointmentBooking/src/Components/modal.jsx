import React from 'react'
import axios from 'axios';
import './modal.css'
import moment from 'moment'
import toast from "react-hot-toast";

function modal({ close, DocDetails, Date, Reason }) {
    const bookRequest = async () => {
        const token = localStorage.getItem("token");
        const data = JSON.parse(localStorage.getItem('data'));
        const AppointmentDate = moment(Date).format('DD-MM-YYYY');
        console.log(data.image);
        console.log(data.phone);

        const image = data.image;
        const phone = data.phone;
        const UserDetails = {
            name: data.name,
            email: data.email,
            image: image,
            phone: phone,

        }
        try {

            const response = await axios.post("https://doctorappointmentsystem-3.onrender.com/api/user/bookAppointment", {
                appointment: {
                    UserDetails,
                    date: AppointmentDate,
                    reason: Reason,
                    DoctorResponded: false
                },
                DocDetails,

            }, {

                headers: {
                    Authorization: token
                },
            }

            )

        }
        catch (error) {
            console.log(error);
        }
        try {

            const DoctorName = DocDetails.firstName;
            console.log(DoctorName)
            const response2 = await axios.post("https://doctorappointmentsystem-3.onrender.com/api/user/saveAppointment", {
                UserDetails,
                bookings: [{
                    status: 'pending',
                    doctorName: DoctorName,
                    date: AppointmentDate,
                    reason: Reason
                }]


            }, {

                headers: {
                    Authorization: token
                },
            }

            )
            toast.success("Booked Successfully!")
            setTimeout(() => window.location.reload(), 3000);
        }
        catch (error) {
            toast.error("Something Went Wrong!")
        }

    }
    return (
        <div className="mainModal">
            <div className="containerModal">
                <button className="closeButton" onClick={() => close(false)}>X</button>
                <div className="mainContent">

                    <h3>Are You sure You want to Book?</h3>
                    <div className='modalButton'>
                        <button className='btn btn-primary' onClick={() => bookRequest()}>Book</button>
                        <button className='btn btn-danger' onClick={() => close(false)}>Cancel</button>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default modal