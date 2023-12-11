import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const decodeToken = (token) => {
  try {
    const [, payloadBase64] = token.split(".");
    const payload = JSON.parse(atob(payloadBase64));
    return payload._id;
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null;
  }
};

const MyProfile = ({ handleDelete }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const userId = decodeToken(token);

        if (userId) {
          try {
            const response = await fetch(`http://localhost:8080/api/users/${userId}`);
            if (response.ok) {
              const data = await response.json();
              if (data.status && data.data) {
                setUser(data.data);
              }
            } else {
              console.error("Error fetching user data:", response.statusText);
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem("token");
  
    if (token) {
      const userId = decodeToken(token);
  
      if (userId) {
        try {
          // Filter out empty values from newUserData
          const updatedData = Object.fromEntries(
            Object.entries(newUserData).filter(([key, value]) => value.trim() !== "")
          );
  
          const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
          });
  
          if (response.ok) {
            const data = await response.json();
            if (data.status && data.data) {
              setUser(data.data);
              setIsModalOpen(false);
            } else {
              console.error("Error updating user data:", data.message);
            }
          } else {
            console.error("Error updating user data:", response.statusText);
          }
        } catch (error) {
          console.error("Error updating user data:", error);
        }
      }
    }
  };

  const confirmDelete = () => {
    console.log("Trying to confirm delete...");
    setDeleteConfirmation(true);
  };

  const handleFinalDelete = async () => {
    console.log("Attempting final delete...");

    if (deleteConfirmation) {
      const token = localStorage.getItem("token");

      if (token) {
        const userId = decodeToken(token);

        console.log("User ID for deletion:", userId);

        if (userId) {
          try {
            const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
              method: "DELETE",
            });

            if (response.ok) {
              const data = await response.json();
              console.log("Final delete response:", data);

              if (data.status === true) {
                localStorage.removeItem("token");
                console.log("User account deleted.");
                navigate("/");
                handleDelete();
              } else {
                console.error("Error deleting user account:", data.message);
              }
            } else {
              console.error("Error deleting user account:", response.statusText);
            }
          } catch (error) {
            console.error("Error deleting user account:", error);
          }
        }
      }
    } else {
      console.log("User canceled final delete.");
    }
  };
  
  const cancelDelete = () => {
    console.log("User canceled delete.");
    setDeleteConfirmation(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ textAlign: "center", marginTop: "0", fontWeight: "bold", fontSize: "2em" }}>My Profile</h2>
      {user && (
        <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
          <div style={{ marginBottom: "20px", borderBottom: "1px solid #ccc", paddingBottom: "20px" }}>
            <strong>User ID:</strong> {user._id}
          </div>
          <div style={{ marginBottom: "20px", borderBottom: "1px solid #ccc", paddingBottom: "20px" }}>
            <strong>Name:</strong> {user.name}
          </div>
          <div style={{ marginBottom: "20px", borderBottom: "1px solid #ccc", paddingBottom: "20px" }}>
            <strong>Email:</strong> {user.email}
          </div>
          <div style={{ marginBottom: "20px", borderBottom: "1px solid #ccc", paddingBottom: "20px" }}>
            <strong>Password:</strong> {Array(user.password.length + 1).join('*')}
          </div>
          <div style={{ marginBottom: "20px", borderBottom: "1px solid #ccc", paddingBottom: "20px" }}>
            <strong>Created:</strong> {new Date(user.created).toLocaleDateString()}
          </div>
          <div style={{ marginBottom: "20px" }}>
            <strong>Updated:</strong> {new Date(user.updated).toLocaleDateString()}
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              marginTop: "20px",
              color: "#fff",
              backgroundColor: "#008080",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Update Profile
          </button>
          <button
            onClick={confirmDelete}
            style={{
              marginTop: "20px",
              marginLeft: "10px",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              color: "#fff",
              backgroundColor: "#DC143C",
            }}
          >
            Delete Account
          </button>
        </div>
      )}

      {isModalOpen && (
        <div style={{ position: "fixed", top: "0", left: "0", width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", maxWidth: "400px" }}>
            <h3 style={{ fontWeight: "bold" }}>Update Profile</h3>
            <p>Values left blank will remain unchanged</p>
            <label style={{ display: "block", margin: "10px 0" }}>
              Name
              <input
                type="text"
                value={newUserData.name}
                onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </label>
            <label style={{ display: "block", margin: "10px 0" }}>
              Email
              <input
                type="email"
                value={newUserData.email}
                onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </label>
            <label style={{ display: "block", margin: "10px 0" }}>
              Password
              <input
                type="password"
                value={newUserData.password}
                onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </label>
            <button
              onClick={handleUpdateProfile}
              style={{
                background: "#008080",
                color: "#fff",
                padding: "8px 16px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Save
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                marginLeft: "10px",
                padding: "8px 16px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {deleteConfirmation && (
        <div style={{ position: "fixed", top: "0", left: "0", width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", maxWidth: "400px" }}>
            <h3 style={{ fontWeight: "bold" }}>Confirm Deletion</h3>
            <p>Are you sure you want to delete your account? This action is irreversible.</p>
            <button
              onClick={handleFinalDelete}
              style={{
                background: "#DC143C",
                color: "#fff",
                padding: "8px 16px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Confirm Delete
            </button>
            <button
              onClick={cancelDelete}
              style={{
                marginLeft: "10px",
                padding: "8px 16px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;