import React from 'react';

import { Dots, Clock } from '../atoms';

import cls from './app.styles.css';

export const App = () => (
  <main className={cls.app}>
    <Clock />
    <Dots amountOfDots={5} activeDotIndex={1} />
  </main>
);
