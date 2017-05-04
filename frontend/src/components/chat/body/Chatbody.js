import React, { Component } from 'react';
import ChatMessages from './ChatMessages';
import ChatFooter from './ChatFooter';
import connector from '../connection/connector';
import * as config from '../connection/config';

class Chatbody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            partner: {
                gender: 'female',
                university: 'University of Athens, Greece'
            },
            me: {
                gender: 'undefined',
                university: 'National Technical University of Athens, Greece'
            },
            messages: [],
            isFooterDisabled: true
        };
    }

    disableChat = (chatStatus) => {
        this.setState({isFooterDisabled: chatStatus});
    }

    handleNext = () => {
        this._connector.broadcastNext();
    }

    handleNewMessage = (message, from) => {
        if (message !== '') {
            if (from === undefined) {
                from = 'me';
            }
            let newMessages = this.state.messages;
            let newMessage = {
                content: message,
                timestamp: new Date(),
                from: from
            };
            if (from === 'me') {
                this._connector.broadcastMessage(message);
                newMessage.gender = this.state.me.gender;
                newMessage.university = this.state.me.university;
            }
            else {
                newMessage.gender = this.state.partner.gender;
                newMessage.university = this.state.partner.university;
            }
            newMessages.push(newMessage);
            this.setState({messages: newMessages});
        }
    }

    componentDidMount() {
        this._connector = new connector(config.realtimeUrl, config.roomId, this.handleNewMessage, this.disableChat);
    }

    render() {
        return (
            <div className="Chatbox">
                <ChatMessages messages={this.state.messages} partner={this.state.partner} me={this.state.me} />
                <ChatFooter handleNext={this.handleNext} handleNewMessage={this.handleNewMessage} isFooterDisabled={this.state.isFooterDisabled} />
            </div>
        );
    }
}

export default Chatbody;
