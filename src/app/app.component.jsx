import React from 'react';

import { Clock } from '../atoms';

import cls from './app.styles.css';

export const App = () => (
  <main className={cls.app}>
    <h1 className={cls.title}>clock-actors-state-machine</h1>
    <Clock />
  </main>
);
