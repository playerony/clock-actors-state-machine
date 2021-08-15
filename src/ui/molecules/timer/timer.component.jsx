import React from 'react';
import { useService } from '@xstate/react';

import { Clock } from '@ui';

export const Timer = ({ timerRef, isActive }) => {
  const [state] = useService(timerRef);

  const { duration, elapsed } = state.context;

  return <Clock duration={duration} elapsed={elapsed} isActive={isActive} />;
};
