import {
  IS_LOGGED,
  SET_REDIRECT_URL,
  SET_USER,
  THEME_CHANGER,
} from "./actionType.tsx";

const initialState = {
  lang: "en",
  dir: "ltr",
  dataThemeMode: "light",
  dataMenuStyles: "dark",
  dataNavLayout: "horizontal",
  dataHeaderStyles: "light",
  dataVerticalStyle: "overlay",
  StylebodyBg: "107 64 64",
  StyleDarkBg: "93 50 50",
  toggled: "open",
  dataNavStyle: "menu-click",
  horStyle: "",
  dataPageStyle: "regular",
  dataWidth: "fullwidth",
  dataMenuPosition: "fixed",
  dataHeaderPosition: "fixed",
  loader: "disable",
  iconOverlay: "",
  colorPrimaryRgb: "78, 172, 76",
  bodyBg1: "",
  bodyBg2: "",
  darkBg: "",
  inputBorder: "",
  bgImg: "",
  iconText: "",
  body: {
    class: "",
  },
  apiEndPoint: import.meta.env.VITE_APP_API_ENDPOINT || "",
  user: { loginAs: "", roles: [] },
  isLogged: false,
  articleTypes: [
    { value: "original_paper", label: "Original Paper" },
    { value: "review", label: "Review" },
  ],
  scriptFileTypes: [
    { value: "manuscript", label: "Manuscript" },
    { value: "supplementary_info", label: "Supplementary Information" },
    { value: "authorship_change", label: "Authorship change form" },
  ],
  redirectUrl: "",
};

export default function reducer(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case THEME_CHANGER:
      return { ...payload, user: state.user };
    case SET_USER:
      return { ...state, user: payload };
    case IS_LOGGED:
      return { ...state, isLogged: payload };
    case SET_REDIRECT_URL:
      return { ...state, redirectUrl: payload };
    default:
      return state;
  }
}
