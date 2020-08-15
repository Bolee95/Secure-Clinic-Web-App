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
    const userId = store.get('user').userId;

    return (
      <div className="topbar__profile">
        <button type="button" className="topbar__avatar" onClick={this.toggle}>
          <img className="topbar__avatar-img" src={Ava} alt="avatar" />
          <p className="topbar__avatar-name">{userId}</p>
          <DownIcon className="topbar__icon" />
        </button>
        {collapse && <button type="button" className="topbar__back" onClick={this.toggle} />}
        <Collapse isOpen={collapse} className="topbar__menu-wrap">
          <div className="topbar__menu">
            <TopbarMenuLink title="Page one" icon="list" path="/pages/one" />
            <TopbarMenuLink title="Page two" icon="inbox" path="/pages/two" />
            <TopbarMenuLink title="Page three" icon="heart" path="/pages/three" />
            <div className="topbar__menu-divider" />
            <TopbarMenuLink title="Log Out" icon="exit" path="/" />
          </div>
        </Collapse>
      </div>
    );
  }
}
