"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonStyle = exports.AlertType = void 0;
var AlertType;
(function (AlertType) {
    AlertType[AlertType["None"] = 0] = "None";
    AlertType[AlertType["Regular"] = 1] = "Regular";
    AlertType[AlertType["Success"] = 2] = "Success";
    AlertType[AlertType["Error"] = 3] = "Error";
    AlertType[AlertType["Warning"] = 4] = "Warning";
    AlertType[AlertType["Message"] = 5] = "Message";
})(AlertType = exports.AlertType || (exports.AlertType = {}));
var ButtonStyle;
(function (ButtonStyle) {
    ButtonStyle[ButtonStyle["Cancel"] = 0] = "Cancel";
    ButtonStyle[ButtonStyle["Regular"] = 1] = "Regular";
    ButtonStyle[ButtonStyle["Bold"] = 2] = "Bold";
    ButtonStyle[ButtonStyle["Danger"] = 3] = "Danger";
})(ButtonStyle = exports.ButtonStyle || (exports.ButtonStyle = {}));
