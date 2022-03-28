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
exports.updateRouter = void 0;
const express_1 = __importDefault(require("express"));
const equipment_1 = require("../../models/equipment");
const require_auth_1 = require("../auth/require-auth");
const router = express_1.default.Router();
exports.updateRouter = router;
const equipmentToKVA = {
    'AVR 1 (250 kVA)': 250.0,
    'AVR 2 (250 kVA)': 250.0,
    'UPS A (120 kVA)': 120.0,
    'UPS B (120 kVA)': 120.0,
    'Genset A (400 kVA)': 400.0,
    'Genset B (400 kVA)': 400.0,
};
router.put('/api/equipment/:date/:name', require_auth_1.requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, date } = req.params;
    const equipment = yield equipment_1.Equipment.findOne({
        where: { equipment_name: name, date },
    });
    if (!equipment) {
        throw new Error('equipment does not exist');
    }
    const { current_l1, current_l2, current_l3, power_kva, power_kw, remark, equipment_name, } = req.body;
    const util_ = (power_kva / equipmentToKVA[equipment_name]) * 100;
    const utilization = parseFloat(util_.toFixed(2));
    console.log(equipmentToKVA[equipment_name]);
    console.log(typeof utilization);
    equipment.set({
        equipment_name: req.body.equipment_name,
        current_l1: current_l1,
        current_l2: current_l2,
        current_l3: current_l3,
        power_kva: power_kva,
        power_kw: power_kw,
        remark: remark,
        utilization,
    });
    yield equipment.save();
    return res.send(equipment);
}));
