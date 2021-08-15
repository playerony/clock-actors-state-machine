import { useMachine } from '@xstate/react';
import React, { useRef, useEffect } from 'react';

import { Input, Button, HorizontalButtonsWrapper } from '@ui';
import { newTimerFormMachine } from './new-timer-form.machine';

export const NewTimerForm = ({ onCancel, onSubmit }) => {
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const [state, send] = useMachine(newTimerFormMachine, {
    actions: { submit: (context) => onSubmit(context.duration) },
  });

  const { duration } = state.context;

  function handleSubmit(event) {
    event.preventDefault();

    send(event);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        min={0}
        step={1}
        type="number"
        ref={inputRef}
        onChange={send}
        title="Duration"
        placeholder="00s"
      />
      <HorizontalButtonsWrapper>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={duration <= 0}>{`Start ${duration}-second timer`}</Button>
      </HorizontalButtonsWrapper>
    </form>
  );
};
