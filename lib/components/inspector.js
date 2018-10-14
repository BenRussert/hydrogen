/* @flow */

import React from "react";
import { observer } from "mobx-react";
import { Media, RichMedia } from "@nteract/outputs";

import { INSPECTOR_URI } from "./../utils";

import type Kernel from "./../kernel";

type Props = { store: { kernel: ?Kernel } };

function hide() {
  atom.workspace.hide(INSPECTOR_URI);
  return null;
}

const Inspector = observer(({ store: { kernel } }: Props) => {
  if (!kernel) return hide();

  const bundle = kernel.inspector.bundle;

  return (
    <div
      className="native-key-bindings"
      tabIndex="-1"
      style={{
        fontSize: atom.config.get(`Hydrogen.outputAreaFontSize`) || "inherit"
      }}
    >
      <RichMedia data={bundle}>
        <Media.HTML />
        <Media.Markdown />
        <Media.Plain />
      </RichMedia>
    </div>
  );
});

export default Inspector;
