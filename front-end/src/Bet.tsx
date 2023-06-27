import { Box } from "@mui/material";

interface IProps {
  bet: {
    name: string;
    values: { odd: string; value: string }[];
  };
}

function Bet({ bet }: IProps) {
  return (
    <>
      <h6>{bet.name}</h6>
      {bet.values.map((value, i) => (
        <Box key={i}>
          {value.value}: {value.odd}
        </Box>
      ))}
    </>
  );
}

export default Bet;
