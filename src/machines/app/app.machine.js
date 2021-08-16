import { spawn, assign, createMachine } from 'xstate';

import { createTimerMachine } from '..';

export const appMachine = createMachine(
  {
    initial: 'new',
    context: {
      timers: [],
      currentTimer: -1,
    },
    states: {
      new: {
        on: {
          CANCEL: {
            target: 'timer',
            cond: 'hasMoreThanZeroTimers',
          },
        },
      },
      timer: {
        on: {
          DELETE: {
            target: 'deleting',
            actions: 'deleteCurrentTimer',
          },
        },
      },
      deleting: {
        always: [{ target: 'new', cond: 'hasZeroTimers' }, { target: 'timer' }],
      },
    },
    on: {
      ADD: {
        target: 'timer',
        actions: 'spawnNewTimer',
        cond: 'didTimersLimitReached',
      },
      CREATE: 'new',
      SWITCH: {
        actions: 'switchTimer',
      },
    },
  },
  {
    actions: {
      switchTimer: assign({
        currentTimer: (_, event) => event.index,
      }),
      spawnNewTimer: assign((context, event) => {
        const newTimer = spawn(createTimerMachine(event.duration));

        const timers = context.timers.concat(newTimer);
        const currentTimer = timers.length - 1;

        return {
          timers,
          currentTimer,
        };
      }),
      deleteCurrentTimer: assign((context) => {
        const timers = context.timers.filter((_, index) => index !== context.currentTimer);
        const currentTimer = timers.length - 1;

        return {
          timers,
          currentTimer,
        };
      }),
    },
    guards: {
      hasZeroTimers: (context) => context.timers.length === 0,
      hasMoreThanZeroTimers: (context) => context.timers.length > 0,
      didTimersLimitReached: (context) => context.timers.length < 25,
    },
  },
);
