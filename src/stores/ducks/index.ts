import { combineReducers } from "redux";

import dashboard, { IDashboardState } from "./dashboard";
import farmers, { IFarmerState } from "./farmers";

export interface IRootState {
  dashboard: IDashboardState;
  farmers: IFarmerState;
}
export default combineReducers({
  farmers,
  dashboard,
});
