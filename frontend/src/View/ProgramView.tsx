import MainLayout from "../Layout/MainLayout";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const ProgramView = () => {
  const { t } = useTranslation();
  const [test, setTest] = useState(0);
  return (
    <MainLayout content="Program">
      <>
        <p>
          This is the {t("Program")} Page {test}
        </p>
        <button
          onClick={() => {
            setTest(Math.random());
          }}
        >
          TEST
        </button>
      </>
    </MainLayout>
  );
};
export default ProgramView;
