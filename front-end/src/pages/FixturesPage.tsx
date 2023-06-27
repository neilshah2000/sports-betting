import { useEffect, useState } from "react";
import { getFixtures, login } from "../api/api";
import { Box, Button, TextField, Typography } from "@mui/material";
import FixtureCard from "../components/FixtureCard";
import { useNavigate } from "react-router-dom";
// import useScrollPosition from "./useScrollPosition";
// import useScrollEnd from "./useScrollEnd";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function FixturesPage() {
  const [fixtures, setFixtures] = useState([]);
  const [filteredFixtures, setFilteredFixtures] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  //   const scrollPosition = useScrollPosition();
  //   const scrollEnd = useScrollEnd();

  //   console.log(scrollPosition);
  //   console.log("scroll end", scrollEnd);
  //   console.log("fixtures", fixtures);
  //   console.log("searchText", searchText);

  useEffect(() => {
    getFixtures().then(
      (fixtures) => {
        setFixtures(fixtures);
        setFilteredFixtures(fixtures);
      },
      (err) => {
        console.log("error, check status and redirect");
        if ((err.error = "unauthorized")) {
          navigate("/login");
        }
      }
    );
  }, []);

  useEffect(() => {
    const filtered = fixtures.filter((fixture: any) => {
      //   console.log(fixture.teams.home.name);
      const homeIncludes = fixture.teams.home.name.toLowerCase().includes(searchText.toLowerCase());
      const awayIncludes = fixture.teams.away.name.toLowerCase().includes(searchText.toLowerCase());
      return homeIncludes || awayIncludes;
    });
    // console.log("filtered", filtered);
    setFilteredFixtures(filtered);
  }, [searchText]);

  const onSearchValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const onGetOddsClicked = (fixture: any) => () => {
    navigate(`/odds/${fixture.fixture.id}`);
  };

  return (
    <>
      <Typography sx={{ mt: 2 }} variant="h4" gutterBottom>
        Fixtures
      </Typography>
      <TextField sx={{ mb: 2 }} label="Team Search" value={searchText} onChange={onSearchValueChange}></TextField>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Date</b>
              </TableCell>
              <TableCell align="center">
                <b>Match</b>
              </TableCell>

              <TableCell>
                <b>League</b>
              </TableCell>
              <TableCell>
                <b>Round</b>
              </TableCell>
              <TableCell>
                <b>Venue</b>
              </TableCell>
              <TableCell>
                <b>City</b>
              </TableCell>
              <TableCell>
                <b>Odds</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFixtures.map((fixture: any) => (
              <TableRow key={fixture.fixture.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{new Date(fixture.fixture.date).toString().substring(0, 21)}</TableCell>
                <TableCell component="th" scope="row">
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box component="img" sx={{ height: 30, mr: 1 }} src={fixture.teams.home.logo}></Box>
                      {fixture.teams.home.name}
                    </Box>
                    <Box>
                      <b>vs</b>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box component="img" sx={{ height: 30, mr: 1 }} src={fixture.teams.away.logo}></Box>
                      {fixture.teams.away.name}
                    </Box>
                  </Box>
                </TableCell>

                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box component="img" sx={{ height: 30, mr: 1 }} src={fixture.league.logo}></Box>
                    {fixture.league.name}
                  </Box>
                </TableCell>
                <TableCell>{fixture.league.round}</TableCell>
                <TableCell>{fixture.fixture.venue.name}</TableCell>
                <TableCell>{fixture.fixture.venue.city}</TableCell>
                <TableCell>
                  <Button size="small" onClick={onGetOddsClicked(fixture)}>
                    Get Odds
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Box>
        {filteredFixtures.map((fixture: any) => (
          <FixtureCard key={fixture.fixture.id} fixture={fixture}></FixtureCard>
        ))}
      </Box> */}
    </>
  );
}

export default FixturesPage;
