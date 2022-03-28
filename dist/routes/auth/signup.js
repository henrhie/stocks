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
exports.SignupRouter = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../../models/user");
const secrets_1 = require("../../env/secrets");
const router = express_1.default.Router();
exports.SignupRouter = router;
router.post('/api/users/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, username, password, access_level } = req.body;
    try {
        const existingUser = yield user_1.User.findOne({ where: { username } });
        if (existingUser) {
            return res.send('user with this username already exists');
        }
    }
    catch (error) {
        return res.status(404).send(error);
    }
    user_1.User.create({
        name,
        username,
        password,
        access_level,
    })
        .then((user) => {
        const userJwt = jsonwebtoken_1.default.sign({
            id: user.id,
            username: user.username,
            name: name,
            access_level: user.access_level,
        }, secrets_1.token);
        user.password = '';
        res.status(201).send({ user, token: userJwt });
    })
        .catch((err) => {
        res.status(404).send(err);
    });
}));
