import MainLayout from "../Layout/MainLayout";
import { useTranslation } from 'react-i18next';

const UsefulResourceView = () => {
  return (
    <MainLayout>
      <p>This is the {t('Useful Resource')} Page</p>
    </MainLayout>
  );
};
export default UsefulResourceView;
