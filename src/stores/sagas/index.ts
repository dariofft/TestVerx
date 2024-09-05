import { all, takeLatest } from "redux-saga/effects";

//#region dashboard
import { Types as DashboardTypes } from "../ducks/dashboard";
import { getDashboard } from "./dashboard";
//#endregion

//#region farmers
import { Types as FarmersTypes } from "../ducks/farmers";
import {
  deleteFarmers,
  getFarmerById,
  getFarmers,
  postFarmers,
  putFarmers,
} from "./farmers";
//#endregion

export default function* rootSaga() {
  yield all([
    takeLatest(DashboardTypes.GET_DASHBOARD_REQUEST, getDashboard),
    takeLatest(FarmersTypes.GET_FARMERS_REQUEST, getFarmers),
    takeLatest(FarmersTypes.GET_FARMER_BY_ID_REQUEST, getFarmerById),
    takeLatest(FarmersTypes.POST_FARMERS_REQUEST, postFarmers),
    takeLatest(FarmersTypes.PUT_FARMERS_REQUEST, putFarmers),
    takeLatest(FarmersTypes.DELETE_FARMERS_REQUEST, deleteFarmers),
  ]);
}
