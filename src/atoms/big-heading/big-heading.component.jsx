import React from 'react';
import classnames from 'classnames';

import cls from './big-heading.styles.css';

export const BigHeading = ({ className, ...restProps }) => (
  <h1 {...restProps} className={classnames(cls['big-heading'], className)} />
);
