import MainLayout from "../Layout/MainLayout";
import { useTranslation } from "react-i18next";

interface PropsType {
  day: string;
}

const DietView = (props: PropsType) => {
  const { t } = useTranslation();

  return (
    <MainLayout content="Diet">
      <div style={{height: '100%'}}>
        <p>This is the {t("Diet")} Page</p>
        <p>{props.day}</p>
      </div>
    </MainLayout>
  );
};
export default DietView;
