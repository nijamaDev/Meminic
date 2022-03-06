import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import ReportsContext from "../../context/ReportsContext";
import Auth0Hook from "../../hooks/Auth0Hook";
const Graphics = () => {
  const { salesByMonth } = ReportsContext();
  const { user } = Auth0Hook();
  salesByMonth(user.email);
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "First dataset",
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Second dataset",
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: "#742774",
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
    // scales: {
    //   yAxes: [
    //     {
    //       ticks: {
    //         suggestedMin: 0,
    //         suggestedMax: 100,
    //       },
    //     },
    //   ],
    // },
  };

  return (
    <div>
      <Line data={data} legend={legend} options={options} />
    </div>
  );
};

export default Graphics;
