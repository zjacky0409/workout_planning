import MainLayout from "../layout/MainLayout";
import { useTranslation } from "react-i18next";

import { useAppSelector, useAppDispatch } from '../store/hook';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from '../store/counterSlice';

import { useState } from 'react'

interface PropsType {
  day: string;
}

const DietView = (props: PropsType) => {
  const { t } = useTranslation();

  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;


  return (
    <MainLayout content="Diet">
      <div style={{ height: '100%' }}>
        <p>This is the {t("Diet")} Page</p>
        <p>{props.day}</p>

        <div>
          <div>
            <button
              aria-label="Decrement value"
              onClick={() => dispatch(decrement())}
            >
              -
            </button>
            <span>{count}</span>
            <button
              aria-label="Increment value"
              onClick={() => dispatch(increment())}
            >
              +
            </button>
          </div>
          <div >
            <input
              aria-label="Set increment amount"
              value={incrementAmount}
              onChange={(e) => setIncrementAmount(e.target.value)}
            />
            <button
              onClick={() => dispatch(incrementByAmount(incrementValue))}
            >
              Add Amount
            </button>
            <button
              onClick={() => dispatch(incrementAsync(incrementValue))}
            >
              Add Async
            </button>
            <button
              onClick={() => dispatch(incrementIfOdd(incrementValue))}
            >
              Add If Odd
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
export default DietView;
