import React, { useState, useEffect } from "react";
import { Box, Button, Heading } from "@chakra-ui/react";

const SPIN_DURATION = 5; // duration of the spin animation in seconds

const Index = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const numbers = [0, 5, 12, 3, 10, 1, 8, 9, 2, 7, 6, 11, 4];

  useEffect(() => {
    if (!isSpinning) return;

    const timeout = setTimeout(() => {
      setIsSpinning(false);
      setResult(numbers[Math.floor(Math.random() * numbers.length)]);
    }, SPIN_DURATION * 1000);

    return () => clearTimeout(timeout);
  }, [isSpinning]);

  return (
    <Box textAlign="center">
      <Heading as="h1" size="xl" mb={8}>
        Roulette Wheel
      </Heading>

      <Box position="relative" w={400} h={400} mx="auto">
        <Box as="svg" viewBox="-1 -1 2 2" w="100%" h="100%">
          <defs>
            <radialGradient id="roulette-gradient">
              <stop offset="0%" stopColor="#333" />
              <stop offset="100%" stopColor="#111" />
            </radialGradient>
          </defs>
          <circle cx="0" cy="0" r="0.98" fill="url(#roulette-gradient)" stroke="#222" strokeWidth="0.04" />
          {numbers.map((num, i) => {
            const angle = (i / numbers.length) * Math.PI * 2 - Math.PI / 2;
            const color = num === 0 ? "green" : num % 2 === 1 ? "red" : "black";
            return (
              <g key={num} transform={`rotate(${(angle * 180) / Math.PI})`}>
                <path d="M 0 0.1 A 0.9 0.9 0 0 1 0 -0.1" fill={color} />
                <text x="0.7" y="0.08" textAnchor="middle" fill="white" fontSize="0.2" transform="rotate(90)">
                  {num}
                </text>
              </g>
            );
          })}
        </Box>
        <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%) rotate(0deg)" transition={`transform ${SPIN_DURATION}s cubic-bezier(.2,.8,.6,1)`} transform-origin="center" style={{ transform: isSpinning ? `rotate(1440deg)` : undefined }}>
          <Box as="svg" viewBox="-1 -1 2 2" w={300} h={300}>
            <polygon points="0,-0.2 0.2,0 0,0.8" fill="gold" stroke="black" strokeWidth="0.02" />
          </Box>
        </Box>
        <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -200%)" bgColor="white" borderRadius={4} px={4} py={2} opacity={result !== null ? 1 : 0} transition="opacity 0.5s">
          {result}
        </Box>
      </Box>

      <Button mt={8} colorScheme="green" onClick={() => setIsSpinning(true)} disabled={isSpinning}>
        {isSpinning ? "Spinning..." : "Spin"}
      </Button>
    </Box>
  );
};

export default Index;
