import React from 'react'
import { Trash2, Edit2, Plus, Package, LogOut, Search } from 'lucide-react'
import { getNombre } from '../utils/helpers'

export default function Dashboard({
  paquetes,
  onLogout,
  openModal,
  handleDelete,
  searchTerm,
  setSearchTerm,
  PAQUETERIAS,
  EMPLEADOS,
  TAMAÑOS,
  CONTENEDORES
}) {
  const filteredPaquetes = paquetes.filter(p => 
    p.num_guia.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.destinatario.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.remitente.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Gestión de Paquetes</h1>
          </div>
          <button onClick={onLogout} className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"><LogOut className="w-4 h-4"/>Cerrar Sesión</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
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
          <button onClick={() => openModal()} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200 whitespace-nowrap"><Plus className="w-5 h-5"/>Nuevo Paquete</button>
        </div>

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
                    <td className="px-4 py-3 text-sm text-gray-700">{paquete.fecha_recib ? new Date(paquete.fecha_recib).toLocaleDateString() : '-'}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex gap-2">
                        <button onClick={() => openModal(index)} className="text-blue-600 hover:text-blue-800 transition duration-150"><Edit2 className="w-4 h-4"/></button>
                        <button onClick={() => handleDelete(index)} className="text-red-600 hover:text-red-800 transition duration-150"><Trash2 className="w-4 h-4"/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredPaquetes.length === 0 && (
            <div className="text-center py-12 text-gray-500">No se encontraron paquetes</div>
          )}
        </div>
      </main>
    </div>
  )
}
