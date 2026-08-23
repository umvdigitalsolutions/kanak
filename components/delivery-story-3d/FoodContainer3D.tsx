import { useGLTF } from "@react-three/drei";
import { useMemo, type MutableRefObject } from "react";
import * as THREE from "three";

type FoodContainer3DProps = {
  containerRef: MutableRefObject<THREE.Group | null>;
  foodRef: MutableRefObject<THREE.Group | null>;
  lidRef: MutableRefObject<THREE.Group | null>;
  sealRef: MutableRefObject<THREE.Group | null>;
};

type ContainerParts = {
  base: THREE.Group;
  food: THREE.Group;
  lid: THREE.Group;
};

const MODEL_PATH = "/Models/container.glb";
const MODEL_SCALE = 15;

type TunableMaterial = THREE.Material & {
  color?: THREE.Color;
  metalness?: number;
  roughness?: number;
};

function cloneMaterial(material: THREE.Material): THREE.Material;
function cloneMaterial(material: THREE.Material[]): THREE.Material[];
function cloneMaterial(material: THREE.Material | THREE.Material[]): THREE.Material | THREE.Material[] {
  if (Array.isArray(material)) return material.map((item) => cloneMaterial(item)) as THREE.Material[];

  const cloned = material.clone() as TunableMaterial;
  const name = cloned.name.toLowerCase();
  const isClearLid = name.includes("clear") || name.includes("transparent") || name.includes("pet_lid");
  const isBlackContainer = name.includes("black") || name.includes("container_base");

  if (isBlackContainer) {
    cloned.color?.set("#050706");
    cloned.roughness = 0.36;
    cloned.metalness = 0.02;
  }

  if (isClearLid) {
    cloned.transparent = true;
    cloned.depthWrite = false;
    cloned.opacity = Math.min(cloned.opacity, 0.42);

    cloned.roughness = 0.04;
    cloned.metalness = 0;
    cloned.side = THREE.DoubleSide;
  }

  return cloned;
}

function targetGroupForName(name: string, parts: ContainerParts) {
  const normalized = name.toLowerCase();
  if (normalized.includes("lid") || normalized.includes("snap")) return parts.lid;
  if (
    normalized.includes("food") ||
    normalized.includes("garnish") ||
    normalized.includes("noodle") ||
    normalized.includes("broccoli") ||
    normalized.includes("pepper") ||
    normalized.includes("carrot") ||
    normalized.includes("onion")
  ) {
    return parts.food;
  }

  return parts.base;
}

function cloneContainerParts(scene: THREE.Group): ContainerParts {
  const parts = {
    base: new THREE.Group(),
    food: new THREE.Group(),
    lid: new THREE.Group(),
  };
  const bounds = new THREE.Box3().setFromObject(scene);
  const center = bounds.getCenter(new THREE.Vector3());

  scene.updateWorldMatrix(true, true);

  scene.traverse((object) => {
    const mesh = object as THREE.Mesh;
    if (!mesh.isMesh) return;

    const cloned = mesh.clone(false);
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();

    mesh.updateWorldMatrix(true, false);
    mesh.matrixWorld.decompose(position, quaternion, scale);
    position.sub(center);

    cloned.geometry = mesh.geometry;
    cloned.material = Array.isArray(mesh.material)
      ? cloneMaterial(mesh.material)
      : cloneMaterial(mesh.material);
    cloned.position.copy(position);
    cloned.quaternion.copy(quaternion);
    cloned.scale.copy(scale);
    cloned.castShadow = true;
    cloned.receiveShadow = true;

    targetGroupForName(mesh.name, parts).add(cloned);
  });

  return parts;
}

export function FoodContainer3D({
  containerRef,
  foodRef,
  lidRef,
  sealRef,
}: FoodContainer3DProps) {
  const { scene } = useGLTF(MODEL_PATH);
  const parts = useMemo(() => cloneContainerParts(scene), [scene]);

  return (
    <group ref={containerRef}>
      <primitive object={parts.base} scale={MODEL_SCALE} />
      <group ref={foodRef}>
        <primitive object={parts.food} scale={MODEL_SCALE} />
      </group>
      <group ref={lidRef}>
        <primitive object={parts.lid} scale={MODEL_SCALE} />
      </group>
      <group ref={sealRef} />
    </group>
  );
}

useGLTF.preload(MODEL_PATH);
