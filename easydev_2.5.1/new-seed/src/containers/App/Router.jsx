import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../Layout';
import MainWrapper from './MainWrapper';

import LogIn from '../LogIn';
import CreatePacientForm from '../Pacient/CreatePatient';
import ExamplePageTwo from '../ExampleTwo';
import ExamplePageThree from '../ExampleThree';
import AllPatientsComponent from '../Pacient/AllPatients';
import AllPatientsForHospitalComponent from '../Pacient/AllPatientsForHospital';
import NewPendingComponent from '../Pacient/AddToPending';
import AllPendingsComponent from '../Pacient/AllPendings';
import CreateUserForm from '../Admin/CreateUser';
import DeleteUserForm from '../Admin/DeleteUser';
import AllPendingsForHospitalComponent from '../Pacient/AllPendingsForHospital';
import PacientWaitingStatusComponent from '../Pacient/SetPacientWaitingStatus';
import AllWaitingListsForHospitalComponent from '../Shared/AllWaitingListsForHospital';
import WaitingListForPacientComponent from '../Pacient/WaitingListForPacient';
import AllPacientsPrivateDataComponent from '../PrivateData/AllPacientsPrivateData';
import AddDiseaseToSicknessHistoryComponent from '../PrivateData/AddDiseaseToSicknessHistory';
import UploadFilesComponent from '../Shared/UploadFiles';
import CreateAmmendComponent from '../Ammend/CreateAmmend';
import AllAmmendsForHospital from '../Ammend/AllAmmendsForHospital';
import AllAmmendsComponent from '../Ammend/AllAmmends';

const Pages = () => (
  <Switch>
    <Route path="/pages/createPatient" component={CreatePacientForm} />
    <Route path="/pages/allPatients" component={AllPatientsComponent}/>
    <Route path="/pages/allPatientsForHospital" component={AllPatientsForHospitalComponent}/>
    <Route path="/pages/addNewPending" component={NewPendingComponent}/>
    <Route path="/pages/allPendings" component={AllPendingsComponent}/>
    <Route path="/pages/allPendingsForHospital" component={AllPendingsForHospitalComponent}/>
    <Route path="/pages/setPacientWaitingStatus" component={PacientWaitingStatusComponent}/>
    <Route path="/pages/allWaitingListsForHospital" component={AllWaitingListsForHospitalComponent}/>
    <Route path="/pages/waitingListForPacient" component={WaitingListForPacientComponent} />
    <Route path="/pages/createUser" component={CreateUserForm}/>
    <Route path="/pages/deleteUser" component={DeleteUserForm}/>
    <Route path="/pages/allPacientsPrivateData" component={AllPacientsPrivateDataComponent} />
    <Route path="/pages/addNewDiseaseToSicknessHistory" component={AddDiseaseToSicknessHistoryComponent} />
    <Route path="/pages/uploadFilesForPacient" component={UploadFilesComponent} />
    <Route path="/pages/two" component={ExamplePageTwo} />
    <Route path="/pages/three" component={ExamplePageThree} />

    <Route path="/pages/createAmmend" component={CreateAmmendComponent} />
    <Route path="/pages/allAmmendsForHospital" component={AllAmmendsForHospital} />
    <Route path="/pages/allAmmends" component={AllAmmendsComponent} />
  </Switch>
);

const wrappedRoutes = () => (
  <div>
    <Layout />
    <div className="container__wrap">
      <Route path="/pages" component={Pages} />
    </div>
  </div>
);

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route exact path="/" component={LogIn} />
        <Route exact path="/log_in" component={LogIn} />
        <Route path="/" component={wrappedRoutes} />
      </Switch>
    </main>
  </MainWrapper>
);

export default Router;
