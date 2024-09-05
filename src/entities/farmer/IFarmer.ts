export interface ICulture {
  id: number;
  description: string;
}

export interface IFarmer {
  id?: string;
  document: string;
  producer: string;
  farm: string;
  city: string;
  uf: string;
  total_hectares: number;
  arable_hectares: number;
  vegetation_hectares: number;
  cultures: ICulture[];
}
