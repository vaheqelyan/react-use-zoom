import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import alias from "rollup-plugin-alias";
import sucrase from "rollup-plugin-sucrase";

import babel from "rollup-plugin-babel";

const umdGlobals = {
  react: "React",
  "prop-types": "propTypes",
};

export default {
  input: "src/index.js",
  output: {
    name: "ReactUseZoom",
    file: "build/index.umd.js",
    format: "umd",
    globals: umdGlobals,
  },
  external: Object.keys(umdGlobals),
  plugins: [
    nodeResolve(),
    commonjs({ include: "**/node_modules/**" }),
    replace({ "process.env.NODE_ENV": JSON.stringify("development") }),

    sucrase({
      exclude: ["**/node_modules/**"],
      transforms: ["typescript"],
    }),

    alias({
      react: "node_modules/react/umd/react.development.js",
      "react-dom": "./node_modules/react-dom/umd/react-dom.development.js",
    }),
    sizeSnapshot(),
  ],
};
