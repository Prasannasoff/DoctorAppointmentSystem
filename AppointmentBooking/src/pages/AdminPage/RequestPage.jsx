import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Layout from '../../Components/Layout';
export default function RequestPage() {
    const [doctorDetail, setDoctorDetail] = useState([]);
    useEffect(() => {
        const getRequest = async () => {
            const response = await axios.post("http://localhost:5000/api/admin/getAllRequest")
            setDoctorDetail(response.data);
            //  console.log(response.data);
        }
        getRequest();
    }, []
    )
    const denyRequest = async (doctor) => {
        console.log("clicked");
        const response = await axios.post("http://localhost:5000/api/admin/denyRequest", doctor);
        console.log(response.data);
    }
    const acceptRequest = async (doctor) => {
        console.log("clicked");
        const response = await axios.post("http://localhost:5000/api/admin/acceptRequest", doctor);
        console.log(response.data);
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
