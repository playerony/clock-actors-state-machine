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
            actions: assign({
              duration: (_, event) => +event.target.value,
            }),
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
    guards: {
      isValidDuration: (context) =>
        !isNaN(context.duration) && context.duration > 0 && context.duration <= 360,
    },
  },
);
