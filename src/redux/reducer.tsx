import { THEME_CHANGER } from "./actionType.tsx";

const initialState = {
  domain: "",
  lang: "en",
  dir: "ltr",
  dataThemeMode: "light",
  dataMenuStyles: "dark",
  dataNavLayout: "vertical",
  dataHeaderStyles: "light",
  dataVerticalStyle: "overlay",
  StylebodyBg: "107 64 64",
  StyleDarkBg: "93 50 50",
  toggled: "",
  dataNavStyle: "",
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
  cdnEndPoint:
    import.meta.env.VITE_APP_ASSET_URL || import.meta.env.VITE_APP_API_ENDPOINT,
  defaultDashboard: "dashboards",
  user: JSON.parse(localStorage.getItem("user") || "{}"),
  roles: JSON.parse(localStorage.getItem("roles") || "[]"),
  settings: JSON.parse(localStorage.getItem("settings") || "{}"),
  permissions: JSON.parse(localStorage.getItem("permissions") || "[]"),
  allPermissions: JSON.parse(localStorage.getItem("allPermissions") || "[]"),
};
export default function reducer(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case THEME_CHANGER:
      state = payload;
      return state;
    default:
      return state;
  }
}
