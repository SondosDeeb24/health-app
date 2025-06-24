"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.async_handler = void 0;
const async_handler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
exports.async_handler = async_handler;
