import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../redux/hooks"
import { selectCurrentAccessToken } from "../redux/features/auth/authSlice"



// define como lidar com usuario autenticado
export const RequireAuth = () => {
  const token = useAppSelector(selectCurrentAccessToken)

  return token ? <Outlet /> : <Navigate to='/' /> 
}

// define como lidar com usuario nao autenticado
export const NoAuthRequired = () => {
  const token = useAppSelector(selectCurrentAccessToken)

  return token ? <Navigate to='/tarefas' /> : <Outlet /> 
}



