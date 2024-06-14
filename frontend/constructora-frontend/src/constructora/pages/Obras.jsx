import { useEffect, useState } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { ViewLayout } from '../layout/Viewlayout';
import { ObrasForm } from '../forms/ObrasForm';

export const Obras = () => {
    const [data, setData] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ severity: 'success', message: '' });
    const [updatingWork, setUpdatingWork] = useState(null);
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
        setIsLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/works/');
            const data = await response.json();
            setData(data);
        } catch (error) {
            setAlert({ severity: 'error', message: 'Ocurrió un error al cargar las obras' });
            setOpen(true);
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchUsers();
        fetchWorks();
    }, []);

    const columns = [
        { name: 'ID', selector: row => row.id, sortable: true },
        { name: 'Nombre de la Obra', selector: row => row.name, sortable: true },
        { name: 'Estado', selector: row => row.status, sortable: true },
        { name: 'Ubicación', selector: row => row.location, sortable: true },
        { name: 'Tipo de Trabajo', selector: row => row.work_type, sortable: true },
        { name: 'Fecha de Inicio', selector: row => row.start_date, sortable: true },
        { name: 'Director', selector: row => row.director_name, sortable: true },
        { name: 'Capataz', selector: row => row.foreman_name, sortable: true },
        { name: 'Peones', selector: row => row.laborers_names, sortable: true },
        { name: 'Ayudantes', selector: row => row.assistants_names, sortable: true },
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
        const work = data.find(work => work.id === id);
        setUpdatingWork({ ...work });
        handleShowModal();
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta obra?');
        if (confirmDelete) {
            const response = await fetch(`http://127.0.0.1:8000/api/works/${id}/`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchWorks();
                setAlert({ severity: 'success', message: 'Obra eliminada correctamente' });
            } else {
                setAlert({ severity: 'error', message: 'Ocurrió un error al eliminar la obra' });
            }
            setOpen(true);
        }
    };

    const onSubmit = async (values) => {
        console.log('Form values:', values);
        try {
            let response;
            if (values.id) {
                response = await fetch(`http://127.0.0.1:8000/api/works/${values.id}/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
            } else {
                response = await fetch('http://127.0.0.1:8000/api/works/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
            }
            const data = await response.json();
            console.log(data);
            fetchWorks();
            setAlert({ severity: 'success', message: 'Obra guardada correctamente' });
        } catch (error) {
            console.error('Error:', error);
            setAlert({ severity: 'error', message: 'Ocurrió un error al guardar la obra' });
        }
        if (updatingWork) {
            setUpdatingWork(null);
        }
        handleCloseModal();
        setOpen(true);
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setUpdatingWork(null);
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
                title="Obras"
                data={data}
                columns={columns}
                onSubmit={onSubmit}
                FormComponent={ObrasForm}
                users={users}
                formInitialValues={updatingWork}
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
