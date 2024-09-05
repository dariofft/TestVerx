import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Form, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

import { Page } from "../../../components/Page";
import { IFarmer } from "../../../entities/farmer/IFarmer";
import { farmerFormValidation } from "../../../entities/farmer/FarmerValidation";

import { Actions as FarmerActions } from "../../../stores/ducks/farmers";
import { Select } from "../../../components/Select";

import { states, cultures } from "../../../utils/combos";
import { Input } from "../../../components/Input";
import { IRootState } from "../../../stores/ducks";
import { useEffect } from "react";

export const FarmerManage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { entity } = useSelector((state: IRootState) => state.farmers);

  const {
    values,
    errors,
    touched,
    setValues,
    resetForm,
    setFieldValue,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik<IFarmer>({
    initialValues: {
      document: "",
      producer: "",
      farm: "",
      city: "",
      uf: "",
      total_hectares: 0,
      arable_hectares: 0,
      vegetation_hectares: 0,
      cultures: [],
    },
    validationSchema: farmerFormValidation,
    onSubmit: (values) => {
      if (values.id) {
        dispatch(FarmerActions.putFarmersRequest(values));
        return;
      }

      dispatch(FarmerActions.postFarmersRequest(values));
    },
  });

  useEffect(() => {
    if (id) dispatch(FarmerActions.getFarmerByIdRequest(id));
  }, [dispatch]);

  useEffect(() => {
    if (entity && entity?.document) {
      setValues(entity);
    }
  }, [entity]);

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value?.replace(/\D/g, "");

    if (value.length > 14) return;

    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      value = value.replace(/^(\d{2})(\d)/, "$1.$2");
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
      value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
      value = value.replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }

    setFieldValue("document", value);
  };

  const handleCulturesChange = (value: object[]) => {
    const culturesArray = value as unknown[];

    const arrayValues = cultures
      .filter((o) => culturesArray.includes(o.value))
      .map((o) => ({ id: Number(o.value), description: o.label }));

    setFieldValue("cultures", arrayValues);
  };

  return (
    <Page
      title={id ? "Editar Agricultore" : "Novo Agricultore"}
      btn="Voltar"
      onClick={() => navigate(-1)}
    >
      <Form
        layout="vertical"
        style={{ marginTop: "20px" }}
        onFinish={handleSubmit}
      >
        <Row gutter={20}>
          <Col xs={24} sm={12} md={8}>
            <Input
              label="Documento"
              name="document"
              validateStatus={
                touched.document && errors.document ? "error" : ""
              }
              help={touched.document && errors.document}
              placeholder="CPF/CNPJ"
              value={values.document}
              onChange={handleDocumentChange}
              onBlur={handleBlur}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Input
              label="Produtor"
              name="producer"
              validateStatus={
                touched.producer && errors.producer ? "error" : ""
              }
              help={touched.producer && errors.producer}
              placeholder="Nome produtor"
              value={values.producer}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Input
              label="Fazenda"
              name="farm"
              validateStatus={touched.farm && errors.farm ? "error" : ""}
              help={touched.farm && errors.farm}
              placeholder="Nome fazenda"
              value={values.farm}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Input
              label="Cidade"
              name="city"
              validateStatus={touched.city && errors.city ? "error" : ""}
              help={touched.city && errors.city}
              placeholder="Nome da cidade"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              label="Estado"
              validateStatus={touched.uf && errors.uf ? "error" : ""}
              help={touched.uf && errors.uf}
              placeholder="UF"
              value={values.uf}
              onChange={(value) => setFieldValue("uf", value)}
              onBlur={() => handleBlur({ target: { name: "uf" } })}
              options={states}
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Input
              name="total_hectares"
              label="Total de hectares"
              validateStatus={
                touched.total_hectares && errors.total_hectares ? "error" : ""
              }
              help={touched.total_hectares && errors.total_hectares}
              type="number"
              value={values.total_hectares}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Col>
          <Col xs={24} sm={12} md={5}>
            <Input
              name="arable_hectares"
              label="Área agriultável (ha)"
              validateStatus={
                touched.arable_hectares && errors.arable_hectares ? "error" : ""
              }
              help={touched.arable_hectares && errors.arable_hectares}
              type="number"
              value={values.arable_hectares}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Col>
          <Col xs={24} sm={12} md={5}>
            <Input
              name="vegetation_hectares"
              label="Área vegetação (ha)"
              validateStatus={
                touched.vegetation_hectares && errors.vegetation_hectares
                  ? "error"
                  : ""
              }
              help={touched.vegetation_hectares && errors.vegetation_hectares}
              type="number"
              value={values.vegetation_hectares}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Col>

          <Col xs={24} sm={12} md={10}>
            <Select
              multiple
              label="Culturas"
              validateStatus={
                touched.cultures && errors.cultures ? "error" : ""
              }
              help={touched.cultures && (errors.cultures as string)}
              placeholder="Selecione as culturas"
              options={cultures}
              value={values.cultures?.map((o) => ({
                value: o.id.toString(),
                label: o.description,
              }))}
              onChange={(value) => handleCulturesChange(value as object[])}
              onBlur={() => handleBlur({ target: { name: "cultures" } })}
            />
          </Col>
          <Col
            xs={24}
            sm={12}
            md={14}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={() => resetForm()}>Limpar</Button>
            <Button type="primary" htmlType="submit">
              Salvar
            </Button>
          </Col>
        </Row>
      </Form>
    </Page>
  );
};
