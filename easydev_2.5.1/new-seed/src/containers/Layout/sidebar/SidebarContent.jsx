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
    const store = require('store');
    let userRole = store.get('user').role;

    const { changeToDark, changeToLight } = this.props;

    var sidebarLayout;

    if (userRole === 'doctor') {
      sidebarLayout = <div>  <SidebarCategory title="Patients" icon="arrow-right-circle">
                                <SidebarLink title="Create Patient" route="/pages/createPatient" onClick={this.hideSidebar} />
                                <SidebarLink title="All Patients For Hospital" route="/pages/allPatientsForHospital" onClick={this.hideSidebar} />
                                <SidebarLink title="Set Pacient Waiting Status" route="/pages/setPacientWaitingStatus" onClick={this.hideSidebar} />
                            </SidebarCategory>
                            <SidebarCategory title="Pendings" icon="arrow-right-circle">
                                <SidebarLink title="Add New Pending" route="/pages/addNewPending" onClick={this.hideSidebar} />
                                <SidebarLink title="All Pendings For Hospital" route="/pages/allPendingsForHospital" onClick={this.hideSidebar} />
                            </SidebarCategory>
                            <SidebarCategory title="Waiting Lists" icon="arrow-right-circle">
                                <SidebarLink title="All Waiting Lists For Hospital" route="/pages/allWaitingListsForHospital" onClick={this.hideSidebar} />
                                {/* <SidebarLink title="Waiting List For Pacient" route="/pages/waitingListForPacient" onClick={this.hideSidebar} /> */}
                            </SidebarCategory>
                            <SidebarCategory title="Pacients Private Data" icon="arrow-right-circle">
                                <SidebarLink title="All Pacients Private Data" route="/pages/allPacientsPrivateData" onClick={this.hideSidebar} />
                                <SidebarLink title="Add Disease to Sickness History" route="/pages/addNewDiseaseToSicknessHistory" onClick={this.hideSidebar} />
                            </SidebarCategory>
                            <SidebarCategory title="Amends" icon="arrow-right-circle">
                                 <SidebarLink title="Create Ammend" route="/pages/createAmmend" onClick={this.hideSidebar} />
                                 <SidebarLink title="All Ammends For Hospital" route="/pages/allAmmendsForHospital" onClick={this.hideSidebar} />
                            </SidebarCategory>
                      </div>
    } else if (userRole === 'user') {
      sidebarLayout =   <div>
                        <SidebarCategory title="Waiting Lists" icon="arrow-right-circle">
                          <SidebarLink title="All Waiting Lists" route="/pages/allWaitingListsForHospital" onClick={this.hideSidebar} />
                          <SidebarLink title="Waiting List For Pacient" route="/pages/waitingListForPacient" onClick={this.hideSidebar} />
                        </SidebarCategory>
                        </div>
    } else if (userRole === 'tehnical') {
      sidebarLayout = <div>
                          <SidebarCategory title="Pendings" icon="arrow-right-circle">
                              <SidebarLink title="All Pendings For Hospital" route="/pages/allPendingsForHospital" onClick={this.hideSidebar} />
                          </SidebarCategory>
                          <SidebarCategory title="Amends" icon="arrow-right-circle">
                                 <SidebarLink title="Create Ammend" route="/pages/createAmmend" onClick={this.hideSidebar} />
                                 <SidebarLink title="All Ammends For Hospital" route="/pages/allAmmendsForHospital" onClick={this.hideSidebar} />
                            </SidebarCategory>
                     </div>
    } else if (userRole === 'director') {
      sidebarLayout = <div>
                        <SidebarCategory title="Pendings" icon="arrow-right-circle">
                              <SidebarLink title="All Pendings For Hospital" route="/pages/allPendingsForHospital" onClick={this.hideSidebar} />
                        </SidebarCategory>
                       <SidebarCategory title="Amends" icon="arrow-right-circle">
                                 <SidebarLink title="Create Ammend" route="/pages/createAmmend" onClick={this.hideSidebar} />
                                 <SidebarLink title="All Ammends For Hospital" route="/pages/allAmmendsForHospital" onClick={this.hideSidebar} />
                         </SidebarCategory>
                         <SidebarCategory title="Shared" icon="arrow-right-circle">
                              <SidebarLink title="All Waiting Lists" route="/pages/allWaitingListsForHospital" onClick={this.hideSidebar} />
                        </SidebarCategory>
                     </div>
    } else if (userRole === 'admin') {
      sidebarLayout = <div>
                     <SidebarCategory title="User CRUD" icon="arrow-right-circle">
                        <SidebarLink title="Create User" route="/pages/createUser" onClick={this.hideSidebar} />
                        <SidebarLink title="Delete User" route="/pages/deleteUser" onClick={this.hideSidebar} />
                      </SidebarCategory>
                      <SidebarCategory title="Pacients" icon="arrow-right-circle">
                        <SidebarLink title="All Pacients" route="/pages/allPatients" onClick={this.hideSidebar} />
                      </SidebarCategory>
                      <SidebarCategory title="Hospital" icon="arrow-right-circle">
                        <SidebarLink title="Add new service" route="/pages/addNewService" onClick={this.hideSidebar} />
                      </SidebarCategory>
                      </div>
    };

    return (
      <div className="sidebar__content">
        <ul className="sidebar__block">
          <SidebarCategory title="Appearence mode" icon="layers">
            <button type="button" className="sidebar__link" onClick={changeToLight}>
              <p className="sidebar__link-title">Light Theme</p>
            </button>
            <button type="button" className="sidebar__link" onClick={changeToDark}>
              <p className="sidebar__link-title">Dark Theme</p>
            </button>
          </SidebarCategory>
        </ul>
        <ul className="sidebar__block">
           {sidebarLayout} 
          {/* <SidebarLink title="Home" route="/pages/" onClick={this.hideSidebar} />
        <SidebarCategory title="Admin" icon="arrow-right-circle">
          <SidebarLink title="Create User" route="/pages/createUser" onClick={this.hideSidebar} />
          <SidebarLink title="Delete User" route="/pages/deleteUser" onClick={this.hideSidebar} />
          <SidebarLink title="Add New Service" route="/pages/addNewService" onClick={this.hideSidebar} />
        </SidebarCategory>
        <SidebarCategory title="Patient" icon="arrow-right-circle">
          <SidebarLink title="Create Patient" route="/pages/createPatient" onClick={this.hideSidebar} />
          <SidebarLink title="All Patients" route="/pages/allPatients" onClick={this.hideSidebar} />
          <SidebarLink title="All Patients For Hospital" route="/pages/allPatientsForHospital" onClick={this.hideSidebar} />
          <SidebarLink title="Add New Pending" route="/pages/addNewPending" onClick={this.hideSidebar} />
          <SidebarLink title="All Pendings" route="/pages/allPendings" onClick={this.hideSidebar} />
          <SidebarLink title="All Pendings For Hospital" route="/pages/allPendingsForHospital" onClick={this.hideSidebar} />
          <SidebarLink title="Set Pacient Waiting Status" route="/pages/setPacientWaitingStatus" onClick={this.hideSidebar} />
        </SidebarCategory>
        <SidebarCategory title="Shared" icon="arrow-right-circle">
          <SidebarLink title="All Waiting Lists For Hospital" route="/pages/allWaitingListsForHospital" onClick={this.hideSidebar} />
          <SidebarLink title="Waiting List For Pacient" route="/pages/waitingListForPacient" onClick={this.hideSidebar} />
        </SidebarCategory>
        <SidebarCategory title="Private data" icon="arrow-right-circle"> 
          <SidebarLink title="All Pacients Private Data" route="/pages/allPacientsPrivateData" onClick={this.hideSidebar} />
          <SidebarLink title="Add Disease to Sickness History" route="/pages/addNewDiseaseToSicknessHistory" onClick={this.hideSidebar} />
          <SidebarLink title="Upload files for pacient" route="/pages/uploadFilesForPacient" onClick={this.hideSidebar} />
        </SidebarCategory>
        <SidebarCategory title="Ammends" icon="arrow-right-circle">
          <SidebarLink title="Create Ammend" route="/pages/createAmmend" onClick={this.hideSidebar} />
          <SidebarLink title="All Ammends For Hospital" route="/pages/allAmmendsForHospital" onClick={this.hideSidebar} />
          <SidebarLink title="All Ammends" route="/pages/allAmmends" onClick={this.hideSidebar} />
        </SidebarCategory> */}
        </ul>
      </div>
    );
  }
}

export default SidebarContent;
