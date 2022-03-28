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
exports.addPowerUsageRouter = void 0;
const express_1 = __importDefault(require("express"));
const date_1 = require("../../models/date");
const power_usage_1 = require("../../models/power-usage");
const utils_1 = require("../../utils");
const require_auth_1 = require("../auth/require-auth");
const router = express_1.default.Router();
exports.addPowerUsageRouter = router;
router.post('/api/power-usage', require_auth_1.requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date()
        .toLocaleDateString()
        .replace('/', '-')
        .replace('/', '-');
    const pue = parseFloat((req.body.total_cons / req.body.server_cons).toFixed(2));
    power_usage_1.PowerUsage.create(Object.assign(Object.assign({}, req.body), { date: req.body.date ? req.body.date : date, pue }))
        .then((powerUsage) => __awaiter(void 0, void 0, void 0, function* () {
        (0, utils_1.addToCsv)(powerUsage);
        const _date_ = yield date_1.Date.create({
            date_artifact: req.body.date ? req.body.date : date,
        });
        return res.status(201).send(powerUsage);
    }))
        .catch((err) => {
        console.log(err);
    });
}));
