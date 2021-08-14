import React from 'react';
import classnames from 'classnames';

import cls from './dots.styles.css';

const getArrayWithNElements = (amountOfElements) => Array.from(Array(amountOfElements).keys());

export const Dots = ({ className, onDotClick, amountOfDots, activeDotIndex }) => (
  <div className={classnames(cls.dots, className)} data-hidden={amountOfDots <= 1}>
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
