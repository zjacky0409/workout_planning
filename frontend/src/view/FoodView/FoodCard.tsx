import { useAppSelector, useAppDispatch } from "../../store/hook";
import CustomButton from "../../components/Button/CustomButton";
import { deleteFood, getFood, selectFoodList } from "../../store/dietSlice";
import { FoodObject } from "../../common";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { selectRole } from "../../store/authSlice";
import ButtonWithDialog from "../../components/Button/ButtonWithDialog";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import { useState } from "react";
interface PropsType {
  id: number;
  name: string;
  carbs: number;
  fat: number;
  protein: number;
  comment: string;
  setModify: any;
  setOpen: any;
  // callDeleteFoodApi: any;
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
  // callDeleteFoodApi,
}: PropsType) => {
  const foodList = useAppSelector(selectFoodList);

  const { t } = useTranslation();
  const role = useAppSelector(selectRole);
  const dispatch = useAppDispatch()

  const callDeleteFoodApi = (toBeDelete: number) => {
    dispatch(deleteFood(toBeDelete))
      .unwrap()
      .then((result) => {
        if (result.delete_food === true) {
          dispatch(getFood());
        } else {
          console.log("error");
        }
        // handle result here
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
        // handle error here
        // TODO: error handling
        // 1. what if the user name already exist???
      });
  };

  const [openDelete, setOpenDelete] = useState(false)

  return (
    <Card sx={{ display: "flex" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "60%",
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
              {t("Carbs")}: {carbs}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              component="div"
            >
              {t("Protein")}: {protein}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              component="div"
            >
              {t("Fat")}: {fat}
            </Typography>
          </div>
          <Typography
            variant="caption"
            color="text.secondary"
            component="div"
            noWrap
          >
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
          {role.includes("coach") && (
            <>
              <CustomButton
                shownText={"Modify"}
                variant={"primary"}
                onClick={() => {
                  setModify({
                    modify: true,
                    data: foodList.find(
                      (element: FoodObject) => element.id === id
                    ),
                  });
                  setOpen(true);
                }}
              />

              {/* <ButtonWithDialog
                shownText={"Delete"}
                variant="danger"
                handler={() => callDeleteFoodApi(id)}
                disabled={false}
                header={"Confirmation"}
                content={"Are you sure to delete?"}
              /> */}
              <CustomButton
                shownText={"Delete"}
                variant="danger"
                onClick={() => setOpenDelete(true)}
              />
              <ConfirmDialog
                hanlder={() => callDeleteFoodApi(id)}
                header={"Confirmation"}
                content={"Are you sure to delete"}
                open={openDelete}
                handleClose={() => setOpenDelete(false)}
                disabled={false}
              />
            </>
          )}
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: "40%" }}
        image="/logo.png"
        alt="Live from space album cover"
      />
    </Card>
  );
};

export default FoodCard;
