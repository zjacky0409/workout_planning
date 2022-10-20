import MainLayout from "../Layout/MainLayout";
import { useTranslation } from 'react-i18next';

interface PropsType {
  day: string;
}


const DietView = (props: PropsType) => {

  const { t } = useTranslation();

  console.log(props)

  return (
    <MainLayout>
      <>

        <p>This is the {t('Diet')} Page</p>
        <p>{props.day}</p>
      </>
    </MainLayout>
  );
};
export default DietView;
