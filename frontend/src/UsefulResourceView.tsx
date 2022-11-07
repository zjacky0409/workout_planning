import MainLayout from "../layout/MainLayout";
import { useTranslation } from 'react-i18next';

const UsefulResourceView = () => {

  const { t } = useTranslation();
  return (
    <MainLayout content="Resource">
      <p>This is the {t('Resource')} Page</p>
    </MainLayout>
  );
};
export default UsefulResourceView;
