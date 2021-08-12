import React from 'react';

import { Dots, Clock } from '../atoms';

import cls from './app.styles.css';

export const App = () => (
  <main className={cls.app}>
    <div className={cls['content-wrapper']}>
      <section className={cls['clock-wrapper']}>
        <Clock />
        <Dots amountOfDots={5} activeDotIndex={1} />
      </section>
    </div>
  </main>
);
