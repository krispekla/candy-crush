import React from 'react';
import './Map.css';
import s0 from '../../Assets/s0.png';
import s1 from '../../Assets/s1.png';
import s2 from '../../Assets/s2.png';
import s3 from '../../Assets/s3.png';

const map = props => {
  let merge = [].concat.apply([], props.candyMap);
  const ispis = merge.map(el => {
    let elementImgSrc;
    let elementStyle = 'map-element';
    switch (el.sign) {
      case 1:
        elementImgSrc = s1;
        break;
      case 2:
        elementImgSrc = s2;
        break;
      case 3:
        elementImgSrc = s3;
        break;
      default:
        elementImgSrc = s0;
        break;
    }
    if (el.selected) {
      elementStyle += ' selected';
    }

    return (
      <div
        className={elementStyle}
        key={el.row + '-' + el.column}
        data-row={el.row}
        data-column={el.column}
        onClick={e => props.clickHandler(e, el)}
      >
        <img src={elementImgSrc} width="96" alt="" />
      </div>
    );
  });

  return <div className="map">{ispis}</div>;
};

export default map;
