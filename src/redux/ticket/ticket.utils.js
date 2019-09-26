export const addTicket = (tickets, ticketToAdd) => {
    return [...tickets, { ...ticketToAdd }];
};
