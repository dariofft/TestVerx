export interface IFarmUF {
  [key: string]: number;
}

export interface IFarmCulture {
  [key: string]: number;
}

export interface IGroundUsed {
  [key: string]: number;
}

export interface IDashboard {
  total_farm: number;
  total_hectares: number;
  farm_uf: IFarmUF[];
  farm_cultures: IFarmCulture[];
  ground_used: IGroundUsed[];
}
