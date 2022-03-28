"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const requireAuth = (req, res, next) => {
    // if (!req.currentUser) {
    // 	res.send('Not authorized for this operation');
    // }
    next();
};
exports.requireAuth = requireAuth;
