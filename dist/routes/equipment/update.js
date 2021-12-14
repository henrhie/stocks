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
const router = express_1.default.Router();
exports.updateRouter = router;
router.put('/api/equipment/:date/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, date } = req.params;
    const equipment = yield equipment_1.Equipment.findOne({ name, date });
    if (!equipment) {
        throw new Error('equipment does not exist');
    }
    equipment.set(Object.assign({}, req.body));
    yield equipment.save();
    return res.send(equipment);
}));
