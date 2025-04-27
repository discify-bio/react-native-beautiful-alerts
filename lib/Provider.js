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
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const ButtonsAlert_1 = __importDefault(require("./components/ButtonsAlert"));
const DefaultAlert_1 = __importDefault(require("./components/DefaultAlert"));
const theme_1 = require("./constants/theme");
const Context_1 = __importDefault(require("./Context"));
const types_1 = require("./types");
const Provider = ({ children, fonts, meta }) => {
    const opacity = (0, react_native_reanimated_1.useSharedValue)(0);
    const [height, setHeight] = (0, react_1.useState)(0);
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const [alertState, setAlertState] = (0, react_1.useState)({
        title: null,
        description: null,
        type: types_1.AlertType.None,
        buttons: []
    });
    const { title, description, type, buttons } = alertState;
    const alertShowingRef = (0, react_1.useRef)(false);
    const clearState = (0, react_1.useCallback)(() => {
        setIsOpen(false);
        setHeight(0);
        setAlertState(prev => (Object.assign(Object.assign({}, prev), { type: types_1.AlertType.None })));
        alertShowingRef.current = false;
    }, []);
    const processButtons = (0, react_1.useCallback)((buttons) => {
        if (!buttons || buttons.length === 0) {
            return [{ text: 'OK', style: types_1.ButtonStyle.Bold }];
        }
        const cancelButtonOnList = buttons.find(button => button.style === types_1.ButtonStyle.Cancel);
        if (!cancelButtonOnList) {
            return buttons;
        }
        const filteredButtons = buttons.filter(button => button.style !== types_1.ButtonStyle.Cancel);
        if (buttons.length > 2) {
            filteredButtons.push(cancelButtonOnList);
        }
        else {
            filteredButtons.unshift(cancelButtonOnList);
        }
        return filteredButtons;
    }, []);
    const setNewAlert = (0, react_1.useCallback)((alertData) => {
        const { title, description, type, buttons } = alertData;
        const processedButtons = processButtons(buttons);
        setAlertState({
            title,
            description: description || null,
            type: type !== null && type !== void 0 ? type : types_1.AlertType.Regular,
            buttons: processedButtons
        });
        setIsOpen(true);
        alertShowingRef.current = true;
        animateIn(type !== null && type !== void 0 ? type : types_1.AlertType.Regular);
    }, [processButtons]);
    const show = (0, react_1.useCallback)(({ title, description, type, buttons }) => {
        if (alertShowingRef.current) {
            opacity.value = (0, react_native_reanimated_1.withTiming)(0, {
                duration: 100,
                easing: react_native_reanimated_1.Easing.out(react_native_reanimated_1.Easing.ease)
            }, () => {
                (0, react_native_reanimated_1.runOnJS)(setNewAlert)({ title, description, type, buttons });
            });
        }
        else {
            setNewAlert({ title, description, type, buttons });
        }
    }, [opacity, setNewAlert]);
    const handleLayout = (0, react_1.useCallback)(({ nativeEvent: { layout: { height: layoutHeight } } }) => {
        if (!layoutHeight)
            return;
        setHeight(layoutHeight);
    }, []);
    const animateIn = (0, react_1.useCallback)((alertType) => {
        if (alertType === types_1.AlertType.Message) {
            opacity.value = (0, react_native_reanimated_1.withTiming)(1, { duration: 350, easing: react_native_reanimated_1.Easing.out(react_native_reanimated_1.Easing.ease) });
        }
        else {
            opacity.value = (0, react_native_reanimated_1.withSequence)((0, react_native_reanimated_1.withTiming)(1, { duration: 350 }), (0, react_native_reanimated_1.withDelay)(2500, (0, react_native_reanimated_1.withTiming)(0, { duration: 350 }, () => (0, react_native_reanimated_1.runOnJS)(clearState)())));
        }
    }, [clearState, opacity]);
    const success = (0, react_1.useCallback)((props) => {
        show(Object.assign(Object.assign({}, props), { type: types_1.AlertType.Success }));
    }, [show]);
    const error = (0, react_1.useCallback)((props) => {
        show(Object.assign(Object.assign({}, props), { type: types_1.AlertType.Error }));
    }, [show]);
    const warning = (0, react_1.useCallback)((props) => {
        show(Object.assign(Object.assign({}, props), { type: types_1.AlertType.Warning }));
    }, [show]);
    const message = (0, react_1.useCallback)((props) => {
        show(Object.assign(Object.assign({}, props), { type: types_1.AlertType.Message }));
    }, [show]);
    const buttonClick = (0, react_1.useCallback)((callback) => {
        if (callback)
            callback();
        opacity.value = (0, react_native_reanimated_1.withTiming)(0, {
            duration: 200,
            easing: react_native_reanimated_1.Easing.out(react_native_reanimated_1.Easing.ease)
        }, () => (0, react_native_reanimated_1.runOnJS)(clearState)());
    }, [clearState, opacity]);
    const animatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        return {
            opacity: opacity.value
        };
    }, [opacity]);
    const alertMethods = (0, react_1.useMemo)(() => ({
        message,
        success,
        error,
        warning
    }), [message, success, error, warning]);
    const ref = (0, react_1.useRef)(alertMethods);
    react_1.default.useEffect(() => {
        ref.current = alertMethods;
    }, [alertMethods]);
    const windowHeight = (0, react_1.useMemo)(() => react_native_1.Dimensions.get('window').height, []);
    const windowWidth = (0, react_1.useMemo)(() => react_native_1.Dimensions.get('window').width, []);
    const paddingHorizontal = (0, react_1.useMemo)(() => (windowWidth * 10) / 100, [windowWidth]);
    const positionStyle = (0, react_1.useMemo)(() => height ? { top: (windowHeight / 2) - (height / 2) } : {}, [height, windowHeight]);
    const messageAlertStyle = (0, react_1.useMemo)(() => ({
        position: 'absolute',
        left: paddingHorizontal,
        width: windowWidth - (paddingHorizontal * 2),
        top: height ? (windowHeight / 2) - (height / 2) : windowHeight / 2
    }), [height, windowHeight, windowWidth, paddingHorizontal]);
    const shouldRenderAlert = type !== types_1.AlertType.None && isOpen;
    return (react_1.default.createElement(Context_1.default.Provider, { value: ref },
        react_1.default.createElement(react_native_portalize_1.Host, null,
            react_1.default.createElement(react_native_portalize_1.Portal, null, shouldRenderAlert && (type === types_1.AlertType.Message ? (react_1.default.createElement(react_native_reanimated_1.default.View, { style: [{
                        backgroundColor: theme_1.theme.colors.backgroundModal,
                        flex: 1,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 99999
                    }, animatedStyle] },
                react_1.default.createElement(ButtonsAlert_1.default, { title: title, description: description, buttons: buttons, buttonClick: buttonClick, onLayout: handleLayout, style: messageAlertStyle, fonts: fonts, meta: meta }))) : (react_1.default.createElement(DefaultAlert_1.default, { title: title, description: description, type: type, style: [positionStyle, animatedStyle], onLayout: handleLayout, fonts: fonts, meta: meta })))),
            children)));
};
exports.default = react_1.default.memo(Provider);
