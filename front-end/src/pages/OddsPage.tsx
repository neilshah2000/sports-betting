import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOdds, getFixtureById } from "../api/api";
import Bookmaker from "../components/Bookmaker";
import FixtureCard from "../components/FixtureCard";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function OddsPage() {
  const [bookmakers, setBookmakers] = useState([]);
  const [fixture, setFixture] = useState<any>([]);
  const [selectedBookmakerId, setSelectedBookmakerId] = useState(0);
  const { fixtureId } = useParams();
  const navigate = useNavigate();

  //   console.log("bookmakers", bookmakers);
  //   console.log("fixture", fixture);

  useEffect(() => {
    if (fixtureId) {
      getOdds(parseInt(fixtureId)).then(
        (odds) => {
          if (odds.length > 0) {
            setBookmakers(odds[0].bookmakers);
          }
        },
        (err) => {
          console.log(err);
          console.log("error, check status and redirect");
          if ((err.error = "unauthorized")) {
            navigate("/login");
          }
        }
      );
      getFixtureById(parseInt(fixtureId)).then(
        (fixture) => {
          setFixture(fixture);
        },
        (err) => {
          console.log("error, check status and redirect");
          if ((err.error = "unauthorized")) {
            navigate("/login");
          }
        }
      );
    }
  }, [fixtureId]);

  const onBookmakerTabSelected = (event: React.SyntheticEvent, newValue: number) => {
    // console.log("selected tab id", newValue);
    setSelectedBookmakerId(newValue);
  };

  return (
    <>
      <Typography sx={{ mt: 2 }} variant="h4" gutterBottom>
        Bookmaker Odds
      </Typography>
      {fixture.length !== 0 ? (
        <>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 4, mb: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box component="img" sx={{ height: 50, mr: 2 }} src={fixture[0].teams.home.logo}></Box>
              <Typography variant="h4">{fixture[0].teams.home.name}</Typography>
            </Box>
            <Typography sx={{ ml: 4, mr: 4 }} variant="h4">
              vs
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h4">{fixture[0].teams.away.name}</Typography>
              <Box component="img" sx={{ height: 50, ml: 2 }} src={fixture[0].teams.away.logo}></Box>
            </Box>
          </Box>
        </>
      ) : null}

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={selectedBookmakerId} onChange={onBookmakerTabSelected} aria-label="basic tabs example">
            {bookmakers.map((bookmaker: any) => (
              <Tab label={bookmaker.name} key={bookmaker.id} />
            ))}
          </Tabs>
        </Box>
      </Box>

      {bookmakers.length === 0 ? (
        <Typography variant="h6" gutterBottom>
          No BETS
        </Typography>
      ) : null}

      {bookmakers.map((bookmaker: any, i) => (
        <Bookmaker bookmaker={bookmaker} key={bookmaker.id} selected={selectedBookmakerId === i}></Bookmaker>
      ))}
    </>
  );
}

export default OddsPage;
