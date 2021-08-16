import React from 'react';
import { useService } from '@xstate/react';

import { Clock, Button, HorizontalButtonsWrapper } from '@ui';

import cls from './timer.styles.css';

export const Timer = ({ timerRef, isActive }) => {
  const [state, send] = useService(timerRef);

  const { duration, elapsed } = state.context;

  return (
    <div className={cls.wrapper} data-active={isActive}>
      <Clock duration={duration} elapsed={elapsed} />
      <HorizontalButtonsWrapper>
        {state.matches({ running: 'normal' }) && (
          <Button onClick={() => send('ADD_MINUTE')}>+ 1:00</Button>
        )}

        {state.matches({ running: 'normal' }) && (
          <Button onClick={() => send('TOGGLE')}>Pause timer</Button>
        )}

        {(!state.matches({ running: 'normal' }) || state.matches({ running: 'overtime' })) && (
          <Button onClick={() => send('RESET')}>Reset timer</Button>
        )}

        {(state.matches('paused') || state.matches('idle')) && (
          <Button onClick={() => send('TOGGLE')}>Start timer</Button>
        )}
      </HorizontalButtonsWrapper>
    </div>
  );
};
