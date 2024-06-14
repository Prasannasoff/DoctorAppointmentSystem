import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Layout from '../../Components/Layout';
import style from '../../styles/HomePage.module.css';

export default function HomePage() {
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const response = await axios.post(
          "https://doctorappointmentsystem-3.onrender.com/api/user/getuser",
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setUser(response.data[0]);
        const userData = response.data[0]; // Get the first object from the array
        localStorage.setItem("Userdata", JSON.stringify(userData));
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  return (
    <Layout>
      <div className={style.container}>
        {user.image && <img className={style.image} src={user.image} alt="User Profile" />}
        <div className={style.profile}>
          <h4 className={style.header}>Name: {user.name}</h4>
          <h5 className={style.subheader}>Email: {user.email}</h5>
          {user.phone && <h5 className={style.subheader}>Phone Number: {user.phone}</h5>}
        </div>
      </div>
    </Layout>
  );
}
