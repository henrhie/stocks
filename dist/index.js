"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose = require("mongoose");
const cookie_session_1 = __importDefault(require("cookie-session"));
const add_1 = require("./routes/equipment/add");
const update_1 = require("./routes/equipment/update");
const delete_1 = require("./routes/equipment/delete");
const secrets_1 = require("./env/secrets");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_session_1.default)({
    secure: false,
    signed: false,
}));
app.use(add_1.addRouter);
app.use(update_1.updateRouter);
app.use(delete_1.deleteRouter);
const PORT = 3000;
mongoose
    .connect(secrets_1.mongoURL)
    .then(() => {
    console.log('connected to database');
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error(err);
});
