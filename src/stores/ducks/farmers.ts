import { Action } from "redux-saga";
import { IFarmer } from "../../entities/farmer/IFarmer";

export const Types = {
  GET_FARMERS_REQUEST: "@farmers/GET_FARMERS_REQUEST",
  GET_FARMERS_SUCCESS: "@farmers/GET_FARMERS_SUCCESS",
  GET_FARMERS_FAILURE: "@farmers/GET_FARMERS_FAILURE",

  GET_FARMER_BY_ID_REQUEST: "@farmers/GET_FARMER_BY_ID_REQUEST",
  GET_FARMER_BY_ID_SUCCESS: "@farmers/GET_FARMER_BY_ID_SUCCESS",
  GET_FARMER_BY_ID_FAILURE: "@farmers/GET_FARMER_BY_ID_FAILURE",

  PUT_FARMERS_REQUEST: "@farmers/PUT_FARMERS_REQUEST",
  PUT_FARMERS_SUCCESS: "@farmers/PUT_FARMERS_SUCCESS",
  PUT_FARMERS_FAILURE: "@farmers/PUT_FARMERS_FAILURE",

  POST_FARMERS_REQUEST: "@farmers/POST_FARMERS_REQUEST",
  POST_FARMERS_SUCCESS: "@farmers/POST_FARMERS_SUCCESS",
  POST_FARMERS_FAILURE: "@farmers/POST_FARMERS_FAILURE",

  DELETE_FARMERS_REQUEST: "@farmers/DELETE_FARMERS_REQUEST",
  DELETE_FARMERS_SUCCESS: "@farmers/DELETE_FARMERS_SUCCESS",
  DELETE_FARMERS_FAILURE: "@farmers/DELETE_FARMERS_FAILURE",
};

export interface IActionFarmer extends Action {
  payload: {
    data: IFarmer;
    error: object;
    id?: string;
  };
}

export interface IFarmerState {
  loading: boolean;
  error: object;
  response: IFarmer[];
  entity: IFarmer;
}

const INITIAL_STATE: IFarmerState = {
  loading: false,
  error: {} as object,
  response: [] as IFarmer[],
  entity: {} as IFarmer,
};

export default function dashboard(
  state = INITIAL_STATE,
  action: IActionFarmer
) {
  switch (action.type) {
    case Types.GET_FARMERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.GET_FARMERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        response: action.payload.data,
      };
    case Types.GET_FARMERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        response: null,
      };

    case Types.GET_FARMER_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        entity: {},
      };
    case Types.GET_FARMER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        entity: action.payload.data,
      };
    case Types.GET_FARMER_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        entity: null,
      };

    case Types.PUT_FARMERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.PUT_FARMERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case Types.PUT_FARMERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case Types.POST_FARMERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.POST_FARMERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case Types.POST_FARMERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case Types.DELETE_FARMERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        entity: {},
      };
    case Types.DELETE_FARMERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case Types.DELETE_FARMERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        entity: null,
      };

    default:
      return state;
  }
}

export const Actions = {
  getFarmersRequest: () => ({
    type: Types.GET_FARMERS_REQUEST,
    payload: {},
  }),
  getFarmersSuccess: (data: IFarmer[]) => ({
    type: Types.GET_FARMERS_SUCCESS,
    payload: { data },
  }),
  getFarmersFailure: (error: object) => ({
    type: Types.GET_FARMERS_FAILURE,
    payload: { error },
  }),

  getFarmerByIdRequest: (id: string) => ({
    type: Types.GET_FARMER_BY_ID_REQUEST,
    payload: { id },
  }),
  getFarmerByIdSuccess: (data: IFarmer) => ({
    type: Types.GET_FARMER_BY_ID_SUCCESS,
    payload: { data },
  }),
  getFarmerByIdFailure: (error: object) => ({
    type: Types.GET_FARMER_BY_ID_FAILURE,
    payload: { error },
  }),

  putFarmersRequest: (data: IFarmer) => ({
    type: Types.PUT_FARMERS_REQUEST,
    payload: { data },
  }),
  putFarmersSuccess: () => ({
    type: Types.PUT_FARMERS_SUCCESS,
    payload: {},
  }),
  putFarmersFailure: (error: object) => ({
    type: Types.PUT_FARMERS_FAILURE,
    payload: { error },
  }),

  postFarmersRequest: (data: IFarmer) => ({
    type: Types.POST_FARMERS_REQUEST,
    payload: { data },
  }),
  postFarmersSuccess: () => ({
    type: Types.POST_FARMERS_SUCCESS,
    payload: {},
  }),
  postFarmersFailure: (error: object) => ({
    type: Types.POST_FARMERS_FAILURE,
    payload: { error },
  }),

  deleteFarmerRequest: (id: string) => ({
    type: Types.DELETE_FARMERS_REQUEST,
    payload: { id },
  }),
  deleteFarmerSuccess: () => ({
    type: Types.DELETE_FARMERS_SUCCESS,
    payload: {},
  }),
  deleteFarmerFailure: (error: object) => ({
    type: Types.DELETE_FARMERS_FAILURE,
    payload: { error },
  }),
};
