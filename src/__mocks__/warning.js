// Mock for the `warning` npm package.
// In tests we silence warning() calls that would otherwise produce console.warn
// messages through third-party libraries (e.g. react-bootstrap prop-types-extra).
module.exports = function warning() { };
