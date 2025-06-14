import * as Actions from "./actions";
import initialState from "../store/initialState";

export const UserReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case Actions.SIGN_UP:
    case Actions.SIGN_IN:
    case Actions.SIGN_USER_STORE:
      return {
        ...state,
        ...action.payload.user,
        errors: {}, // clear errors on success
      };

    case Actions.SIGN_UP_ERROR:
    case Actions.SIGN_IN_ERROR:
      return {
        ...state,
        errors: normalizeErrors(action.payload.errors),
      };

    case Actions.SIGN_OUT:
      return {
        ...initialState.user,
      };

    case Actions.CLEAR_ERRORS:
      return {
        ...state,
        errors: {},
      };

    default:
      return state;
  }
};

// function normalizeErrors(errors) {
//   if (!errors || typeof errors !== "object") {
//     return { error: ["An unexpected error occurred."] };
//   }

//   const normalized = {};

//   if (errors.email) {
//     normalized.email = Array.isArray(errors.email) ? errors.email : [errors.email];
//   }

//   if (errors.password) {
//     normalized.password = Array.isArray(errors.password) ? errors.password : [errors.password];
//   }

//   if (errors.password_confirm) {
//     normalized.password_confirm = Array.isArray(errors.password_confirm)
//       ? errors.password_confirm
//       : [errors.password_confirm];
//   }

//   if (errors.message || errors.detail) {
//     normalized.error = [errors.message || errors.detail];
//   }

//   return normalized;
// }


function normalizeErrors(errors) {
  if (!errors || typeof errors !== "object") {
    return { error: ["An unexpected error occurred."] };
  }

  const normalized = {};

  const source = errors.data || errors;

  if (source.email) {
    normalized.email = Array.isArray(source.email) ? source.email : [source.email];
  }

  if (source.password) {
    normalized.password = Array.isArray(source.password) ? source.password : [source.password];
  }

  if (source.password_confirm) {
    normalized.password_confirm = Array.isArray(source.password_confirm)
      ? source.password_confirm
      : [source.password_confirm];
  }

  if (errors.message) {
    normalized.error = [errors.message];
  } else if (source.message || source.detail) {
    normalized.error = [source.message || source.detail];
  }

  return normalized;
}
