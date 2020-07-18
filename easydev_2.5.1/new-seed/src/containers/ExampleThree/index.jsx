import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import HorisontalForm from './components/HorizontalForm';
import VerticalForm from './components/VerticalForm';
import ShowResults from '../Show';
import Loading from '../../shared/components/Loading';
import Notification from '../../shared/components/Notification/BasicNotifications';
import { BasicNotification } from '../../shared/components/Notification/Notification';

let notificationLU = null;
let notificationRU = null;
let notificationTC = null;


class ExamplePageThree extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.printPassedData = this.printPassedData.bind(this);
    }

    printPassedData(data) {
        console.log("On submit data passed:" + data);
    }

    showNotification = ({ notification, position }, rtl) => {
        switch (position) {
          case 'left-up':
            notificationLU.notice({
              content: notification,
              duration: 5,
              closable: true,
              style: { top: 0, left: 0 },
              className: `${position} ${rtl}-support`,
            });
            break;
          case 'right-up':
            notificationRU.notice({
              content: notification,
              duration: 5,
              closable: true,
              style: { top: 0, left: 'calc(100vw - 100%)' },
              className: `${position} ${rtl}-support`,
            });
            break;
          default:
            notificationTC.notice({
              content: notification,
              duration: 5,
              closable: true,
              style: { top: 0, left: 0 },
              className: `${position} ${rtl}-support`,
            });
            break;
        }
      };

    render() {
        return (
        <Container className="dashboard">
            <BasicNotification message={"test poruka"}></BasicNotification>
            {/*<Loading loading={false}/>*/}
            <Notification showNotification={({ notification, position }) => this.showNotification({ notification, position })} ></Notification>
            <VerticalForm onSubmit={ShowResults}></VerticalForm> 
        </Container>
        );
    }


}

export default ExamplePageThree;
