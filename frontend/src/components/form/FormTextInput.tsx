import { TextField, TextFieldProps } from "@mui/material";
import { FC } from "react";

import {
  useController,
  UseControllerProps,
  useFormContext,
  Controller,
} from "react-hook-form";

type FormProps = {
  name: string;
} & TextFieldProps;

const FormTextInput: FC<FormProps> = ({ name, ...otherProps }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <TextField
          {...otherProps}
          {...field}
          error={!!errors[name]}
          // helperText={errors[name] ? 'error here': ''}
        />
      )}
    />
  );
};

export default FormTextInput;
