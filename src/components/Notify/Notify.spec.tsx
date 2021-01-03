import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Notify, { INotifyProps, NOTIFY_CLASS_NAME } from './Notify';

describe('Notify', () => {
  test('should match snapshot', () => {
    const type = 'info';
    const msg = 'Officia sunt enim occaecat nostrud do commodo.';
    const { asFragment } = render(<Notify type={type} msg={msg} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test.each`
    type         | msg
    ${'info'}    | ${'Est ex reprehenderit consequat.'}
    ${'error'}   | ${'Laborum nisi aliqua sit.'}
    ${''}        | ${'Ut eu voluptate qui nisi nulla.'}
    ${undefined} | ${'Adipisicing officia aliquip duis.'}
  `(
    'should render notify style for type "$type" and message "$msg" correctly',
    ({ type, msg }: INotifyProps) => {
      const { container } = render(<Notify type={type} msg={msg} />);
      const typeClass = !type
        ? NOTIFY_CLASS_NAME.info
        : NOTIFY_CLASS_NAME[type];

      expect(container.firstChild).toHaveClass(typeClass);
      expect(container.firstChild).toHaveTextContent(msg);
    }
  );
});
