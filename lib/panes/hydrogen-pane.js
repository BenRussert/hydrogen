/* @flow */

import { CompositeDisposable } from "atom";

import { INSPECTOR_URI, WATCHES_URI, OUTPUT_AREA_URI } from "./../utils";

export default class HydrogenPane {
  allowedLocations: Array<"bottom" | "left" | "right">;
  defaultLocation: "bottom" | "left" | "right";
  disposer: CompositeDisposable;
  element: HTMLElement;
  title: string;
  URI: string;

  constructor(props: {
    allowedLocations?: Array<"bottom" | "left" | "right">,
    classList?: Array<string>,
    defaultLocation?: "bottom" | "left" | "right",
    title: string,
    URI: string
  }) {
    this.URI = props.URI;
    this.title = props.title;
    this.disposer = new CompositeDisposable();

    this.element = document.createElement("div");
    if (props.classList) {
      this.element.classList.add("hydrogen", ...props.classList);
    } else {
      this.element.classList.add("hydrogen");
    }

    this.defaultLocation = props.defaultLocation || "right";
    this.allowedLocations = props.allowedLocations || [
      "bottom",
      "left",
      "right"
    ];
  }

  getDefaultLocations() {
    return this.defaultLocation;
  }

  getAllowedLocations() {
    return this.allowedLocations;
  }

  getURI() {
    return this.URI;
  }

  getTitle() {
    return this.title;
  }

  getElement() {
    return this.element;
  }

  destroy() {
    this.disposer.dispose();
    this.element.remove();
  }
}
