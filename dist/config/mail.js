"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'italojonasti@gmail.com',
      name: 'Ítalo'
    }
  }
};
exports.default = _default;