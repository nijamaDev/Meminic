import { useState } from "react";
import UserContext from "../../context/UserContext";
import Auth0Hook from "../../hooks/Auth0Hook";

const UserReadTableEvents = () => {
  const { user } = Auth0Hook();
  const { searchUser, getWorkers } = UserContext();
  const [isClicked, setIsClicked] = useState(false);
  const [employeesList, setEmployeesList] = useState([]);

  const onClickTable = () =>
    searchUser(user.email).then(function (response) {
      getWorkers(response.data.storeStoreId).then(function (response) {
        setEmployeesList(response.data);
        return response;
      });

      setIsClicked(!isClicked);
    });
  return { employeesList, onClickTable, isClicked };
};
export default UserReadTableEvents;
