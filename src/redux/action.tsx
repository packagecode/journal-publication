import { IS_LOGGED, SET_USER, THEME_CHANGER } from "./actionType.tsx";

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
