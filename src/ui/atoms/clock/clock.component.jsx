import React from 'react';

import cls from './clock.styles.css';

export const Clock = ({ elapsed, duration, isActive }) => {
  const progress = elapsed / duration;
  const progressDegree = progress * 360;
  const percentageProgress = progress * 100;
  const formattedProgress = percentageProgress.toFixed(1);

  return (
    <div className={cls.clock} data-active={isActive}>
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
