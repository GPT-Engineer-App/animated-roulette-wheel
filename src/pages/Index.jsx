import React, { useState, useEffect } from "react";
import { Box, Button, Heading, Image } from "@chakra-ui/react";

const SPIN_DURATION = 5; // duration of the spin animation in seconds

const Index = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const numbers = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];

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
        <Image src="https://images.unsplash.com/photo-1495548054858-0e78bb72869e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxyb3VsZXR0ZSUyMHRhYmxlJTIwdG9wJTIwdmlld3xlbnwwfHx8fDE3MTI3MDAyODV8MA&ixlib=rb-4.0.3&q=80&w=1080" w="100%" h="100%" objectFit="cover" borderRadius="50%" />
        <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%) rotate(0deg)" transition={`transform ${SPIN_DURATION}s cubic-bezier(.2,.8,.6,1)`} transform-origin="center" style={{ transform: isSpinning ? `rotate(1440deg)` : undefined }}>
          <Image src="https://images.unsplash.com/photo-1605459862899-f506150a7a80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxyb3VsZXR0ZSUyMHdoZWVsJTIwdG9wJTIwdmlld3xlbnwwfHx8fDE3MTI3MDAyODZ8MA&ixlib=rb-4.0.3&q=80&w=1080" w={300} h={300} objectFit="cover" borderRadius="50%" />
        </Box>
        <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -450%)" bgColor="white" borderRadius={4} px={4} py={2} opacity={result !== null ? 1 : 0} transition="opacity 0.5s">
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
