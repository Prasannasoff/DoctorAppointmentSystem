import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout';
import axios from 'axios'
function doctorList() {
    const [doctorData, setDoctorData] = useState([]);
    const token = localStorage.getItem("token");
    useEffect(() => {
        const getDoctors = async () => {
            try {
                const response = await axios.get("https://doctorappointmentsystem-3.onrender.com/api/user/getAllDoctor",
                    {
                        headers: {
                            Authorization: token
                        }
                    }
                )
                setDoctorData(response.data);
                console.log(response.data)
            }
            catch (error) {
                console.log(error);
            }



        }
        getDoctors();
    }, []
    )

    return (
        <Layout>
            <div>

                <div><table class="table table-hover table-dark table-m4">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">phoneNumber</th>
                            <th scope="col">Specialization</th>
                            <th scope="col">Experience</th>
                            <th scope="col">Address</th>




                        </tr>
                    </thead>
                    <tbody>
                        {doctorData.map(doctor => (
                            <tr>
                                <td>{doctor.firstName}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.phoneNumber}</td>
                                <td>{doctor.specialization}</td>
                                <td>{doctor.experience}</td>
                                <td>{doctor.address}</td>






                            </tr>
                        ))}

                    </tbody>
                </table>
                </div>

            </div>
        </Layout>

    )
}

export default doctorList