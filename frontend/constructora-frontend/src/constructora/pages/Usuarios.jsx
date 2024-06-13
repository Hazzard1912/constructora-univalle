import { useEffect, useState } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { ViewLayout } from '../layout/Viewlayout';
import { UsuariosForm } from '../forms/UsuariosForm';

export const Usuarios = () => {
    const [data, setData] = useState([]);
    const [isLodaing, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ severity: 'success', message: '' });
    const [updatingUser, setUpdatingUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/users/')
            const data = await response.json();
            setData(data);
        } catch (error) {
            setAlert({ severity: 'error', message: 'Ocurrió un error al cargar los usuarios' });
            setOpen(true);
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const columns = [
        { name: 'ID', selector: row => row.id, sortable: true },
        { name: 'Tipo de ID', selector: row => row.id_type, sortable: true },
        { name: 'Número de ID', selector: row => row.id_number, sortable: true },
        { name: 'Nombre', selector: row => row.first_name, sortable: true },
        { name: 'Apellido', selector: row => row.last_name, sortable: true },
        { name: 'Rol', selector: row => row.role, sortable: true },
        { name: 'Nombre de usuario', selector: row => row.username },
        { name: 'Género', selector: row => row.gender, sortable: true },
        { name: 'Dirección', selector: row => row.address },
        { name: 'Teléfono', selector: row => row.phone_number },
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
        const user = data.find(user => user.id === id);
        setUpdatingUser({ ...user, password: '' });
        handleShowModal();
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
        if (confirmDelete) {
            const response = await fetch(`http://127.0.0.1:8000/api/users/${id}/`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchUsers();
                setAlert({ severity: 'success', message: 'Usuario eliminado correctamente' });
            } else {
                setAlert({ severity: 'error', message: 'Ocurrió un error al eliminar el usuario' });
            }
            setOpen(true);
        }
    }

    const onSubmit = async (values) => {
        console.log('Form values:', values);
        try {
            let response;
            if (values.id) {
                response = await fetch(`http://127.0.0.1:8000/api/users/${values.id}/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
            } else {
                response = await fetch('http://127.0.0.1:8000/api/users/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
            }
            const data = await response.json();
            console.log(data);
            fetchUsers();
            setAlert({ severity: 'success', message: 'Usuario guardado correctamente' });
        } catch (error) {
            console.error('Error:', error);
            setAlert({ severity: 'error', message: 'Ocurrió un error al guardar el usuario' });
        }
        if (updatingUser) {
            setUpdatingUser(null);
        }
        handleCloseModal();
        setOpen(true);
    }

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setUpdatingUser(null);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    if (isLodaing) {
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
        )
    }

    return (
        <>
            <ViewLayout
                title="Usuarios"
                data={data}
                columns={columns}
                onSubmit={onSubmit}
                FormComponent={UsuariosForm}
                formInitialValues={updatingUser}
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
    )
}
