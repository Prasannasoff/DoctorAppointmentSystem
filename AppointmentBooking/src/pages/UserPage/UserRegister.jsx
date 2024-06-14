// UserRegister.js
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/userRegister.module.css"; // Import CSS Module styles

function UserRegister() {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState('');

    const navigate = useNavigate();

    const onFinish = async () => {
        const userData = {
            name,
            email,
            password,
            phone,
            image: image ? image : '' // Ensure image is not null before sending to backend
        };
        try {
            setLoading(true);
            const response = await axios.post("https://doctorappointmentsystem-3.onrender.com/api/user/register", userData);
            setLoading(false);
            if (response.data.success) {
                toast.success(response.data.message);
                navigate("/login");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className={styles.registerMain}>
            <div className={styles.container}>
                {loading && (<h1>Loading</h1>)}

                <h2>Register</h2>
                <input type="text" className={styles["form-control"]} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" className={styles["form-control"]} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className={styles["form-control"]} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="number" className={styles["form-control"]} placeholder="Enter Phone No" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <input type="text" className={styles["form-control"]} placeholder="Enter Image Url" value={image} onChange={(e) => setImage(e.target.value)} />

                <button className={styles["btn-primary"]} onClick={onFinish}>Register</button>
                <Link to="/login" className={styles.anchor}>
                    Already Have an Account
                </Link>
            </div>
        </div>
    );
}

export default UserRegister;
