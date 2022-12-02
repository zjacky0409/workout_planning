import { useAppSelector, useAppDispatch } from "../../store/hook";
import CustomButton from "../../components/Button/CustomButton";
import { selectFoodList } from "../../store/dietSlice";
import { FoodObject } from "../../common";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

interface PropsType {
  id: number;
  name: string;
  carbs: number;
  fat: number;
  protein: number;
  comment: string;
  setModify: any;
  setOpen: any;
  callDeleteFoodApi: any;
}

const FoodCard = ({
  id,
  name,
  carbs,
  fat,
  protein,
  comment,
  setModify,
  setOpen,
  callDeleteFoodApi,
}: PropsType) => {
  const foodList = useAppSelector(selectFoodList);

  return (
    <Card sx={{ display: "flex"}}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: '60%',
        }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="subtitle1">
            {name}
          </Typography>
          <div style={{ display: "flex", flexDirection: "row", gap: 3 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              component="div"
            >
              Carbs: {carbs}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              component="div"
            >
              Protein: {protein}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              component="div"
            >
              Fat: {fat}
            </Typography>
          </div>
          <Typography variant="caption" color="text.secondary" component="div">
            {comment}
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            pl: 1,
            pb: 1,
            gap: 2,
          }}
        >
          <CustomButton
            shownText={"Modify"}
            variant={"primary"}
            handler={() => {
              setModify({
                modify: true,
                data: foodList.find((element: FoodObject) => element.id === id),
              });
              setOpen(true);
            }}
          />

          <CustomButton
            shownText={"Delete"}
            variant="danger"
            handler={() => callDeleteFoodApi(id)}
          />
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: '40%' }}
        image="/logo.png"
        alt="Live from space album cover"
      />
    </Card>
  );
};

export default FoodCard;
