import _ from "lodash";
import overrideMuiButton from './MuiButton.mjs'
import paletteOverrides from './palette.mjs'

export default _.merge(
    paletteOverrides,
    buttonOverrides
)



export const supportedButtonSizes = ['large', 'medium', 'small']
export const supportedButtonVariants = ['elevated', 'filled', 'tonal', 'outlined', 'text']
export const supportedButtonColors = ["primary", "secondary", "neutral", "success", "error", "warning", "info", "digital", "disabled"]
