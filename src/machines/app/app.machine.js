import { spawn, assign, createMachine } from 'xstate';

import { createTimerMachine } from '..';

export const appMachine = createMachine(
  {
    initial: 'idle',
    context: {
      clocks: [],
      currentClock: -1,
    },
    states: {
      idle: {
        on: {
          CREATE: {
            actions: 'spawnNewClock',
            cond: 'didClocksLimitReached',
          },
          DELETE: {
            actions: 'deleteCurrentClock',
          },
          SWITCH: {
            actions: 'switchClock',
          },
        },
      },
    },
  },
  {
    actions: {
      switchClock: assign({
        currentClock: (_, event) => event.index,
      }),
      spawnNewClock: assign((context, event) => {
        const newClock = spawn(createTimerMachine(event.duration));

        const clocks = context.clocks.concat(newClock);
        const currentClock = clocks.length - 1;

        return {
          clocks,
          currentClock,
        };
      }),
      deleteCurrentClock: assign((context) => {
        const clocks = context.clocks.filter((_, index) => index !== context.currentClock);
        const currentClock = clocks.length - 1;

        return {
          clocks,
          currentClock,
        };
      }),
    },
    guards: {
      didClocksLimitReached: (context) => context.clocks.length < 25,
    },
  },
);
