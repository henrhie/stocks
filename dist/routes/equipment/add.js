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
exports.addRouter = void 0;
const express_1 = __importDefault(require("express"));
const equipment_1 = require("../../models/equipment");
const date_1 = require("../../models/date");
const utils_1 = require("../../utils");
const require_auth_1 = require("../auth/require-auth");
const router = express_1.default.Router();
exports.addRouter = router;
const equipmentToKVA = {
    'AVR 1 (250 kVA)': 250.0,
    'AVR 2 (250 kVA)': 250.0,
    'UPS A (120 kVA)': 120.0,
    'UPS B (120 kVA)': 120.0,
    'Genset A (400 kVA)': 400.0,
    'Genset B (400 kVA)': 400.0,
};
router.post('/api/equipment', require_auth_1.requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date()
        .toLocaleDateString()
        .replace('/', '-')
        .replace('/', '-');
    const util_ = (parseFloat(req.body.power_kva) /
        equipmentToKVA[req.body.equipment_name]) *
        100;
    const utilization = req.body.power_kva ? parseFloat(util_.toFixed(2)) : 0;
    equipment_1.Equipment.create(Object.assign(Object.assign({}, req.body), { date: req.body.date ? req.body.date : date, utilization, remark: req.body.equipment_rmks || '', power_kva: parseFloat(req.body.power_kva), user: req.body.user }))
        .then((equipment) => __awaiter(void 0, void 0, void 0, function* () {
        (0, utils_1.addToCsv)(equipment);
        yield date_1.Date.create({
            date_artifact: req.body.date ? req.body.date : date,
        });
        return res.status(201).send(equipment);
    }))
        .catch((err) => {
        console.log(err);
    });
}));
