import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Home } from './pages/Home'
import { Header } from './components/header/header'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route element={<Header />}>
          <Route path='/home' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}