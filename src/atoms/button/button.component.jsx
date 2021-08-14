import React from 'react';
import classnames from 'classnames';

import cls from './button.styles.css';

export const Button = ({ className, ...restProps }) => (
  <button {...restProps} className={classnames(cls.button, className)} />
);
