import React from 'react';
import './ticketsList.scss';

import TicketItem from '../ticketItem/ticketItem';

const TicketsList = ({ tickets }) => {
    return (
        <div>
            {
                tickets.map((ticket, idx) => <TicketItem key={ticket.id} ticket={ticket} number={idx+1} />)
            }
        </div>
    )
};

export default TicketsList;
