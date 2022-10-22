import MainLayout from "../Layout/MainLayout";
import { useTranslation } from 'react-i18next';


const ProgressView = () => {

  const { t } = useTranslation();

  return (
    <MainLayout content="Progress">
      <p>This is the {t('Progress')} Page</p>
    </MainLayout>
  );
};
export default ProgressView;
