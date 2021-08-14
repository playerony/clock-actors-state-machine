import React from 'react';
import { useMachine } from '@xstate/react';

import { Dots, Clock, Button, BigHeading } from '../atoms';

import { appMachine } from '../machines';

import cls from './app.styles.css';

export const App = () => {
  const [state, send] = useMachine(appMachine);

  const { clocks, currentClock } = state.context;

  const renderClocks = () => {
    if (!clocks.length) {
      return <BigHeading>Please add a new clock</BigHeading>;
    }

    return React.Children.toArray(
      clocks.map((_clockRef, index) => (
        // eslint-disable-next-line react/jsx-key
        <Clock data-active={index === currentClock} clockRef={_clockRef} />
      )),
    );
  };

  const onDotClick = (index) => send({ type: 'SWITCH', index });

  const addClock = () => send({ type: 'CREATE', duration: 15 });

  const deleteClock = () => send('DELETE');

  return (
    <main className={cls.app}>
      <div className={cls['content-wrapper']}>
        <section className={cls['clock-wrapper']}>
          {renderClocks()}
          <Dots
            onDotClick={onDotClick}
            amountOfDots={clocks.length}
            activeDotIndex={currentClock}
            className={cls['dots-margin']}
          />
        </section>
        <footer className={cls.footer}>
          <Button onClick={addClock}>Add clock</Button>
          {currentClock > -1 ? <Button onClick={deleteClock}>Delete clock</Button> : null}
        </footer>
      </div>
    </main>
  );
};
