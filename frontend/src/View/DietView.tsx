import MainLayout from "../Layout/MainLayout";
import { useTranslation } from 'react-i18next';


const DietView = () => {

  const { t } = useTranslation();

  return (
    <MainLayout>
      <p>This is the {t('Diet')} Page</p>
    </MainLayout>
  );
};
export default DietView;
