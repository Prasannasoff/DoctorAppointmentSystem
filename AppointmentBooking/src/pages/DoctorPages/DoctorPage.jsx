import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Link, useNavigate } from "react-router-dom";
import Layout from '../../Components/Layout';

export default function HomePage() {
    const navigate = useNavigate();
    const [DoctorDetail, setDoctorDetail] = useState('');
    useEffect(() => {
        const getData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/doctorlogin');
                return; // Make sure to return to prevent further execution
            }
            try {
                const response = await axios.post(
                    "http://localhost:5000/api/doctor/getdoctor",
                    {}, // Pass an empty object as the request data since the route doesn't require any additional data
                    {
                        headers: {
                            Authorization: token // Add the token to the request headers
                        },
                    }
                );

                setDoctorDetail(response.data);
            } catch (error) {
                console.log(token);
                console.log(error);
            }
        };

        getData();
    }, []); // Empty dependency array ensures that this effect runs only once on mount

    return (
        <Layout>
            <div>
                <h4>Name:{DoctorDetail.firstName}</h4>
                <h4>Specialist:{DoctorDetail.specialization}</h4>
                <img src={DoctorDetail.image}></img>


            </div>
        </Layout>
    );
}
