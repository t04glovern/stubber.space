import { createReducer } from "../../app/common/util/reducerUtil";
import {
  FETCH_TICKETS
} from "./ticketConstants";

const initialState = [];

export const fetchTickets = (state, payload) => {
  return payload.tickets;
};

export default createReducer(initialState, {
  [FETCH_TICKETS]: fetchTickets
});
