import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState(''); 
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender, setGender] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        try {
            await axios.post('http://localhost:8000/api/register/', { username:username, first_name: firstName, last_name: lastName, email:email, password, gender });  // Agrega username aquí
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Usuario:  {/* Agrega este campo de entrada */}
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </label>
            <label>
                Nombre:
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </label>
            <label>
                Apellido:
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </label>
            <label>
                Correo electrónico:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
                Contraseña:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <label>
                Confirmar contraseña:
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </label>
            <label>
                Género:
                <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                    <option value="">Selecciona...</option>
                    <option value="male">Masculino</option>
                    <option value="female">Femenino</option>
                    <option value="other">Otro</option>
                </select>
            </label>
            <input type="submit" value="Registrarse" />
        </form>
    );
}

export default Register;