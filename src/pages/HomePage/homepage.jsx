import React from 'react';
import { connect } from 'react-redux';
import spinner from '../../assets/images/spinner.gif';

import './homePage.scss';

import TicketsList from '../../components/ticketsList/ticketsList';

class HomePage extends React.Component {
    render(){
        const { loading, tickets } = this.props;
        return (
            <div className='home'>
                <div className='home__container'>
                    {
                        loading
                            ?
                            <div className='spinner'>
                                <img className='spinner__image' src={spinner} alt='Spinner'/>
                            </div>
                            :
                            <TicketsList tickets={tickets} />
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    tickets: state.tickets.tickets
});

export default connect(mapStateToProps)(HomePage);
