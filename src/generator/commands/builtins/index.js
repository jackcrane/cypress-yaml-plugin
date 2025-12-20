import assertContains from "./assertContains.js";
import assertNotVisible from "./assertNotVisible.js";
import assertText from "./assertText.js";
import assertVisible from "./assertVisible.js";
import expectUrl from "./expectUrl.js";
import log from "./log.js";
import open from "./open.js";
import pause from "./pause.js";
import saveSnapshot from "./saveSnapshot.js";
import selectFile from "./selectFile.js";
import scrollIntoView from "./scrollIntoView.js";
import setViewport from "./setViewport.js";
import tapOn from "./tapOn.js";
import takeScreenshot from "./takeScreenshot.js";
import typeText from "./typeText.js";
import waitFor from "./waitFor.js";

export const builtinCommands = [
  assertContains,
  assertNotVisible,
  assertText,
  assertVisible,
  expectUrl,
  log,
  open,
  pause,
  saveSnapshot,
  selectFile,
  scrollIntoView,
  setViewport,
  tapOn,
  takeScreenshot,
  typeText,
  waitFor,
];
