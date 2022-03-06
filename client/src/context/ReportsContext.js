import axios from "axios";

const ReportsContext = () => {
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
  return { salesByMonth };
};
export default ReportsContext;
