import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import EngineeringIcon from '@mui/icons-material/Engineering';
import TaskIcon from '@mui/icons-material/Task';
import SpeedIcon from '@mui/icons-material/Speed';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';

const menuOptions = {
    'Gerente': [
        { title: 'Gestión de usuarios', path: '/gestion/usuarios', icon: <PeopleIcon style={{ fontSize: '2rem' }} /> },
        { title: 'Gestión de obras', path: '/gestion/obras', icon: <EngineeringIcon style={{ fontSize: '2rem' }} /> },
        { title: 'Gestión de tareas', path: '/gestion/tareas', icon: <TaskIcon style={{ fontSize: '2rem' }} /> },
        { title: 'Gestión de avances', path: '/gestion/avances', icon: <SpeedIcon style={{ fontSize: '2rem' }} /> },
    ],
    'Director de obra': [
        { title: 'Gestión de obras', path: '/gestion/obras', icon: <EngineeringIcon style={{ fontSize: '2rem' }} /> },
        { title: 'Gestión de tareas', path: '/gestion/tareas', icon: <TaskIcon style={{ fontSize: '2rem' }} /> },
        { title: 'Gestión de avances', path: '/gestion/avances', icon: <SpeedIcon style={{ fontSize: '2rem' }} /> },
    ],
    'Capataz': [
        { title: 'Avances', path: 'avances', icon: <SpeedIcon style={{ fontSize: '2rem' }} /> },
    ],
}

export const Sidebar = () => {
    const { role } = useSelector((state) => state.user);
    const location = useLocation();

    return (
        <div className='custom-sidebar'>
            <div className='custom-logo'>
                <img src={logo} alt="Logo constructora" style={{
                    height: '100px',
                    width: '100px',
                }}/>
            </div>
            <Divider />
            <List>
                {menuOptions[role].map((option) => (
                    <ListItem
                        key={option.path}
                        component={Link}
                        to={option.path}
                        className={location.pathname === `${option.path}` ? 'active' : ''}
                    >
                        <ListItemIcon style={
                            {
                                color: 'var(--secondary-color)',
                            }
                        }>
                            {option.icon}
                        </ListItemIcon>
                        <ListItemText primary={option.title} className='custom-text' />
                    </ListItem>
                ))}
                <ListItem
                    key='dashboard'
                    component={Link}
                    to='/'
                    className={location.pathname === "/gestion" ? "active" : ""}
                >
                    <ListItemIcon style={
                        {
                            color: 'var(--secondary-color)',
                        }
                    }>
                        <DashboardIcon style={
                            {
                                fontSize: '2rem',
                            }
                        } />
                    </ListItemIcon>
                    <ListItemText primary='Dashboard' className='custom-text' />
                </ListItem>
            </List>

            <style>
                {
                    `
                    .custom-sidebar {
                        height: 100vh;
                        width: 250px;
                        padding: 10px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
                    }

                    .custom-logo {
                        height: 64px;
                        display: flex;
                        justify-content: start;
                        align-items: center;
                        margin: 10px 0;
                    }

                    .custom-text {
                        color: #000;
                    }

                    .active {
                        background-color: #e8d8ef;
                    }
                    `
                }
            </style>
        </div>
    )
}