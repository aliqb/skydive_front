import React from "react";
import Grid from "../../../components/shared/Grid";

const UserManagement: React.FC = () => {
  const students = [
    { id: 1, name: "Kate", age: 25, favFruit: "🍏" },
    { id: 2, name: "Tom", age: 23, favFruit: "🍌" },
    { id: 3, name: "Ann", age: 26, favFruit: "🍊" },
    { id: 4, name: "Jack", age: 21, favFruit: "🍒" },
    { id: 4, name: "Jack", age: 21, favFruit: "🍒" },
    { id: 4, name: "Jack", age: 21, favFruit: "🍒" },
    { id: 4, name: "Jack", age: 21, favFruit: "🍒" },
    { id: 4, name: "Jack", age: 21, favFruit: "🍒" },
    { id: 4, name: "Jack", age: 21, favFruit: "🍒" },
  ];
  return (
    <>
      <Grid data={students} />
    </>
  );
};

export default UserManagement;
