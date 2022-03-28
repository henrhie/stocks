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
exports.showRouter = void 0;
const express_1 = __importDefault(require("express"));
const date_1 = require("../../models/date");
const equipment_1 = require("../../models/equipment");
const require_auth_1 = require("../auth/require-auth");
const router = express_1.default.Router();
exports.showRouter = router;
router.get('/api/equipment/:date/:name', require_auth_1.requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, date } = req.params;
    const equipment = yield equipment_1.Equipment.findOne({
        where: { equipment_name: name, date },
    });
    console.log(equipment);
    if (!equipment) {
        throw new Error('could not find equipment');
    }
    return res.send(equipment);
}));
router.get('/api/equipment/:date', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date } = req.params;
    const equipment = yield equipment_1.Equipment.findAll({ where: { date } });
    if (!equipment) {
        throw new Error('could not find equipment');
    }
    const _dates_ = yield date_1.Date.findAll();
    let _dates = _dates_.map((date) => date.date_artifact);
    _dates = [...new Set(_dates)];
    if (!_dates) {
        throw new Error('not date entries');
    }
    return res.send({ equipment, dates: _dates });
}));
