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
exports.updateAutonomyRouter = void 0;
const express_1 = __importDefault(require("express"));
const autonomy_1 = require("../../models/autonomy");
const require_auth_1 = require("../auth/require-auth");
const router = express_1.default.Router();
exports.updateAutonomyRouter = router;
router.put('/api/autonomy/:date/:name', require_auth_1.requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, date } = req.params;
    const autonomy_ = yield autonomy_1.Autonomy.findOne({
        where: {
            autonomy: name,
            date,
        },
    });
    if (!autonomy_) {
        return res.status(401).send('autonomy does not exist');
    }
    const { autonomy, value, autonomy_rmks } = req.body;
    autonomy_.set({
        autonomy: autonomy ? autonomy : autonomy_.autonomy,
        value: value ? value : autonomy_.value,
        autonomy_rmks: autonomy_rmks ? autonomy_rmks : autonomy_.autonomy_rmks,
    });
    yield autonomy_.save();
    return res.send(autonomy_);
}));
