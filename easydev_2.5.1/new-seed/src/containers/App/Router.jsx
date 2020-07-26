import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../Layout/index';
import MainWrapper from './MainWrapper';

import LogIn from '../LogIn/index';
import CreatePacientForm from '../Pacient/CreatePatient/index';
import ExamplePageTwo from '../ExampleTwo/index';
import ExamplePageThree from '../ExampleThree/index';
import AllPatientsComponent from '../Pacient/AllPatients/index';
import CreateUserForm from '../Admin/CreateUser/index';
import DeleteUserForm from '../Admin/DeleteUser/index';

const Pages = () => (
  <Switch>
    <Route path="/pages/createPatient" component={CreatePacientForm} />
    <Route path="/pages/allPatients" component={AllPatientsComponent}/>
    <Route path="/pages/createUser" component={CreateUserForm}/>
    <Route path="/pages/deleteUser" component={DeleteUserForm}/>
    <Route path="/pages/two" component={ExamplePageTwo} />
    <Route path="/pages/three" component={ExamplePageThree} />
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
