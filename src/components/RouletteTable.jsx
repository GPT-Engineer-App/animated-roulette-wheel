import React from "react";
import { SimpleGrid, Box, Text } from "@chakra-ui/react";

const RouletteTable = () => {
  const numbers = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];

  const specialFields = ["1st 12", "2nd 12", "3rd 12", "1 to 18", "Even", "Red", "Black", "Odd", "19 to 36"];

  const isRed = (num) => [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num);

  return (
    <SimpleGrid columns={13} spacing={1}>
      {numbers.map((num) => (
        <Box key={num} bg={num === 0 ? "green.500" : isRed(num) ? "red.500" : "black"} color="white" p={2} textAlign="center">
          {num}
        </Box>
      ))}
      {specialFields.map((field) => (
        <Box key={field} bg="gray.700" color="white" p={2} textAlign="center">
          <Text fontSize="xs">{field}</Text>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default RouletteTable;
