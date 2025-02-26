"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blur_1 = require("@react-native-community/blur");
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../constants/theme");
const types_1 = require("../types");
const width = react_native_1.Dimensions.get('window').width;
const padding = width * 10 / 100;
const ButtonsAlert = ({ height, title, description, buttonClick, buttons, style, onLayout, fonts, meta }) => {
    return (react_1.default.createElement(react_native_1.View, { style: [
            Object.assign(Object.assign({}, styles.alert), { top: (react_native_1.Dimensions.get('window').height / 2) - (height / 2) }),
            style
        ], onLayout: onLayout },
        react_1.default.createElement(blur_1.BlurView, { blurRadius: 25 },
            react_1.default.createElement(react_native_1.View, { style: [
                    styles.container,
                    {
                        backgroundColor: meta.backgroundColor || styles.container.backgroundColor
                    }
                ] },
                react_1.default.createElement(react_native_1.View, { style: styles.wrapper },
                    react_1.default.createElement(react_native_1.Text, { style: [
                            styles.title,
                            {
                                fontFamily: fonts.bold,
                                fontSize: meta.titleFontSize || styles.title.fontSize,
                                color: meta.defaultColor || styles.title.color
                            }
                        ] }, title),
                    description && (react_1.default.createElement(react_native_1.Text, { style: [
                            styles.description,
                            {
                                fontFamily: fonts.regular,
                                color: meta.defaultColor || styles.description.color,
                                fontSize: meta.descriptionFontSize || styles.description.fontSize
                            }
                        ] }, description))),
                buttons.length > 0 && (react_1.default.createElement(react_native_1.View, { style: [styles.buttonsContainer, styles.borderTop] }, buttons.map((button, i) => (react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: () => buttonClick(button.onPress), key: i, style: [
                        styles.button, buttons.length === 2 && styles.buttonBetween,
                        i === 0 && styles.buttonFirst,
                        buttons.length > 2 && i > 0 && styles.borderTop
                    ], activeOpacity: 0.6 },
                    react_1.default.createElement(react_native_1.Text, { style: [
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
                        ] }, button.text))))))))));
};
const styles = react_native_1.StyleSheet.create({
    alert: {
        position: 'absolute',
        width: width - (padding * 2),
        left: padding,
        top: react_native_1.Dimensions.get('window').height / 2,
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
exports.default = ButtonsAlert;
