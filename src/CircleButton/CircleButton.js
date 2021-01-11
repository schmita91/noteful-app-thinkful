import React from 'react';
import PropTypes from 'prop-types';
import './CircleButton.css';

export default function CircleButton(props) {
  const { tag, className, children, ...otherProps } = props;

  return React.createElement(
    tag,
    {
      className: ['CircleButton', className].join(' '),
      ...otherProps,
    },
    children
  );
}

CircleButton.propTypes = {
  className: PropTypes.string.isRequired,
};

CircleButton.defaultProps = {
  tag: 'a',
};