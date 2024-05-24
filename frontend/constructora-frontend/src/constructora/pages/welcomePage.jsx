import React, { useEffect, useRef, useState } from 'react';

export const WelcomePage = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showBoxes, setShowBoxes] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);
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
                        justify-content: center;
                        align-items: center;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                        color: #222327;
                        font-size: 2.2em;
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
                <div className="menu-item" onClick={() => handleMenuItemClick('Dashboard')}>Dashboard</div>
                <div className="menu-item" onClick={() => handleMenuItemClick('Gestión de obras')}>Gestión de obras</div>
            </div>
            <main>
                {showBoxes && (
                    <>
                        <div className="box">Sección 1</div>
                        <div className="box">Sección 2</div>
                        <div className="box">Sección 3</div>
                        <div className="box">Sección 4</div>
                        <div className="box">Sección 5</div>
                        <div className="box">Sección 6</div>
                    </>
                )}
                {showDashboard && (
                    <div className="dashboard-box">Estadísticas del Dashboard</div>
                )}
            </main>
        </div>
    );
};
