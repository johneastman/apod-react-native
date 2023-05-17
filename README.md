# APOD

A mobile app that uses NASA's Astronomy Picture of the Day (APOD) API to display the current APOD. This project is a React Native implementation of their [official site](https://apod.nasa.gov/apod/).

This project replaces the [old Android app](https://github.com/johneastman/APOD), which was written in Java.

## Resources

-   NASA APOD API documentation: https://github.com/nasa/apod-api

## Installation

1. Run `npm install` from root directory.

## Setup

1. Generate a NASA API key [here](https://api.nasa.gov/).
2. Create a file called `.env` in the root directory of this project.
3. Add your API key to that file with the key `API_KEY`.

### Run on Android Device

1. Download Android Studio
1. Install [`Android 13 (Tiramisu)`](https://reactnative.dev/docs/environment-setup?guide=native#android-sdk)
1. Run `npx expo run:android --device`

Additional steps/resources can be found [here](https://reactnative.dev/docs/environment-setup?guide=native).

## Testing

-   APOD with video: 2022-07-09 (The month is August but the value is 7 because months are 0-based indices for JavaScript `Date` objects).
