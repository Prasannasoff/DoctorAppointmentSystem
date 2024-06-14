import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Layout from '../../Components/Layout';
import toast from "react-hot-toast";
export default function RequestPage() {
    const [doctorDetail, setDoctorDetail] = useState([]);
    const token = localStorage.getItem('token');
    if (!token) {
        navigate("/login");
        return;
    }
    useEffect(() => {
        const getRequest = async () => {
            const response = await axios.post("https://doctorappointmentsystem-3.onrender.com/api/user/getAllRequest", {},
                {
                    headers: {
                        Authorization: token,
                    },
                });
            setDoctorDetail(response.data);
            //  console.log(response.data);
        }
        getRequest();
    }, []
    )
    const denyRequest = async (doctor) => {
        try{
        const response = await axios.post("https://doctorappointmentsystem-3.onrender.com/api/user/denyRequest", doctor,
            {
                headers: {
                    Authorization: token,
                },
            });
        toast.success("Denied Succefully!");
        }
        catch(error){
            toast.error("Something Went Wrong");
        }
    }
    const acceptRequest = async (doctor) => {
        try{
        const response = await axios.post("https://doctorappointmentsystem-3.onrender.com/api/user/acceptRequest", doctor,
            {
                headers: {
                    Authorization: token,
                },
            });
        toast.success("Accepted Successfully!")
        }
        catch(error){
            toast.error("Something Went Wrong!")
        }
    }
    return (
        <Layout>
            <div>

                <div><table class="table table-hover table-dark table-m4">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Specialization</th>
                            <th scope="col">Experience</th>
                            <th scope="col">FeesPerConsultaion</th>
                            <th scope="col">Request</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctorDetail.map(doctor => (
                            <tr>
                                <td>{doctor.firstName}</td>
                                <td>{doctor.address}</td>
                                <td>{doctor.specialization}</td>
                                <td>{doctor.experience}</td>
                                <td>{doctor.feesPerCunsaltation}</td>
                                <td><button type="button" class="btn btn-danger " onClick={() => denyRequest(doctor)}>Deny</button>
                                    <button type="button" onClick={() => acceptRequest(doctor)} class="btn btn-primary">Accept</button></td>

                            </tr>
                        ))}

                    </tbody>
                </table>
                </div>

            </div>
        </Layout>

    )
}
