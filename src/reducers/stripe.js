import * as ACTIONS from "../constants/actions";

export const CHARGE = "app/stripe/charge";
const LOADING = "app/stripe/loading";
const ERROR_MESSAGE = "app/stripe/error_message";
const RETURN_STATUS = "app/stripe/return_status";
// const SET_STATUS = 'app/stripe/set_status';
// const stripe = window.Stripe("pk_test_pKMc6Ygwt2wzQCxHc8Zx4nAw");

export const StatusPayment = {
  INITIAL: 0,
  PROCCESS: 1,
  COMPLETE: 2,
  ERROR: 3
};

const fetchCharge = (userID, body) =>
  fetch(`${process.env.REACT_APP_API_SERVER}/api/v1/user/${userID}/intent`, {
    method: "post",
    // mode: "no-cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
      // "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(body)
  });

export const SetCharge = value => ({
  type: CHARGE,
  payload: value
});

const SetLoading = loading => ({
  type: LOADING,
  payload: loading
});

export const SetError = (header = "", body = "") => ({
  type: ERROR_MESSAGE,
  payload: {
    error: !!header || !!body,
    error_message: {
      header: header,
      body: body
    }
  }
});

export const ClearError = () => ({
  type: ERROR_MESSAGE,
  payload: {
    error: false,
    error_message: {}
  }
});

export const ReturnStatus = status => ({
  type: RETURN_STATUS,
  payload: status
});

/**
 * Устанавливаем текст ошибки
 * @param {*} mess
 */
export const error = (mess = "", header = "") => dispatch => {
  if (mess === "") {
    dispatch(ClearError());
  } else {
    dispatch(SetError(header, mess));
  }
};

export const charge = (userID, jsonData, options) => dispatch => {
  const { stripe, cardNumber } = options;
  dispatch(SetLoading(true));
  dispatch(SetError());
  const { onReadyUrl } = jsonData;
  delete jsonData.onReadyUrl;

  fetchCharge(userID, jsonData)
    .then(response => {
      dispatch(SetLoading(false));

      // dispatch(ReturnStatus("ok"));

      return response.json();
    })
    .then(intent => {
      const { client_secret } = intent;
      const { billing_name } = jsonData;
      console.log(billing_name);
      stripe
        .handleCardPayment(client_secret, cardNumber, {
          payment_method_data: {
            billing_details: { name: billing_name }
          }
        })
        .then(function(response) {
          if (response.error) {
            // Handle error here
            const { message, payment_intent } = response.error;
            console.error(message);
            console.info(payment_intent);
            dispatch(SetLoading(false));
            dispatch(SetError("Request processing error", message));
          } else if (
            response.paymentIntent &&
            response.paymentIntent.status === "succeeded"
          ) {
            // Handle successful payment here
            dispatch(ReturnStatus(response.paymentIntent.status));
            dispatch({
              type: ACTIONS.USER.ADD_BALANCE,
              payload: response.paymentIntent.amount
            });
            if (onReadyUrl) document.location.href = onReadyUrl;
          }
        });
    })
    .catch(response => {
      dispatch(SetLoading(false));
      dispatch(SetError("Request processing error", ""));
      return {};
    });

  setTimeout(() => dispatch(SetLoading(false)), 3000);
};

const initialState = {
  loading: false,
  error: false,
  error_message: {},
  // status: StatusPayment.INITIAL,
  status: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case ERROR_MESSAGE:
      return {
        ...state,
        ...action.payload
      };

    case RETURN_STATUS:
      return {
        ...state,
        status: action.payload
      };
    case CHARGE:
      return {
        ...state
      };
    default:
      return state;
  }
};
