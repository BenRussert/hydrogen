/* @flow */

import { CompositeDisposable } from "atom";

import React from "react";

import { reactFactory, WATCHES_URI } from "./../utils";
import typeof store from "../store";
import Watches from "./../components/watch-sidebar";
import HydrogenPane from "./hydrogen-pane";

export default class WatchesPane extends HydrogenPane {
  constructor(store: store) {
    const props = {
      title: "Hydrogen Watch",
      URI: WATCHES_URI,
      allowedLocations: ["right", "left"]
    };

    super(props);

    reactFactory(<Watches store={store} />, this.element, null, this.disposer);
  }
}
