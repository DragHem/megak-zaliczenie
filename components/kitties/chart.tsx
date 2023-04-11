import React, { useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";
export const Chart = ({
  data,
}: {
  data: { value: number; name: string }[];
}) => {
  if (!data) return null;
  if (data.length == 0) data = [];
  const theme = {
    darkMode: true,
    legend: {
      textStyle: {
        color: "white",
      },
    },
  };

  const option = {
    legend: {
      left: "left",
    },
    emphasis: {
      label: {
        show: true,
      },
    },
    tooltip: {
      trigger: "item",
      formatter: "{b} : {c} zł ({d}%)",
    },
    toolbox: {
      show: true,
    },
    responsive: true,
    maintainAspectRatio: false,
    series: [
      {
        type: "pie",
        radius: ["10%", "80%"],
        center: ["50%", "50%"],
        roseType: "area",

        itemStyle: {
          borderRadius: 10,
        },
        data: data,
      },
    ],
  };

  const onChartClick = (e: object) => {
    console.log(e);
  };

  const onEvents = {
    click: onChartClick,
  };

  return (
    <div>
      <ReactEcharts
        style={{ height: "60vh" }}
        onEvents={onEvents}
        option={option}
        theme={theme}
        notMerge={true}
      />
    </div>
  );
};
