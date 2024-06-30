import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Register from './pages/Register';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import { Toaster } from 'sonner';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/welcome' element={<Welcome />}/>
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
