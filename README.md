# Andy's Forecast

## Preview

![App Preview](./docs/images/app.png 'App UI')

## Test Coverage

![Coverage](./docs/images/coverage.png 'Test Coverage')

## Setup - run - test

1. Create `.env` file:
   ```bash
   REACT_APP_ROOT_URL=http://localhost:3000
   REACT_APP_IP_ACCESS=dc6ef8fc6a024ceab08f9bdb7568f71c
   ```
1. Install npm package and run
   ```bash
   yarn && yarn start
   ```
1. Test
   ```bash
   yarn test
   ```
   Coverage test
   ```bash
   yarn test:coverage
   ```
1. Go to `http://localhost:3000`

## API

1. Detect location by ip: `https://ipstack.com`
1. Weather forecast: `https://www.metaweather.com`

## Tech

1. React (Typescript, Hooks)
1. TailwindCSS
1. Jest, react-testing-library

## WARNING:

- Detect location by ip api have limit: `10,000req/month`
