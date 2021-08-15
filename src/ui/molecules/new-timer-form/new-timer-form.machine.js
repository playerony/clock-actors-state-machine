import { assign, createMachine } from 'xstate';

export const newTimerFormMachine = createMachine(
  {
    initial: 'active',
    context: {
      duration: 0,
    },
    states: {
      active: {
        on: {
          change: {
            actions: 'assignDuration',
          },
          submit: {
            actions: 'submit',
            cond: 'isValidDuration',
          },
        },
      },
    },
  },
  {
    actions: {
      assignDuration: assign({
        duration: (_, event) => +event.target.duration,
      }),
    },
    guards: {
      isValidDuration: (context) => !isNaN(context.duration) && context.duration > 0,
    },
  },
);
