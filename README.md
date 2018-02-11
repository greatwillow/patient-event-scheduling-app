# Patient Event Scheduling App

Note: This project was bootstrapped with [Create React Native App].
To find out more, please visit [here](https://github.com/react-community/create-react-native-app).

## Overview

This is a simple events scheduling app designed to allow for patient based events to be created for specific date periods. Upon creating or updating an event, the app queries the user for the event duration and appropriately displays events for the dates they were assigned to.

To see a simple video demonstration of the app visit [here](https://gfycat.com/PerfumedFarGallowaycow?speed=2)

## Installation and Usage

To use this application, you will need to have Expo installed on your phone.

run `npm install` to install the dependencies.

run `npm start` to run the application.

## Technical Notes

This app was built alongside an external node.js backend application that can be seen [here](https://github.com/VernL/p-calendar-api/)

This app was created with offline state persistence in mind using redux-persist. The normal configuration allows for state to be persisted through sessions. This can be modified, however, by uncommenting persistor.purge(); inside app/data/configureStore.js.

Despite the persistence feature of this app, since the backend server does not currently support longer term database caching, backend storage is limited to 24 hours currently.
