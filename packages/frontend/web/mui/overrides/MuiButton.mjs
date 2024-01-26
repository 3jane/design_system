import 'lodash.product';
import _ from "lodash";

export default function overrideMuiButton(tokens, variants, colors, interactions, sizes, states) {
    return {
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        // No uppercase
                        textTransform: 'none',
                        // Sizes
                        '&.MuiButton-sizeSmall': {
                            height: tokens.components.button.size.small.height,
                            borderRadius: tokens.components.button.size.small.radius,
                            font: tokens.components.button.font.small,
                        },
                        '&.MuiButton-sizeMedium': {
                            height: tokens.components.button.size.medium.height,
                            borderRadius: tokens.components.button.size.medium.radius,
                            font: tokens.components.button.font.medium,
                        },
                        '&.MuiButton-sizeLarge': {
                            height: tokens.components.button.size.large.height,
                            borderRadius: tokens.components.button.size.large.radius,
                            font: tokens.components.button.font.large,
                        },
                    }
                },
                // TODO: Try generating separate variants for [variants], [variants, colors], [size], etc,
                //  to minimize the number of combinations
                variants: _.product(variants, colors).map(
                    ([variant, color]) => {
                        const style = {
                            props: {variant: variant, color: color},
                            style: {
                                color: tokens.components.button.color[variant][color].text,
                                borderColor: tokens.components.button.color[variant][color].border,
                                backgroundColor: tokens.components.button.color[variant][color].fill,
                                borderWidth: tokens.components.button.border[variant],
                                boxShadow: tokens.components.button.elevation[variant].enabled,
                                '&:hover': {
                                    backgroundColor: tokens.components.button.color[variant][color].hovered,
                                    boxShadow: tokens.components.button.elevation[variant].hovered
                                },
                                '&:focus': {
                                    boxShadow: tokens.components.button.elevation[variant].focused
                                },
                                '&:active': {
                                    backgroundColor: tokens.components.button.color[variant][color].pressed,
                                    boxShadow: tokens.components.button.elevation[variant].active
                                },
                                '&.MuiButton-icon': {
                                    color: tokens.components.button.color[variant][color].text,
                                },
                            }
                        }
                        return style
                    }
                )
            },
        },
    }
}
