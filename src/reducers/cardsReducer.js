import {FETCHING,SUCCESS,OPP_SUCCESS,FAILURE,ADD_POINTS,ADD_OPP_POINTS,RESET, GAMEOVER} from "../actions";

const initialState = {
  deck_id: "0e4dpxs16n6c",
  remaining_cards: null,
  shuffled: null,
  points: 0,
  fetchingInfo: false,
  success: null,
  error: null,
  cards : [],
  opp_deck_id: "2cvf3nocf8p0",
  opp_shuffled: null,
  opp_success: null,
  opp_remaining_cards : null,
  opp_cards: [],
  opp_points: 0,
  points_flag: false,
  gameCompleted: "ongoing"
};

export const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING:
      return Object.assign({}, state, { fetchingInfo: true });
    case SUCCESS:
      return Object.assign({}, state, {
        deck_id: action.payload.deck_id,
        shuffled: action.payload.shuffled,
        success: action.payload.success,
        remaining_cards: action.payload.remaining,
        cards: action.payload.cards ? action.payload.cards : [],
        fetchingInfo: false 
      });
    case OPP_SUCCESS:
      return Object.assign({}, state, {
        opp_deck_id: action.payload.deck_id,
        opp_shuffled: action.payload.shuffled,
        opp_success: action.payload.success,
        opp_remaining_cards: action.payload.remaining,
        opp_cards: action.payload.cards ? action.payload.cards : [],
        fetchingInfo: false, 
        points_flag: true,
      });
    case FAILURE:
      return Object.assign({}, state, {
        fetchingInfo: false, // 
        error: "Error fetching cards" 
      });
    case ADD_POINTS:
        return Object.assign({}, state, {
            points: state.points + 1,
            points_flag: false
        });
    case ADD_OPP_POINTS:
        return Object.assign({}, state, {
            opp_points: state.opp_points + 1,
            points_flag: false
        });
    case RESET:
        return Object.assign({}, state, {
            points: 0,
            opp_points: 0,
            points_flag: false
        });
    case GAMEOVER:
        return Object.assign({}, state, {
            gameCompleted: action.status,
        });
    default:
      return state;
  }
};
