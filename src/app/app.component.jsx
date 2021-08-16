import React from 'react';
import { useMachine } from '@xstate/react';

import { appMachine } from '@machines';
import { Dots, Timer, Button, NewTimerForm, HorizontalButtonsWrapper } from '@ui';

import cls from './app.styles.css';

export const App = () => {
  const [state, send] = useMachine(appMachine);

  const { timers, currentTimer } = state.context;

  const onDotClick = (index) => send({ type: 'SWITCH', index });

  const createClock = () => send('CREATE');

  const deleteClock = () => send('DELETE');

  const onSubmit = (duration) => send({ type: 'ADD', duration });

  const onCancel = () => {
    if (timers.length) {
      send('CANCEL');
    }
  };

  return (
    <main className={cls.app}>
      <div className={cls['content-wrapper']} data-hidden={!state.matches('timer')}>
        <section className={cls['clock-wrapper']}>
          {React.Children.toArray(
            timers.map((_timerRef, index) => (
              // eslint-disable-next-line react/jsx-key
              <Timer timerRef={_timerRef} isActive={index === currentTimer} />
            )),
          )}
          <Dots
            onDotClick={onDotClick}
            amountOfDots={timers.length}
            activeDotIndex={currentTimer}
            className={cls['dots-margin']}
          />
        </section>
        <HorizontalButtonsWrapper>
          <Button onClick={createClock}>Create clock</Button>
          <Button onClick={deleteClock} disabled={currentTimer === -1}>
            Delete clock
          </Button>
        </HorizontalButtonsWrapper>
      </div>
      <div className={cls['content-wrapper']} data-hidden={state.matches('timer')}>
        <NewTimerForm onSubmit={onSubmit} onCancel={onCancel} key={state.toStrings().join(' ')} />
      </div>
    </main>
  );
};
