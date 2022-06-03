import { useState } from "react";
// styles
import styles from "./MatrixForm.module.scss";

const MatrixForm = ({ onCreateMatrix }) => {
  // state
  const [M, setM] = useState("");
  const [N, setN] = useState("");
  const [X, setX] = useState("");

  return (
    <div className={styles.matrix_form_container}>
      <h1 className={styles.title}>Matrix Builder</h1>
      <form onSubmit={() => onCreateMatrix({ M, X, N })}>
        <div className={styles.matrix_form_row}>
          <span> Enter the number of columns </span>
          <input
            className={styles.input}
            type="number"
            onChange={(e) => setM(Math.abs(e.target.value))}
            value={M}
          />
        </div>
        <div className={styles.matrix_form_row}>
          <span> Enter the number of rows </span>
          <input
            className={styles.input}
            type="number"
            onChange={(e) => setN(Math.abs(e.target.value))}
            value={N}
          />
        </div>
        <div className={styles.matrix_form_row}>
          <span> Enter the number of cells </span>
          <input
            className={styles.input}
            type="number"
            onChange={(e) => setX(Math.abs(e.target.value))}
            value={X}
          />
        </div>
        <button
          className={styles.ui_button}
          type="submit"
          disabled={!M || !N || !X}
        >
          Create matrix
        </button>
      </form>
    </div>
  );
};

export default MatrixForm;
