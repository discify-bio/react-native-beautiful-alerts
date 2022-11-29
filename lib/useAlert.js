"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Context_1 = __importDefault(require("./Context"));
const useAlert = () => {
    const alertContext = (0, react_1.useContext)(Context_1.default);
    const alert = (0, react_1.useMemo)(() => {
        return alertContext.current;
    }, [alertContext]);
    return alert;
};
exports.default = useAlert;
