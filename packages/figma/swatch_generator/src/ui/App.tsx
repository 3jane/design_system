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
          <option value={ComponentType.Input}>Input</option>
          <option value={ComponentType.Breadcrumbs}>Breadcrumbs</option>
          <option value={ComponentType.Pagination}>Pagination</option>
          <option value={ComponentType.Slider}>Slider</option>
          <option value={ComponentType.Checkbox}>Checkbox</option>
          <option value={ComponentType.RadioButton}>RadioButton</option>
          <option value={ComponentType.Badge}>Badge</option>
          <option value={ComponentType.Tag}>Tag</option>
          <option value={ComponentType.FAB}>FAB</option>
          <option value={ComponentType.Switch}>Switch</option>
          <option value={ComponentType.Button}>Button</option>
          <option value={ComponentType.Icon}>Icon</option>
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
