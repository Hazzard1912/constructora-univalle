import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { Loading } from "../components/Loading";

export const AppRouter = () => {
    const { status } = useSelector((state) => state.user);
    console.log(status);

    if (status === 'loading') {
        return <Loading/>;
    }

    return (
        <Routes>
            {status === 'authenticated' ? (
                <>
                    <Route path="auth/*" element={<AuthRoutes />} />
                    {/* Si esta autenticado */}
                    {/* <Route path="inicio" element={<Inicio />} /> */}
                </>
            ) : (
                <>
                    {/* Si no esta autenticado */}
                    <Route path="auth/*" element={<AuthRoutes />} />
                    <Route path="/*" element={<Navigate to="/auth/login" />} />
                </>
            )}
        </Routes>
    )
}