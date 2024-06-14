import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout';
import axios from 'axios'
function AllUser() {
    const [userData, setUserData] = useState([]);
    const token = localStorage.getItem("token");
    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get("https://doctorappointmentsystem-3.onrender.com/api/user/getAllUser",
                    {
                        headers: {
                            Authorization: token
                        }
                    }
                )
                setUserData(response.data);
                console.log(response.data)
            }
            catch (error) {
                console.log(error);
            }



        }
        getUsers();
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
                            <th scope="col">phone</th>


                        </tr>
                    </thead>
                    <tbody>
                        {userData.map(doctor => (
                            <tr>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.phone}</td>


                            </tr>
                        ))}

                    </tbody>
                </table>
                </div>

            </div>
        </Layout>

    )
}

export default AllUser