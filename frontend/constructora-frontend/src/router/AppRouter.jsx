import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { Loading } from "../components/Loading";
import { WelcomePage } from "../constructora/pages/welcomePage";

export const AppRouter = () => {
    const { status } = useSelector((state) => state.user);
    console.log(status);

    if (status === 'loading') {
        return <Loading />;
    }

    return (
        <Routes>
            {status === 'authenticated' ? (
                <>
                    <Route path="/welcome" element={<WelcomePage />} />
                    <Route path="/*" element={<Navigate to="/welcome" />} />
                </>
            ) : (
                <>
                    <Route path="auth/*" element={<AuthRoutes />} />
                    <Route path="/*" element={<Navigate to="/auth/login" />} />
                </>
            )}
        </Routes>
    );
};
