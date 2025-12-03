import { useState, useEffect } from 'react'
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

  // paquetes will be loaded from remote endpoint (JSON) on mount
  const [paquetes, setPaquetes] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)

  useEffect(() => {
    const endpoint = 'http://10.4.22.8:3000/api/paquetes'
    setLoading(true)
    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        // store the JSON as-is (no mapping/formatting)
        if (Array.isArray(data)) setPaquetes(data)
        else console.warn('Expected array from API, got:', data)
        setLoadError(null)
      })
      .catch((err) => {
        console.error('Failed to load paquetes from endpoint', err)
        setLoadError(err.message || String(err))
      })
      .finally(() => setLoading(false))
  }, [])

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