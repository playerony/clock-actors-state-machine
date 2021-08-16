import { assign, createMachine } from 'xstate';

export const createTimerMachine = (duration) =>
  createMachine(
    {
      id: 'timer',
      initial: 'idle',
      context: {
        duration,
        elapsed: 0,
        interval: 0.1,
      },
      states: {
        idle: {
          entry: assign({
            duration,
            elapsed: 0,
          }),
          on: {
            RESET: undefined,
            TOGGLE: 'running',
          },
        },
        running: {
          invoke: {
            src: 'ticker',
          },
          initial: 'normal',
          states: {
            normal: {
              always: {
                target: 'overtime',
                cond: 'timerExpired',
              },
              on: {
                RESET: undefined,
              },
            },
            overtime: {
              on: {
                TOGGLE: undefined,
              },
            },
          },
          on: {
            TICK: {
              actions: 'tick',
            },
            ADD_MINUTE: {
              actions: 'addMinute',
            },
            TOGGLE: 'paused',
          },
        },
        paused: {
          on: {
            TOGGLE: 'running',
          },
        },
      },
      on: {
        RESET: '.idle',
      },
    },
    {
      actions: {
        tick: assign({
          elapsed: (context) => context.elapsed + context.interval,
        }),
        addMinute: assign({
          duration: (context) => context.duration + 60,
        }),
      },
      services: {
        ticker: (context) => (sendBack) => {
          const interval = setInterval(() => sendBack('TICK'), context.interval * 1000);

          return () => clearInterval(interval);
        },
      },
      guards: {
        timerExpired: (context) => context.elapsed >= context.duration,
      },
    },
  );
