import React from 'react';

import cls from './dots.styles.css';

const getArrayWithNElements = (amountOfElements) => Array.from(Array(amountOfElements).keys());

export const Dots = ({ amountOfDots, activeDotIndex }) => (
  <div className={cls.dots} data-hidden={amountOfDots <= 1}>
    {React.Children.toArray(
      getArrayWithNElements(amountOfDots).map((value) => (
        // eslint-disable-next-line react/jsx-key
        <div className={cls.dot} data-active={value === activeDotIndex} />
      )),
    )}
  </div>
);
