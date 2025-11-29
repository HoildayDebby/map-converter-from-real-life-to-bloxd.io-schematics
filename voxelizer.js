export function voxelizeModel(model, size = 1) {
  const voxels = [];

  model.traverse(obj => {
    if (obj.isMesh) {
      const geo = obj.geometry.clone();
      geo.applyMatrix4(obj.matrixWorld);
      geo.computeBoundingBox();

      const box = geo.boundingBox;
      for (let x = box.min.x; x < box.max.x; x += size) {
        for (let y = box.min.y; y < box.max.y; y += size) {
          for (let z = box.min.z; z < box.max.z; z += size) {
            voxels.push({
              x: Math.round(x),
              y: Math.round(y),
              z: Math.round(z),
              block: "Stone"
            });
          }
        }
      }
    }
  });

  return voxels;
}
