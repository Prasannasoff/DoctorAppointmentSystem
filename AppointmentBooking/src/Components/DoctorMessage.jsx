import React, { useState } from 'react'
import axios from 'axios';
import './DoctorMessage.css'
function DoctorMessage({ closeModal, User }) {
    const [Message, setMessage] = useState('');
    const sendMessage = async () => {
        const userEmail = User.UserDetails.email;
        const token = localStorage.getItem('token');

        const userDate = User.date;
        const Doctoruser = JSON.parse(localStorage.getItem('data'));
        const id=User._id
        const response = await axios.post("http://localhost:5000/api/doctor/acceptAppointment",
            {
                userEmail,
                userDate,
                id,
                Notification: {
                    Name: Doctoruser.firstName,
                    DoctorMessage: Message,
                },

            },

            {
                headers: {
                    Authorization: token
                }
            }
        );
        window.location.reload();
        console.log(response.data);
    }
    return (
        <div className="doctorModal">

            <div className="containerdoctorModal">
                <button className="close" onClick={() => closeModal(false)}>X</button>
                <div className="maindoctorContent">
                    Enter the Message:<input type="text" value={Message} onChange={(e) => setMessage(e.target.value)} />
                    <div className='doctorButton'>
                        <button className='btn btn-primary' onClick={() => sendMessage()}>Send Message</button>
                        <button className='btn btn-danger' onClick={() => closeModal(false)}>Cancel</button>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorMessage