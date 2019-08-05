import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
jest.mock('../services/noteService');
import App from '../App';

describe('App', () => {
  test('LocalStorage setItem works', () => {
    const user = 'done';
    localStorage.setItem('one', JSON.stringify(user));
    expect(JSON.parse(localStorage.getItem('one'))).toBe('done');
  });
  test('Fetch notes', async () => {
    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.container.querySelectorAll('li'));
    const li = component.container.querySelectorAll('li');
    expect(component.container).toHaveTextContent('HTML is easy');
    expect(li.length).toBe(2);
  });
});

const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
