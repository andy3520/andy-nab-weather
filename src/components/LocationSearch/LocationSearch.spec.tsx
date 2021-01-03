import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, waitFor } from '@testing-library/react';
import * as sinon from '@sinonjs/fake-timers';
import LocationSearch, { ELocationSearchTestId } from './LocationSearch';

describe('LocationSearch', () => {
  const onSearchMock = jest.fn();
  // const clock = sinon.
  test('should match snapshot', () => {
    const { asFragment } = render(<LocationSearch onSearch={onSearchMock} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render search input', () => {
    const { getByTestId } = render(<LocationSearch onSearch={onSearchMock} />);

    const INPUT = getByTestId(ELocationSearchTestId.INPUT);
    const ICON = getByTestId(ELocationSearchTestId.ICON);

    expect(ICON).toBeTruthy();
    expect(INPUT).toBeTruthy();
  });

  test('should debounced input callback 500ms', async () => {
    const { getByTestId, getByDisplayValue } = render(
      <LocationSearch onSearch={onSearchMock} />
    );

    const INPUT = getByTestId(ELocationSearchTestId.INPUT);
    const inputValues = ['La', 'ondon'];

    userEvent.type(INPUT, inputValues[0]);
    userEvent.type(INPUT, `{backspace}${inputValues[1]}`);
    expect(getByDisplayValue('London')).toBeTruthy();

    await waitFor(() => expect(onSearchMock).toBeCalledTimes(1));
  });
});
