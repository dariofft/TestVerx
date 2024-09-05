import * as Yup from "yup";
import { IFarmer } from "./IFarmer";

export const farmerFormValidation = Yup.object<IFarmer>().shape({
  document: Yup.string().required("Documento é obrigatório"),
  producer: Yup.string().required("Produtor é obrigatório"),
  farm: Yup.string().required("Fazenda é obrigatória"),
  city: Yup.string().required("Cidade é obrigatória"),
  uf: Yup.string().required("UF é obrigatória"),
  total_hectares: Yup.number()
    .required("Número total de hectares é obrigatório")
    .min(0, "O número total de hectares não pode ser negativo")
    .test(
      "total-hectares-check",
      "A soma da área agrícultável e vegetação não pode ser maior que a área total",
      function (value) {
        const { arable_hectares, vegetation_hectares } = this.parent;
        return value >= (arable_hectares || 0) + (vegetation_hectares || 0);
      }
    ),
  arable_hectares: Yup.number()
    .required("Número de hectares aráveis é obrigatório")
    .min(0, "O número de hectares aráveis não deve ser negativo"),
  vegetation_hectares: Yup.number()
    .required("Número de hectares de vegetação é obrigatório")
    .min(0, "O número de hectares de vegetação não deve ser negativo"),
  cultures: Yup.array()
    .min(1, "Deve haver pelo menos uma cultura selecionada")
    .required("Culturas são obrigatórias"),
});
