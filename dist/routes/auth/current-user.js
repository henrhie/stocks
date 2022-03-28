"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUserRouter = void 0;
const express_1 = __importDefault(require("express"));
const require_auth_1 = require("./require-auth");
const router = express_1.default.Router();
exports.currentUserRouter = router;
router.get('/api/users/current_user', require_auth_1.requireAuth, (req, res) => {
    return res.send({ currentUser: req.currentUser || null });
});
