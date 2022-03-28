"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secrets_1 = require("../../env/secrets");
const validateUser = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return next();
        }
        const payload = jsonwebtoken_1.default.verify(authorization.substring(7), secrets_1.token);
        if (payload)
            req.currentUser = payload;
    }
    catch (err) {
        console.log(err.message);
    }
    next();
};
exports.validateUser = validateUser;
