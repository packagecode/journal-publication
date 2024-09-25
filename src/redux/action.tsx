import { THEME_CHANGER } from "./actionType.tsx";

export const ThemeChanger = (value: any) => async (dispatch: any) => {
  dispatch({
    type: THEME_CHANGER,
    payload: value,
  });
};
