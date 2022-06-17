import { createReducer } from "utils/AppsmithUtils";
import {
  ReduxAction,
  ReduxActionErrorTypes,
  ReduxActionTypes,
} from "@appsmith/constants/ReduxActionConstants";
import { Template } from "api/TemplatesApi";

const initialState: TemplatesReduxState = {
  isImportingTemplate: false,
  isImportingTemplateToApp: false,
  gettingAllTemplates: false,
  gettingTemplate: false,
  activeTemplate: null,
  templates: [],
  similarTemplates: [],
  filters: {},
  templateSearchQuery: "",
  templateNotificationSeen: null,
  showTemplatesModal: false,
};

const templateReducer = createReducer(initialState, {
  [ReduxActionTypes.GET_ALL_TEMPLATES_INIT]: (state: TemplatesReduxState) => {
    return {
      ...state,
      gettingAllTemplates: true,
    };
  },
  [ReduxActionTypes.GET_TEMPLATE_INIT]: (state: TemplatesReduxState) => {
    return {
      ...state,
      gettingTemplate: true,
    };
  },
  [ReduxActionTypes.GET_TEMPLATE_SUCCESS]: (
    state: TemplatesReduxState,
    action: ReduxAction<Template>,
  ) => {
    return {
      ...state,
      gettingTemplate: false,
      activeTemplate: action.payload,
    };
  },
  [ReduxActionTypes.GET_ALL_TEMPLATES_SUCCESS]: (
    state: TemplatesReduxState,
    action: ReduxAction<Template[]>,
  ) => {
    return {
      ...state,
      gettingAllTemplates: false,
      templates: action.payload,
    };
  },
  [ReduxActionTypes.UPDATE_TEMPLATE_FILTERS]: (
    state: TemplatesReduxState,
    action: ReduxAction<{ category: string; filterList: string[] }>,
  ) => {
    return {
      ...state,
      filters: {
        ...state.filters,
        [action.payload.category]: action.payload.filterList,
      },
    };
  },
  [ReduxActionTypes.SET_TEMPLATE_SEARCH_QUERY]: (
    state: TemplatesReduxState,
    action: ReduxAction<string>,
  ) => {
    return {
      ...state,
      templateSearchQuery: action.payload,
    };
  },
  [ReduxActionTypes.IMPORT_TEMPLATE_TO_WORKSPACE_INIT]: (
    state: TemplatesReduxState,
  ) => {
    return {
      ...state,
      isImportingTemplate: true,
    };
  },
  [ReduxActionTypes.IMPORT_TEMPLATE_TO_WORKSPACE_SUCCESS]: (
    state: TemplatesReduxState,
  ) => {
    return {
      ...state,
      isImportingTemplate: false,
    };
  },
  [ReduxActionErrorTypes.IMPORT_TEMPLATE_TO_WORKSPACE_ERROR]: (
    state: TemplatesReduxState,
  ) => {
    return {
      ...state,
      isImportingTemplate: false,
    };
  },
  [ReduxActionTypes.IMPORT_TEMPLATE_TO_APPLICATION_INIT]: (
    state: TemplatesReduxState,
  ) => {
    return {
      ...state,
      isImportingTemplateToApp: true,
    };
  },
  [ReduxActionTypes.IMPORT_TEMPLATE_TO_APPLICATION_SUCCESS]: (
    state: TemplatesReduxState,
  ) => {
    return {
      ...state,
      isImportingTemplateToApp: true,
    };
  },
  [ReduxActionErrorTypes.IMPORT_TEMPLATE_TO_APPLICATION_ERROR]: (
    state: TemplatesReduxState,
  ) => {
    return {
      ...state,
      isImportingTemplateToApp: false,
    };
  },
  [ReduxActionErrorTypes.GET_TEMPLATE_ERROR]: (state: TemplatesReduxState) => {
    return {
      ...state,
      gettingTemplate: false,
    };
  },
  [ReduxActionTypes.GET_SIMILAR_TEMPLATES_SUCCESS]: (
    state: TemplatesReduxState,
    action: ReduxAction<Template[]>,
  ) => {
    return {
      ...state,
      similarTemplates: action.payload,
    };
  },
  [ReduxActionTypes.SET_TEMPLATE_NOTIFICATION_SEEN]: (
    state: TemplatesReduxState,
    action: ReduxAction<boolean>,
  ) => {
    return {
      ...state,
      templateNotificationSeen: action.payload,
    };
  },
  [ReduxActionTypes.SHOW_TEMPLATES_MODAL]: (
    state: TemplatesReduxState,
    action: ReduxAction<boolean>,
  ) => {
    return {
      ...state,
      showTemplatesModal: action.payload,
    };
  },
});

export interface TemplatesReduxState {
  gettingAllTemplates: boolean;
  gettingTemplate: boolean;
  templates: Template[];
  activeTemplate: Template | null;
  similarTemplates: Template[];
  filters: Record<string, string[]>;
  templateSearchQuery: string;
  isImportingTemplate: boolean;
  isImportingTemplateToApp: boolean;
  templateNotificationSeen: boolean | null;
  showTemplatesModal: boolean;
}

export default templateReducer;
