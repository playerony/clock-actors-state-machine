import React from 'react';

import cls from './dots.styles.css';

const getArrayWithNElements = (amountOfElements) => Array.from(Array(amountOfElements).keys());

export const Dots = ({ onDotClick, amountOfDots, activeDotIndex }) => {
  return (
    <div className={cls.dots} data-hidden={amountOfDots <= 1}>
      {React.Children.toArray(
        getArrayWithNElements(amountOfDots).map((value) => (
          // eslint-disable-next-line react/jsx-key
          <div
            className={cls.dot}
            onClick={() => onDotClick(value)}
            data-active={value === activeDotIndex}
          />
        )),
      )}
    </div>
  );
};
