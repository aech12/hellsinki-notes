import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import Note from '../Note';

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  };
  const component = render(
    <Note content={note.content} important={note.important} />
  );
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  );
  // component.debug()
  // const li = component.container.querySelector('li');
  // console.log(prettyDOM(li));
});
test('clicking li calls change importance handler once', async () => {
  const note = {
    content: 'Button testing',
    important: false
  };
  const mockHandler = jest.fn();

  // const { getByText } = render(
  //   <Note note={note.content} putImportant={mockHandler} />
  // );
  const component = render(
    <Note content={note.content} putImportant={mockHandler} />
  );
  const li = component.getByText(': Button testing');
  fireEvent.click(li);
  expect(mockHandler.mock.calls.length).toBe(1);
});
