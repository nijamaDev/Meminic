import React from "react";
import { Line } from "react-chartjs-2";
import "../Graphics.css";

const LineChart = ({
  DataX,
  labelTitleX,
  DataY,
  fill,
  backgroundColor,
  borderColor,
}) => {
  const data = {
    labels: DataX,
    datasets: [
      {
        label: labelTitleX,
        data: DataY,
        fill: fill,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
      },
    ],
  };
  const legend = {
    display: true,
    position: "bottom",
    labels: {
      fontColor: "#323130",
      fontSize: 14,
    },
  };

  const options = {
    title: {
      display: true,
      text: "Chart Title",
    },
  };

  return (
    <div className="reports__graph">
      <Line data={data} legend={legend} options={options} />
    </div>
  );
};

export default LineChart;
