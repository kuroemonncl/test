import React, { useEffect, useState } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Fetch user data from the API
    fetch("http://localhost:8080/api/users")
      .then((response) => response.json())
      .then((data) => {
        if (data.status && data.data) {
          setUsers(data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleCardClick = (user) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsOpen(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ textAlign: "center", marginTop: "0", fontWeight: "bold", fontSize: "2em" }}>User List</h2>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", marginTop: "20px" }}>
        {users.map((user) => (
          <div
            key={user._id}
            style={{
              borderWidth: "1px",
              borderRadius: "8px",
              borderColor: "#cbd5e0",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              padding: "16px",
              maxWidth: "sm",
              width: "100%",
              marginBottom: "16px",
              cursor: "pointer",
              boxSizing: "border-box",
            }}
            onClick={() => handleCardClick(user)}
          >
            <div style={{ fontWeight: "bold" }}>{user.name}</div>
            <div style={{ color: "#38a169" }}>{user.email}</div>
          </div>
        ))}
      </div>
      {selectedUser && (
        <div style={{ position: "fixed", top: "0", left: "0", width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", maxWidth: "400px" }}>
            <h3 style={{ fontWeight: "bold", marginBottom: "10px", fontSize: "1.5em" }}>User Information</h3>
            <div style={{ marginBottom: "8px", fontSize: "1.1em" }}>
              <strong>ID:</strong> {selectedUser._id}
            </div>
            <div style={{ marginBottom: "8px", fontSize: "1.1em" }}>
              <strong>Name:</strong> {selectedUser.name}
            </div>
            <div style={{ marginBottom: "8px", fontSize: "1.1em" }}>
              <strong>Email:</strong> {selectedUser.email}
            </div>
            <div style={{ marginBottom: "8px", fontSize: "1.1em" }}>
              <strong>Created:</strong> {new Date(selectedUser.created).toLocaleDateString()}
            </div>
            <div style={{ marginBottom: "8px", fontSize: "1.1em" }}>
              <strong>Updated:</strong> {new Date(selectedUser.updated).toLocaleDateString()}
            </div>
            <button
              onClick={closeModal}
              style={{
                background: "#38a169",
                color: "#fff",
                padding: "8px 16px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
