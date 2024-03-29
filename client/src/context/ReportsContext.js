import axios from "axios";

const ReportsContext = () => {
  const salesByYear = async (email) => {
    try {
      const salesByYearData = await axios.post(
        "http://localhost:5000/productsSalesByYear",
        {
          email: email,
        }
      );
      return salesByYearData;
    } catch (error) {
      console.log("error");
    }
  };

  const salesByMonth = async (email) => {
    try {
      const salesByMonthData = await axios.post(
        "http://localhost:5000/salesByMonth",
        {
          email: email,
        }
      );
      return salesByMonthData;
    } catch (error) {
      console.log("error");
    }
  };

  const salesBylastMonth = async (email) => {
    try {
      const salesByLastMonthData = await axios.post(
        "http://localhost:5000/productsSalesByLastMonth",
        {
          email: email,
        }
      );
      return salesByLastMonthData;
    } catch (error) {
      console.log("error");
    }
  };

  return { salesByYear, salesByMonth, salesBylastMonth };
};
export default ReportsContext;
