import React from 'react';

import cls from './clock.styles.css';

export const Clock = () => (
  <div className={cls.clock}>
    <div className={cls.seconds} />
    <div className={cls['labels-vertical']} />
    <div className={cls['labels-horizontal']} />
  </div>
);
