import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    id_type: Yup.string().required('Requerido'),
    id_number: Yup.string().max(50, 'Máximo 50 caracteres').min(1, 'Mínimo 1 caracter').required('Requerido'),
    last_name: Yup.string().max(50, 'Máximo 50 caracteres').min(1, 'Mínimo 1 caracter').required('Requerido'),
    first_name: Yup.string().max(50, 'Máximo 50 caracteres').min(1, 'Mínimo 1 caracter').required('Requerido'),
    role: Yup.string().required('Requerido'),
    username: Yup.string().max(50, 'Máximo 50 caracteres').min(1, 'Mínimo 1 caracter').required('Requerido'),
    password: Yup.string().max(128, 'Máximo 128 caracteres').min(1, 'Mínimo 1 caracter').required('Requerido'),
    gender: Yup.string().required('Requerido'),
    address: Yup.string().max(255, 'Máximo 255 caracteres').min(1, 'Mínimo 1 caracter').required('Requerido'),
    phone_number: Yup.string().max(20, 'Máximo 20 caracteres').min(1, 'Mínimo 1 caracter').required('Requerido'),
});

const initialValues = {
    id_type: '',
    id_number: '',
    last_name: '',
    first_name: '',
    role: '',
    username: '',
    password: '',
    gender: '',
    address: '',
    phone_number: '',
};

export const UsuariosForm = ({ onSubmit, formInitialValues }) => {

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
                            <label htmlFor="id_type">Tipo de ID</label>
                            <Field as="select" name="id_type">
                                <option value="">Selecciona...</option>
                                <option value="C.C">Cédula de ciudadanía</option>
                                <option value="T.I">Tarjeta de identidad</option>
                                <option value="C.E">Cédula de extranjería</option>
                                <option value="PASAPORTE">Pasaporte</option>
                            </Field>
                            <ErrorMessage name="id_type" component="div" className="error-message" />
                        </div>
                        <div>
                            <label htmlFor="id_number">Número de ID</label>
                            <Field name="id_number" type="text" />
                            <ErrorMessage name="id_number" component="div" className="error-message" />
                        </div>
                        <div>
                            <label htmlFor="last_name">Apellido</label>
                            <Field name="last_name" type="text" />
                            <ErrorMessage name="last_name" component="div" className="error-message" />
                        </div>
                        <div>
                            <label htmlFor="first_name">Nombre</label>
                            <Field name="first_name" type="text" />
                            <ErrorMessage name="first_name" component="div" className="error-message" />
                        </div>
                        <div>
                            <label htmlFor="role">Rol</label>
                            <Field as="select" name="role">
                                <option value="">Selecciona...</option>
                                <option value="Gerente">Gerente</option>
                                <option value="Director de obra">Director de obra</option>
                                <option value="Capataz de obra">Capataz de obra</option>
                                <option value="Peón">Peón</option>
                                <option value="Ayudante de albañil">Ayudante de albañil</option>
                            </Field>
                            <ErrorMessage name="role" component="div" className="error-message" />
                        </div>
                        <div>
                            <label htmlFor="username">Nombre de usuario</label>
                            <Field name="username" type="text" />
                            <ErrorMessage name="username" component="div" className="error-message" />
                        </div>
                        <div>
                            <label htmlFor="password">Contraseña</label>
                            <Field name="password" type="password" showpassword="true" />
                            <ErrorMessage name="password" component="div" className="error-message" />
                        </div>
                        <div>
                            <label htmlFor="gender">Género</label>
                            <Field as="select" name="gender">
                                <option value="">Selecciona...</option>
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                                <option value="O">Otro</option>
                            </Field>
                            <ErrorMessage name="gender" component="div" className="error-message" />
                        </div>
                        <div>
                            <label htmlFor="address">Dirección</label>
                            <Field name="address" type="text" />
                            <ErrorMessage name="address" component="div" className="error-message" />
                        </div>
                        <div>
                            <label htmlFor="phone_number">Teléfono</label>
                            <Field name="phone_number" type="text" />
                            <ErrorMessage name="phone_number" component="div" className="error-message" />
                        </div>
                        <button type="submit" disabled={Object.keys(errors).some(x => touched[x])}>
                            Crear
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

                    .form-container div {
                        width: 100%;
                    }
                    
                    /* Estilos para los labels */
                    .form-container label {
                        font-weight: bold;
                        margin: 10px 0;
                    }
                    
                    /* Estilos para los inputs y selects */
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
                    
                    /* Estilos para los mensajes de error */
                    .form-container .error-message {
                        color: red;
                        font-size: 0.8em;
                        margin-top: -10px;
                        margin-bottom: 10px;
                    }
                    
                    /* Estilos para el botón de submit */
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