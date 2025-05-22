import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './assets/styles/Login.css';

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Email:', email)
    console.log('Password:', password)

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login exitoso');
        console.log(data.user);  // aquí tienes acceso a los datos del usuario
        navigate('/inicio');
      } else {
        alert(data.message || 'Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al hacer login:', error);
      alert('Error de conexión con el servidor');
    }
  }

  return (
    <div className='container'>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label><br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Contraseña:</label><br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
