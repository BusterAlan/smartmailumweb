import { useState } from 'react';
import { Trash2, Edit2, Plus, Package, LogOut, Search } from 'lucide-react';
import { PAQUETERIAS, EMPLEADOS, TAMAÑOS, CONTENEDORES } from './data/mock_data'

export default function DashboardPaquetes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
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
  });

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const openModal = (index = null) => {
    if (index !== null) {
      setEditingIndex(index);
      setFormData(paquetes[index]);
    } else {
      setEditingIndex(null);
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
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingIndex(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updated = [...paquetes];
      updated[editingIndex] = formData;
      setPaquetes(updated);
    } else {
      setPaquetes([...paquetes, formData]);
    }
    closeModal();
  };

  const handleDelete = (index) => {
    if (window.confirm('¿Estás seguro de eliminar este paquete?')) {
      setPaquetes(paquetes.filter((_, i) => i !== index));
    }
  };

  const filteredPaquetes = paquetes.filter(p => 
    p.num_guia.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.destinatario.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.remitente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getNombre = (id, array) => {
    const item = array.find(i => i.id === parseInt(id));
    return item ? item.nombre : '-';
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
          <div className="flex justify-center mb-6">
            <Package className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Sistema de Paquetería
          </h1>
          <p className="text-center text-gray-600 mb-8">Universidad</p>
          
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Usuario
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && username === 'admin' && password === 'admin') {
                    setIsLoggedIn(true);
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa tu usuario"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && username === 'admin' && password === 'admin') {
                    setIsLoggedIn(true);
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa tu contraseña"
              />
            </div>
            
            <button
              onClick={() => {
                if (username === 'admin' && password === 'admin') {
                  setIsLoggedIn(true);
                } else {
                  alert('Usuario o contraseña incorrectos. Use admin/admin');
                }
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Gestión de Paquetes</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Toolbar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por guía, destinatario o remitente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Nuevo Paquete
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Guía</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Destinatario</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Paquetería</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Recibió</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tamaño</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Contenedor</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Remitente</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Fecha Recib.</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPaquetes.map((paquete, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition duration-150">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{paquete.num_guia}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{paquete.destinatario}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{getNombre(paquete.paqueteria, PAQUETERIAS)}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{getNombre(paquete.recibe, EMPLEADOS)}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{getNombre(paquete.tamaño, TAMAÑOS)}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{getNombre(paquete.contenedor, CONTENEDORES)}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{paquete.remitente || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {paquete.fecha_recib ? new Date(paquete.fecha_recib).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openModal(index)}
                          className="text-blue-600 hover:text-blue-800 transition duration-150"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="text-red-600 hover:text-red-800 transition duration-150"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredPaquetes.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No se encontraron paquetes
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {editingIndex !== null ? 'Editar Paquete' : 'Nuevo Paquete'}
              </h2>
              
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Número de Guía *
                    </label>
                    <input
                      type="text"
                      value={formData.num_guia}
                      onChange={(e) => setFormData({...formData, num_guia: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Destinatario *
                    </label>
                    <input
                      type="text"
                      value={formData.destinatario}
                      onChange={(e) => setFormData({...formData, destinatario: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Paquetería *
                    </label>
                    <select
                      value={formData.paqueteria}
                      onChange={(e) => setFormData({...formData, paqueteria: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar...</option>
                      {PAQUETERIAS.map(p => (
                        <option key={p.id} value={p.id}>{p.nombre}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Empleado que Recibe *
                    </label>
                    <select
                      value={formData.recibe}
                      onChange={(e) => setFormData({...formData, recibe: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar...</option>
                      {EMPLEADOS.map(e => (
                        <option key={e.id} value={e.id}>{e.nombre}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Tamaño
                    </label>
                    <select
                      value={formData.tamaño}
                      onChange={(e) => setFormData({...formData, tamaño: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar...</option>
                      {TAMAÑOS.map(t => (
                        <option key={t.id} value={t.id}>{t.nombre}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Contenedor
                    </label>
                    <select
                      value={formData.contenedor}
                      onChange={(e) => setFormData({...formData, contenedor: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar...</option>
                      {CONTENEDORES.map(c => (
                        <option key={c.id} value={c.id}>{c.nombre}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Remitente
                    </label>
                    <input
                      type="text"
                      value={formData.remitente}
                      onChange={(e) => setFormData({...formData, remitente: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Fecha de Recepción *
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.fecha_recib}
                      onChange={(e) => setFormData({...formData, fecha_recib: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Fecha de Entrega
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.fecha_entre}
                      onChange={(e) => setFormData({...formData, fecha_entre: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Matrícula Entregado
                    </label>
                    <input
                      type="text"
                      value={formData.matric_entregado}
                      onChange={(e) => setFormData({...formData, matric_entregado: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
                  >
                    {editingIndex !== null ? 'Actualizar' : 'Guardar'}
                  </button>
                  <button
                    onClick={closeModal}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition duration-200"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}