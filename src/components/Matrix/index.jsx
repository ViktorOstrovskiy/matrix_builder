import { useSelector, useDispatch } from "react-redux";
// adction
import {
  createMatrix,
  deleteRow,
  addRow,
  incrementCell,
} from "../../store/matrix-service/action";
// components
import MatrixForm from "../MatrixForm";
import MatrixTable from "../MatrixTable";
// styles
import styles from "./Matrix.module.scss";

const Matrix = () => {
  // useSelector
  const { matrix, matrixParams } = useSelector((state) => state.matrix);

  // dispatch
  const dispatch = useDispatch();

  return (
    <section className={styles.matrix_container}>
      {matrix ? (
        <MatrixTable
          matrix={matrix}
          matrixParams={matrixParams}
          incrementCell={(rowIndex, cellIndex) =>
            dispatch(incrementCell({ rowIndex, cellIndex }))
          }
          onDeleteRow={(index) => dispatch(deleteRow(index))}
          onAddRow={() => dispatch(addRow())}
        />
      ) : (
        <MatrixForm
          onCreateMatrix={(params) => dispatch(createMatrix(params))}
        />
      )}
    </section>
  );
};

export default Matrix;
