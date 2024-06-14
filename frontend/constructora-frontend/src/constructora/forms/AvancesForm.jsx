/* eslint-disable react/prop-types */
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    task: Yup.number().required('Requerido'),
    description: Yup.string().min(1, 'Mínimo 1 caracter').required('Requerido'),
    latitude: Yup.string().nullable(),
    longitude: Yup.string().nullable(),
    audio_note: Yup.string().nullable(),
    photo: Yup.string().nullable(),
    document: Yup.string().nullable(),
});

const initialValues = {
    task: '',
    description: '',
    latitude: '',
    longitude: '',
    audio_note: null,
    photo: null,
    document: null,
};

const FileInput = ({ field, form, ...props }) => {
    const handleChange = (event) => {
        form.setFieldValue(field.name, event.currentTarget.files[0]);
    };

    return (
        <div>
            <label htmlFor={field.name}>{props.label}</label>
            <input type="file" onChange={handleChange} {...props} />
            <ErrorMessage name={field.name} component="div" className="error-message" />
        </div>
    );
};

export const AvancesForm = ({ onSubmit, formInitialValues, tasks }) => {
    return (
        <>
            <Formik
                initialValues={formInitialValues ? formInitialValues : initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched }) => (
                    <Form className='form-container'>
                        <div>
                            <label htmlFor="task">Tarea</label>
                            <Field as="select" name="task">
                                <option value="">Selecciona una tarea</option>
                                {tasks.map(task => {
                                    const maxLength = 55;
                                    const displayText = task.description.length > maxLength
                                        ? `${task.description.substring(0, maxLength)}...`
                                        : task.description;

                                    return (
                                        <option key={task.id} value={task.id} title={task.description}>
                                            {displayText}
                                        </option>
                                    );
                                })}
                            </Field>
                            <ErrorMessage name="task" component="div" className="error-message" />
                        </div>
                        <div>
                            <label htmlFor="description">Descripción</label>
                            <Field type="text" name="description" />
                            <ErrorMessage name="description" component="div" className="error-message" />
                        </div>
                        <div>
                            <label htmlFor="latitude">Latitud</label>
                            <Field type="text" name="latitude" />
                            <ErrorMessage name="latitude" component="div" className="error-message" />
                        </div>
                        <div>
                            <label htmlFor="longitude">Longitud</label>
                            <Field type="text" name="longitude" />
                            <ErrorMessage name="longitude" component="div" className="error-message" />
                        </div>
                        <div>
                            <Field name="audio_note" label="Nota de audio" accept=".mp3,.wav" maxFileSize={5000000} component={FileInput}/>
                        </div>
                        <div>
                            <Field name="photo" label="Foto" accept=".jpg,.jpeg,.png" maxFileSize={2000000} component={FileInput}/>
                        </div>
                        <div>
                            <Field name="document" label="Documento" accept=".pdf" maxFileSize={10000000} component={FileInput}/>
                        </div>
                        <button type="submit" disabled={Object.keys(errors).some(x => touched[x])}>
                            Guardar
                        </button>
                    </Form>
                )}
            </Formik>
            <style>{`
                .form-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 20px;
                    background-color: #f8f9fa;
                    border-radius: 5px;
                    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
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
                    border: 1px solid #ced4da;
                    border-radius: 4px;
                    box-sizing: border-box;
                    margin-bottom: 20px;
                }
                
                .form-container input:focus, .form-container select:focus {
                    border-color: #ced4da;
                    outline: 1px solid #ced4da;
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
            `}</style>
        </>
    );
};