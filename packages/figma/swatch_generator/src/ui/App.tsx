import {useState} from "react";
import * as Networker from "monorepo-networker";
import {NetworkMessages} from "@common/network/messages";

import {Button} from "@ui/components/Button";
import styles from './main.module.css';

import {createComponentSwatch} from "../generators/createComponentSwatch"
import {createButton, TDSButtonTokens, TDSButtonVariant} from "../generators/createComponent/createButton"

import tokens from "../../../../../build/json/tokens.json"

const variants = [
    {name: 'variant', values: ["elevated", "filled"]},
    {name: 'interaction', values: ["primary", "secondary"]},
    {name: 'color', values: ["small", "medium", "large"]},
    {name: 'size', values: ['enabled', 'disabled']},
]

const buttonTokens = TDSButtonTokens.fromJSON(tokens.components.button)

function App() {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}> 3DS Swatch Generator </h2>
            <Button
                className={styles.button}
                onClick={() =>
                    NetworkMessages.CREATE_SWATCH.send({
                        frame: figma.currentPage,
                        fn: createComponentSwatch,
                        params: {
                            componentName: 'Button',
                            tokens: tokens,
                            variants: variants,
                            createComponent: createButton
                        }
                    })
                }
            >
                Generate button swatch
            </Button>
        </div>
    );
}

export default App;
