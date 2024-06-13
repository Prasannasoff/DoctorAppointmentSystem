import React, { useEffect, useState } from 'react';
import Layout from '../../Components/Layout';
import axios from 'axios';
import style from '../../styles/Notifications.module.css';

function Notifications() {
    const [notifi, setnotifi] = useState([]);
    const [selectedNotification, setSelectedNotification] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await axios.post("http://localhost:5000/api/user/getNotifications", {},
                    {
                        headers: {
                            Authorization: token
                        },
                    });

                setnotifi(response.data);

            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    const handleClick = (index) => {
        if (selectedNotification === index) {
            setSelectedNotification(null);
        } else {
            setSelectedNotification(index);
        }
    };

    return (
        <Layout>
            <div className={style.container}>
                <h2 className={style.header}>Notifications</h2>
                {notifi.map((data, index) => (
                    <div key={index} className={style.notification}>
                        <div className={style.notificationHeader}>
                            <div>You got Notification from Dr. {data.Name}</div>
                            <button className={style.viewDetailsButton} onClick={() => handleClick(index)}>
                                {selectedNotification === index ? 'Hide Details' : 'View Details'}
                            </button>
                        </div>
                        {selectedNotification === index && (
                            <div className={style.details}>
                                <div>{data.DoctorMessage}</div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </Layout>
    );
}

export default Notifications;
