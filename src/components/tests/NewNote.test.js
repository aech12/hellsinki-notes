import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import NewNote from '../NewNote';

const Wrapper = props => {
  const onChange = e => {
    props.state.input = e.target.value;
  };
  return (
    <NewNote
      handleSubmit={props.onSubmit}
      inputChange={onChange}
      input={props.state.input}
    />
  );
};

test('NewNote updates content state and submits form', () => {
  const onSubmit = jest.fn();
  const state = { input: '' };

  const component = render(<Wrapper state={state} onSubmit={onSubmit} />);

  const form = component.container.querySelector('form');
  const input = component.container.querySelector('input');
  fireEvent.change(input, { target: { value: 'input changed' } });
  fireEvent.submit(form);
  expect(state.input).toBe('input changed');
  expect(onSubmit.mock.calls.length).toBe(1);
});
