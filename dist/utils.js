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
exports.addToCsv = exports.generateCsv = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const generateCsv = (items) => {
    let csv = '';
    let keysCounter = 0;
    const keysAmount = Object.keys(items[0]).length;
    //generate headers for the csv
    for (let key in items[0]) {
        csv += key + (keysCounter + 1 < keysAmount ? ',' : '\r\n');
        keysCounter++;
    }
    // generate data items for csv
    for (let row = 0; row < items.length; row++) {
        keysCounter = 0;
        for (let key in items[row]) {
            csv += items[row][key] + (keysCounter + 1 < keysAmount ? ',' : '\r\n');
            keysCounter++;
        }
    }
    return csv;
};
exports.generateCsv = generateCsv;
const addToCsv = (item) => __awaiter(void 0, void 0, void 0, function* () {
    delete item._id;
    let csvFile;
    const keysAmount = Object.keys(item).length;
    let keysCounter = 0;
    try {
        csvFile = yield promises_1.default.readFile('splunk.data.csv', { encoding: 'utf-8' });
    }
    catch (error) {
        console.log(error.message);
    }
    if (!csvFile || csvFile.length === 0) {
        const csv = (0, exports.generateCsv)([item]);
        yield promises_1.default.writeFile('splunk.data.csv', csv);
        return;
    }
    for (let key in item) {
        csvFile += item[key] + (keysCounter + 1 < keysAmount ? ',' : '\r\n');
        keysCounter++;
    }
    try {
        yield promises_1.default.writeFile('splunk.data.csv', csvFile || '');
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.addToCsv = addToCsv;
