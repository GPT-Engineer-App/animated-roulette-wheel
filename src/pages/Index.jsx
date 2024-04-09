import React, { useState, useEffect } from "react";
import { Box, Button, Heading, HStack, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import RouletteTable from "../components/RouletteTable";

const SPIN_DURATION = 5; // duration of the spin animation in seconds

const Index = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const numbers = [0, 5, 12, 3, 10, 1, 8, 9, 2, 7, 6, 11, 4];
  const [selectedJeton, setSelectedJeton] = useState(10);
  const [balance, setBalance] = useState(1000);

  const jetonValues = [10, 25, 50, 100, 1000];

  const betOptions = [
    { name: "0", payout: 12 },
    { name: "1-12", payout: 2.95 },
    { name: "Even", payout: 1.95 },
    { name: "Odd", payout: 1.95 },
    { name: "Red", payout: 1.95 },
    { name: "Black", payout: 1.95 },
    { name: "1-6", payout: 1.95 },
    { name: "4-9", payout: 1.95 },
    { name: "7-12", payout: 1.95 },
  ];

  const [bets, setBets] = useState({});

  const handleJetonSelect = (value) => {
    setSelectedJeton(value);
  };

  const handlePlaceBet = (betName) => {
    setBets((prevBets) => ({
      ...prevBets,
      [betName]: (prevBets[betName] || 0) + selectedJeton,
    }));
    setBalance((prevBalance) => prevBalance - selectedJeton);
  };

  useEffect(() => {
    if (!isSpinning) return;

    const timeout = setTimeout(() => {
      setIsSpinning(false);
      const resultNumber = numbers[Math.floor(Math.random() * numbers.length)];
      setResult(resultNumber);

      let winnings = 0;
      for (const [betName, betAmount] of Object.entries(bets)) {
        const { payout } = betOptions.find((option) => option.name === betName);
        if ((betName === "Even" && resultNumber % 2 === 0) || (betName === "Odd" && resultNumber % 2 !== 0) || (betName === "Red" && [1, 3, 5, 7, 9, 11].includes(resultNumber)) || (betName === "Black" && [2, 4, 6, 8, 10, 12].includes(resultNumber)) || (betName === "1-6" && resultNumber >= 1 && resultNumber <= 6) || (betName === "4-9" && resultNumber >= 4 && resultNumber <= 9) || (betName === "7-12" && resultNumber >= 7 && resultNumber <= 12) || betName === resultNumber.toString()) {
          winnings += betAmount * payout;
        }
      }
      setBalance((prevBalance) => prevBalance + winnings);
      setBets({});
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
        <RouletteTable />
        <HStack spacing={4} justify="center" mb={4}>
          {jetonValues.map((value) => (
            <Button key={value} onClick={() => handleJetonSelect(value)} variant={selectedJeton === value ? "solid" : "outline"} colorScheme="blue">
              {value}
            </Button>
          ))}
        </HStack>
        <Text mb={4}>Balance: {balance}</Text>
        <SimpleGrid columns={3} spacing={4} mb={8}>
          {betOptions.map(({ name, payout }) => (
            <Button key={name} onClick={() => handlePlaceBet(name)} disabled={isSpinning || selectedJeton > balance}>
              {name} (x{payout})
            </Button>
          ))}
        </SimpleGrid>
        <VStack spacing={2} align="flex-start">
          {Object.entries(bets).map(([betName, betAmount]) => (
            <Text key={betName}>
              {betName}: {betAmount}
            </Text>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default Index;
