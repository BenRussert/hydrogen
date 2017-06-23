/* @flow */

import React from "react";

import { reactFactory, INSPECTOR_URI } from "./../utils";
import typeof store from "../store";
import Inspector from "./../components/inspector";
import HydrogenPane from "./hydrogen-pane";

export default class InspectorPane extends HydrogenPane {
  constructor(store: store) {
    const props = {
      title: "Hydrogen Inspector",
      URI: INSPECTOR_URI,
      defaultLocation: "bottom",
      classList: ["inspector"]
    };

    super(props);

    reactFactory(
      <Inspector store={store} />,
      this.element,
      null,
      this.disposer
    );
  }
}
