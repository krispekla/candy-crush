import React from 'react';
import Map from '../Components/Map/Map';

class CandyCrush extends React.Component {
  state = {
    candyMap: [[], [], [], [], []],
    selected: null,
    nextMove: null
  };

  generateElement = () => {
    return Math.ceil(Math.random() * 4);
  };

  generateMap = () => {
    let { candyMap } = this.state;
    let arr;

    for (let i = 0; i < 5; i++) {
      arr = [];
      for (let j = 0; j < 5; j++) {
        let element = {
          row: i,
          column: j,
          sign: this.generateElement(),
          selected: false
        };
        arr.push(element);
      }
      candyMap[i] = arr;
    }

    this.setState({ candyMap });
  };

  updateMap = fieldsToReplace => {
    let { candyMap } = this.state;

    console.log(fieldsToReplace);
    for (let i = 0; i < fieldsToReplace.length; i++) {
      candyMap[fieldsToReplace[i].row][fieldsToReplace[i].column] = {
        row: fieldsToReplace[i].row,
        column: fieldsToReplace[i].column,
        sign: this.generateElement(),
        selected: false
      };
    }
    this.setState({ candyMap });
  };

  whichDirection = (nextRow, nextCol) => {
    let { selected } = this.state;
    if (selected) {
      let selectedRow = selected.row;
      let selectedColumn = selected.column;

      selectedRow = nextRow - selectedRow;
      selectedColumn = nextCol - selectedColumn;

      if (selectedRow === -1 && selectedColumn === 0) {
        //up
        return { rowFrom: -2, rowTo: 0, columnFrom: -2, columnTo: 2 };
      } else if (selectedRow === 0 && selectedColumn === -1) {
        //left
        return { rowFrom: -2, rowTo: 2, columnFrom: -2, columnTo: 0 };
      } else if (selectedRow === 1 && selectedColumn === 0) {
        //down
        return { rowFrom: 0, rowTo: 2, columnFrom: -2, columnTo: 2 };
      } else if (selectedRow === 0 && selectedColumn === 1) {
        //right
        return { rowFrom: -2, rowTo: 2, columnFrom: 0, columnTo: 2 };
      } else {
        return false;
      }
    }
  };
  calculateNext = (rowFrom, rowTo, columnFrom, columnTo, targetElement) => {
    let sign = this.state.selected.sign;
    let candyMap = this.state.candyMap;
    // console.log(rowFrom, rowTo, columnFrom, columnTo);
    let rIndex, cIndex;
    let elementsToReplace = [];
    for (let i = rowFrom; i <= rowTo; i++) {
      for (let j = columnFrom; j <= columnTo; j++) {
        if (
          (i === 0 || j === 0) &&
          targetElement.row + i >= 0 &&
          targetElement.column + j >= 0 &&
          targetElement.row + i < 5 &&
          targetElement.column + j < 5
        ) {
          rIndex = targetElement.row + i;
          cIndex = targetElement.column + j;
          if (candyMap[rIndex][cIndex].sign === sign) {
            // console.log('nasao', rIndex, cIndex);
            elementsToReplace.push({ row: rIndex, column: cIndex });
          }
        }
        // console.log('-------');
      }
    }
    if (elementsToReplace.length >= 3) {
      this.updateMap(elementsToReplace);
    }
  };
  nextMoveHandler = (row, column, nextMove) => {
    // let { candyMap, selected, nextMove } = this.state;

    let direction = this.whichDirection(row, column);
    if (direction) {
      let { rowFrom, rowTo, columnFrom, columnTo } = direction;

      this.calculateNext(rowFrom, rowTo, columnFrom, columnTo, nextMove);
    }
  };

  clickHandler = (event, el) => {
    event.preventDefault();
    let { candyMap, selected, nextMove } = this.state;

    if (!candyMap[el.row][el.column].selected && !selected) {
      candyMap[el.row][el.column].selected = true;
      selected = { row: el.row, column: el.column, sign: el.sign };
    } else if (
      selected &&
      (el.row === selected.row && el.column === selected.column)
    ) {
      candyMap[el.row][el.column].selected = false;
      selected = null;
    }
    this.setState({ candyMap, selected, nextMove });

    if (selected) {
      //funkcija sa algoritmom za odradivvanje kalkulacija i provjere
      nextMove = { row: el.row, column: el.column };
      this.nextMoveHandler(el.row, el.column, nextMove);
    }
  };

  componentWillMount() {
    this.generateMap();
  }

  render() {
    return (
      <React.Fragment>
        <h1>Candy Crush</h1>
        <Map candyMap={this.state.candyMap} clickHandler={this.clickHandler} />
        <div className="blurred-map" />
      </React.Fragment>
    );
  }
}

export default CandyCrush;
