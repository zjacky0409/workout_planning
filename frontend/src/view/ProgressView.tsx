/*
 TODO
 */

import MainLayout from "../layout/MainLayout";
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '../store/hook';

const ProgressView = () => {

  const { t } = useTranslation();

  return (
    <MainLayout content="Progress">
      <p>This is the {t('Progress')} Page </p>
    </MainLayout>
  );
};
export default ProgressView;
