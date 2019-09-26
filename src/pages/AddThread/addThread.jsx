import React from 'react';
import './addThread.scss';
import axios from 'axios';
import PROXY from "../../utils/utils";
import {getTickets} from "../../redux/ticket/ticket.actions";
import { connect } from 'react-redux';

class AddThread extends React.Component {
    constructor(){
        super();

        this.state = {
            title: '',
            content: ''
        }
    }

    onSubmit(e){
        e.preventDefault();
    }

    addThread(){
        const { title, content } = this.state;

        const newThread = Object.assign({}, {
            "title": title,
            "content": content,
            "mediaType": 2,
            "parent": "/pages/6"
        });

        let axiosConfig = {
            headers: {
                "Content-Type": "application/ld+json"
            }
        };

        axios.post(`${PROXY}http://68.183.241.169/v0.1/communities`, newThread, axiosConfig)
            .then(resp => {
                console.log(resp);
                this.setState({
                    title: '',
                    content: ''
                });
            })
            .catch(error => {
                console.log(error);
            });

        const { getTickets } = this.props;
        axios.get(`${PROXY}http://68.183.241.169/v0.1/communities`)
            .then(resp => {
                console.log(resp);
                const loadedTickets = resp.data['hydra:member'];
                getTickets(loadedTickets);
                this.setState({
                    loading: false
                })
            })
            .catch(error => {
                console.log(error)
            });
    }

    handleChange(e){
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    render(){
        return(
            <div className='new-thread'>
                <h2 className='new-thread__text'>Add new thread</h2>
                <form onSubmit={this.onSubmit} autoComplete="off">
                    <div className='new-thread__input-field'>
                        <label className='new-thread__label' htmlFor="#title">Title of a new Thread</label>
                        <input className='new-thread__input' name='title' onChange={this.handleChange.bind(this)} id='title' type="text"
                               value={this.state.title}/>
                    </div>

                    <div className='new-thread__input-field'>
                        <label className='new-thread__label' htmlFor="#body">Text</label>
                        <textarea className='new-thread__input' name='content' rows="5"
                                  onChange={this.handleChange.bind(this)} id='content' type="text"
                                  value={this.state.content}/>
                    </div>

                    <button className='new-thread__button' onClick={() => this.addThread()}>Start a thread</button>
                </form>
            </div>
        )
    }
};

const mapDispatchToProps = dispatch => ({
    getTickets: loadedTickets =>
        dispatch(getTickets(loadedTickets))
});

export default connect(null, mapDispatchToProps)(AddThread);
