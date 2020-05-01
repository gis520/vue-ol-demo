export function getLayersById(id) {
  const layers = window.map.getLayers().getArray();
  const result = layers.filter((layer) => layer.getProperties('id').id === id);
  return result[0];
}
