import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export const DashboardPage = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showBoxes, setShowBoxes] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);
    const [userProfiles, setUserProfiles] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [newUser, setNewUser] = useState({
        photo: '',
        id_type: '',
        id_number: '',
        last_name: '',
        first_name: '',
        role: '',
        username: '',
        password: '',
        gender: '',
        address: '',
        phone_number: ''
    });
    const [showNewUserForm, setShowNewUserForm] = useState(false);
    const indicatorRef = useRef(null);

    useEffect(() => {
        const list = document.querySelectorAll('li');

        function activeLink() {
            list.forEach((li) => {
                li.classList.remove('active');
            });
            this.classList.add('active');

            // Obtener la posición del ícono activo
            const icon = this.querySelector('.icon');
            const iconRect = icon.getBoundingClientRect();

            // Ajustar la posición del indicador
            const indicator = indicatorRef.current;
            const indicatorLeft = iconRect.left + (iconRect.width / 2) - (indicator.offsetWidth / 2); // Centrar el indicador
            indicator.style.left = `${indicatorLeft}px`;
        }

        list.forEach((li) => {
            li.addEventListener('click', activeLink);
        });

        return () => {
            list.forEach((li) => {
                li.removeEventListener('click', activeLink);
            });
        };
    }, []);

    useEffect(() => {
        if (showBoxes) {
            // Fetch user profiles when showBoxes is true
            axios.get('http://localhost:8000/api/users/')
                .then(response => {
                    setUserProfiles(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the user profiles!', error);
                });
        }
    }, [showBoxes]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleMenuItemClick = (item) => {
        if (item === 'Gestión de usuarios') {
            setShowBoxes(true);
            setShowDashboard(false);
        } else if (item === 'Dashboard') {
            setShowDashboard(true);
            setShowBoxes(false);
        } else {
            setShowBoxes(false);
            setShowDashboard(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAddUser = () => {
        // Crea un nuevo objeto de usuario excluyendo el campo "photo" si no hay una imagen seleccionada
        const userData = {
            id_type: newUser.id_type,
            id_number: newUser.id_number,
            last_name: newUser.last_name,
            first_name: newUser.first_name,
            role: newUser.role,
            username: newUser.username,
            password: newUser.password,
            gender: newUser.gender,
            address: newUser.address,
            phone_number: newUser.phone_number
        };
        // Si hay una imagen seleccionada, se incluye el campo "photo" en el objeto de usuario
        if (newUser.photo) {
            userData.photo = newUser.photo;
        }
    
        axios.post('http://localhost:8000/api/users/', userData)
            .then(response => {
                setUserProfiles([...userProfiles, response.data]);
                setNewUser({
                    photo: '',
                    id_type: '',
                    id_number: '',
                    last_name: '',
                    first_name: '',
                    role: '',
                    username: '',
                    password: '',
                    gender: '',
                    address: '',
                    phone_number: ''
                });
                setShowNewUserForm(false);
            })
            .catch(error => {
                console.error('There was an error creating the user!', error);
            });
    };
    

    const handleDeleteUser = (id) => {
        axios.delete(`http://localhost:8000/api/users/${id}/`)
            .then(() => {
                setUserProfiles(userProfiles.filter(user => user.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the user!', error);
            });
    };

    const handleUpdateUser = (id, updatedData) => {
        setEditingUser(user);
        setShowNewUserForm(true);
        axios.put(`http://localhost:8000/api/users/${id}/`, updatedData)
            .then(response => {
                setUserProfiles(userProfiles.map(user => user.id === id ? response.data : user));
            })
            .catch(error => {
                console.error('There was an error updating the user!', error);
            });
    };

    return (
        <div>
            <style>
                {`
                    @import url("https://use.fontawesome.com/releases/v6.4.2/css/all.css");
                    @import url("https://fonts.googleapis.com/css?family=Poppins");

                    body {
                        min-height: 100vh;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        background: #222327;
                        margin: 0;
                        font-family: "Poppins", sans-serif;
                    }

                    .icon,
                    .text {
                        color: #222327;
                    }

                    .navigation {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100px;
                        background: #fff;
                        display: flex;
                        justify-content: center;
                        border-radius: 0 0 10px 10px;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                        z-index: 1000;
                    }

                    ul {
                        display: flex;
                        width: 100%;
                        justify-content: space-around;
                        padding: 0;
                        margin: 0;
                        list-style: none;
                    }

                    li {
                        position: relative;
                        width: 100px;
                        height: 100px;
                        z-index: 1;
                    }

                    li a {
                        position: relative;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        width: 100%;
                        text-align: center;
                        font-weight: 500;
                    }

                    a .icon {
                        position: relative;
                        display: block;
                        line-height: 105px;
                        font-size: 2em;
                        text-align: center;
                        transition: 0.5s;
                    }

                    li.active a .icon {
                        transform: translateY(-15px);
                    }

                    a .text {
                        position: absolute;
                        font-weight: 400;
                        font-size: 1em;
                        letter-spacing: 0.05em;
                        transition: 0.5s;
                        opacity: 0;
                        transform: translateY(20px);
                    }

                    li.active a .text {
                        opacity: 1;
                        transform: translateY(10px);
                    }

                    .indicator {
                        position: absolute;
                        top: -10px;
                        width: 120px;
                        height: 120px;
                        background: yellow;
                        box-sizing: border-box;
                        border-radius: 50%;
                        border: 6px solid #222327;
                        transition: 0.5s;
                    }

                    main {
                        margin-top: 120px;
                        text-align: center;
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        grid-gap: 20px;
                        justify-items: center;
                    }

                    .box {
                        width: 300px;
                        height: 400px;
                        background: #fff;
                        border-radius: 10px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                        color: #222327;
                        font-size: 1.2em;
                    }

                    .dashboard-box {
                        width: 1000px;
                        height: 650px;
                        background: #4CAF50;
                        border-radius: 10px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                        color: #fff;
                        font-size: 2.2em;
                        grid-column: span 3; /* Esto hace que el cuadro de dashboard ocupe todo el ancho */
                    }

                    /* Estilos para el botón de menú */
                    .menu-toggle {
                        position: fixed;
                        top: 110px; 
                        left: 20px;
                        color: #fff;
                        font-size: 2.5em;
                        cursor: pointer;
                        z-index: 1001;
                    }

                    /* Estilos del menú desplegable */
                    .side-menu {
                        position: fixed;
                        top: 160px; 
                        left: ${menuOpen ? '20px' : '-300px'};
                        width: 170px;
                        background: #fff;
                        border-radius: 5px;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                        z-index: 1002; 
                        transition: left 0.3s;
                    }

                    .menu-item {
                        padding: 20px;
                        font-size: 1.2em;
                        cursor: pointer;
                        transition: background 0.3s;
                    }

                    .menu-item:hover {
                        background: #f0f0f0;
                    }

                    .input {
                        margin: 5px 0;
                        padding: 10px;
                        width: 80%;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                    }

                    .btn {
                        margin: 5px;
                        padding: 10px 20px;
                        border: none;
                        border-radius: 5px;
                        background-color: #4CAF50;
                        color: #fff;
                        cursor: pointer;
                    }

                    .btn:hover {
                        background-color: #45a049;
                    }

                    .btn-delete {
                        background-color: #f44336;
                    }

                    .btn-delete:hover {
                        background-color: #e53935;
                    }

                    .btn-edit {
                        background-color: #2196F3;
                    }

                    .btn-edit:hover {
                        background-color: #1e88e5;
                    }

                    .new-user-form {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                `}
            </style>
            <header>
                <div className="navigation">
                    <ul>
                        <li>
                            <a href="#">
                                <span className="icon">
                                    <i className="fa-solid fa-house"></i>
                                </span>
                                <span className="text">Home</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="icon">
                                    <i className="fa-solid fa-user"></i>
                                </span>
                                <span className="text">Perfil</span>
                            </a>
                        </li>
                        <li className="active">
                            <a href="#">
                                <span className="icon">
                                    <i className="fa-solid fa-comment"></i>
                                </span>
                                <span className="text">Mensaje</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="icon">
                                    <i className="fa-solid fa-camera"></i>
                                </span>
                                <span className="text">Photos</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="icon">
                                    <i className="fa-solid fa-gear"></i>
                                </span>
                                <span className="text">Configuración</span>
                            </a>
                        </li>
                        <div ref={indicatorRef} className="indicator"></div>
                    </ul>
                </div>
            </header>
            {/* Botón de menú */}
            <div className="menu-toggle" onClick={toggleMenu}>
                <i className="fas fa-bars"></i>
            </div>
            {/* Menú desplegable */}
            <div className="side-menu">
                <div className="menu-item" onClick={() => handleMenuItemClick('Gestión de usuarios')}>Gestión de usuarios</div>
                <div className="menu-item" onClick={() => handleMenuItemClick('Gestión de obras')}>Gestión de obras</div>
                <div className="menu-item" onClick={() => handleMenuItemClick('Dashboard')}>Dashboard</div>
            </div>
            <main>
                {showBoxes && userProfiles.map((user, index) => (
                    <div key={index} className="box">
                        <div>
                            <img src={user.photo}  width="100" />
                            <p>{user.first_name} {user.last_name}</p>
                            <p>{user.role}</p>
                            <p>{user.id_type }: {user.id_number}</p>
                            <p>{user.address}</p>
                            <p>{user.phone_number}</p>
                            <button className="btn btn-edit" onClick={() => handleUpdateUser(user.id, user)}>Editar</button>
                            <button className="btn btn-delete" onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
                        </div>
                    </div>
                ))}

                {showDashboard && (
                    <div className="dashboard-box">
                        Dashboard Content
                    </div>
                )}
                {showBoxes && (
                    <div className="box">
                        {!showNewUserForm ? (
                            <button className="btn" onClick={() => setShowNewUserForm(true)}>Agregar</button>
                        ) : (
                            <div className="new-user-form">
                                <h3>Agregar nuevo usuario</h3>
                                <input type="file" name="photo" className="input" onChange={handleInputChange} />
                                <input type="text" name="id_type" placeholder="Tipo de Documento" className="input" value={newUser.id_type} onChange={handleInputChange} />
                                <input type="text" name="id_number" placeholder="Número de Documento" className="input" value={newUser.id_number} onChange={handleInputChange} />
                                <input type="text" name="last_name" placeholder="Apellido" className="input" value={newUser.last_name} onChange={handleInputChange} />
                                <input type="text" name="first_name" placeholder="Nombre" className="input" value={newUser.first_name} onChange={handleInputChange} />
                                <input type="text" name="role" placeholder="Rol" className="input" value={newUser.role} onChange={handleInputChange} />
                                <input type="text" name="username" placeholder="Usuario" className="input" value={newUser.username} onChange={handleInputChange} />
                                <input type="password" name="password" placeholder="Contraseña" className="input" value={newUser.password} onChange={handleInputChange} />
                                <input type="text" name="gender" placeholder="Género" className="input" value={newUser.gender} onChange={handleInputChange} />
                                <input type="text" name="address" placeholder="Dirección" className="input" value={newUser.address} onChange={handleInputChange} />
                                <input type="text" name="phone_number" placeholder="Número de teléfono" className="input" value={newUser.phone_number} onChange={handleInputChange} />
                                <button className="btn" onClick={handleAddUser}>Agregar</button>
                                <button className="btn btn-delete" onClick={() => setShowNewUserForm(false)}>Cancelar</button>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};
