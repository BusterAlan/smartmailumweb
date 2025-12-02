import { useState } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import PacketModal from './components/PacketModal'
import mockData from './data/mock_data'
import { logCreate, logEdit, logDelete } from './utils/logger'

const { PAQUETERIAS, EMPLEADOS, TAMAÑOS, CONTENEDORES } = mockData

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [paquetes, setPaquetes] = useState([
    {
      num_guia: 'GU001',
      destinatario: 'Ana Martínez',
      paqueteria: 1,
      recibe: 1,
      tamaño: 2,
      contenedor: 1,
      remitente: 'Amazon MX',
      fecha_recib: '2024-11-28T10:30',
      fecha_entre: '',
      matric_entregado: ''
    }
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    num_guia: '',
    destinatario: '',
    paqueteria: '',
    recibe: '',
    tamaño: '',
    contenedor: '',
    remitente: '',
    fecha_recib: '',
    fecha_entre: '',
    matric_entregado: ''
  })

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true)
    } else {
      alert('Usuario o contraseña incorrectos. Use admin/admin')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername('')
    setPassword('')
  }

  const openModal = (index = null) => {
    if (index !== null) {
      setEditingIndex(index)
      setFormData(paquetes[index])
    } else {
      setEditingIndex(null)
      setFormData({
        num_guia: '',
        destinatario: '',
        paqueteria: '',
        recibe: '',
        tamaño: '',
        contenedor: '',
        remitente: '',
        fecha_recib: '',
        fecha_entre: '',
        matric_entregado: ''
      })
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingIndex(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingIndex !== null) {
      // Editar: mantener datos como están
      const before = paquetes[editingIndex]
      const updated = [...paquetes]
      // Ensure remitente has a sensible default if left empty
      const after = { ...formData, remitente: formData.remitente && formData.remitente.trim() !== '' ? formData.remitente : '(Desconocido)' }
      updated[editingIndex] = after
      setPaquetes(updated)
      logEdit(before, after, editingIndex)
    } else {
      // Crear: auto-llenar recibe y fecha_entre
      const empleadoId = EMPLEADOS.find(emp => emp.nombre === username)?.id || 1
      const ahora = new Date().toISOString().slice(0, 16) // Formato: YYYY-MM-DDTHH:mm

      const newPaquete = {
        ...formData,
        recibe: empleadoId,
        fecha_recib: ahora,
        remitente: formData.remitente && formData.remitente.trim() !== '' ? formData.remitente : '(Desconocido)'
      }
      setPaquetes([...paquetes, newPaquete])
      logCreate(newPaquete)
    }
    closeModal()
  }

  const handleDelete = (index) => {
    if (window.confirm('¿Estás seguro de eliminar este paquete?')) {
      const deleted = paquetes[index]
      setPaquetes(paquetes.filter((_, i) => i !== index))
      logDelete(deleted, index)
    }
  }

  if (!isLoggedIn) {
    return (
      <Login
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        onLogin={handleLogin}
      />
    )
  }

  return (
    <>
      <Dashboard
        paquetes={paquetes}
        onLogout={handleLogout}
        openModal={openModal}
        handleDelete={handleDelete}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        PAQUETERIAS={PAQUETERIAS}
        EMPLEADOS={EMPLEADOS}
        TAMAÑOS={TAMAÑOS}
        CONTENEDORES={CONTENEDORES}
      />

      {showModal && (
        <PacketModal
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onClose={closeModal}
          PAQUETERIAS={PAQUETERIAS}
          TAMAÑOS={TAMAÑOS}
          CONTENEDORES={CONTENEDORES}
          EMPLEADOS={EMPLEADOS}
          editingIndex={editingIndex}
          username={username}
        />
      )}
    </>
  )
}