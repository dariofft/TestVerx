import { Skeleton, Statistic, Typography } from "antd";

import { ICardStatistic } from "./types";
import { CardStyled } from "./styles";

export const CardStatistic: React.FC<ICardStatistic> = ({
  statistic,
  title,
  icon,
  loading,
}) => {
  return (
    <CardStyled>
      <Typography.Title level={3}>{title}</Typography.Title>
      {loading ? (
        <Skeleton.Input active />
      ) : (
        <Statistic value={statistic} prefix={icon} />
      )}
    </CardStyled>
  );
};
