import React from 'react';
import Map from '../Components/Map/Map';

class CandyCrush extends React.Component {
  state = {
    candyMap: [[], [], [], [], []],
    selected: null,
    nextMove: null
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
          value: Math.floor(Math.random() * 4),
          directionsToMove: [],
          selected: false
        };
        arr.push(element);
      }
      candyMap[i] = arr;
    }

    this.setState({ candyMap });
  };

  clickHandler = (event, el) => {
    event.preventDefault();
    let { candyMap, selected, nextMove } = this.state;

    if (!candyMap[el.row][el.column].selected && !selected) {
      candyMap[el.row][el.column].selected = true;
      selected = { row: el.row, column: el.column };
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
      //   nextMoveHandler(el.row, el.column);
    }
  };

  //   nextMoveHandler = (row, column) => {
  //     let { candyMap, selected, nextMove } = this.state;

  //     for (let i = -1; i < 1; i++) {
  //       for (let j = -1; j < 1; j++) {
  //         if (i == 0 && j == 0) {
  //           continue;
  //         }
  //       }
  //     }
  //   };

  componentWillMount() {
    this.generateMap();
  }
  render() {
    return (
      <React.Fragment>
        <h1>Oroundo Crush</h1>
        <Map candyMap={this.state.candyMap} clickHandler={this.clickHandler} />
      </React.Fragment>
    );
  }
}

export default CandyCrush;
