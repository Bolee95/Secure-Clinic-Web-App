import React, { PureComponent } from 'react';
import DownIcon from 'mdi-react/ChevronDownIcon';
import ThreeIcon from 'mdi-react/HeartBoxIcon';
import { Collapse } from 'reactstrap';
import TopbarMenuLink from './TopbarMenuLink';

const Ava = `${process.env.PUBLIC_URL}/img/ava.png`;

export default class TopbarProfile extends PureComponent {
  constructor() {
    super();
    this.state = {
      collapse: false,
    };
  }

  toggle = () => {
    this.setState(prevState => ({ collapse: !prevState.collapse }));
  };

  render() {
    const { collapse } = this.state;

    var store = require('store');
    const user = store.get('user');
    const name = user.name + ' ' + user.surname;
    const licenceId = "Licence ID: " + user.licenceId;

    return (
      <div className="topbar__profile">
        <button type="button" className="topbar__avatar" onClick={this.toggle}>
          <img className="topbar__avatar-img" src={Ava} alt="avatar" />
          <p className="topbar__avatar-name">{name}</p>
          <DownIcon className="topbar__icon" />
        </button>
        {collapse && <button type="button" className="topbar__back" onClick={this.toggle} />}
        <Collapse isOpen={collapse} className="topbar__menu-wrap">
          <div className="topbar__menu">
            <div className="topbar__menu-divider" />
            <TopbarMenuLink title={licenceId} icon="graduation-hat" path="#" />
            <div className="topbar__menu-divider" />
            <TopbarMenuLink title="Log Out" icon="exit" path="/" />
          </div>
        </Collapse>
      </div>
    );
  }
}
