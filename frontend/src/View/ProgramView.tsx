import MainLayout from "../Layout/MainLayout";
import { useTranslation } from 'react-i18next';

const ProgramView = () => {

  const { t } = useTranslation();
  return (
    <MainLayout content="Program">
      <p>This is the {t('Program')} Page</p>
    </MainLayout>
  );
};
export default ProgramView;
