import MainLayout from "../Layout/MainLayout";
import { useTranslation } from 'react-i18next';

const ExercisesView = () => {

  const { t } = useTranslation();
  return (
    <MainLayout>
      <p>This is the {t('Exercises')} Page</p>
    </MainLayout>
  );
};
export default ExercisesView;
