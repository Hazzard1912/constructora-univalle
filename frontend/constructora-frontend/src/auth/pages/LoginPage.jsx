import { Formik, Field, Form, ErrorMessage } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
import * as Yup from "yup";
import { AuthLayout } from "../layout/AuthLayout";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginSuccess, loginStart, loginFailure } from "../../store/slices/user/userSlice";
import "../styles/LoginPage.css";

export const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [captchaValue, setCaptchaValue] = useState(null);

    const handleCaptchaResponse = (value) => {
        setCaptchaValue(value);
    }

    const handleSubmit = async (values) => {

        if (!captchaValue) {
            alert("Por favor, verifica que no eres un robot.");
            return;
        }

        dispatch(loginStart());
        console.log('Submit values:', values);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            console.log(response);

            if (response.ok) {
                const user = {
                    uid: "1",
                    email: values.email,
                    displayName: "Ejemplo",
                };

                dispatch(loginSuccess(user));

                localStorage.setItem('user', JSON.stringify({
                    ...user,
                    status: 'authenticated',
                    role: 'Gerente'
                }));
                navigate('/gestion');
            } else {
                dispatch(loginFailure(
                    {
                        errorMessage: 'Ocurrió un error al procesar la solicitud.'
                    }
                ));
                alert('Credenciales incorrectas');
            }

        } catch (error) {
            console.error('Error:', error);
            dispatch(loginFailure({
                errorMessage: 'Ocurrió un error al procesar la solicitud.'
            }));
            alert('Ocurrió un error al procesar la solicitud.');
        }
    };

    return (
        <AuthLayout title="Constructora Univalle">
            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={Yup.object({
                    email: Yup.string().email("El email no es válido").required("Requerido"),
                    password: Yup.string().required("Requerido")
                })}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, values }) => (
                    <Form className="login-form">
                        <div className="mb-4">
                            <Field type="email" id="email" name="email" placeholder="Correo" />
                            <ErrorMessage name="email" component="div" className="text-danger error" />
                        </div>
                        <div className="mb-4">
                            <Field type="password" id="password" name="password" placeholder="Contraseña" />
                            <ErrorMessage name="password" component="div" className="text-danger error" />
                        </div>
                        <ReCAPTCHA sitekey="6LfEsrgpAAAAAO-ZzRpBQdJ4rg3mbuFRB3Sy3YE7" onChange={handleCaptchaResponse} className="captcha" />
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={Object.keys(errors).some(x => touched[x]) || (!values.email || !values.password)}>
                            Ingresar
                        </button>
                    </Form>
                )}
            </Formik>
        </AuthLayout>
    );
}
