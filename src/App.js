import React from 'react';
import './App.scss';
import { NavLink, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { getTickets } from "./redux/ticket/ticket.actions";

import Header from './components/header/header';
import HomePage from '../src/pages/HomePage/homepage';
import CommentsPage from '../src/pages/CommentsPage/commentsPage';
import ThreadsPage from '../src/pages/ThreadsPage/threadsPage';
import AddThread from '../src/pages/AddThread/addThread';

import axios from "axios";
import PROXY from "./utils/utils";

class App extends React.Component {
    constructor(){
        super();

        this.state = {
            loading: true
        };
    }

    componentDidMount(){
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

    render(){
        let { loading } = this.state;
        return (
            <div className="app">
                <header className="app__header">
                    <Header />
                </header>
                <main>
                    <div className='app__container'>
                        <h1 className='app__title'>Community</h1>
                        <div className='app__content'>
                            <nav className='app__nav'>
                                <NavLink className='app__link' exact to='/'>All threads</NavLink>
                                <NavLink className='app__link' to='/mythreads'>My threads</NavLink>
                                <NavLink className='app__link' to='/mycomments'>My comments</NavLink>
                                <NavLink className='app__link app__link--pure' to='/newthread'>+ Start a thread</NavLink>
                            </nav>

                            <div className='app__pages'>
                                <Route exact path='/' component={() => <HomePage loading={loading} /> } />
                                <Route path='/mythreads' component={ThreadsPage} />
                                <Route path='/mycomments' component={CommentsPage} />
                                <Route path='/newthread' component={AddThread} />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getTickets: loadedTickets =>
        dispatch(getTickets(loadedTickets))
});

export default connect(null, mapDispatchToProps)(App);
