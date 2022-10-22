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
        <table style={{height: '50%'}}>
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
          </tr>
        </table>
      </div>
    </MainLayout>
  );
};
export default DietView;
