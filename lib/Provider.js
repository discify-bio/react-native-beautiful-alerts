"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_portalize_1 = require("react-native-portalize");
const ButtonsAlert_1 = __importDefault(require("./components/ButtonsAlert"));
const DefaultAlert_1 = __importDefault(require("./components/DefaultAlert"));
const theme_1 = require("./constants/theme");
const Context_1 = __importDefault(require("./Context"));
const types_1 = require("./types");
const Provider = ({ children, fonts }) => {
    const opacity = (0, react_1.useRef)(new react_native_1.Animated.Value(0)).current;
    const [height, setHeight] = (0, react_1.useState)(0);
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const [title, setTitle] = (0, react_1.useState)(null);
    const [description, setDescription] = (0, react_1.useState)(null);
    const [type, setType] = (0, react_1.useState)(types_1.AlertType.None);
    const [buttons, setButtons] = (0, react_1.useState)([]);
    const ref = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        ref.current = {
            message,
            success,
            error,
            warning
        };
    }, []);
    const show = ({ title, description, type, buttons }) => {
        setTitle(title);
        setDescription(description || null);
        setType(type !== null && type !== void 0 ? type : types_1.AlertType.Regular);
        if (buttons) {
            const cancelButtonOnList = buttons.find(button => button.style === types_1.ButtonStyle.Cancel);
            if (!cancelButtonOnList)
                return setButtons(buttons);
            const filteredButtons = buttons.filter(button => button.style !== types_1.ButtonStyle.Cancel);
            if (buttons.length > 2) {
                filteredButtons.push(cancelButtonOnList);
            }
            else {
                filteredButtons.unshift(cancelButtonOnList);
            }
            setButtons(filteredButtons);
        }
        else {
            setButtons([{ text: 'OK', style: types_1.ButtonStyle.Bold }]);
        }
    };
    const start = ({ nativeEvent: { layout: { height } } }) => {
        if (height === 0)
            return;
        setHeight(() => {
            setIsOpen(true);
            react_native_1.Animated.sequence([
                react_native_1.Animated.timing(opacity, {
                    useNativeDriver: true,
                    toValue: 1,
                    duration: 350,
                    delay: 100
                }),
                type !== types_1.AlertType.Message ?
                    react_native_1.Animated.timing(opacity, {
                        useNativeDriver: true,
                        toValue: 0,
                        duration: 350,
                        delay: 2500
                    }) : undefined
            ].filter(r => r)).start(() => type !== types_1.AlertType.Message && clearState());
            return height;
        });
    };
    const success = (props) => {
        show(Object.assign(Object.assign({}, props), { type: types_1.AlertType.Success }));
    };
    const error = (props) => {
        show(Object.assign(Object.assign({}, props), { type: types_1.AlertType.Error }));
    };
    const warning = (props) => {
        show(Object.assign(Object.assign({}, props), { type: types_1.AlertType.Warning }));
    };
    const message = (props) => {
        show(Object.assign(Object.assign({}, props), { type: types_1.AlertType.Message }));
    };
    const buttonClick = (callback) => {
        if (callback)
            callback();
        react_native_1.Animated.timing(opacity, {
            useNativeDriver: true,
            toValue: 0,
            duration: 200
        }).start(clearState);
    };
    const clearState = () => {
        setIsOpen(false);
        setHeight(0);
        setType(types_1.AlertType.None);
    };
    return (react_1.default.createElement(Context_1.default.Provider, { value: ref },
        react_1.default.createElement(react_native_portalize_1.Host, null,
            react_1.default.createElement(react_native_portalize_1.Portal, null, type === types_1.AlertType.None ? null
                : type === types_1.AlertType.Message ? (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(ButtonsAlert_1.default, { height: height, title: title, description: description, buttons: buttons, buttonClick: buttonClick, style: {
                            opacity: 0,
                            top: 10000,
                            left: 10000
                        }, onLayout: start, fonts: fonts }),
                    isOpen && (react_1.default.createElement(react_native_1.Animated.View, { style: {
                            backgroundColor: theme_1.theme.colors.backgroundModal,
                            flex: 1,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 99999,
                            opacity
                        } },
                        react_1.default.createElement(ButtonsAlert_1.default, { height: height, title: title, description: description, buttons: buttons, buttonClick: buttonClick, fonts: fonts }))))) : (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(DefaultAlert_1.default, { height: height, title: title, description: description, onLayout: start, style: {
                            opacity: 0,
                            top: 10000,
                            left: 10000
                        }, fonts: fonts }),
                    isOpen && (react_1.default.createElement(DefaultAlert_1.default, { height: height, title: title, description: description, type: type, style: {
                            opacity: opacity
                        }, fonts: fonts }))))),
            children)));
};
exports.default = Provider;
