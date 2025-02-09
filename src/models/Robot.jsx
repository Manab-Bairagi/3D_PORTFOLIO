import { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import robotScene from "../assets/3d/robot.glb";

const Robot  = ({ scale, position, rotation, speed  }) => { 
  const robotRef = useRef();
  const { scene, animations } = useGLTF(robotScene);
  const { actions } = useAnimations(animations, robotRef);

  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => {
        action.play();
        action.timeScale = speed; 
      });
    }
  }, [actions, speed]); 

  return (
    <mesh ref={robotRef} scale={scale} position={position} rotation={rotation}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Robot;