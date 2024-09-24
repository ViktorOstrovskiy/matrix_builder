import { useState, useEffect } from "react";
// styles
import styles from "./MatrixTable.module.scss";

const MatrixTable = ({
  matrix,
  onDeleteRow,
  onAddRow,
  incrementCell,
  matrixParams,
}) => {
  // state
  const [currentPercentShowIndex, setCurrentPersentIndex] = useState(null);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [nearestSellAmounts, setNearestSellAmounts] = useState([]);

  // effects
  useEffect(() => {
    if (hoveredCell) onCellHovered();
    else setNearestSellAmounts([]);
  }, [hoveredCell]);

  // helpers
  const onCellHovered = () => {
    let flaxMatrix = [...matrix];
    flaxMatrix.splice(matrix.length - 1, 1);
    flaxMatrix = flaxMatrix.flat();
    const currentElIndex = flaxMatrix.findIndex(
      (el) => el.id === hoveredCell.id
    );
    flaxMatrix.splice(currentElIndex, 1);
    flaxMatrix.sort((a, b) => {
      const currentDifference = Math.abs(hoveredCell.amount - a.amount);
      const nextDifference = Math.abs(hoveredCell.amount - b.amount);
      return currentDifference >= nextDifference ? 1 : -1;
    });
    setNearestSellAmounts(flaxMatrix.slice(0, matrixParams.X));
  };

  const cellClasses = (index, cell) => {
    let classStr = styles.matrix_cell;
    if (index === matrix.length - 1) {
      return styles.avarage_values_cells_matrix_cell;
    }

    if (hoveredCell?.id === cell.id) {
      return styles.hovered_cell_matrix_cell;
    }
    if (nearestSellAmounts.includes(cell)) {
      return styles.nearest_amount_cell_matrix_cell;
    }
    return classStr;
  };

  const calculateRowSum = (row) => {
    return row.reduce((sum, current) => sum + current.amount, 0);
  };

  const calculatePercent = (amount, sum) => {
    return `${Math.round((amount * 100) / sum)}%`;
  };

  return (
    <div className={styles.matrix_table}>
      <div>
      {matrix.map((row, index) => {
        const sum = calculateRowSum(row).toFixed(0);
        return (
          <div key={index} className={styles.matrix_row}>
            {row.map((cell, cellIndex) => {
              return (
                <div
                  key={cell.id}
                  onClick={() => incrementCell(index, cellIndex)}
                  onMouseLeave={() => setHoveredCell(null)}
                  onMouseOver={() => setHoveredCell(cell)}
                  className={cellClasses(index, cell)}
                >
                  {currentPercentShowIndex === index
                    ? calculatePercent(cell.amount, sum)
                    : cell.amount}
                </div>
              );
            })}
            <div
              className={styles.sum_cell}
              onMouseLeave={() => setCurrentPersentIndex(null)}
              onMouseOver={() => setCurrentPersentIndex(index)}
            >
              {sum}
            </div>
            {index !== matrix.length - 1 && (
              <button
                className={styles.delete_row}
                onClick={() => onDeleteRow(index)}
              >
                ✕
              </button>
            )}
          </div>
        );
      })}

      <button className={styles.ui_button} onClick={onAddRow}>
        Add row
      </button>
        </div>
      </div>
  );
};

export default MatrixTable;
