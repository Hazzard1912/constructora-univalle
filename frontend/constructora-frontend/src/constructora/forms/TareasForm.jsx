/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    foreman: Yup.number().required('Requerido'),
    assistants: Yup.array().of(Yup.number().required('Requerido')).min(1, 'Debe haber al menos un asistente').required('Requerido'),
    laborers: Yup.array().of(Yup.number().required('Requerido')).min(1, 'Debe haber al menos un obrero').required('Requerido'),
    status: Yup.string().oneOf(['asignada', 'en desarrollo', 'en revisión', 'aceptada'], 'Estado no válido').required('Requerido'),
    description: Yup.string().min(1, 'Mínimo 1 caracter').required('Requerido'),
    estimated_completion_date: Yup.date().required('Requerido'),
    task_type: Yup.string().oneOf(['obra negra', 'acabados', 'mantenimiento'], 'Tipo de tarea no válido').required('Requerido'),
    work: Yup.number().required('Requerido')
});

const initialValues = {
    foreman: '',
    assistants: [],
    laborers: [],
    status: '',
    description: '',
    estimated_completion_date: '',
    task_type: '',
    work: '',
};

export const TareasForm = ({ onSubmit, formInitialValues, users, works }) => {
    const [foremen, setForemen] = useState([]);
    const [assistants, setAssistants] = useState([]);
    const [laborers, setLaborers] = useState([]);

    useEffect(() => {
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
                            <label htmlFor="description">Descripción</label>
                            <Field name="description" type="text" />
                            <ErrorMessage name="description" component="div" className="error-message" />
                        </div>
                        <div>
                            <label htmlFor="estimated_completion_date">Fecha Estimada de Finalización</label>
                            <Field name="estimated_completion_date" type="date" />
                            <ErrorMessage name="estimated_completion_date" component="div" className="error-message" />
                        </div>
                        <div>
                            <label htmlFor="task_type">Tipo de Tarea</label>
                            <Field as="select" name="task_type">
                                <option value="">Selecciona...</option>
                                <option value="obra negra">Obra Negra</option>
                                <option value="acabados">Acabados</option>
                                <option value="mantenimiento">Mantenimiento</option>
                            </Field>
                            <ErrorMessage name="task_type" component="div" className="error-message" />
                        </div>
                        <div>
                            <label htmlFor="work">Trabajo</label>
                            <Field as="select" name="work">
                                <option value="">Selecciona...</option>
                                {works.map(work => (
                                    <option key={work.id} value={work.id}>
                                        {work.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="work" component="div" className="error-message" />
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
    )
}