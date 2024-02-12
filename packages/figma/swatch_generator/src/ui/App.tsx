import { NetworkMessages } from "@common/network/messages";

import { Button } from "@ui/components/Button";
import styles from "./main.module.css";

import { ComponentType } from "../generators/createComponent/base";

function App() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}> 3DS Swatch Generator </h2>
      <Button
        className={styles.button}
        onClick={() => {
          return NetworkMessages.CREATE_SWATCH.send({
            componentType: ComponentType.Button,
          });
        }}
      >
        Generate button swatch
      </Button>
      <Button
        className={styles.button}
        onClick={() => {
          return NetworkMessages.CREATE_SWATCH.send({
            componentType: ComponentType.Input,
          });
        }}
      >
        Generate input swatch
      </Button>
      <Button className={styles.button} onClick={() => NetworkMessages.TEST.send({})}>
        Test
      </Button>
    </div>
  );
}

export default App;
