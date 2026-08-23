"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { FoodContainer3D } from "@/components/delivery-story-3d/FoodContainer3D";
import { clamp01, mix, smoothRange } from "@/components/delivery-story-3d/storyProgress";

type DeliverySceneCanvasProps = {
  pointerRef?: MutableRefObject<{
    x: number;
    y: number;
  }>;
  progressRef: MutableRefObject<number>;
  reducedMotion?: boolean;
};

const productA = new THREE.Vector3();
const productB = new THREE.Vector3();

function setOpacity(object: THREE.Object3D | null, opacity: number) {
  if (!object) return;
  object.visible = opacity > 0.01;
  object.traverse((child) => {
    const mesh = child as THREE.Mesh;
    const material = mesh.material;
    if (!material) return;

    const materials = Array.isArray(material) ? material : [material];
    for (const item of materials) {
      const baseOpacity =
        typeof item.userData.deliveryBaseOpacity === "number"
          ? item.userData.deliveryBaseOpacity
          : item.opacity;
      const baseTransparent =
        typeof item.userData.deliveryBaseTransparent === "boolean"
          ? item.userData.deliveryBaseTransparent
          : item.transparent;

      item.userData.deliveryBaseOpacity = baseOpacity;
      item.userData.deliveryBaseTransparent = baseTransparent;
      item.opacity = baseOpacity * opacity;
      item.transparent = baseTransparent || item.opacity < 0.995;
      item.depthWrite = item.opacity > 0.86;
    }
  });
}

function setLerpedVector(target: THREE.Vector3, from: THREE.Vector3, to: THREE.Vector3, t: number) {
  target.set(mix(from.x, to.x, t), mix(from.y, to.y, t), mix(from.z, to.z, t));
}

function tuneCameraForViewport(camera: THREE.PerspectiveCamera, width: number, height: number) {
  const portrait = width < height;
  camera.fov = portrait ? 43 : width < 900 ? 40 : 36;
  camera.updateProjectionMatrix();
}

function productPosition(progress: number, target: THREE.Vector3) {
  productA.set(0.18, 0.76, 0.04);
  productB.set(0, 1.02, 0);
  setLerpedVector(target, productA, productB, smoothRange(progress, 0.78, 1));
}

function productScale(progress: number, width: number, height: number) {
  const portrait = width < height;
  const finalIn = smoothRange(progress, 0.78, 1);
  return mix(portrait ? 0.3 : 0.36, portrait ? 0.44 : 0.64, finalIn);
}

function productOpacity(progress: number) {
  return smoothRange(progress, 0.74, 0.86);
}

export function DeliverySceneCanvas({
  pointerRef,
  progressRef,
  reducedMotion = false,
}: DeliverySceneCanvasProps) {
  const containerRef = useRef<THREE.Group | null>(null);
  const lidRef = useRef<THREE.Group | null>(null);
  const foodRef = useRef<THREE.Group | null>(null);
  const sealRef = useRef<THREE.Group | null>(null);
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);
  const productLightRef = useRef<THREE.PointLight | null>(null);
  const scratchRef = useRef({
    cameraLook: new THREE.Vector3(0, 0.68, 0),
    cameraPosition: new THREE.Vector3(0, 1.76, 4.3),
    pointerX: 0,
    pointerY: 0,
    product: new THREE.Vector3(),
  });

  useFrame((state) => {
    const camera = state.camera as THREE.PerspectiveCamera;
    const scratch = scratchRef.current;
    const progress = reducedMotion ? 1 : clamp01(progressRef.current);
    const finalHero = smoothRange(progress, 0.78, 1);
    const portrait = state.size.width < state.size.height;
    const pointer = pointerRef?.current ?? { x: 0, y: 0 };

    scratch.pointerX = mix(scratch.pointerX, pointer.x, 0.06);
    scratch.pointerY = mix(scratch.pointerY, pointer.y, 0.06);

    tuneCameraForViewport(camera, state.size.width, state.size.height);

    productPosition(progress, scratch.product);

    if (containerRef.current) {
      const scale = productScale(progress, state.size.width, state.size.height);
      const opacity = productOpacity(progress);
      containerRef.current.position.copy(scratch.product);
      containerRef.current.rotation.set(
        mix(0.035, 0.02, finalHero),
        mix(-0.21, 0.28, finalHero) + scratch.pointerX * 0.08 * Math.max(0.35, finalHero),
        mix(0, -0.02, finalHero),
      );
      containerRef.current.scale.setScalar(scale);
      setOpacity(containerRef.current, opacity);
    }

    if (lidRef.current) {
      lidRef.current.position.y = 0;
      lidRef.current.rotation.x = 0;
      lidRef.current.rotation.z = 0;
      setOpacity(lidRef.current, productOpacity(progress));
    }

    if (foodRef.current) {
      foodRef.current.scale.setScalar(1);
    }

    if (sealRef.current) {
      sealRef.current.visible = false;
    }

    camera.position.set(
      mix(0.08, 0.12, finalHero) + scratch.pointerX * 0.08,
      mix(1.58, 1.84, finalHero) - scratch.pointerY * 0.04,
      mix(4.22, 3.65, finalHero),
    );
    scratch.cameraLook.set(
      mix(0.12, 0, finalHero) + scratch.pointerX * 0.04,
      mix(0.5, 0.72, finalHero) - scratch.pointerY * 0.025,
      0,
    );
    camera.lookAt(scratch.cameraLook);

    if (keyLightRef.current) {
      keyLightRef.current.intensity = mix(2.2, 3.2, finalHero);
      keyLightRef.current.position.set(mix(-3.4, -1.6, finalHero), 5.5, mix(3.8, 3.2, finalHero));
    }

    if (productLightRef.current) {
      productLightRef.current.position.copy(scratch.product);
      productLightRef.current.position.y += 1.25;
      productLightRef.current.position.z += 1.2;
      productLightRef.current.intensity = 0.55 + finalHero * 2.4;
    }
  });

  return (
    <>
      <ambientLight intensity={0.9} />
      <hemisphereLight color="#fff7df" groundColor="#65706b" intensity={0.72} />
      <directionalLight
        castShadow
        color="#fff3d1"
        intensity={2.2}
        position={[-3.4, 5.5, 3.8]}
        ref={keyLightRef}
        shadow-bias={-0.0004}
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
      />
      <pointLight color="#fcb813" distance={5} intensity={1.2} ref={productLightRef} />
      <pointLight color="#ffffff" distance={6} intensity={0.8} position={[2, 2.7, 3.2]} />

      <FoodContainer3D
        containerRef={containerRef}
        foodRef={foodRef}
        lidRef={lidRef}
        sealRef={sealRef}
      />
    </>
  );
}
