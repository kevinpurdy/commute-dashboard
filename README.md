This is an application that displays a dashboard showing when nearby buses and trains are expected and how many bikes are in nearby stations. It gets data from the following places:

- [The Washington Metropolitan Area Transit Authority API](https://developer.wmata.com/)
- [Capital Bikeshare System Data](https://capitalbikeshare.com/system-data)

I build this to give myself a quick dashboard to reference when thinking about how I want to get to work. The most essential questions it answers:

1. Is there a nearby bus I can catch?
2. Are there bikes in the bikeshare station?
3. Are there trains running on time?

## Getting started

Setting up this app requires setting a few environment variables:

- `WMATA_API_KEY`: The API key for the WMATA API
- `WMATA_BUS_STOP_IDS_HOME`: The stop IDs for the bus stops near your home
- `WMATA_BUS_STOP_IDS_WORK`: The stop IDs for the bus stops near your work
- `METRO_RAIL_STATION_CODES_HOME`: The rails station codes for train stations new your home
- `METRO_RAIL_STATION_CODES_WORK`: The rails station codes for train stations new your work
- `CABI_STATION_IDS_HOME`: The station IDs for nearby CaBi stations
- `CABI_STATION_IDS_WORK`: The station IDs for nearby CaBi stations
- `PORT`: _Optional_, if you want other than the default (3000).

This app uses `dotenv` so you can set these in a `.env` file.

## Prerequisites

- Node.js **18.20 or newer**
- npm (comes with Node)
- `esbuild` (available in npm, via Linux repos, or `brew install esbuild` on Mac)

Run `npm install` to set up your environment. After the environment is setup you can start things up like this:

```
npm run build
npm start
```

There is also a development mode that will watch for changes and re-build in response:

```
npm run watch
```

When everything is running the app should be available on `http://localhost:3000/`
