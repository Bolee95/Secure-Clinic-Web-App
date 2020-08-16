import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import LoadingIcon from 'mdi-react/LoadingIcon';
import classNames from 'classnames';

export default class ExpandButton extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    load: PropTypes.bool.isRequired,
    outline: PropTypes.bool,
    color: PropTypes.string,
  };

  static defaultProps = {
    title: '',
    outline: false,
    color: 'btn btn-primary'
  };

  constructor() {
    super();
  }

  render() {
    const { color, outline, title, load, fullExpand, onSubmit } = this.props;
    const expandClass = classNames({
      icon: load,
      expand: true,
      'expand--load': load,
    });

    return (
      <Button 
        type="submit"
        onClick={onSubmit}
        className={expandClass}
        color={color}
        outline={outline}
      >
        <p><LoadingIcon /> {title}</p>
      </Button>
    );
  }
}
