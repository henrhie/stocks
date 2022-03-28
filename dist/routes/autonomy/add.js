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
exports.addAutonomyRouter = void 0;
const express_1 = __importDefault(require("express"));
const autonomy_1 = require("../../models/autonomy");
const date_1 = require("../../models/date");
const utils_1 = require("../../utils");
const require_auth_1 = require("../auth/require-auth");
const router = express_1.default.Router();
exports.addAutonomyRouter = router;
router.post('/api/autonomy', require_auth_1.requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date()
        .toLocaleDateString()
        .replace('/', '-')
        .replace('/', '-');
    console.log('req.body ===> ', req.body);
    autonomy_1.Autonomy.create(Object.assign(Object.assign({}, req.body), { date: req.body.date ? req.body.date : date }))
        .then((autonomy) => __awaiter(void 0, void 0, void 0, function* () {
        (0, utils_1.addToCsv)(autonomy);
        yield date_1.Date.create({
            date_artifact: req.body.date ? req.body.date : date,
        });
        return res.status(201).send(autonomy);
    }))
        .catch((err) => {
        console.log(err);
    });
}));
