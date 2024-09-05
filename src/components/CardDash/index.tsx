import { useCallback } from "react";
import { Flex, Skeleton, Typography } from "antd";
import { Pie } from "@ant-design/plots";

import { ICardDash } from "./types";
import { CardStyled } from "./styles";

export const CardDash: React.FC<ICardDash> = ({ loading, title, data }) => {
  const convertDataPie = useCallback((array: { [key: string]: number }[]) => {
    return array?.map((item) => {
      const [type, value] = Object.entries(item)[0];
      return {
        type,
        value,
      };
    });
  }, []);

  return (
    <CardStyled>
      <Typography.Title level={3}>{title}</Typography.Title>

      {loading ? (
        <Flex gap={9} vertical align="center">
          <Skeleton.Input active />
          <Skeleton.Input active />
          <Skeleton.Input active />
        </Flex>
      ) : (
        <Pie
          data={convertDataPie(data)}
          angleField="value"
          colorField="type"
          label={{
            text: "type",
            position: "outside",
          }}
        />
      )}
    </CardStyled>
  );
};
