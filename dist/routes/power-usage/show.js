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
exports.showPowerUsageRouter = void 0;
const express_1 = __importDefault(require("express"));
const power_usage_1 = require("../../models/power-usage");
const require_auth_1 = require("../auth/require-auth");
const router = express_1.default.Router();
exports.showPowerUsageRouter = router;
router.get('/api/power-usage/:date', require_auth_1.requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date } = req.params;
    const powerUsage = yield power_usage_1.PowerUsage.findAll({ where: { date } });
    if (!powerUsage) {
        return res.send('not entries found');
    }
    return res.send(powerUsage);
}));
