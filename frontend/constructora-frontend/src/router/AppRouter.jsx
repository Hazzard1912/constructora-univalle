import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { Loading } from "../components/Loading";
import { DashboardRoutes } from "../constructora/routes/DashboardRoutes";

export const AppRouter = () => {
    const { status } = useSelector((state) => state.user);

    if (status === 'loading') {
        return <Loading />;
    }

    return (
        <Routes>
            {status === 'authenticated' ? (
                <>
                    <Route path="gestion/*" element={<DashboardRoutes />} />
                    <Route path="*" element={<Navigate to="gestion" />} />
                </>
            ) : (
                <>
                    <Route path="auth/*" element={<AuthRoutes />} />
                    <Route path="*" element={<Navigate to="auth/login" />} />
                </>
            )}
        </Routes>
    );
};
