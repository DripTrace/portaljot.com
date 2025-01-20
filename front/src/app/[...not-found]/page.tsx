// "use client";

// import React, { useRef } from "react";
// import Link from "next/link";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import {
// 	Sphere,
// 	Box,
// 	Torus,
// 	Tetrahedron,
// 	Dodecahedron,
// 	Icosahedron,
// 	Circle,
// 	OrbitControls,
// 	Plane,
// } from "@react-three/drei";
// import * as THREE from "three";
// import { useSpring, animated } from "@react-spring/three";

// // Helper function to create random positions
// const randomPosition = (): [number, number, number] => [
// 	Math.random() * 10 - 5,
// 	Math.random() * 10 - 5,
// 	Math.random() * 10 - 5,
// ];

// interface AnimatedShapeProps {
// 	geometry: JSX.Element;
// 	color: string;
// 	position: [number, number, number];
// 	spinning?: boolean;
// }

// const AnimatedShape: React.FC<AnimatedShapeProps> = ({
// 	geometry,
// 	color,
// 	position,
// 	spinning = true,
// }) => {
// 	const shapeRef = useRef<THREE.Mesh>(null);

// 	// Animation using react-spring
// 	const { scale } = useSpring({
// 		loop: true,
// 		from: { scale: 1 },
// 		to: [{ scale: 1.5 }, { scale: 1 }],
// 		config: { duration: 2000 },
// 	});

// 	useFrame(({ clock }) => {
// 		if (shapeRef.current && spinning) {
// 			shapeRef.current.rotation.x = clock.getElapsedTime() * 0.5;
// 			shapeRef.current.rotation.y = clock.getElapsedTime() * 0.5;
// 		}
// 	});

// 	return (
// 		<animated.mesh ref={shapeRef} position={position} scale={scale}>
// 			{geometry}
// 			<meshPhongMaterial
// 				color={color}
// 				emissive={color}
// 				emissiveIntensity={0.5}
// 			/>
// 		</animated.mesh>
// 	);
// };

// const ColorChangingSphere = () => {
// 	const sphereRef = useRef<THREE.Mesh>(null);
// 	const { clock } = useThree();

// 	useFrame(() => {
// 		if (sphereRef.current) {
// 			sphereRef.current.rotation.x =
// 				Math.sin(clock.getElapsedTime()) * 0.3;
// 			sphereRef.current.rotation.y =
// 				Math.cos(clock.getElapsedTime()) * 0.3;

// 			// Change color based on time
// 			const hue = (Math.sin(clock.getElapsedTime() * 0.1) + 1) / 2;
// 			const material = sphereRef.current
// 				.material as THREE.MeshPhongMaterial;
// 			material.color.setHSL(hue, 0.5, 0.5);
// 		}
// 	});

// 	return (
// 		<Sphere ref={sphereRef} args={[1, 64, 64]}>
// 			<meshPhongMaterial />
// 		</Sphere>
// 	);
// };

// const FlowerOfLife = () => {
// 	const groupRef = useRef<THREE.Group>(null);

// 	useFrame(({ clock }) => {
// 		if (groupRef.current) {
// 			groupRef.current.rotation.y = clock.getElapsedTime() * 0.2;
// 		}
// 	});

// 	const radius = 1;
// 	const circleCount = 7;
// 	const circles = [];
// 	for (let i = 0; i < circleCount; i++) {
// 		const angle = (i * Math.PI * 2) / circleCount;
// 		circles.push(
// 			<Circle
// 				key={i}
// 				args={[radius, 64]}
// 				position={[
// 					Math.cos(angle) * radius,
// 					Math.sin(angle) * radius,
// 					0,
// 				]}
// 			>
// 				<meshPhongMaterial
// 					color="#ffffff"
// 					emissive="#ffffff"
// 					emissiveIntensity={0.3}
// 				/>
// 			</Circle>
// 		);
// 	}

// 	return <group ref={groupRef}>{circles}</group>;
// };

// const BackgroundAnimation = () => {
// 	const planeRef = useRef<THREE.Mesh>(null);
// 	const { clock } = useThree();

// 	useFrame(() => {
// 		if (planeRef.current) {
// 			const material = planeRef.current.material as THREE.ShaderMaterial;
// 			material.uniforms.time.value = clock.getElapsedTime();
// 		}
// 	});

// 	return (
// 		<mesh ref={planeRef} position={[0, 0, -5]}>
// 			<planeGeometry args={[50, 50]} />
// 			<shaderMaterial
// 				uniforms={{
// 					time: { value: 0 },
// 					resolution: {
// 						value: new THREE.Vector2(
// 							window.innerWidth,
// 							window.innerHeight
// 						),
// 					},
// 				}}
// 				vertexShader={`
//           varying vec2 vUv;
//           void main() {
//             vUv = uv;
//             gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//           }
//         `}
// 				fragmentShader={`
//           uniform float time;
//           uniform vec2 resolution;
//           varying vec2 vUv;

//           void main() {
//             vec2 position = vUv * 2.0 - 1.0;
//             float r = length(position) * 2.0;
//             float a = atan(position.y, position.x);
//             float t = time * 0.1;

//             float f = abs(cos(a * 12.0 + r * 3.0 + t) * sin(a * 3.0 + r * 4.0 - t) * 0.5 + 0.5);

//             vec3 color = mix(
//               vec3(0.1, 0.1, 0.4),  // Dark blue
//               vec3(0.8, 0.2, 0.5),  // Pink
//               f
//             );

//             gl_FragColor = vec4(color, 1.0);
//           }
//         `}
// 			/>
// 		</mesh>
// 	);
// };

// const ProceduralTexture = () => {
// 	return (
// 		<Plane args={[5, 5]} position={randomPosition()}>
// 			<shaderMaterial
// 				vertexShader={`
//           varying vec2 vUv;
//           void main() {
//             vUv = uv;
//             gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//           }
//         `}
// 				fragmentShader={`
//           uniform float time;
//           varying vec2 vUv;

//           void main() {
//             vec2 uv = vUv;
//             float color = 0.0;
//             color += sin(uv.x * 10.0 + time) * 0.5 + 0.5;
//             color += sin(uv.y * 10.0 + time) * 0.5 + 0.5;
//             color *= 0.5;
//             gl_FragColor = vec4(vec3(color), 1.0);
//           }
//         `}
// 				uniforms={{
// 					time: { value: 0 },
// 				}}
// 			/>
// 		</Plane>
// 	);
// };

// const NotFoundPage: React.FC = () => {
// 	return (
// 		<div className="w-full h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden">
// 			<div className="absolute inset-0 z-0">
// 				<Canvas>
// 					<ambientLight intensity={0.5} />
// 					<pointLight position={[10, 10, 10]} />
// 					<BackgroundAnimation />
// 					<ColorChangingSphere />
// 					{/* Add multiple animated shapes including Platonic solids and sacred geometry */}
// 					<AnimatedShape
// 						geometry={<sphereGeometry args={[0.5, 32, 32]} />}
// 						color="#ff6347"
// 						position={randomPosition()}
// 					/>
// 					<AnimatedShape
// 						geometry={<boxGeometry args={[0.5, 0.5, 0.5]} />}
// 						color="#4682b4"
// 						position={randomPosition()}
// 					/>
// 					<AnimatedShape
// 						geometry={<torusGeometry args={[0.3, 0.1, 16, 100]} />}
// 						color="#32cd32"
// 						position={randomPosition()}
// 					/>
// 					<AnimatedShape
// 						geometry={<tetrahedronGeometry args={[0.5]} />}
// 						color="#ff6347"
// 						position={randomPosition()}
// 					/>
// 					<AnimatedShape
// 						geometry={<dodecahedronGeometry args={[0.5]} />}
// 						color="#4682b4"
// 						position={randomPosition()}
// 					/>
// 					<AnimatedShape
// 						geometry={<icosahedronGeometry args={[0.5]} />}
// 						color="#32cd32"
// 						position={randomPosition()}
// 					/>
// 					<AnimatedShape
// 						geometry={<FlowerOfLife />}
// 						color="#ffffff"
// 						position={randomPosition()}
// 						spinning={false}
// 					/>
// 					<ProceduralTexture />
// 					<OrbitControls enableZoom={false} enablePan={false} />
// 				</Canvas>
// 			</div>

// 			<div className="z-10 text-center">
// 				<h1 className="text-6xl font-bold mb-4 animate-bounce">404</h1>
// 				<p className="text-2xl mb-8">Oops! Page not found</p>
// 				<Link href="https://nexusconjure.com" legacyBehavior>
// 					<a className="px-4 py-2 bg-white text-black rounded-full font-bold hover:bg-opacity-80 transition-all duration-300">
// 						Return to NexusConjure
// 					</a>
// 				</Link>
// 			</div>
// 		</div>
// 	);
// };

// export default NotFoundPage;

import { notFound } from "next/navigation";

export default function NotFoundCatchAll() {
	notFound();
}
