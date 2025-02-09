import React, { useEffect, useState, Suspense } from "react";
import Robot from "../models/Robot";
import Loader from "../components/Loader";
import { Canvas } from "@react-three/fiber";

const Projects = () => {
  const [robotScale, setRobotScale] = useState([5, 5, 5]);
  const [robotPosition, setRobotPosition] = useState([0, -1, 0]);
  const animationSpeed = 3.5;

  useEffect(() => {
    const updateRobotSize = () => {
      if (window.innerWidth < 768) {
        setRobotScale([6, 6, 6]);
        setRobotPosition([0, -2, -1]);
      } else {
        setRobotScale([10, 10, 10]);
        setRobotPosition([2, -0.5, -7]);
      }
    };

    updateRobotSize();
    window.addEventListener("resize", updateRobotSize);
    return () => window.removeEventListener("resize", updateRobotSize);
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50, near: 0.1, far: 1000 }}
        className="absolute top-0 left-0 w-full h-full"
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[0, 0, 1]} intensity={1.5} />
          <ambientLight intensity={1.5} />
          <Robot
            scale={robotScale}
            position={robotPosition}
            rotation={[0, 1, 0]}
            speed={animationSpeed}
          />
        </Suspense>
      </Canvas>

      
      <div className="absolute left-8 sm:left-10 md:left-20 top-1/2 transform -translate-y-1/2 text-left p-4">
        <h1 className="text-3xl sm:text-5xl font-bold drop-shadow-md stroke stroke-white blue-gradient_text">
          My Projects
        </h1>
        <p className="mt-4 text-base sm:text-lg max-w-md stroke stroke-white  text-white">
          Motivated Computer Science undergraduate with strong academic
          performance. Passionate about MERN Stack development, Machine
          Learning, and Data Science. Proven problem-solving skills,
          adaptability, and leadership in team projects.
        </p>
        <div className="mt-6 flex flex-col space-y-4  text-white">
          <a href="https://github.com/Manab-Bairagi/Cinematic_Explorer" target="_blank" rel="noopener noreferrer">
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition relative overflow-hidden before:absolute before:inset-0 before:bg-blue-400 before:opacity-0 before:transition-opacity-80 before:duration-300 hover:before:opacity">
              Movie Recommendation System using Flask API and React. 
            </button>
          </a>
          <a href="https://github.com/barmaanurag/UEMS--MERN" target="_blank" rel="noopener noreferrer">
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition relative overflow-hidden before:absolute before:inset-0 before:bg-blue-400 before:opacity-0 before:transition-opacity-80 before:duration-300 hover:before:opacity">
              University Exam Management System (MERN Stack)
            </button>
          </a>
          <a href="https://your-ecommerce-app-link.com" target="_blank" rel="noopener noreferrer">
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition relative overflow-hidden before:absolute before:inset-0 before:bg-blue-400 before:opacity-0 before:transition-opacity-80 before:duration-300 hover:before:opacity">
              3D Portfolio using React,Tailwind & Three.js
            </button>
          </a>
        </div>
      </div>


    </section>
  );
};

export default Projects;
