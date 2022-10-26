import MainLayout from "../Layout/MainLayout";
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '../store/hook';
import { selectCount } from "../store/counterSlice";


const ProgressView = () => {

  const { t } = useTranslation();

  const count = useAppSelector(selectCount);


  return (
    <MainLayout content="Progress">
      <p>This is the {t('Progress')} Page {count}</p>
    </MainLayout>
  );
};
export default ProgressView;
