import { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import truffleScene from "../assets/3d/truffle.glb";

const Truffle = ({ scale, position, rotation }) => {
  const truffleRef = useRef();
  const { scene, animations } = useGLTF(truffleScene);
  const { actions } = useAnimations(animations, truffleRef);

  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => action.play());
    }
  }, [actions]);

  return (
    <mesh ref={truffleRef} scale={scale} position={position} rotation={rotation}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Truffle;
