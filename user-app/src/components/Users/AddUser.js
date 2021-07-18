import React, { useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import styles from "./AddUser.module.css";

function AddUser(props) {
  const [userInput, setUserInput] = useState({ username: "", age: "" });
  const [error, setError] = useState();

  const changeUsernameHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, username: event.target.value };
    });
  };
  const changeAgeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, age: event.target.value };
    });
  };
  const addSubmitHandler = (event) => {
    event.preventDefault();
    if (
      userInput.username.trim().length === 0 ||
      userInput.age.trim().length === 0
    ) {
      setError({
        title: "Invalid Input",
        message: "Please enter an age and a username",
      });
      return;
    }
    if (+userInput.age < 1) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid age",
      });
      return;
    }
    props.onAddUser(userInput);
    setUserInput({ username: "", age: "" });
  };
  const errorHandler = props => {
      setError(null);
  }
  return (
    <div>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
      <Card className={styles.input}>
        <form onSubmit={addSubmitHandler}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            onChange={changeUsernameHandler}
            value={userInput.username}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            type="number"
            id="age"
            onChange={changeAgeHandler}
            value={userInput.age}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
}

export default AddUser;
