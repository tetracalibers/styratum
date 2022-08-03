var _jsxFileName = "/Users/tomixy/.vscode/extensions/vscode-syrm-support/react/src/sample/Stack/Stack.tsx";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import Syrm from '../../components/Syrm';

const Stack = ({
  children,
  space = '1.7rem',
  recursive = false,
  separateFrom,
  isList = false,
  ...divProps
}) => {
  return /*#__PURE__*/React.createElement(Syrm, {
    place: "./Stack.syrm",
    props: [space, recursive, separateFrom, isList],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 5
    }
  }, /*#__PURE__*/React.createElement("div", _extends({}, divProps, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 7
    }
  }), children));
};

export default Stack;