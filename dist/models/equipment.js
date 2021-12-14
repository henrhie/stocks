"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Equipment = void 0;
const mongoose = require("mongoose");
const equipmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: String,
    current_l1: Number,
    current_l2: Number,
    current_l3: Number,
    power_kw: Number,
    power_kva: Number,
    utilization: Number,
    remark: String,
});
equipmentSchema.statics.build = (buildAttr) => {
    return new Equipment(buildAttr);
};
const Equipment = mongoose.model('Equipment', equipmentSchema);
exports.Equipment = Equipment;
