import React, { useState, useEffect } from 'react';

const ReadObject = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
    const fetchUsers = async () => {
        try {
        const response = await fetch('http://localhost:3000/api/users');
        if (response.ok) {
            const data = await response.json();
            setUsers(data.data);
        } else {
            console.error('Failed to fetch users');
        }
        } catch (error) {
        console.error('Error during user fetch:', error);
        }
    };

    fetchUsers();
    }, []);

    return (
    <div>
        <h2>Read Users</h2>
        <ul>
        {users.map((user) => (
            <li key={user._id}>
            <strong>Name:</strong> {user.name}, <strong>Email:</strong> {user.email}
            </li>
        ))}
        </ul>
    </div>
    );
};

export default ReadObject;