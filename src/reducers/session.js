import * as ACTIONS from "../constants/actions";

const INITIAL_STATE = {
  authUser: null,
  token: null
};

function sessionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTIONS.USER.AUTH_USER_SET:
      return {
        ...state,
        authUser: action.authUser
      };
    case ACTIONS.USER.SET_BALANCE:
      return {
        ...state,
        authUser: { ...state.authUser, Balance: action.payload }
      };
    case ACTIONS.USER.ADD_BALANCE:
      return {
        ...state,
        authUser: {
          ...state.authUser,
          Balance: state.authUser.Balance + action.payload
        }
      };
    case ACTIONS.USER.SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    default:
      return state;
  }
}

export default sessionReducer;
