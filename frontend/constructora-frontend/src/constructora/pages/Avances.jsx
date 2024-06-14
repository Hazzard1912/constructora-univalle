import { useEffect, useState } from 'react';
import moment from 'moment';
import { CircularProgress, Box, Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { ViewLayout } from '../layout/Viewlayout';
import { AvancesForm } from '../forms/AvancesForm';

export const Avances = () => {
    const [data, setData] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ severity: 'success', message: '' });
    const [updatingProgress, setUpdatingProgress] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/tasks/');
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const fetchProgress = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/task-progress/');
            const data = await response.json();
            setData(data);
        } catch (error) {
            setAlert({ severity: 'error', message: 'Ocurrió un error al cargar los avances' });
            setOpen(true);
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
        fetchProgress();
    }, []);

    const columns = [
        { name: 'ID', selector: row => row.id, sortable: true },
        { name: 'Task', selector: row => row.task, sortable: true },
        { name: 'Task Name', selector: row => row.task_name, sortable: true },
        { name: 'Description', selector: row => row.description, sortable: true },
        { name: 'Latitude', selector: row => row.latitude, sortable: true },
        { name: 'Longitude', selector: row => row.longitude, sortable: true },
        {
            name: 'Audio Note',
            cell: row => (
                <audio controls>
                    <source src={row.audio_note} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            ),
            ignoreRowClick: true,
        },
        {
            name: 'Photo',
            cell: row => {
                const uniqueId = `img-${row.id}`;
                return (
                    <div>
                        <img src={row.photo} alt="Task related" style={{ width: '150px' }} onClick={() => openImage(uniqueId, row.photo)} />
                        <div id={`modal-${uniqueId}`} className="modal-tabla">
                            <span className="close" id={`close-${uniqueId}`}>&times;</span>
                            <img className="modal-tabla-content" id={uniqueId} alt='task-image' />
                        </div>
                    </div>
                );
            },
            ignoreRowClick: true,
        },
        {
            name: 'Document',
            cell: row => (
                <a href={row.document} target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-file-pdf" style={
                        {
                            fontSize: '1.5rem',
                            color: '#ff0000',
                            padding: '1rem',
                        }
                    }></i>
                </a>
            ),
            ignoreRowClick: true,
        },
        {
            name: 'Created At',
            selector: row => moment(row.created_at).format('MMMM Do YYYY, h:mm:ss a'),
            sortable: true
        },
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

    function openImage(imgId, imgSrc) {
        var modal = document.getElementById(`modal-${imgId}`);

        var modalImg = document.getElementById(imgId);

        modal.style.display = "block";
        modalImg.src = imgSrc;

        var span = document.getElementById(`close-${imgId}`);

        span.onclick = function () {
            modal.style.display = "none";
        }
    }

    const handleUpdate = async (id) => {
        const progress = data.find(progress => progress.id === id);
        setUpdatingProgress({ ...progress });
        handleShowModal();
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este avance?');
        if (confirmDelete) {
            const response = await fetch(`http://127.0.0.1:8000/api/task-progress/${id}/`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchProgress();
                setAlert({ severity: 'success', message: 'Avance eliminado correctamente' });
            } else {
                setAlert({ severity: 'error', message: 'Ocurrió un error al eliminar el avance' });
            }
            setOpen(true);
        }
    };

    const onSubmit = async (values) => {
        console.log('Form values:', values);
        try {
            let formData = new FormData();
            for (let key in values) {
                if (values[key] !== null && values[key] !== undefined && values[key] !== '') {
                    formData.append(key, values[key]);
                }
            }

            let response;
            if (values.id) {
                response = await fetch(`http://127.0.0.1:8000/api/task-progress/${values.id}/`, {
                    method: 'PUT',
                    body: formData,
                });
            } else {
                response = await fetch('http://127.0.0.1:8000/api/task-progress/', {
                    method: 'POST',
                    body: formData,
                });
            }
            const data = await response.json();
            console.log(data);
            fetchProgress();
            setAlert({ severity: 'success', message: 'Avance guardado correctamente' });
        } catch (error) {
            console.error('Error:', error);
            setAlert({ severity: 'error', message: 'Ocurrió un error al guardar el avance' });
        }
        if (updatingProgress) {
            setUpdatingProgress(null);
        }
        handleCloseModal();
        setOpen(true);
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setUpdatingProgress(null);
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
                title="Avances"
                data={data}
                columns={columns}
                onSubmit={onSubmit}
                FormComponent={AvancesForm}
                formInitialValues={updatingProgress}
                tasks={tasks}
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                handleShowModal={handleShowModal}
            />
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity={alert.severity} sx={{ width: '100%', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }}>
                    {alert.message}
                </Alert>
            </Snackbar>
            <style>
                {`
                    .modal-tabla {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.9); /* Black w/ opacity */
}

/* Modal Content (image) */
.modal-tabla-content {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
}

/* Add Animation */
.modal-tabla-content {  
    animation-name: zoom;
    animation-duration: 0.6s;
}

@keyframes zoom {
    from {transform:scale(0)} 
    to {transform:scale(1)}
}

/* The Close Button */
.close {
    position: absolute;
    top: 15px;
    right: 35px;
    color: #f1f1f1;
    font-size: 40px;
    font-weight: bold;
    transition: 0.3s;
}

.close:hover,
.close:focus {
    color: #bbb;
    text-decoration: none;
    cursor: pointer;
}
                `}
            </style>
        </>
    );
};