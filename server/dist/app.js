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
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const schema_1 = __importDefault(require("./schema/schema"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const apollo_server_express_1 = require("apollo-server-express");
const PORT = config_1.default.get('port') || 5001;
const app = express_1.default();
app.use(cors_1.default());
function db_start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect('mongodb://db:27017/booking', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });
        }
        catch (e) {
            console.log("Server Error", e.message);
            process.exit(1);
        }
    });
}
db_start();
app.use(body_parser_1.default.json({ limit: '10mb' }));
const server = new apollo_server_express_1.ApolloServer({ schema: schema_1.default });
server.applyMiddleware({ app, path: '/graphql' });
app.listen(PORT, () => {
    console.info(`Server started on port ${PORT}`);
});
