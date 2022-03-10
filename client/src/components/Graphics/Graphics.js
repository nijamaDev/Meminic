import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import Auth0Hook from "../../hooks/Auth0Hook";
import LineChart from "./LineChart.js/LineChart";
import ReportsContext from "../../context/ReportsContext";
import ReactLoading from "react-loading";
import BarChart from "./BarChart.js/BarChart";
import "./Graphics.css";
const Graphics = () => {
  const { user } = Auth0Hook();
  const [isLoading, setIsLoading] = useState(true);
  const { salesByYear, salesByMonth, salesBylastMonth } = ReportsContext();
  const [salesByYearAmount, setSalesByYearAmount] = useState();
  const [salesByYearProducts, setSalesByYearProducts] = useState();
  const [salesByMonthMonths, setSalesByMonthMonths] = useState();
  const [salesByMonthCount, setSalesByMonthCount] = useState();
  const [salesByLastMonthAmount, setSalesByLastMonthAmount] = useState();
  const [salesByLastMonthProducts, setSalesByLastMonthProducts] = useState();
  useEffect(() => {
    if (isLoading === true) {
      salesByYear(user.email).then(function (response) {
        setSalesByYearAmount(response.data.amount);
        setSalesByYearProducts(response.data.products);
        console.log("respuesta1", response);
      });
      salesByMonth(user.email).then(function (response) {
        setSalesByMonthMonths(response.data.months);
        setSalesByMonthCount(response.data.count);
        console.log("respuesta2", response);
      });
      salesBylastMonth(user.email).then(function (response) {
        setSalesByLastMonthAmount(response.data.amount);
        setSalesByLastMonthProducts(response.data.products);
        console.log("respuesta3", response);
        setIsLoading(false);
      });
    }
  }, []);

  return (
    <>
      <h1 className="reports__title"> Reportes</h1>
      <div>
        {isLoading ? (
          <>
            <ReactLoading
              className="loading"
              type="spinningBubbles"
              color="#fff"
            />
          </>
        ) : (
          <div className="reports__container">
            <div className="reports__first__container">
              <LineChart
                DataX={salesByYearProducts}
                labelTitleX={"Número de productos vendidos en el año"}
                DataY={salesByYearAmount}
                fill={true}
                backgroundColor="rgba(75,192,192,0.2)"
                borderColor="rgba(75,192,192,1)"
              />
              <BarChart
                DataX={salesByMonthMonths}
                labelTitleX={"Número de ventas por mes en el año"}
                DataY={salesByMonthCount}
              />
            </div>
            <LineChart
              DataX={salesByLastMonthProducts}
              labelTitleX={"Número de productos vendidos en el último mes"}
              DataY={salesByLastMonthAmount}
              fill={true}
              backgroundColor="rgba(255, 99, 132, 0.2)"
              borderColor="rgba(255, 99, 132, 0.2)"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Graphics;
