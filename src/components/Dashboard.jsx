import { Trash2, Edit2, Plus, Package, LogOut, Search, Calendar, X } from 'lucide-react'
import { getNombre } from '../utils/helpers'
import { useState } from 'react'

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
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')
  const [busquedaNombre, setBusquedaNombre] = useState('')

  const limpiarFiltros = () => {
    setSearchTerm('')
    setFechaInicio('')
    setFechaFin('')
    setBusquedaNombre('')
  }

  const filteredPaquetes = paquetes.filter(p => {
    // Filtro por número de guía
    const matchGuia = p.num_guia.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Filtro por nombre destinatario
    const matchNombre = p.destinatario.toLowerCase().includes(busquedaNombre.toLowerCase())
    
    // Filtro por rango de fechas
    let matchFecha = true
    if (fechaInicio || fechaFin) {
      const fechaPaquete = new Date(p.fecha_recib)
      
      if (fechaInicio && fechaFin) {
        // Rango de fechas
        const inicio = new Date(fechaInicio)
        const fin = new Date(fechaFin)
        fin.setHours(23, 59, 59, 999) // Incluir todo el día final
        matchFecha = fechaPaquete >= inicio && fechaPaquete <= fin
      } else if (fechaInicio) {
        // Solo fecha inicio (desde esa fecha en adelante)
        const inicio = new Date(fechaInicio)
        matchFecha = fechaPaquete >= inicio
      } else if (fechaFin) {
        // Solo fecha fin (hasta esa fecha)
        const fin = new Date(fechaFin)
        fin.setHours(23, 59, 59, 999)
        matchFecha = fechaPaquete <= fin
      }
    }

    return matchGuia && matchNombre && matchFecha
  })

  const hayFiltrosActivos = searchTerm || fechaInicio || fechaFin || busquedaNombre

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Gestión de Paquetes</h1>
          </div>
          <button 
            onClick={onLogout} 
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
          >
            <LogOut className="w-4 h-4"/>
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Panel de Filtros */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Search className="w-5 h-5" />
              Filtros de Búsqueda
            </h2>
            {hayFiltrosActivos && (
              <button
                onClick={limpiarFiltros}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition duration-200"
              >
                <X className="w-4 h-4" />
                Limpiar filtros
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Filtro por Número de Guía */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Número de Guía
              </label>
              <input
                type="text"
                placeholder="Ej: GU001"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filtro por Nombre Destinatario */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre Destinatario
              </label>
              <input
                type="text"
                placeholder="Ej: Ana Martínez"
                value={busquedaNombre}
                onChange={(e) => setBusquedaNombre(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filtro Fecha Inicio */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Fecha Inicio
              </label>
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filtro Fecha Fin */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Fecha Fin
              </label>
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Indicador de resultados */}
          <div className="mt-4 text-sm text-gray-600">
            Mostrando <span className="font-semibold text-blue-600">{filteredPaquetes.length}</span> de{' '}
            <span className="font-semibold">{paquetes.length}</span> paquetes
          </div>
        </div>

        {/* Botón Nuevo Paquete */}
        <div className="mb-6 flex justify-end">
          <button 
            onClick={() => openModal()} 
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-200 shadow-md"
          >
            <Plus className="w-5 h-5"/>
            Nuevo Paquete
          </button>
        </div>

        {/* Tabla */}
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
                    <td className="px-4 py-3 text-sm text-gray-700">{paquete.remitente || '(Desconocido)'}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {paquete.fecha_recib ? new Date(paquete.fecha_recib).toLocaleDateString('es-MX') : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => openModal(index)} 
                          className="text-blue-600 hover:text-blue-800 transition duration-150"
                        >
                          <Edit2 className="w-4 h-4"/>
                        </button>
                        <button 
                          onClick={() => handleDelete(index)} 
                          className="text-red-600 hover:text-red-800 transition duration-150"
                        >
                          <Trash2 className="w-4 h-4"/>
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
              {hayFiltrosActivos 
                ? 'No se encontraron paquetes con los filtros aplicados' 
                : 'No hay paquetes registrados'}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}