"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigninRouter = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const password_1 = require("../../services/password");
const user_1 = require("../../models/user");
const secrets_1 = require("../../env/secrets");
const router = express_1.default.Router();
exports.SigninRouter = router;
router.post('/api/users/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield user_1.User.findOne({ where: { username } });
    if (!user) {
        return res.send('username or password is incorrect');
    }
    const match = yield password_1.Password.compare(user.password, password);
    if (!match) {
        return res.send('username or password incorrect');
    }
    const userJwt = jsonwebtoken_1.default.sign({
        id: user.id,
        username: user.username,
        name: user.name,
        access_level: user.access_level,
    }, secrets_1.token);
    // req.session = { jwt: userJwt };
    user.password = '';
    return res.status(201).send({ user, token: userJwt });
}));
