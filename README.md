# Patient Event Scheduling App

Note: This project was bootstrapped with [Create React Native App].
To find out more, please visit:(https://github.com/react-community/create-react-native-app).

<https://gfycat.com/PerfumedFarGallowaycow?speed=2>

## Overview

This is a simple events scheduling app designed to allow for patient based events to be created for specific date periods. Upon creating or updating an event, the app queries the user for the event duration and appropriately displays events for the dates they were assigned to.

## Technical Notes

This app was created with offline state persistence in mind using redux-persist. The normal configuration allows for state to be persisted through sessions. This can be modified, however, by commenting out persistor.purge(); inside app/data/configureStore.js.
