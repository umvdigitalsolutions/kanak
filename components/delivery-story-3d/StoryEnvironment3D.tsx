import { useGLTF } from "@react-three/drei";
import { useMemo, type MutableRefObject } from "react";
import * as THREE from "three";

type StoryEnvironment3DProps = {
  modelPath: string;
  sceneRef: MutableRefObject<THREE.Group | null>;
};

function cloneSceneMaterial(material: THREE.Material): THREE.Material;
function cloneSceneMaterial(material: THREE.Material[]): THREE.Material[];
function cloneSceneMaterial(material: THREE.Material | THREE.Material[]): THREE.Material | THREE.Material[] {
  if (Array.isArray(material)) return material.map((item) => cloneSceneMaterial(item)) as THREE.Material[];
  return material.clone();
}

function createCenteredScene(source: THREE.Group) {
  const scene = source.clone(true);

  scene.traverse((object) => {
    const mesh = object as THREE.Mesh;
    if (!mesh.isMesh) return;

    mesh.material = Array.isArray(mesh.material)
      ? cloneSceneMaterial(mesh.material)
      : cloneSceneMaterial(mesh.material);
    mesh.castShadow = false;
    mesh.receiveShadow = true;
  });

  scene.updateWorldMatrix(true, true);

  const bounds = new THREE.Box3().setFromObject(scene);
  const center = bounds.getCenter(new THREE.Vector3());
  scene.position.sub(center);

  const group = new THREE.Group();
  group.add(scene);
  return group;
}

export function StoryEnvironment3D({
  modelPath,
  sceneRef,
}: StoryEnvironment3DProps) {
  const { scene } = useGLTF(modelPath);
  const centeredScene = useMemo(() => createCenteredScene(scene), [scene]);

  return (
    <group ref={sceneRef}>
      <primitive object={centeredScene} />
    </group>
  );
}
