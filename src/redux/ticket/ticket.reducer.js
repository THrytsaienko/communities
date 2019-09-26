import { TicketActionTypes } from "./ticket.types";

const INITIAL_STATE = {
    tickets: null
};

const ticketReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TicketActionTypes.GET_TICKETS:
            return {
                ...state,
                tickets: action.payload
            };

        default:
            return state;
    }
};

export default ticketReducer;
