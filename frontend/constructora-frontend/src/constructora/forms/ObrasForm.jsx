/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    director: Yup.number().required('Requerido'),
    foreman: Yup.number().required('Requerido'),
    assistants: Yup.array().of(Yup.number().required('Requerido')).min(1, 'Debe haber al menos un asistente').required('Requerido'),
    laborers: Yup.array().of(Yup.number().required('Requerido')).min(1, 'Debe haber al menos un obrero').required('Requerido'),
    name: Yup.string().min(1, 'Mínimo 1 caracter').max(255, 'Máximo 255 caracteres').required('Requerido'),
    status: Yup.string().oneOf(['asignada', 'en desarrollo', 'en revisión', 'aceptada'], 'Estado no válido').required('Requerido'),
    location: Yup.string().min(1, 'Mínimo 1 caracter').max(255, 'Máximo 255 caracteres').required('Requerido'),
    work_type: Yup.string().min(1, 'Mínimo 1 caracter').max(255, 'Máximo 255 caracteres').required('Requerido'),
    start_date: Yup.date().required('Requerido'),
});

const initialValues = {
    director: '',
    foreman: '',
    assistants: [],
    laborers: [],
    name: '',
    status: '',
    location: '',
    work_type: '',
    start_date: '',
};

export const ObrasForm = ({ onSubmit, formInitialValues, users }) => {
    const [directors, setDirectors] = useState([]);
    const [foremen, setForemen] = useState([]);
    const [assistants, setAssistants] = useState([]);
    const [laborers, setLaborers] = useState([]);

    useEffect(() => {
        setDirectors(users.filter(user => user.role === 'Director de obra'));
        setForemen(users.filter(user => user.role === 'Capataz de obra'));
        setAssistants(users.filter(user => user.role === 'Ayudante de albañil'));
        setLaborers(users.filter(user => user.role === 'Peón'));
    }, [users]);

    return (
        <>
            <Formik
                initialValues={formInitialValues ? formInitialValues : initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched, values, setFieldValue }) => (
                    <Form className='form-container'>
                        <div>
                            <label htmlFor="name">Nombre</label>
                            <Field type="text" name="name" />
                            <ErrorMessage name="name" component="div" className="error-message" />
                        </div>
                        <div>
                            <label htmlFor="director">Director de Obra</label>
                            <Field as="select" name="director">
                                <option value="">Selecciona...</option>
                                {directors.map(director => (
                                    <option key={director.id} value={director.id}>
                                        {director.first_name} {director.last_name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="director" component="div" className="error-message" />
                        </div>
                        <div>
                            <label htmlFor="foreman">Capataz</label>
                            <Field as="select" name="foreman">
                                <option value="">Selecciona...</option>
                                {foremen.map(foreman => (
                                    <option key={foreman.id} value={foreman.id}>
                                        {foreman.first_name} {foreman.last_name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="foreman" component="div" className="error-message" />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="assistants" style={{ textAlign: 'center', display: 'block', textTransform: 'uppercase', color: 'darkblue' }}>Ayudantes</label>
                            <hr />
                            {assistants.map(assistant => (
                                <div key={assistant.id} style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div>
                                        <label>
                                            {assistant.first_name} {assistant.last_name}
                                        </label>
                                    </div>
                                    <input
                                        type="checkbox"
                                        name="assistants"
                                        className='form-check'
                                        value={assistant.id}
                                        checked={values.assistants.includes(assistant.id)}
                                        onChange={() => {
                                            if (values.assistants.includes(assistant.id)) {
                                                setFieldValue(
                                                    "assistants",
                                                    values.assistants.filter(
                                                        id => id !== assistant.id
                                                    )
                                                );
                                            } else {
                                                setFieldValue(
                                                    "assistants",
                                                    [...values.assistants, assistant.id]
                                                );
                                            }
                                        }}
                                    />
                                </div>
                            ))}
                            <ErrorMessage name="assistants" component="div" className="error-message" />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="laborers" style={{ textAlign: 'center', display: 'block', textTransform: 'uppercase', color: 'darkblue' }}>Obreros</label>
                            <hr />
                            {laborers.map(laborer => (
                                <div key={laborer.id} style={{ display: 'flex', alignItems: 'center' }}>
                                    <div>
                                        <label>
                                            {laborer.first_name} {laborer.last_name}
                                        </label>
                                    </div>
                                    <input
                                        type="checkbox"
                                        name="laborers"
                                        className='form-check'
                                        value={laborer.id}
                                        checked={values.laborers.includes(laborer.id)}
                                        onChange={() => {
                                            if (values.laborers.includes(laborer.id)) {
                                                setFieldValue(
                                                    "laborers",
                                                    values.laborers.filter(
                                                        id => id !== laborer.id
                                                    )
                                                );
                                            } else {
                                                setFieldValue(
                                                    "laborers",
                                                    [...values.laborers, laborer.id]
                                                );
                                            }
                                        }}
                                    />
                                </div>
                            ))}
                            <ErrorMessage name="laborers" component="div" className="error-message" />
                        </div>
                        <div>
                            <label htmlFor="status">Estado</label>
                            <Field as="select" name="status">
                                <option value="">Selecciona...</option>
                                <option value="asignada">Asignada</option>
                                <option value="en desarrollo">En Desarrollo</option>
                                <option value="en revisión">En Revisión</option>
                                <option value="aceptada">Aceptada</option>
                            </Field>
                            <ErrorMessage name="status" component="div" className="error-message" />
                        </div>
                        <div>
                            <label htmlFor="location">Ubicación</label>
                            <Field type="text" name="location" />
                            <ErrorMessage name="location" component="div" className="error-message" />
                        </div>
                        <div>
                            <label htmlFor="work_type">Tipo de Obra</label>
                            <Field type="text" name="work_type" />
                            <ErrorMessage name="work_type" component="div" className="error-message" />
                        </div>
                        <div>
                            <label htmlFor="start_date">Fecha de Inicio</label>
                            <Field type="date" name="start_date" />
                            <ErrorMessage name="start_date" component="div" className="error-message" />
                        </div>
                        <button type="submit" disabled={Object.keys(errors).some(x => touched[x])}>
                            Guardar
                        </button>
                    </Form>
                )}
            </Formik>
            <style>
                {
                    `
                    .form-container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        padding: 20px;
                        background-color: #f8f9fa;
                        border-radius: 5px;
                        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
                    }

                    .form-container .form-check {
                        display: flex;
                        flex-direction: row;
                        width: 1.5rem;
                        margin-bottom: 0;
                    }

                    .form-container .form-check:focus {
                        outline: none;
                    }

                    .form-container div {
                        width: 100%;
                    }
                    
                    .form-container label {
                        font-weight: bold;
                        margin: 10px 0;
                    }
                    
                    .form-container input, .form-container select {
                        width: 100%;
                        padding: 10px;
                        border: 1px solid var(--secondary-color);
                        border-radius: 4px;
                        box-sizing: border-box;
                        margin-bottom: 20px;
                    }
                    
                    .form-container input:focus, .form-container select:focus {
                        border-color: var(--secondary-color);
                        outline: 1px solid var(--secondary-color);
                    }
                    
                    .form-container .error-message {
                        color: red;
                        font-size: 0.8em;
                        margin-top: -10px;
                        margin-bottom: 10px;
                    }
                    
                    .form-container button[type="submit"] {
                        margin-top: 20px;
                        padding: 1rem 2rem;
                        width: 50%;
                        background-color: #007bff;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        transition: background-color 0.3s ease;
                    }
                    
                    .form-container button[type="submit"]:hover {
                        background-color: #0056b3;
                    }
                    `
                }
            </style>
        </>
    );
}