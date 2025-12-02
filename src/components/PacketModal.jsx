export default function PacketModal({
  formData,
  setFormData,
  onSubmit,
  onClose,
  PAQUETERIAS,
  TAMAÑOS,
  CONTENEDORES,
  editingIndex,
  username
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{editingIndex !== null ? 'Editar Paquete' : 'Nuevo Paquete'}</h2>

          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Número de Guía *</label>
                <input
                  type="text"
                  value={formData.num_guia}
                  onChange={(e) => setFormData({...formData, num_guia: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Destinatario *</label>
                <input
                  type="text"
                  value={formData.destinatario}
                  onChange={(e) => setFormData({...formData, destinatario: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Paquetería *</label>
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
                <label className="block text-sm font-semibold text-gray-700 mb-1">Empleado que Recibe</label>
                <input
                  type="text"
                  value={username}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Tamaño</label>
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

              {/* TODO: Contenedor del formulario de creación */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Contenedor</label>
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
                <label className="block text-sm font-semibold text-gray-700 mb-1">Remitente</label>
                <input
                  type="text"
                  value={formData.remitente}
                  onChange={(e) => setFormData({...formData, remitente: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {editingIndex !== null && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha de Entrega</label>
                    <input
                      type="datetime-local"
                      value={formData.fecha_entre}
                      onChange={(e) => setFormData({...formData, fecha_entre: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Matrícula Entregado</label>
                    <input
                      type="text"
                      value={formData.matric_entregado}
                      onChange={(e) => setFormData({...formData, matric_entregado: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

            </div>

            <div className="flex gap-3 mt-6">
              <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200">{editingIndex !== null ? 'Actualizar' : 'Guardar'}</button>
              <button type="button" onClick={onClose} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition duration-200">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
