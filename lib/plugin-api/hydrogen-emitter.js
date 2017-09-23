/* @flow */

import { Emitter, CompositeDisposable, Disposable } from "atom";
import { autorun } from "mobx";
import store from "../store";

// This is a store for our mobx style reactions events used to for the plugin api
class HydrogenEmitter {
  emitter: atom$Emitter = new Emitter();
  disposers: Array<() => void> = [];

  addReaction(reaction: () => void) {
    // mobx reactions return a disposer function which is called with no arguments
    this.disposers.push(reaction);
  }

  dispose() {
    this.disposers.forEach(disposer => disposer());
  }
}

const hydrogenEmitter = new HydrogenEmitter();

// Add any reactions for our plugin api events
hydrogenEmitter.addReaction(
  autorun(() => {
    hydrogenEmitter.emitter.emit("did-change-kernel", store.kernel);
  })
);

export default hydrogenEmitter;
