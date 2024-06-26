import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { Outlet } from "react-router";
import { 
  Avances, 
  Dashboard, 
  Obras, 
  Tareas, 
  Usuarios
 } from "../pages";
import { DashboardLayout } from "../layout/DashboardLayout";

export const DashboardRoutes = () => {

  const { role } = useSelector((state) => state.user);

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {role === 'Gerente' && <Route path="usuarios" element={<Usuarios />} />}
        {(role === 'Gerente' || role === 'Director de obra') && <Route path="obras" element={<Obras />} />}
        {role === 'Director de obra' && <Route path="tareas" element={<Tareas />} />}
        {(role === 'Director de obra' || role === 'Capataz de obra') && <Route path="avances" element={<Avances />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Outlet />
    </DashboardLayout>
  );
};