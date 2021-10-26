import { LOT as ACTIONS } from "../constants/actions";
import * as BIT from "../utils/Bitwise";
import { REFRESH, STATUS, FILTER } from "../constants/lot";

const initialState = {
  currentLot: null,
  userLots: "[]",
  filter: parseInt(
    localStorage.getItem("avvy:lotsFilter") ||
      (FILTER.FOR_SALE + FILTER.FREE_SALE).toString(2),
    2
  ),

  lotStatusChanging: false,
  lotStatusChangingError: null,

  userLotsFetching: false,
  userLotsFetchingError: null,

  lotFetching: false,
  lotFetchingError: null,

  needRefresh: REFRESH.NONE
};

const lotReducer = (state = initialState, action) => {
  const { type, payload } = action;
  let newstate = {};

  const listObjectToArray = obj => {
    let arr = [];
    if (obj instanceof Array) arr = [...obj];
    else if (obj instanceof Object) {
      arr = obj.toArray((val, uid) => ({ ...val, uid }));
    }
    return arr;
  };
  const maxPrice = lot => Math.max(lot.price, lot.userPrice);

  switch (type) {
    // FETCH LOTS LIST =========================================
    case ACTIONS.FETCH_LIST_START:
      return {
        ...state,
        userLots: "[]",
        userLotsFetchingError: null,
        userLotsFetching: true,
        needRefresh: BIT.resetbit(state.needRefresh, REFRESH.LIST)
      };
    case ACTIONS.FETCH_LIST_SUCCESS:
      return {
        ...state,
        userLots: JSON.stringify(
          listObjectToArray(payload).sort((a, b) => maxPrice(b) - maxPrice(a))
        ),
        userLotsFetchingError: null,
        userLotsFetching: false
      };
    case ACTIONS.FETCH_LIST_ERROR:
      console.warn(`ERROR [${type}]`, payload);
      return {
        ...state,
        userLotsFetchingError: payload,
        userLotsFetching: false
      };

    // FETCH LOT DATA  =========================================
    case ACTIONS.FETCH_DATA_START:
      return {
        ...state,
        currentLot: null,
        lotFetchingError: null,
        lotFetching: true,
        needRefresh: BIT.resetbit(state.needRefresh, REFRESH.LOT)
      };
    case ACTIONS.FETCH_DATA_SUCCESS:
      newstate = {
        ...state,
        currentLot: payload,
        lotFetching: false
      };
      {
        const lots = JSON.parse(newstate.userLots);
        const idx = lots.findIndex(v => v.uid === payload.uid);
        if (idx !== -1) {
          lots[idx] = { ...payload };
          newstate.userLots = JSON.stringify(lots);
        }
      }
      return newstate;
    case ACTIONS.FETCH_DATA_ERROR:
      console.warn(`ERROR [${type}]`, payload);
      return {
        ...state,
        lotFetchingError: payload,
        lotFetching: false
      };

    // SET LOT STATUS  =========================================
    case ACTIONS.SET_STATUS_START:
      return {
        ...state,
        lotStatusChangingError: null,
        lotStatusChanging: true
      };
    case ACTIONS.SET_STATUS_SUCCESS:
      newstate = {
        ...state,
        currentLot: payload,
        lotStatusChanging: false
      };
      {
        const lots = JSON.parse(newstate.userLots);
        const idx = lots.findIndex(v => v.uid === payload.uid);
        if (idx !== -1) {
          lots[idx] = { ...payload };
          newstate.userLots = JSON.stringify(lots);
        }
      }
      return newstate;
    case ACTIONS.SET_STATUS_ERROR:
      console.warn(`ERROR [${type}]`, payload);
      return {
        ...state,
        lotStatusChangingError: payload,
        lotStatusChanging: false
      };

    // DATA REFRESH REQUEST  ===================================
    case ACTIONS.REQUEST_REFRESH:
      return { ...state, needRefresh: REFRESH.ALL };

    // SWITCHING LOTS FILTERS  =================================
    case ACTIONS.SWITCH_FILTER:
      const { bit, own } = payload;
      const filter = BIT.switchbit(
        state.filter,
        bit + (own === true ? FILTER.OWN_SHIFT : 0)
      );
      localStorage.setItem("avvy:lotsFilter", filter.toString(2));
      return { ...state, filter };

    default:
      return state;
  }
};

export default lotReducer;
