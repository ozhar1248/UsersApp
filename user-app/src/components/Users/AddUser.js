import React, { useState, useRef } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import styles from "./AddUser.module.css";

function AddUser(props) {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState();

  const addSubmitHandler = (event) => {
    event.preventDefault();
    const usernameEntered = nameInputRef.current.value;
    const ageEntered = ageInputRef.current.value;

    if (
      usernameEntered.trim().length === 0 ||
      ageEntered.trim().length === 0
    ) {
      setError({
        title: "Invalid Input",
        message: "Please enter an age and a username",
      });
      return;
    }
    if (+ageEntered < 1) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid age",
      });
      return;
    }
    const userInput = {username: usernameEntered, age: ageEntered}
    props.onAddUser(userInput);
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
  };
  const errorHandler = (props) => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={addSubmitHandler}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            ref = {nameInputRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            type="number"
            id="age"
            ref = {ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
}

export default AddUser;
