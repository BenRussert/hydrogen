"use babel";

import { CompositeDisposable } from "atom";

import hydrogenEmitter from "./../lib/plugin-api/hydrogen-emitter";
import store from "./../lib/store";

import HydrogenProvider from "./../lib/plugin-api/hydrogen-provider";

const testKernelName = "iMorseCode";

let kernelMock = {
  language: "language-iMorseCode",
  foo: true,
  kernelSpec: {
    language: "language-iMorseCode",
    display_name: "Display Name iMorseCode"
  },
  getPluginWrapper() {
    return { isPluginWrapper: true };
  }
};

let grammarMock = {
  scopeName: "source.iMorseCode",
  name: "language-iMorseCode"
};
let editorMock = {
  getGrammar() {
    return grammarMock;
  }
};
let { kernelSpecMock } = kernelMock;

const pretendHydrogen = {
  _hydrogen: "this is fake, but jasmine wont know",
  _happy: true,
  emitter: hydrogenEmitter.emitter
};

const hydrogenProvider = new HydrogenProvider(pretendHydrogen);

function resetStore() {
  store.subscriptions = new CompositeDisposable();
  store.startingKernels = new Map();
  store.runningKernels = new Map();
  store.editor = null;
  store.grammar = null;
}

beforeEach(() => {
  resetStore();
});

describe("hydrogenEmitter", () => {
  it("has defined emitter and an array of added reaction disposers", () => {
    expect(hydrogenEmitter.emitter).toBeDefined();
    expect(hydrogenEmitter.disposers).toBeDefined();
    expect(hydrogenEmitter.disposers.length).toEqual(jasmine.any(Number));
  });
});

describe("hydrogenProvider", () => {
  it("is defined ready", () => {
    expect(hydrogenProvider).toBeDefined();
    expect(hydrogenProvider.onDidChangeKernel).toBeDefined();
    expect(hydrogenProvider.getActiveKernel).toBeDefined();
    expect(hydrogenProvider.getCellRange).toBeDefined();
  });
});

let spyContainer;

describe("plugin api events", () => {
  beforeEach(() => {
    spyContainer = {
      kernelCallback(k) {
        return;
      }
    };

    spyOn(hydrogenEmitter.emitter, "on").and.callThrough();
    spyOn(editorMock, "getGrammar").and.returnValue(grammarMock);

    spyOn(spyContainer, "kernelCallback");
    hydrogenProvider.onDidChangeKernel(spyContainer.kernelCallback);
  });

  it("should register the callback", () => {
    expect(hydrogenEmitter.emitter.on).toHaveBeenCalled();
  });

  it("should only fire when kernel changes", () => {
    expect(store.runningKernels.size).toEqual(0);
    store.runningKernels.set(kernelMock.language, kernelMock);
    expect(spyContainer.kernelCallback).toHaveBeenCalledTimes(0);

    store.setGrammar(editorMock);
    expect(editorMock.getGrammar).toHaveBeenCalledTimes(1);
    expect(spyContainer.kernelCallback).toHaveBeenCalledTimes(1);

    store.setGrammar(undefined);
    expect(spyContainer.kernelCallback).toHaveBeenCalledTimes(2);
  });
});
