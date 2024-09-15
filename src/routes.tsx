import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Home } from './pages/Home'
import { Header } from './components/header/header'
import { NoAuthRequired, RequireAuth } from './utils/routeProtection'
import { Task } from './pages/Task'
import { Members } from './pages/Members'
import { EditMember } from './pages/editMember'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NoAuthRequired />}>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route element={<Header />}>
            <Route path='/tarefas' element={<Home />} />
            <Route path='/tarefas/adicionar' element={<Task />} />
            <Route path='/tarefas/editar/:taskId' element={<Task />} />
            <Route path='/membros' element={<Members />} />
            <Route path='/membros/editar/:memberId' element={<EditMember />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}