import { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";

import { farmersAPI } from "../../services/api";
import { IFarmer } from "../../entities/farmer/IFarmer";
import { Actions as FarmerActions, IActionFarmer } from "../ducks/farmers";

export function* getFarmers() {
  try {
    const response: AxiosResponse<IFarmer[]> = yield call(() =>
      farmersAPI.get<IFarmer[]>("")
    );

    if (response.status == 200) {
      yield put(FarmerActions.getFarmersSuccess(response.data as IFarmer[]));
    }
  } catch (error) {
    yield put(FarmerActions.getFarmersFailure(error as object));
  }
}

export function* getFarmerById(action: IActionFarmer) {
  try {
    const { id } = action.payload;

    const response: AxiosResponse<IFarmer> = yield call(() =>
      farmersAPI.get<IFarmer>(`/${id}`)
    );

    if (response.status == 200) {
      yield put(FarmerActions.getFarmerByIdSuccess(response.data as IFarmer));
    }
  } catch (error) {
    yield put(FarmerActions.getFarmerByIdFailure(error as object));
  }
}

export function* postFarmers(action: IActionFarmer) {
  try {
    const { data } = action.payload;

    const response: AxiosResponse<IFarmer> = yield call(() =>
      farmersAPI.post<IFarmer>("", data)
    );

    if (response.status == 200) {
      yield put(FarmerActions.postFarmersSuccess());
    }
  } catch (error) {
    yield put(FarmerActions.postFarmersFailure(error as object));
  }
}

export function* putFarmers(action: IActionFarmer) {
  try {
    const { data } = action.payload;

    const response: AxiosResponse<IFarmer> = yield call(() =>
      farmersAPI.put<IFarmer[]>(`/${data.id}`, data)
    );

    if (response.status == 200) {
      yield put(FarmerActions.putFarmersSuccess());
    }
  } catch (error) {
    yield put(FarmerActions.putFarmersFailure(error as object));
  }
}

export function* deleteFarmers(action: IActionFarmer) {
  try {
    const { id } = action.payload;

    const response: AxiosResponse<IFarmer> = yield call(() =>
      farmersAPI.delete<IFarmer>(`/${id}`)
    );

    if (response.status == 200) {
      yield put(FarmerActions.deleteFarmerSuccess());
      yield put(FarmerActions.getFarmersRequest());
    }
  } catch (error) {
    yield put(FarmerActions.deleteFarmerFailure(error as object));
  }
}
