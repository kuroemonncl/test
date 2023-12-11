import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Signing up');
    try {
      setLoading(true);

      // Send signup data to the server
      const response = await fetch('https://testing-backend-i1v6.onrender.com/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.error('Signup failed');
        setLoading(false);
        setError('Signup failed. Please try again.');
        return;
      }

      // Redirect to the sign-in page after successful signup
      navigate('/signin');
    } catch (error) {
      console.error('Error during signup:', error);
      setLoading(false);
      setError('An error occurred during signup. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            name="name"
            onChange={handleInputChange}
            value={formData.name}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            onChange={handleInputChange}
            value={formData.email}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            name="password"
            onChange={handleInputChange}
            value={formData.password}
            required
            style={styles.input}
          />
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <div>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    marginTop: '8px',
    textAlign: 'center',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  formGroup: {
    marginBottom: '16px',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    border: '1px solid #ccc',
  },
  error: {
    color: 'red',
    marginBottom: '16px',
  },
  button: {
    width: '100%',
    backgroundColor: 'teal',
    color: 'white',
    padding: '10px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default SignUp;