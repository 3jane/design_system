import {NetworkMessages} from "@common/network/messages";

import {Button} from "@ui/components/Button";
import styles from './main.module.css';

import tokens from "../../../../../build/json/tokens.json"
import {ComponentType} from "../generators/createComponent/base";

const variants = [
    {name: 'type', values: ["filled", "tonal"]},
    {name: 'color', values: ["primary", "secondary", "neutral", "digital", "error", 'success', 'warning', 'info']},
    {name: 'size', values: ["small", "medium", "large"]},
    {name: 'interaction', values: ['enabled', 'hovered', 'focused', 'interacted']},
]


function App() {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}> 3DS Swatch Generator </h2>
            <Button
                className={styles.button}
                onClick={() =>
                    NetworkMessages.CREATE_SWATCH.send({
                        componentType: ComponentType.Button,
                        tokens: tokens.components.button,
                        variants: variants,
                    })
                }
            >
                Generate button swatch
            </Button>
            <Button
                className={styles.button}
                onClick={() =>
                    NetworkMessages.TEST.send({})
                }
            >
                Test
            </Button>
        </div>
    );
}

export default App;
