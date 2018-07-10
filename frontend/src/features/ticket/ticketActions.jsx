import { FETCH_TICKETS } from "./ticketConstants";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../async/asyncActions";

export const getTicketsForPage = (tickets) => async (
  dispatch,
  getState
) => {
  try {
    dispatch(asyncActionStart());
    dispatch({ type: FETCH_TICKETS, payload: { tickets } });
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};
