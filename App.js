import React, { Component } from "react";

import { createStore } from "redux";
import { Provider } from "react-redux";
import configureStore from "./app/data/configureStore";
import Root from "./app/containers/Root";

export default class App extends Component {
  render() {
    store = configureStore;
    return (
      <Provider store={configureStore}>
        <Root />
      </Provider>
    );
  }
}
