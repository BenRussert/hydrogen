/* @flow */

import { CompositeDisposable, Disposable } from "atom";

import React from "react";

import { reactFactory, OUTPUT_AREA_URI } from "./../utils";
import typeof store from "../store";
import OutputArea from "./../components/output-area";
import HydrogenPane from "./hydrogen-pane";

export default class OutputPane extends HydrogenPane {
  constructor(store: store) {
    const props = {
      title: "Hydrogen Output Area",
      URI: OUTPUT_AREA_URI
    };
    super(props);

    this.disposer.add(
      new Disposable(() => {
        if (store.kernel) store.kernel.outputStore.clear();
      })
    );
    reactFactory(
      <OutputArea store={store} />,
      this.element,
      null,
      this.disposer
    );
  }
}
