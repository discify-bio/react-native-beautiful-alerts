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
const blur_1 = require("@react-native-community/blur");
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importDefault(require("react-native-reanimated"));
const Error_1 = __importDefault(require("../animations/Error"));
const Success_1 = __importDefault(require("../animations/Success"));
const Warning_1 = __importDefault(require("../animations/Warning"));
const theme_1 = require("../constants/theme");
const types_1 = require("../types");
const width = react_native_1.Dimensions.get('window').width;
const padding = width * 10 / 100;
const DefaultAlert = ({ title, description, style, onLayout, type, fonts, meta }) => {
    const getIcon = (0, react_1.useMemo)(() => {
        switch (type) {
            case types_1.AlertType.Success:
                return react_1.default.createElement(Success_1.default, null);
            case types_1.AlertType.Error:
                return react_1.default.createElement(Error_1.default, null);
            case types_1.AlertType.Warning:
                return react_1.default.createElement(Warning_1.default, null);
            default:
                return null;
        }
    }, [type]);
    const titleStyle = (0, react_1.useMemo)(() => [
        styles.title,
        {
            fontFamily: fonts.bold || undefined,
            color: meta.defaultColor || styles.title.color,
            fontSize: styles.title.fontSize || meta.titleFontSize
        }
    ], [fonts.bold, meta.defaultColor, meta.titleFontSize]);
    const descriptionStyle = (0, react_1.useMemo)(() => [
        styles.description,
        {
            fontFamily: fonts.regular || undefined,
            color: meta.defaultColor || styles.description.color,
            fontSize: styles.description.fontSize || meta.descriptionFontSize
        }
    ], [fonts.regular, meta.defaultColor, meta.descriptionFontSize]);
    const blurViewStyle = (0, react_1.useMemo)(() => ({
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        backgroundColor: meta.backgroundColor || styles.container.backgroundColor
    }), [meta.backgroundColor]);
    return (react_1.default.createElement(react_native_reanimated_1.default.View, { style: [
            styles.alert,
            style
        ], onLayout: onLayout, pointerEvents: 'none' },
        react_1.default.createElement(react_native_1.View, { style: styles.container },
            react_1.default.createElement(blur_1.BlurView, { blurRadius: 25, style: blurViewStyle }),
            react_1.default.createElement(react_native_1.View, { style: styles.wrapper },
                getIcon,
                react_1.default.createElement(react_native_1.Text, { style: titleStyle }, title),
                description && (react_1.default.createElement(react_native_1.Text, { style: descriptionStyle }, description))))));
};
const styles = react_native_1.StyleSheet.create({
    alert: {
        position: 'absolute',
        width: width - (padding * 2),
        left: padding,
        borderRadius: 14,
        overflow: 'hidden'
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(49, 48, 55, 0.5)',
    },
    wrapper: {
        padding: 20,
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent',
        zIndex: 2
    },
    title: {
        fontSize: 18,
        color: theme_1.theme.colors.white,
        marginTop: 5,
        lineHeight: 24,
        textAlign: 'center'
    },
    description: {
        fontSize: 16,
        color: theme_1.theme.colors.white,
        lineHeight: 20,
        marginTop: 5,
        textAlign: 'center'
    }
});
exports.default = react_1.default.memo(DefaultAlert);
