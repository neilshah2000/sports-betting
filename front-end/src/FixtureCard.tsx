import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getOdds } from "./api";
import { useNavigate } from "react-router-dom";

interface IProps {
  fixture: any;
}
function FixtureCard({ fixture }: IProps) {
  const navigate = useNavigate();
  //   console.log(fixture);
  const onGetOddsClicked = () => {
    navigate(`/odds/${fixture.fixture.id}`);
    // getOdds(fixture.fixture.id).then(console.log);
  };
  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Box component="img" sx={{ height: 50 }} src={fixture.league.flag}></Box>
          <Box component="img" sx={{ height: 50 }} src={fixture.league.logo}></Box>

          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {fixture.teams.home.name} vs {fixture.teams.away.name}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={onGetOddsClicked}>
            Get Odds
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default FixtureCard;
