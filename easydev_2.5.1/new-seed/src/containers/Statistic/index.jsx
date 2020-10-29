
import React from 'react';
import axios from 'axios';
import AppTile from './components/AppTile';
import Tile from './components/SimpleTile';
import PieChart from './components/PieChartSimple';
import Loading from '../../shared/components/Loading';
import ExpandButton from './../../shared/components/Buttons/ExpandButton';
import {
    Container, Row, Col, ButtonToolbar, Button
  } from 'reactstrap';

import { showNotification } from './../../shared/Notification';

class StatisticComponent extends React.Component {

    constructor() {
        super();

        this.state = {
            loading: false,
            updatingStats: false,
            data: undefined,
            statistics: undefined,
            stats: []
        };

       this.loadStatistics = this.loadStatistics.bind(this);
       this.updateStatistics = this.updateStatistics.bind(this);
       this.generateDataForTable = this.generateDataForTable.bind(this);
       this.getLatestStat = this.getLatestStat.bind(this);
       this.getNilStat = this.getNilStat.bind(this);
       this.getCompareStat = this.getCompareStat.bind(this);
       this.generateWaitingListDataForTable = this.generateWaitingListDataForTable.bind(this);
    }

    componentDidMount() {
        this.loadStatistics();
    }

    loadStatistics() {
        var store = require('store');
        let licenceId = store.get('user').licenceId;
        let hospitalCode = store.get('user').hospitalCode;
        
        // This is true for patient
        if (licenceId !== undefined) {
            this.setState({ loading: true });
                axios({ method: 'GET', url: '/shared/getStatistics', headers: { 'Identity_name': licenceId }, params: { "hospitalCode": "AD" }})
                .then(response => {

                    let data = response.data;
                    let statistics = {
                        'diffNumPacients': data['diffNumPacients'],
                        'diffNumServices': data['diffNumServices'],
                        'diffNumAmmends': data['diffNumAmmends'],
                        'diffNumApprovedAmmends': data['diffNumApprovedAmmends'],
                        'diffNumUnapprovedAmmends': data['diffNumUnapprovedAmmends'],
                        'diffNumPendings': data['diffNumPendings'],
                        'diffNumApprovedPendings': data['diffNumApprovedPendings'],
                        'diffNumUnapprovedPendings': data['diffNumUnapprovedPendings'],
                        'diffTimestamp': data['diffTimestamp'],
                        'waitingListsStats': data['waitingListsStats']
                    }

                    var statArray = [];
                    for (let index = 0; index < response.data['stats'].length; index++) {
                        let arrayItem = response.data['stats'][index];
                        let stats = {
                            'numAmmends': arrayItem.numAmmends,
                            'numApprovedAmmends': arrayItem.numApprovedAmmends,
                            'numApprovedPendings': arrayItem.numApprovedPendings,
                            'numPacients': arrayItem.numPacients,
                            'numPendings': arrayItem.numPendings,
                            'numServices': arrayItem.numServices,
                            'numUnapprovedAmmends': arrayItem.numUnapprovedAmmends,
                            'numUnapprovedPendings': arrayItem.numUnapprovedPendings,
                            'timestamp': arrayItem.timestamp
                        }
                        statArray.push(stats);
                    }

                    this.setState({
                        statistics: statistics,
                        loading: false,
                        stats: statArray
                    })
                }, error => {
                showNotification('danger', error.response.data.message);  
                })
            }
    }

    updateStatistics() {
        if (this.state.updateStatistics === true) {
            showNotification('success', "Statistics are already updating...")
            return 
        }

        var store = require('store');
        let licenceId = store.get('user').licenceId;
        let hospitalCode = store.get('user').hospitalCode;

        var bodyFormData = new FormData();
        bodyFormData.set('hospitalCode', hospitalCode);

        showNotification('success', "Updating statistics in progress...");
        this.setState({ 
            updateStatistics: true
         });

        axios({ method: 'POST', url: '/shared/updateStatistics', headers: { 'Identity_name': licenceId }, data: bodyFormData})
        .then(response => {
            this.loadStatistics();
            showNotification('success', "Updating statistics successful!") 
        }, error => {
           showNotification('danger', error.response.data.message);  
        }).then( () => {
            this.setState({
                updateStatistics: false
            })
        })
    }

    getLatestStat() {

        const { stats } = this.state;

        var latestStat;

        if (stats.length > 1) {
            latestStat = stats[1];
        } else if (stats.length === 1) {
            latestStat = stats[0];
        } else {
            latestStat = this.getNilStat();
       }

       return latestStat;
    }

    getNilStat() {
        let nilStat = {
            'numAmmends': 0,
            'numApprovedAmmends': 0,
            'numApprovedPendings': 0,
            'numPacients': 0,
            'numPendings': 0,
            'numServices': 0,
            'numUnapprovedAmmends': 0,
            'numUnapprovedPendings': 0,
            'timestamp': 0
        }

        return nilStat;
    }

    getCompareStat() {
        var compareStat;

        const { stats } = this.state;

        if ( stats.length > 1) {
            compareStat = stats[0];
        } else {
            compareStat = this.getNilStat();
        }

        return compareStat;
    }

    generateDataForTable() {

        let latestStat = this.getLatestStat();
        let compareStat = this.getCompareStat();

        var data = [
            {
              name: 'Number Approved Amends', now: latestStat['numApprovedAmmends'], earlier: compareStat['numApprovedAmmends']
            },
            {
              name: 'Number Unapproved Amends', now: latestStat['numUnapprovedAmmends'], earlier: compareStat['numUnapprovedAmmends']
            },
            {
              name: 'Number Approved Pendings', now: latestStat['numApprovedPendings'], earlier: compareStat['numApprovedPendings']
            },
            {
              name: 'Number Unapproved Pendings', now: latestStat['numUnapprovedPendings'], earlier: compareStat['numUnapprovedPendings']
            }
        ];

          return data
    }

    generateWaitingListDataForTable() {
       
        const { statistics } = this.state;

        let colors = [ '#4ce1b6', '#70bbfd', '#f6da6e', '#ff4861'] 

        var dataArray = [];
        
        if (statistics !== undefined) {
        for (let index = 0; index < statistics['waitingListsStats'].length; index++ ) {
            let statsItem = statistics['waitingListsStats'][index];
            let colorIndex = index % colors.length;
            let data = {
                'name': statsItem['name'],
                'count': statsItem['count'],
                'fill': colors[colorIndex]
            }

            dataArray.push(data);
        }
        } 
        return dataArray;
    }

    
    render() {

        const { statistics, updateStatistics, loading } = this.state;

        var latestStat = this.getLatestStat();
        var lastUpdated = 0;
        if (statistics !== undefined) {
            lastUpdated = Math.ceil(((statistics['diffTimestamp'] / 1000) / 60) / 60);
        }

        if (loading) {
          return (<Loading loading={loading} />);
        }

        var store = require('store');
        var username = store.get('user').name + ' ' + store.get('user').surname;
        var licenceId = store.get('user').licenceId;

        if (licenceId === undefined) {
            return (<Container className="dashboard">
                        <Col>
                            <Row>
                                <h2 className="page-title">Welcome back, {username}</h2>
                            </Row>
                        </Col>
                    </Container>)
        } else {

            return (
                <Container className="dashboard">
                <Col>
                    <Row>
                        <h2 className="page-title">Welcome back, {username}</h2>
                    </Row>
                </Col>
                
                <Row>
                    <Tile title="Number of pacients" dir="ltr" color="blue" value={latestStat['numPacients']} />
                    <Tile title="Number of services" dir="ltr" color="lime" value={latestStat['numServices']} />
                    <Tile title="Number of ammends"  dir="ltr" color="blue" value={latestStat['numAmmends']} />
                    <Tile title="Number of pendings" dir="ltr" color="lime" value={latestStat['numPendings']} />
                </Row> 
                <Col>
                    <Row>
                        <AppTile hoursUpdated={lastUpdated} data={this.generateDataForTable()} dir="ltr"/>
                    </Row>
                </Col>     
                <Col>
                    <Row>
                        <PieChart data={this.generateWaitingListDataForTable()} dir="ltr"></PieChart> 
                    </Row>
                </Col>     
                <ButtonToolbar className="form__button-toolbar">
                    <ExpandButton title="Update statistics" onSubmit={this.updateStatistics} load={updateStatistics}></ExpandButton>
                    <Button color="primary" onClick={this.loadStatistics}>Reload</Button>
                </ButtonToolbar>
                </Container>)
             };
        };
}

export default StatisticComponent;
