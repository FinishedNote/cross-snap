#!/usr/bin/env node

import { Command } from "commander";
import snapshot from "../lib/snapshot.js";

const program = new Command();

// set the CLI app name, description and version

program
  .name("cross-snap")
  .description(
    "Cross-Snap is a CLI tool that snapshots your site in Chrome, Firefox, and WebKit (Safari engine), then highlights rendering differences with a simple static report"
  )
  .option("--width <width>", "set the snapshot width")
  .option("--height <height>", "set the snapshot height")
  .option("--browsers <browsers>", "set the browser(s) to use")
  .version("0.0.1");

// accept a URL as a positional argument
program.argument("<url>", "URL to snapshot").action((url) => {
  // Get the options
  const options = program.opts();
  snapshot({ url, ...options });
});

program.parse(process.argv);
