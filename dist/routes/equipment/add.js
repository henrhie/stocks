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
const router = express_1.default.Router();
exports.addRouter = router;
router.post('/api/equipment', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const equipment = equipment_1.Equipment.build(Object.assign(Object.assign({}, req.body), { date: date.toLocaleDateString('en-GB') }));
    yield equipment.save();
    res.status(201).send(equipment);
}));
