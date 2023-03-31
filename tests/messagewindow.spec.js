import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {App} from '../client/src/App.jsx';
import Message from '../client/src/Components/MessageWindow/Message.jsx';


// global.setImmediate = (cb) => {
//   setTimeout(cb, 0);
// };
describe('Message Window Component', () => {
  it('user can type in a text box', async () => {
    const user = userEvent.setup()
    const { getByTestId } = render(<Message />);
    const testBox = getByTestId('write_message');
    console.log(`testBox is equal to ${testBox}`);
    await user.type(testBox, 'Hello, world!');
    console.log(`testBox.value is equal to ${testBox.value}`);
    expect(testBox.value).toBe('Hello, world!');
  });
})


