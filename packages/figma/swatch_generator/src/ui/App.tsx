import { NetworkMessages } from "@common/network/messages";

import { Button } from "@ui/components/Button";
import styles from "./main.module.css";

import { ComponentType } from "../generators/createComponent/base";

function App() {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const { type } = Object.fromEntries(new FormData(e.currentTarget));

    NetworkMessages.CREATE_SWATCH.send({
      componentType: type as ComponentType,
    });
  };

  const handleGetId = () => {
    NetworkMessages.TEST.send({});
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2 className={styles.title}> 3DS Swatch Generator </h2>

      <label>
        <span>Select component</span>
        <br />
        <select name="type">
          <option value={ComponentType.Icon}>Icon</option>
          <option value={ComponentType.Button}>Button</option>
        </select>
      </label>
      <br />
      <Button type="submit">Generate</Button>
      <br />
      <Button type="button" onClick={handleGetId}>
        Get id
      </Button>
    </form>
  );
}

export default App;
