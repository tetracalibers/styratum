var _jsxFileName = "/Users/tomixy/.vscode/extensions/vscode-syrm-support/react/src/sample/Stack/Stack.tsx";
import Syrm from '../../components/Syrm';
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";

const Stack = ({
  children,
  space = '1.7rem',
  recursive = false,
  separateFrom,
  isList = false,
  ...divProps
}) => {
  return /*#__PURE__*/_jsxDEV(Syrm, {
    place: "./Stack.syrm",
    props: [space, recursive, separateFrom, isList],
    children: /*#__PURE__*/_jsxDEV("div", { ...divProps,
      children: children
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 23,
    columnNumber: 5
  }, this);
};

export default Stack;