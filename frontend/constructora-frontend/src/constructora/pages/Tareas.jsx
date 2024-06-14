import { useEffect, useState } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { ViewLayout } from '../layout/Viewlayout';
import { TareasForm } from '../forms/TareasForm';

export const Tareas = () => {
    const [data, setData] = useState([]);
    const [users, setUsers] = useState([]);
    const [works, setWorks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ severity: 'success', message: '' });
    const [updatingTask, setUpdatingTask] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/users/');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchWorks = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/works/');
            const data = await response.json();
            setWorks(data);
        } catch (error) {
            console.error('Error fetching works:', error);
        }
    };

    const fetchTasks = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/tasks/');
            const data = await response.json();
            setData(data);
        } catch (error) {
            setAlert({ severity: 'error', message: 'Ocurrió un error al cargar las tareas' });
            setOpen(true);
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchWorks();
        fetchUsers();
        fetchTasks();
    }, []);

    const columns = [
        { name: 'ID', selector: row => row.id, sortable: true },
        { name: 'Nombre del Capataz', selector: row => row.foreman_name, sortable: true },
        { name: 'Nombres de Asistentes', selector: row => row.assistants_names, sortable: true },
        { name: 'Nombres de Obreros', selector: row => row.laborers_names, sortable: true },
        { name: 'Estado', selector: row => row.status, sortable: true },
        { name: 'Descripción', selector: row => row.description, sortable: true },
        { name: 'Fecha Estimada de Finalización', selector: row => row.estimated_completion_date, sortable: true },
        { name: 'Tipo de Tarea', selector: row => row.task_type, sortable: true },
        { name: 'Fecha de Asignación', selector: row => row.assignment_date, sortable: true },
        {
            name: 'Acciones',
            cell: row => (
                <div style={{ display: 'flex', flexDirection: 'row', gap: '4px', flexWrap: 'wrap', padding: '4px' }}>
                    <button className='btn btn-info' style={{ color: '#f5f5f5', width: '100%', fontSize: '.8rem' }} onClick={() => handleUpdate(row.id)}>Actualizar</button>
                    <button className='btn btn-danger' style={{ width: '100%', fontSize: '.8rem' }} onClick={() => handleDelete(row.id)}>Eliminar</button>
                </div>
            ),
            ignoreRowClick: true,
            style: {
                minWidth: '150px'
            }
        }
    ];

    const handleUpdate = async (id) => {
        const task = data.find(task => task.id === id);
        setUpdatingTask({ ...task });
        handleShowModal();
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta tarea?');
        if (confirmDelete) {
            const response = await fetch(`http://127.0.0.1:8000/api/tasks/${id}/`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchTasks();
                setAlert({ severity: 'success', message: 'Tarea eliminada correctamente' });
            } else {
                setAlert({ severity: 'error', message: 'Ocurrió un error al eliminar la tarea' });
            }
            setOpen(true);
        }
    };

    const onSubmit = async (values) => {
        console.log('Form values:', values);
        try {
            let response;
            if (values.id) {
                response = await fetch(`http://127.0.0.1:8000/api/tasks/${values.id}/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
            } else {
                response = await fetch('http://127.0.0.1:8000/api/tasks/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
            }
            const data = await response.json();
            console.log(data);
            fetchTasks();
            setAlert({ severity: 'success', message: 'Tarea guardada correctamente' });
        } catch (error) {
            console.error('Error:', error);
            setAlert({ severity: 'error', message: 'Ocurrió un error al guardar la tarea' });
        }
        if (updatingTask) {
            setUpdatingTask(null);
        }
        handleCloseModal();
        setOpen(true);
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setUpdatingTask(null);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '1rem',
                    height: 'calc(100vh - 64px)',
                    textAlign: 'center',
                }}
            >
                <CircularProgress size={60} />
                <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', mt: 4 }}>
                    Cargando...
                </Typography>
            </Box>
        );
    }

    return (
        <>
            <ViewLayout
                title="Tareas"
                data={data}
                columns={columns}
                onSubmit={onSubmit}
                FormComponent={TareasForm}
                formInitialValues={updatingTask}
                users={users}
                works={works}
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                handleShowModal={handleShowModal}
            />
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity={alert.severity} sx={{ width: '100%', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </>
    );
};