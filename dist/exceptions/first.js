"use strict";
//===========================================================================================================
//?
//===========================================================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = void 0;
const template = (req, res) => {
    console.log(req);
    res.status(500).json({ message: req });
};
exports.template = template;
