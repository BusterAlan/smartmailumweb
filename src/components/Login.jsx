import React from 'react'
import { Package } from 'lucide-react'

export default function Login({ username, password, setUsername, setPassword, onLogin }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Package className="w-16 h-16 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Sistema de Paquetería</h1>
        <p className="text-center text-gray-600 mb-8">Universidad</p>

        <div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu usuario"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu contraseña"
            />
          </div>

          <button
            onClick={onLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  )
}
