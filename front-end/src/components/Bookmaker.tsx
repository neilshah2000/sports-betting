import Bet from "./Bet";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface IProps {
  bookmaker: {
    bets: any[];
    id: number;
    name: string;
  };
  selected: boolean;
}
function Bookmaker({ bookmaker, selected }: IProps) {
  //   console.log("bookmaker", bookmaker);

  if (!selected) {
    return <></>;
  }

  // unnormalise the bets array for display
  const displayData = bookmaker.bets
    .map((bet: any) => {
      return bet.values.map((value: any) => {
        return {
          name: bet.name,
          value: value.value,
          odd: value.odd,
        };
      });
    })
    .flat();

  //   console.log("bookmaker data", displayData);

  return (
    <>
      <h4>{bookmaker.name}</h4>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Bet</b>
              </TableCell>
              <TableCell>
                <b>Value</b>
              </TableCell>
              <TableCell>
                <b>Odd</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayData.map((data: any, i) => (
              <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {data.name}
                </TableCell>
                <TableCell>{data.value}</TableCell>
                <TableCell>{data.odd}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* {bookmaker.bets.map((bet) => (
        <Bet bet={bet} key={bet.id}></Bet>
      ))} */}
    </>
  );
}

export default Bookmaker;
