import React, { useState, useEffect } from 'react';

const DeleteObject = ({ match, history }) => {
    const userId = match.params.userId;
    const [userData, setUserData] = useState({
    name: '',
    email: '',
    });

    useEffect(() => {
    const fetchUserDetails = async () => {
        try {
        const response = await fetch(`https://testing-backend-i1v6.onrender.com/api/users/${userId}`);
        if (response.ok) {
            const data = await response.json();
            setUserData(data.data);
        } else {
            console.error('Failed to fetch user details');
        }
        } catch (error) {
        console.error('Error during user details fetch:', error);
        }
    };

    fetchUserDetails();
    }, [userId]);

    const handleDelete = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: 'DELETE',
        });

        if (!response.ok) {
        console.error('User deletion failed');
        return;
        }

      // Handle success(show a success message)
      history.push('/'); // Redirect to the home page after deletion
    } catch (error) {
        console.error('Error during user deletion:', error);
    }
    };

    return (
    <div>
        <h2>Delete User</h2>
        <p>
        Are you sure you want to delete the user {userData.name} ({userData.email})?
        </p>
        <button onClick={handleDelete}>Delete User</button>
    </div>
    );
};

export default DeleteObject;