import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/token/', { username, password });
            localStorage.setItem('access', res.data.access);
            localStorage.setItem('refresh', res.data.refresh);
            navigate('/'); 
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setErrorMessage('Usuario no existe');
            } else {
                setErrorMessage('Ocurrió un error');
            }
            console.log(err);
        }
    };

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <input type="submit" value="Login" />
            {errorMessage && <p>{errorMessage}</p>}
        </form>
        <button onClick={() => navigate('/register')}>Registrarse</button>
        </div>
    );
}

export default Login;
