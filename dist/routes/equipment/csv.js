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
exports.deleteRouter = void 0;
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const equipment_1 = require("../../models/equipment");
const utils_1 = require("../../utils");
const router = express_1.default.Router();
exports.deleteRouter = router;
router.get('/api/equipment/csv', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const equipment = yield equipment_1.Equipment.find({});
    const csvFile = (0, utils_1.generateCsv)(equipment);
    (0, fs_1.writeFile)('splunk.data.csv', csvFile, function (err) {
        if (err) {
            return res.status(501).send('bad file!');
        }
        res.send('csv file generated');
    });
}));
