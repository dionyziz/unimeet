import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import * as config from '../../config';

import axios from 'axios';
axios.defaults.withCredentials = true;

class DeleteAccountForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayDeleteAccountMessage: false
        };
    }

    handleDeleteAccountButton = () => {
        this.setState({displayDeleteAccountMessage: true});
    }

    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired,
        };
    }

    handleDeleteAccountConfirmation = () => {
        axios.delete(config.backendUrl + '/delete_user')
        .then(res => {
            this.context.router.history.push('/');
        })
        .catch(error => {
            console.log(error);
        })
    }

    handleDeleteAccountChangemind = () => {
        this.setState({displayDeleteAccountMessage: false});
    }

    render() {
        return (
            <div>
                <Button
                    type="submit"
                    bsStyle="danger"
                    id="delete-account"
                    onClick={this.handleDeleteAccountButton}
                >
                    Διαγραφή λογαριασμού
                </Button>
                {this.state.displayDeleteAccountMessage ? <div className="delete-account-confirmation"><b>Λυπούμαστε που φεύγεις. Σίγουρα θες?&nbsp;&nbsp;&nbsp;<a onClick={this.handleDeleteAccountConfirmation}>Ναι</a> <a onClick={this.handleDeleteAccountChangemind}>Όχι</a></b></div> : null}
            </div>
        );
    }
}

export default DeleteAccountForm;
