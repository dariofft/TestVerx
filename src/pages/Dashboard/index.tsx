import { useEffect } from "react";
import { Flex } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { FullscreenOutlined, HomeOutlined } from "@ant-design/icons";

import { Page } from "../../components/Page";
import { CardDash } from "../../components/CardDash";
import { CardStatistic } from "../../components/CardStatistic";

import { IRootState } from "../../stores/ducks";
import { Actions as DashboardActions } from "../../stores/ducks/dashboard";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, response } = useSelector(
    (state: IRootState) => state.dashboard
  );

  useEffect(() => {
    dispatch(DashboardActions.getDashboardRequest());
  }, [dispatch]);

  return (
    <Page title="Dashboard">
      <Flex justify="space-between" wrap gap="large">
        <CardStatistic
          title="Total de fazendas"
          loading={loading}
          icon={<HomeOutlined />}
          statistic={`${response.total_farm}`}
        />

        <CardStatistic
          title="Total de hectares"
          loading={loading}
          icon={<FullscreenOutlined />}
          statistic={`${response.total_hectares} ha`}
        />
      </Flex>

      <Flex
        justify="space-between"
        wrap
        gap="large"
        style={{ marginTop: "20px" }}
      >
        <CardDash
          title="Fazendas por estado"
          loading={loading}
          data={response?.farm_uf}
        />

        <CardDash
          title="Fazendas por cultura"
          loading={loading}
          data={response?.farm_cultures}
        />

        <CardDash
          title="Uso do solo"
          loading={loading}
          data={response?.ground_used}
        />
      </Flex>
    </Page>
  );
};
