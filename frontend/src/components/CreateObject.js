import React, { useState } from 'react';

const CreateObject = () => {
    const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    });

    const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        });

        if (!response.ok) {
        console.error('User creation failed');
        return;
        }

      // Handle success (show a success message) 
    } catch (error) {
        console.error('Error during user creation:', error);
    }
    };

    return (
    <div>
        <h2>Create User</h2>
        <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            required
        />

        <label>Email:</label>
        <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            required
        />

        <label>Password:</label>
        <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            required
        />

        <button type="submit">Create User</button>
        </form>
    </div>
    );
};

export default CreateObject;