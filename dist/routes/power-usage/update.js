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
exports.updatePowerUsageRouter = void 0;
const express_1 = __importDefault(require("express"));
const power_usage_1 = require("../../models/power-usage");
const require_auth_1 = require("../auth/require-auth");
const router = express_1.default.Router();
exports.updatePowerUsageRouter = router;
router.put('/api/power-usage/:date', require_auth_1.requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date } = req.params;
    const powerUsage = yield power_usage_1.PowerUsage.findOne({ where: { date } });
    if (!powerUsage) {
        return res.send('power usage does not exist');
    }
    let pue;
    const { facility, server_cons, total_cons, facility_rmks } = req.body;
    const server_cons_ = server_cons ? server_cons : powerUsage.server_cons;
    const total_cons_ = total_cons ? total_cons : powerUsage.total_cons;
    if (server_cons_ && total_cons_) {
        pue = parseFloat((total_cons_ / server_cons_).toFixed(2));
    }
    powerUsage.set({
        facility: facility ? facility : powerUsage.facility,
        server_cons: server_cons ? server_cons : powerUsage.server_cons,
        total_cons: total_cons ? total_cons : powerUsage.total_cons,
        facility_rmks: facility_rmks ? facility_rmks : powerUsage.facility_rmks,
        pue: pue ? pue : powerUsage.pue,
    });
    yield powerUsage.save();
    return res.send(powerUsage);
}));
