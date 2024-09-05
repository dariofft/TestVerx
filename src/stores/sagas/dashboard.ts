import { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";

import { dashboardAPI } from "../../services/api";
import { IDashboard } from "../../entities/dashboard/IDashboard";
import { Actions as DashboardActions } from "../ducks/dashboard";

export function* getDashboard() {
  try {
    const response: AxiosResponse<IDashboard> = yield call(() =>
      dashboardAPI.get<IDashboard>("")
    );

    if (response.status == 200) {
      yield put(
        DashboardActions.getDashboardSuccess(response.data as IDashboard)
      );
    }
  } catch (error) {
    yield put(DashboardActions.getDashboardFailure(error as object));
  }
}
