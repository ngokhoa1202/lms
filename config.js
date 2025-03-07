"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const module_alias_1 = __importDefault(require("module-alias"));
const NODE_ENV = (process.env.NODE_ENV ?? 'development');
const env = dotenv_1.default.config({
    path: path_1.default.join(__dirname, `./environment/.env.${NODE_ENV}`)
});
if (env.error) {
    throw env.error;
}
if (__filename.endsWith('js')) {
    module_alias_1.default.addAlias('@src', __dirname + '/dist');
}
