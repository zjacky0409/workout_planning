import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";
import { StudentObject } from "../../common";
import { useForm, Controller } from "react-hook-form";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomButton from "../../components/Button/CustomButton";
import { useAppDispatch } from "../../store/hook";
import { updateStudent } from "../../store/coachSlice";
import { getStudentList } from "../../store/authSlice";

interface ModifyStudentProps {
  open: boolean;
  setOpen: any;
  closeFunction: any;
  id: number;
  display_name: string;
  isVerified: boolean;
}

interface IFormInput {
  id: number;
  display_name: string;
  isVerified: string;
}

const ModifyStudent = ({
  open,
  setOpen,
  closeFunction,
  id,
  display_name,
  isVerified,
}: ModifyStudentProps) => {
  const { t } = useTranslation();

  const [openPopup, setOpenPopup] = React.useState(false);

  const dispatch = useAppDispatch();

  // form validation with yup
  const schema = yup
    .object({
      display_name: yup.string().required("Please enter name"),
    })
    .required();

  const {
    control,
    watch,
    handleSubmit,
    setError,
    getValues,
    clearErrors,
    reset,
    register,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  // set the init value for form
  React.useEffect(() => {
    reset({
      id: id,
      display_name: display_name,
      isVerified: isVerified.toString(),
    });
  },[display_name, id, isVerified, reset]);

  const values = watch(); // to monitor the user's input

  const onSubmit = () => {
    setOpenPopup(true);
  };

  // for sending the form data to the server
  const sendToServer = () => {
    let data: StudentObject = {
      id: id,
      display_name: values.display_name,
      isVerified: values.isVerified === "true" ? true : false,
    };
    dispatch(updateStudent(data))
      .unwrap()
      .then((result) => {
        if (result.update_student === true) {
          closeFunction();
          dispatch(getStudentList())
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

  return (
    <div>
      <Dialog
        open={open}
        onClose={closeFunction}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Modify</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ paddingTop: 2 }}>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <Controller
                  name="display_name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={!!errors["display_name"]}
                      size="small"
                      label={"Name"}
                      fullWidth
                      helperText={
                        errors["display_name"]
                          ? t(
                              errors["display_name"]
                                .message as unknown as TemplateStringsArray
                            )
                          : ""
                      }
                    />
                  )}
                />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    // justifyContent: "space-between",
                    gap: 5,
                  }}
                >
                  <div>Status: </div>

                  <div
                    style={{ display: "flex", flexDirection: "row", gap: 5 }}
                  >
                    <input
                      {...register("isVerified", { required: true })}
                      type="radio"
                      value={"true"}
                    />
                    <label htmlFor="Active">{t('Active')}</label>
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "row", gap: 5 }}
                  >
                    <input
                      {...register("isVerified", { required: true })}
                      type="radio"
                      value={"false"}
                    />
                    <label htmlFor="Disactive">{t('Disactive')}</label>
                  </div>
                </div>
              </div>
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <CustomButton
              onClick={closeFunction}
              shownText={"Cancel"}
              variant={"primary"}
              type="button"
            />
            <CustomButton
              type="submit"
              shownText={"Submit"}
              variant={"primary"}
            />
          </DialogActions>
        </form>
      </Dialog>
      <ConfirmDialog
        hanlder={sendToServer}
        header={"Conformation"}
        content={"Are you sure to submit the content"}
        open={openPopup}
        handleClose={() => setOpenPopup(false)}
        disabled={false}
      />
    </div>
  );
};

export default ModifyStudent;
