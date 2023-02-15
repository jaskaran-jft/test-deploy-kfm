import {
  CHANGE_LAYOUT,
  CHANGE_SIDEBAR_THEME,
  CHANGE_LAYOUT_MODE,
  CHANGE_LAYOUT_WIDTH,
  CHANGE_LAYOUT_POSITION,
  CHANGE_TOPBAR_THEME,
  CHANGE_SIDEBAR_SIZE_TYPE,
  CHANGE_SIDEBAR_VIEW,
  CHANGE_SIDEBAR_IMAGE_TYPE,
  RESET_VALUE,
  CHANGE_PRELOADER,
  SETTING_OPEN,
  SET_THEME,
} from "./actionType";

//constants
import {
  layoutTypes,
  leftSidebarTypes,
  layoutModeTypes,
  layoutWidthTypes,
  layoutPositionTypes,
  topbarThemeTypes,
  leftsidbarSizeTypes,
  leftSidebarViewTypes,
  leftSidebarImageTypes,
  preloaderTypes,
} from "../../Components/constants/layout";

const isJsonString = (str) => {
  try {
    if (str) {
      JSON.parse(str);
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
};

const theme = isJsonString(localStorage.getItem("theme"))
  ? JSON.parse(localStorage.getItem("theme"))
  : {};

const INIT_STATE = {
  // layoutType: layoutTypes.VERTICAL,
  layoutType: theme ? theme?.layout : layoutTypes.HORIZONTAL,
  // leftSidebarType: leftSidebarTypes.DARK,
  leftSidebarType: theme ? theme?.sidebarColor : leftSidebarTypes.LIGHT,
  // layoutModeType: layoutModeTypes.LIGHTMODE,
  layoutModeType: theme ? theme?.colorScheme : layoutModeTypes.LIGHTMODE,
  layoutWidthType: layoutWidthTypes.FLUID,
  layoutPositionType: layoutPositionTypes.FIXED,
  // topbarThemeType: topbarThemeTypes.DARK,
  topbarThemeType: theme ? theme?.topbarColor : topbarThemeTypes.DARK,
  leftsidbarSizeType: leftsidbarSizeTypes.DEFAULT,
  leftSidebarViewType: leftSidebarViewTypes.DEFAULT,
  leftSidebarImageType: leftSidebarImageTypes.NONE,
  preloader: preloaderTypes.DISABLE,
  layoutOpenMenu: false,
};

const Layout = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHANGE_LAYOUT:
      return {
        ...state,
        layoutType: action.payload,
      };

    case CHANGE_LAYOUT_MODE:
      return {
        ...state,
        layoutModeType: action.payload,
      };

    case CHANGE_SIDEBAR_THEME:
      return {
        ...state,
        leftSidebarType: action.payload,
      };

    case CHANGE_LAYOUT_WIDTH:
      return {
        ...state,
        layoutWidthType: action.payload,
      };

    case CHANGE_LAYOUT_POSITION:
      return {
        ...state,
        layoutPositionType: action.payload,
      };

    case CHANGE_TOPBAR_THEME:
      return {
        ...state,
        topbarThemeType: action.payload,
      };

    case CHANGE_SIDEBAR_SIZE_TYPE:
      return {
        ...state,
        leftsidbarSizeType: action.payload,
      };

    case CHANGE_SIDEBAR_VIEW:
      return {
        ...state,
        leftSidebarViewType: action.payload,
      };

    case CHANGE_SIDEBAR_IMAGE_TYPE:
      return {
        ...state,
        leftSidebarImageType: action.payload,
      };

    case RESET_VALUE:
      return {
        ...state,
        resetValue: INIT_STATE,
      };

    case CHANGE_PRELOADER:
      return {
        ...state,
        preloader: action.payload,
      };
    case SETTING_OPEN:
      return {
        ...state,
        layoutOpenMenu: !state.layoutOpenMenu,
      };
    case SET_THEME:
      return {
        ...state,
        // layoutType: layoutTypes.VERTICAL,
        layoutType: action.payload
          ? action.payload?.layout
          : layoutTypes.HORIZONTAL,
        // leftSidebarType: leftSidebarTypes.DARK,
        leftSidebarType: action.payload
          ? action.payload?.sidebarColor
          : leftSidebarTypes.LIGHT,
        // layoutModeType: layoutModeTypes.LIGHTMODE,
        layoutModeType: action.payload
          ? action.payload?.colorScheme
          : layoutModeTypes.LIGHTMODE,
        layoutWidthType: layoutWidthTypes.FLUID,
        layoutPositionType: layoutPositionTypes.FIXED,
        // topbaraction.payloadType: topbarThemeTypes.DARK,
        topbarThemeType: action.payload
          ? action.payload?.topbarColor
          : topbarThemeTypes.DARK,
      };
    default:
      return state;
  }
};

export default Layout;
