import React from 'react';

import cls from './horizontal-buttons-wrapper.styles.css';

export const HorizontalButtonsWrapper = ({ children }) => (
  <div className={cls.wrapper}>{children}</div>
);
