import MainLayout from "../layout/MainLayout";
import { useTranslation } from "react-i18next";

import { useAppSelector, useAppDispatch } from '../store/hook';


import { useState } from 'react'

interface PropsType {
  day: string;
}

const DietView = (props: PropsType) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  return (
    <MainLayout content="Diet">
      <div style={{ height: '100%' }}>
        <p>This is the {t("Diet")} Page</p>
        <p>{props.day}</p>
      </div>
    </MainLayout>
  );
};
export default DietView;
