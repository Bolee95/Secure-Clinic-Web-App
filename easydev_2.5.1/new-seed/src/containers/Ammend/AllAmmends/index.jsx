import React from 'react';
import { Container } from 'reactstrap';
import Loading from '../../../shared/components/Loading';
import axios from 'axios';
import AllAmmendsTable from './components/allAmmendsTable';
import fileDownload from 'js-file-download';
import { ammendStringForType } from './../../../shared/AmmendType';

class AllAmmendsComponent extends React.Component {

    constructor() {
        super();

        this.state = {
            loading: false,
            ammends: []
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        axios({ method: 'GET', url: '/shared/getAmmend/all', headers: { 'Identity_name': 'doctor' }})
        .then(response => {
            let ammends = [];
            for (let index = 0; index < response.data.length; index++) {
                let arrayItem = response.data[index];

                let isReviewed = (arrayItem.isReviewed === undefined) || (arrayItem.isReviewed === false) ? 'NO' : 'YES';

                let ammend = {
                    'index': index,
                    'pacientLbo': arrayItem.pacientLbo,
                    'hospitalCode': arrayItem.hospitalCode,
                    'ordinationCode': arrayItem.ordinationCode,
                    'serviceCode': arrayItem.serviceCode,
                    'action': ammendStringForType(arrayItem.action),
                    'description': arrayItem.description,
                    'isReviewed': isReviewed
                };

                var evidences = arrayItem.evidences;

                if (evidences === undefined) {
                    evidences = [];
                }

                var links = [];
                for (var i = 0; i < evidences.length; i++) {
                    let test = <div> <button className = "base-btn"
                    onClick = {
                        (i) => this.documentClicked(i)
                    }
                    value = {
                        evidences[i]
                        }> Evidence {[i]} </button></div>
                        links.push(test);
                }

                ammend.evidences = links;

                ammends.push(ammend);
            }

            this.setState({
                ammends: ammends,
                loading: false
            })
        }, error => {
           window.alert(error)    
        })
      }

    documentClicked(e) {
    let documentId = e.target.value;
    axios({
            method: 'GET',
            url: '/shared/getFile',
            params: {
                'fileId': documentId
            },
            responseType: 'blob',
        })
        .then(response => {
            let filename = response.headers['filename'];
            let mimeType = response.headers['mimeType'];
            fileDownload(response.data, filename, mimeType);
        }, error => {
            window.alert(error);
        });
    }

    render() {
        const { ammends, loading } = this.state;

        if (loading) {
            return (<Loading loading={loading} />);
        }

        return (    
            <Container className="dashboard">
                <AllAmmendsTable data={ammends}/>
            </Container>
        )
    };
}

export default AllAmmendsComponent;