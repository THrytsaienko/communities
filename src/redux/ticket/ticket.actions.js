import { TicketActionTypes } from './ticket.types';

export const getTickets = tickets => ({
    type: TicketActionTypes.GET_TICKETS,
    payload: tickets
});
