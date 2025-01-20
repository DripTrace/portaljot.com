"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Text } from "@react-three/drei";
import * as THREE from "three";

const Cube = ({
    position,
    color,
    text,
}: {
    position: [number, number, number];
    color: string;
    text: string;
}) => {
    const meshRef = useRef<THREE.Mesh>(null!);
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.2;
        }
    });

    return (
        <group position={position}>
            <Box ref={meshRef} args={[1, 1, 1]}>
                <meshStandardMaterial color={color} />
            </Box>
            <Text
                position={[0, 0, 0.6]}
                fontSize={0.2}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                {text}
            </Text>
        </group>
    );
};

const ThreeDVisualizationInner: React.FC = () => {
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const handleError = (event: ErrorEvent) => {
            console.error("WebGL Error:", event.error);
            setError(event.error);
        };

        window.addEventListener("error", handleError);

        return () => {
            window.removeEventListener("error", handleError);
        };
    }, []);

    if (error) {
        throw error;
    }

    return (
        <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Cube position={[-1.5, 0, 0]} color="#1FABC7" text="Clinical" />
            <Cube position={[0, 1.5, 0]} color="#6EA4CE" text="Research" />
            <Cube position={[1.5, 0, 0]} color="#0C3C60" text="Housing" />
            <Cube position={[0, -1.5, 0]} color="#D1E0EB" text="Philanthropy" />
        </Canvas>
    );
};

export default ThreeDVisualizationInner;
