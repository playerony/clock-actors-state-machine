import React from 'react';
import { useMachine } from '@xstate/react';

import cls from './clock.styles.css';

import { timerMachine } from '../../machines';

export const Clock = () => {
  const [state] = useMachine(timerMachine);

  const { elapsed, duration } = state.context;

  const progress = elapsed / duration;
  const progressDegree = progress * 360;
  const percentageProgress = progress * 100;
  const formattedProgress = percentageProgress.toFixed(1);

  return (
    <div className={cls.clock}>
      <div
        className={cls.seconds}
        style={{
          '--degree': progressDegree,
        }}
      />
      <div className={cls['labels-vertical']} />
      <div className={cls['labels-horizontal']} />
      <h1 className={cls.progress}>{formattedProgress}%</h1>
    </div>
  );
};
