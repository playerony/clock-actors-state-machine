import React from 'react';
import classnames from 'classnames';

import cls from './input.styles.css';

export const Input = ({ className, ...restProps }) => (
  <input {...restProps} className={classnames(cls.input, className)} />
);
