import React, { useEffect, useState, Suspense } from "react";
import { skills } from "../constants";
import Truffle from "../models/Truffle";
import Loader from "../components/Loader";
import { Canvas } from "@react-three/fiber";

import { motion } from "framer-motion";
import backgroundImg from "../assets/images/background.jpeg";

const About = () => {
  const [truffleScreenScale, setTruffleScreenScale] = useState([5, 5, 5]);
  const [truffleScreenPosition, setTruffleScreenPosition] = useState([
    2, -1, 0,
  ]);

  useEffect(() => {
    const updateTruffleSize = () => {
      if (window.innerWidth < 768) {
        setTruffleScreenScale([3, 3, 3]);
        setTruffleScreenPosition([0, -2.5, -1]);
      } else {
        setTruffleScreenScale([4, 4, 4]);
        setTruffleScreenPosition([0, -3, -2.5]);
      }
    };

    updateTruffleSize();
    window.addEventListener("resize", updateTruffleSize);
    return () => window.removeEventListener("resize", updateTruffleSize);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-white px-4 sm:px-6 md:px-8">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-[-1]"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative max-w-6xl mx-auto px-6 pt-20 text-center sm:text-left">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-6">
          <div className="w-full md:max-w-[50%] text-white">
            <h1 className="head-text text-2xl sm:text-4xl">
              Hello, I'm{" "}
              <span className="blue-gradient_text font-semibold drop-shadow-md">
                Manab
              </span>
            </h1>
            <p className="mt-4 text-sm sm:text-base leading-relaxed">
              Motivated Computer Science undergraduate with strong academic
              performance. Passionate about MERN Stack development, Machine
              Learning, and Data Science with strong DSA knowledge. Proven
              problem-solving skills, adaptability, and leadership in team
              projects. Skilled in building innovative solutions using modern
              technologies and frameworks.
            </p>
          </div>

          <div className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] lg:w-[400px] lg:h-[400px]">
            <Canvas
              camera={{
                position: [0, 0, 5],
                fov: 45,
                near: 0.1,
                far: 1000,
              }}
            >
              <Suspense fallback={<Loader />}>
                <directionalLight position={[0, 0, 1]} intensity={2} />
                <ambientLight intensity={1} />
                <Truffle
                  scale={truffleScreenScale}
                  position={truffleScreenPosition}
                  rotation={[0, -0.3, 0]}
                />
                
              </Suspense>
            </Canvas>
          </div>
        </div>

        <div className="py-10 flex flex-col gap-4 text-white">
          <h2 className="subhead-text text-xl sm:text-2xl">My Skills</h2>

          <div className="mt-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 justify-center items-center">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="block-container w-16 h-16 sm:w-20 sm:h-20 flex flex-wrap justify-center items-center"
                animate={{ y: ["0%", "-10%", "0%"], rotate: [0, 5, -5, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: index * 0.2,
                }}
              >
                <div className="btn-back rounded-xl" />
                <div className="btn-front rounded-xl flex justify-center items-center">
                  <img
                    src={skill.imageUrl}
                    alt={skill.name}
                    className="w-1/2 h-1/2 object-contain"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
