import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table, Tag, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

import { Page } from "../../../components/Page";
import { IRootState } from "../../../stores/ducks";

import { Actions as FarmerActions } from "../../../stores/ducks/farmers";

export const FarmerList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, response } = useSelector(
    (state: IRootState) => state.farmers
  );

  const onClickNewFarmer = useCallback(() => {
    navigate("/farmers/new");
  }, [navigate]);

  const onClickRemove = useCallback((id: string) => {
    MySwal.fire({
      title: "Tem certeza que deseja excluir?",
      text: "Você não poderá reverter essa ação!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(FarmerActions.deleteFarmerRequest(id));
        MySwal.fire(
          "Excluído!",
          "O agricultor foi excluído com sucesso.",
          "success"
        );
      }
    });
  }, []);

  const formatDocument = useCallback((document: string): string => {
    if (!document) return "";

    const cleaned = document?.replace(/\D/g, "") ?? "";

    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    if (cleaned.length === 14) {
      return cleaned.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        "$1.$2.$3/$4-$5"
      );
    }

    return document;
  }, []);

  useEffect(() => {
    dispatch(FarmerActions.getFarmersRequest());
  }, [dispatch]);

  return (
    <Page title="Agricultores" btn="Adicionar Novo" onClick={onClickNewFarmer}>
      <Table dataSource={response} loading={loading} scroll={{ x: true }}>
        <Table.Column
          title="Documento"
          dataIndex="document"
          key="document"
          render={(document) => formatDocument(document)}
        />
        <Table.Column title="Produtor" dataIndex="producer" key="producer" />
        <Table.Column title="Fazenda" dataIndex="farm" key="farm" />
        <Table.Column
          title="Cidade/Estado"
          render={({ city, uf }: { city: string; uf: string }) =>
            `${city} - ${uf}`
          }
        />
        <Table.Column
          title="Total de hectares"
          dataIndex="total_hectares"
          key="total_hectares"
        />
        <Table.Column
          title="Área agricultável(ha)"
          dataIndex="arable_hectares"
          key="arable_hectares"
        />
        <Table.Column
          title="Área vegetação(ha)"
          dataIndex="vegetation_hectares"
          key="vegetation_hectares"
        />
        <Table.Column
          title="Culturas"
          dataIndex="cultures"
          key="cultures"
          render={(cultures: { id: number; description: string }[]) => (
            <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
              {cultures.map((c) => (
                <Tag color="cyan" key={c.id}>
                  {c.description}
                </Tag>
              ))}
            </div>
          )}
        />
        <Table.Column
          title=""
          render={({ id }: { id: string }) => (
            <div style={{ display: "flex", gap: "8px" }}>
              <Tooltip title="editar">
                <Button
                  onClick={() => navigate(`/farmers/edit/${id}`)}
                  type="default"
                  shape="circle"
                  icon={<EditOutlined />}
                />
              </Tooltip>

              <Tooltip title="excluir">
                <Button
                  onClick={() => onClickRemove(id)}
                  type="primary"
                  shape="circle"
                  icon={<DeleteOutlined />}
                />
              </Tooltip>
            </div>
          )}
        />
      </Table>
    </Page>
  );
};
