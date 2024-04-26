import { Formik, Field, Form, ErrorMessage } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
import * as Yup from "yup";
import { AuthLayout } from "../layout/AuthLayout";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { loginStart, loginSuccess } from "../../store/slices/user/userSlice";
import "../styles/LoginPage.css";

export const LoginPage = () => {
    const dispatch = useDispatch();

    const [captchaValue, setCaptchaValue] = useState(null);

    const handleCaptchaResponse = (value) => {
        setCaptchaValue(value); // Guardar el valor del captcha
    }

    const handleSubmit = (values) => {
        if (!captchaValue) {
            alert("Por favor, verifica que no eres un robot.");
            return;
        }

        dispatch(loginStart(values));

        setTimeout(() => {
            try {
                // TODO: Hacer la peticion al backend
                const response = true;
    
                if (response) {
                    dispatch(loginSuccess({
                        uid: "1",
                        email: "jondoe@mail.com",
                        displayName: "Jon Doe"
                    }));
                }
    
            } catch (error) {
                dispatch(loginFailure({ errorMessage: "Credenciales incorrectas" }));
            }
        }, 1500);
        
    }

    return (
        <AuthLayout title="Constructora Univalle">
            <Formik
                initialValues={
                    {
                        email: "",
                        password: ""
                    }
                }
                validationSchema={Yup.object({
                    email: Yup.string().matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, "El email no es válido"),
                    password: Yup.string().min(6)
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
                        </div>
                        <ReCAPTCHA sitekey="6LfEsrgpAAAAAO-ZzRpBQdJ4rg3mbuFRB3Sy3YE7" onChange={handleCaptchaResponse} className="captcha"/>
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
    )
}