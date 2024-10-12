import {
  IS_LOGGED,
  SET_FETCH_SCRIPT_COUNT,
  SET_REDIRECT_URL,
  SET_USER,
  THEME_CHANGER,
} from "./actionType.tsx";

export const ThemeChanger = (value: any) => async (dispatch: any) => {
  dispatch({
    type: THEME_CHANGER,
    payload: value,
  });
};

export const SetUser = (value: any) => {
  return {
    type: SET_USER,
    payload: value,
  };
};

export const SetIsLogged = (value: any) => {
  return {
    type: IS_LOGGED,
    payload: value,
  };
};

export const SetRedirectUrl = (value: any) => {
  return {
    type: SET_REDIRECT_URL,
    payload: value,
  };
};
export const SetIsFetchScriptCount = (value: any) => {
  return {
    type: SET_FETCH_SCRIPT_COUNT,
    payload: value,
  };
};
