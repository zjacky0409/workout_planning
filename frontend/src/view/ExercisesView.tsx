import MainLayout from "../layout/MainLayout";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

interface Exercise {
  id: number,
  name: string,
  details: string
}
type GetExerciseResponse = {
  data: Exercise[];
};
const ExercisesView = () => {
  const { t } = useTranslation();

  const [exercise, setExercise] = useState<Exercise[]>([]);

  const [status, setStatus] = useState<Boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try{
        const result = await axios.get<Exercise[]>("http://localhost:4000/exercise");
        console.log(result)
        setExercise(result.data)
        setStatus(false);
      }catch(error){
        console.log('error --> ', error)
      }
      
    }

    fetchData();

    // should be make the clean up function
  }, []);

  // const exercise = [
  //   { name: "DB Flat Bench Press", details: "Test" },
  //   { name: "DB Fly", details: "Test" },
  //   { name: "DB Incline Bench Press", details: "Test" },
  //   { name: "Cable Fly", details: "Test" },
  //   { name: "Chest Machine", details: "Test" },
  //   { name: "Chest Machine Upper", details: "Test" },
  //   { name: "Lower Chest Machine Upper", details: "Test" },
  //   { name: "Middle Chest Machine Upper", details: "Test" },
  // ];
  if (status === true) {
    return (
      <MainLayout content="Exercise">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height:'100%'
          }}
        >
          <CircularProgress />
        </div>
      </MainLayout>
    );
  }
  return (
    <MainLayout content="Exercise">
      <>
        <p>This is the {t("Exercises")} Page</p>

        <Grid container spacing={2}>
          {exercise.map((value) => {
            return (
              <Grid item xs={12} sm={6} md={6} lg={4} key={value.id}>
                {" "}
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {value.name}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {value.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {value.name}
                    </Typography>
                    <Typography variant="body2">{value.details.toString()}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </>
    </MainLayout>
  );
};
export default ExercisesView;
