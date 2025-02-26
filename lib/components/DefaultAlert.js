"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blur_1 = require("@react-native-community/blur");
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const Error_1 = __importDefault(require("../animations/Error"));
const Success_1 = __importDefault(require("../animations/Success"));
const Warning_1 = __importDefault(require("../animations/Warning"));
const theme_1 = require("../constants/theme");
const types_1 = require("../types");
const width = react_native_1.Dimensions.get('window').width;
const padding = width * 10 / 100;
const DefaultAlert = ({ height, title, description, style, onLayout, type, fonts, meta }) => {
    const getIcon = () => {
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
    };
    return (react_1.default.createElement(react_native_1.Animated.View, { style: [
            Object.assign(Object.assign({}, styles.alert), { top: (react_native_1.Dimensions.get('window').height / 2) - (height / 2) }),
            style
        ], onLayout: onLayout, pointerEvents: 'none' },
        react_1.default.createElement(blur_1.BlurView, { blurRadius: 25, style: [
                styles.container,
                {
                    backgroundColor: meta.backgroundColor || styles.container.backgroundColor
                }
            ] },
            react_1.default.createElement(react_native_1.View, { style: styles.wrapper },
                getIcon(),
                react_1.default.createElement(react_native_1.Text, { style: [
                        styles.title,
                        {
                            fontFamily: fonts.bold || undefined,
                            color: meta.defaultColor || styles.title.color,
                            fontSize: styles.title.fontSize || meta.titleFontSize
                        }
                    ] }, title),
                description && (react_1.default.createElement(react_native_1.Text, { style: [
                        styles.description,
                        {
                            fontFamily: fonts.regular || undefined,
                            color: meta.defaultColor || styles.description.color,
                            fontSize: styles.description.fontSize || meta.descriptionFontSize
                        }
                    ] }, description))))));
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
        backgroundColor: 'rgba(49, 48, 55, 0.5)',
    },
    wrapper: {
        padding: 20,
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent'
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
exports.default = DefaultAlert;
