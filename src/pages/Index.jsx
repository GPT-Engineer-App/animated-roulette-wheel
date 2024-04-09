import React, { useState, useEffect } from "react";
import { Box, Button, Heading, HStack, VStack, Text } from "@chakra-ui/react";

const SPIN_DURATION = 5; // duration of the spin animation in seconds

const Index = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const numbers = [0, 5, 12, 3, 10, 1, 8, 9, 2, 7, 6, 11, 4];
  const [selectedJeton, setSelectedJeton] = useState(10);
  const [balance, setBalance] = useState(1000);

  const jetonValues = [10, 25, 50, 100, 1000];

  const handleJetonSelect = (value) => {
    setSelectedJeton(value);
  };

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
        <Box as="svg" viewBox="0 0 1000 1000" w="100%" h="100%">
          <image href="https://svgshare.com/i/15EE.svg" width="1000" height="1000" />
          <circle
            cx="500"
            cy="140"
            r="30"
            fill="white"
            stroke="black"
            strokeWidth="5"
            style={{
              transform: isSpinning ? `rotate(${result * (360 / numbers.length)}deg) translate(360px)` : undefined,
              transformOrigin: "500px 500px",
              transition: `transform ${SPIN_DURATION}s cubic-bezier(.2,.8,.6,1)`,
            }}
          />
        </Box>
        <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -200%)" bgColor="white" borderRadius={4} px={4} py={2} opacity={result !== null ? 1 : 0} transition="opacity 0.5s">
          {result}
        </Box>
      </Box>

      <Button
        mt={8}
        colorScheme="green"
        onClick={() => {
          setIsSpinning(true);
          setResult(null);
        }}
        disabled={isSpinning}
      >
        {isSpinning ? "Spinning..." : "Spin"}
      </Button>

      <Box mt={8}>
        <Heading as="h2" size="lg" mb={4}>
          Roulette Table
        </Heading>
        <HStack spacing={4} justify="center" mb={4}>
          {jetonValues.map((value) => (
            <Button key={value} onClick={() => handleJetonSelect(value)} variant={selectedJeton === value ? "solid" : "outline"} colorScheme="blue">
              {value}
            </Button>
          ))}
        </HStack>
        <Text mb={4}>Balance: {balance}</Text>
        {}
      </Box>
    </Box>
  );
};

export default Index;
