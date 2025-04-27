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
const theme_1 = require("../constants/theme");
const types_1 = require("../types");
const ButtonsAlert = ({ title, description, buttonClick, buttons, style, onLayout, fonts, meta }) => {
    const blurViewStyle = (0, react_1.useMemo)(() => ({
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0
    }), []);
    const containerStyle = (0, react_1.useMemo)(() => [
        styles.container,
        {
            backgroundColor: meta.backgroundColor || styles.container.backgroundColor
        }
    ], [meta.backgroundColor]);
    const titleStyle = (0, react_1.useMemo)(() => [
        styles.title,
        {
            fontFamily: fonts.bold,
            fontSize: meta.titleFontSize || styles.title.fontSize,
            color: meta.defaultColor || styles.title.color
        }
    ], [fonts.bold, meta.defaultColor, meta.titleFontSize]);
    const descriptionStyle = (0, react_1.useMemo)(() => [
        styles.description,
        {
            fontFamily: fonts.regular,
            color: meta.defaultColor || styles.description.color,
            fontSize: meta.descriptionFontSize || styles.description.fontSize
        }
    ], [fonts.regular, meta.defaultColor, meta.descriptionFontSize]);
    return (react_1.default.createElement(react_native_reanimated_1.default.View, { style: [
            styles.alert,
            style
        ], onLayout: onLayout },
        react_1.default.createElement(react_native_1.View, { style: { width: '100%' } },
            react_1.default.createElement(blur_1.BlurView, { blurRadius: 25, style: blurViewStyle }),
            react_1.default.createElement(react_native_1.View, { style: containerStyle },
                react_1.default.createElement(react_native_1.View, { style: styles.wrapper },
                    react_1.default.createElement(react_native_1.Text, { style: titleStyle }, title),
                    description && (react_1.default.createElement(react_native_1.Text, { style: descriptionStyle }, description))),
                buttons.length > 0 && (react_1.default.createElement(react_native_1.View, { style: [styles.buttonsContainer, styles.borderTop] }, buttons.map((button, i) => (react_1.default.createElement(ButtonItem, { key: i, button: button, buttonClick: buttonClick, index: i, totalButtons: buttons.length, fonts: fonts, meta: meta })))))))));
};
const ButtonItem = react_1.default.memo(({ button, buttonClick, index, totalButtons, fonts, meta }) => {
    const buttonStyle = (0, react_1.useMemo)(() => [
        styles.button,
        totalButtons === 2 && styles.buttonBetween,
        index === 0 && styles.buttonFirst,
        totalButtons > 2 && index > 0 && styles.borderTop
    ], [index, totalButtons]);
    const textStyle = (0, react_1.useMemo)(() => [
        styles.buttonText,
        {
            fontFamily: fonts.semiBold,
            fontSize: meta.buttonFontSize || styles.buttonText.fontSize,
            color: meta.defaultColor || styles.buttonText.color
        },
        (button.style === types_1.ButtonStyle.Bold || button.style === types_1.ButtonStyle.Cancel || button.style === types_1.ButtonStyle.Danger) && {
            fontFamily: fonts.extraBold
        },
        button.style === types_1.ButtonStyle.Danger && Object.assign(Object.assign({}, styles.buttonTextDanger), { color: meta.dangerColor || styles.buttonTextDanger.color })
    ], [button.style, fonts.extraBold, fonts.semiBold, meta.buttonFontSize, meta.dangerColor, meta.defaultColor]);
    return (react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: () => buttonClick(button.onPress), style: buttonStyle, activeOpacity: 0.6 },
        react_1.default.createElement(react_native_1.Text, { style: textStyle }, button.text)));
});
const styles = react_native_1.StyleSheet.create({
    alert: {
        borderRadius: 14,
        overflow: 'hidden'
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(49, 48, 55, 0.5)'
    },
    wrapper: {
        padding: 20,
        display: 'flex',
        alignItems: 'center'
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
    },
    borderTop: {
        borderTopColor: theme_1.theme.colors.border,
        borderTopWidth: 0.5,
    },
    buttonsContainer: {
        marginTop: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '100%'
    },
    buttonsBetween: {
        flexDirection: 'row'
    },
    buttonText: {
        fontSize: 17,
        color: theme_1.theme.colors.white,
        textAlign: 'center'
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        width: '100%'
    },
    buttonBetween: {
        width: '50%',
    },
    buttonTextDanger: {
        color: theme_1.theme.colors.red
    },
    buttonFirst: {
        borderRightColor: theme_1.theme.colors.border,
        borderRightWidth: 0.5,
    }
});
exports.default = react_1.default.memo(ButtonsAlert);
