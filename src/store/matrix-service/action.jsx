import { createSlice } from "@reduxjs/toolkit";
import { calculateAvarages } from "../../core/helpers";

const generateItem = (rowIndex, columnIndex) => {
  return {
    id: `${rowIndex}-${columnIndex}`,
    amount: Math.floor(100 + Math.random() * (999 + 1 - 100)),
  };
};

export const matrixReducer = createSlice({
  name: "matrix",
  initialState: {
    matrix: null,
    matrixParams: {
      M: null,
      N: null,
      X: null,
    },
  },
  reducers: {
    createMatrix: (state, { payload }) => {
      state.matrixParams = payload;
      const matrix = [];
      for (let rowIndex = 0; rowIndex < payload.M; rowIndex++) {
        const row = [];
        for (let columnIndex = 0; columnIndex < payload.N; columnIndex++) {
          row.push(generateItem(rowIndex, columnIndex));
        }
        matrix.push(row);
      }
      matrix.push(calculateAvarages(matrix));
      state.matrix = matrix;
    },

    addRow: (state) => {
      const matrix = [...state.matrix];
      matrix.splice(matrix.length - 1, 1);
      const row = [];
      for (
        let columnIndex = 0;
        columnIndex < state.matrixParams.N;
        columnIndex++
      ) {
        row.push(generateItem(matrix.length, columnIndex));
      }
      matrix.push(row);
      matrix.push(calculateAvarages(matrix));
      state.matrix = matrix;
    },

    deleteRow: (state, { payload }) => {
      const matrix = [...state.matrix];
      matrix.splice(payload, 1);
      matrix.splice(matrix.length - 1, 1);
      if (matrix.length) {
        matrix.push(calculateAvarages(matrix));
        state.matrix = matrix;
      } else {
        state.matrix = null;
      }
    },
    incrementCell: (state, { payload }) => {
      const { rowIndex, cellIndex } = payload;
      const matrix = [...state.matrix];
      matrix[rowIndex][cellIndex].amount += 1;
      matrix.splice(matrix.length - 1, 1);
      matrix.push(calculateAvarages(matrix));
      state.matrix = matrix;
    },
  },
});

export const { createMatrix, addRow, deleteRow, setParams, incrementCell } =
  matrixReducer.actions;

export default matrixReducer.reducer;
