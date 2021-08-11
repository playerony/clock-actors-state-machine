import { assign, createMachine } from 'xstate';

export const timerMachine = createMachine(
  {
    id: 'timer',
    initial: 'running',
    context: {
      elapsed: 0,
      duration: 60,
      interval: 0.1,
    },
    states: {
      running: {
        always: {
          target: 'overflow',
          cond: 'didTimeOverflow',
        },
        invoke: {
          src: 'ticker',
        },
        on: {
          TICK: {
            actions: 'tick',
          },
        },
      },
      overflow: {
        type: 'final',
      },
    },
  },
  {
    actions: {
      tick: assign({
        elapsed: (context) => context.elapsed + context.interval,
      }),
    },
    services: {
      ticker: (context) => (sendBack) => {
        const interval = setInterval(() => sendBack('TICK'), context.interval * 1000);

        return () => clearInterval(interval);
      },
    },
    guards: {
      didTimeOverflow: (context) => context.elapsed > context.duration,
    },
  },
);
