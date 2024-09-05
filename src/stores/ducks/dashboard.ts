import { Action } from "redux-saga";
import { IDashboard } from "../../entities/dashboard/IDashboard";

export const Types = {
  GET_DASHBOARD_REQUEST: "@dashboard/GET_DASHBOARD_REQUEST",
  GET_DASHBOARD_SUCCESS: "@dashboard/GET_DASHBOARD_SUCCESS",
  GET_DASHBOARD_FAILURE: "@dashboard/GET_DASHBOARD_FAILURE",
};

interface IActionDashboard extends Action {
  payload: {
    data: IDashboard;
    error: object;
  };
}

export interface IDashboardState {
  loading: boolean;
  error: object;
  response: IDashboard;
}

const INITIAL_STATE: IDashboardState = {
  loading: false,
  error: {} as object,
  response: {} as IDashboard,
};

export default function dashboard(
  state = INITIAL_STATE,
  action: IActionDashboard
) {
  switch (action.type) {
    case Types.GET_DASHBOARD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.GET_DASHBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        response: action.payload.data,
      };
    case Types.GET_DASHBOARD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        response: null,
      };

    default:
      return state;
  }
}

export const Actions = {
  getDashboardRequest: () => ({
    type: Types.GET_DASHBOARD_REQUEST,
    payload: {},
  }),
  getDashboardSuccess: (data: IDashboard) => ({
    type: Types.GET_DASHBOARD_SUCCESS,
    payload: { data },
  }),
  getDashboardFailure: (error: object) => ({
    type: Types.GET_DASHBOARD_FAILURE,
    payload: { error },
  }),
};
