export function getNombre(id, array) {
  const item = array.find(i => i.id === parseInt(id));
  return item ? item.nombre : '-';
}
