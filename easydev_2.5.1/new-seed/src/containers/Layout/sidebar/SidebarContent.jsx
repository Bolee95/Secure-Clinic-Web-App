import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';

class SidebarContent extends Component {
  static propTypes = {
    changeToDark: PropTypes.func.isRequired,
    changeToLight: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  hideSidebar = () => {
    const { onClick } = this.props;
    onClick();
  };

  render() {
    const { changeToDark, changeToLight } = this.props;
    return (
      <div className="sidebar__content">
        <ul className="sidebar__block">
          <SidebarLink title="Log In" icon="exit" route="/log_in" onClick={this.hideSidebar} />
          <SidebarCategory title="Layout" icon="layers">
            <button type="button" className="sidebar__link" onClick={changeToLight}>
              <p className="sidebar__link-title">Light Theme</p>
            </button>
            <button type="button" className="sidebar__link" onClick={changeToDark}>
              <p className="sidebar__link-title">Dark Theme</p>
            </button>
          </SidebarCategory>
        </ul>
        <ul className="sidebar__block">
          <SidebarCategory title="Admin" icon="diamond">
            <SidebarLink title="Create User" route="/pages/createUser" onClick={this.hideSidebar} />
            <SidebarLink title="Delete User" route="/pages/deleteUser" onClick={this.hideSidebar} />
          </SidebarCategory>
          <SidebarCategory title="Patient" icon="diamond">
            <SidebarLink title="Create Patient" route="/pages/createPatient" onClick={this.hideSidebar} />
            <SidebarLink title="All Patients" route="/pages/allPatients" onClick={this.hideSidebar} />
            <SidebarLink title="All Patients For Hospital" route="/pages/allPatientsForHospital" onClick={this.hideSidebar} />
            <SidebarLink title="Add New Pending" route="/pages/addNewPending" onClick={this.hideSidebar} />
            <SidebarLink title="All Pendings" route="/pages/allPendings" onClick={this.hideSidebar} />
            <SidebarLink title="All Pendings For Hospital" route="/pages/allPendingsForHospital" onClick={this.hideSidebar} />
            <SidebarLink title="Set Pacient Waiting Status" route="/pages/setPacientWaitingStatus" onClick={this.hideSidebar} />
          </SidebarCategory>
          <SidebarCategory title="Example" icon="diamond">
            <SidebarLink title="Page two" route="/pages/two" onClick={this.hideSidebar} />
            <SidebarLink title="Page three" route= "/pages/three" onClick={this.hideSidebar} />
          </SidebarCategory>
          <SidebarCategory title="Shared" icon="diamond">
            <SidebarLink title="All Waiting Lists For Hospital" route="/pages/allWaitingListsForHospital" onClick={this.hideSidebar} />
            <SidebarLink title="Waiting List For Pacient" route="/pages/waitingListForPacient" onClick={this.hideSidebar} />
          </SidebarCategory>
        </ul>
      </div>
    );
  }
}

export default SidebarContent;
