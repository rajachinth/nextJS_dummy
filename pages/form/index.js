import React, { Fragment, useEffect, useRef, useState } from "react";

function FormComponent() {
  let inputRef = useRef();
  let [stateValue, updateState] = useState([]);

  useEffect(() => {
    console.log("state re-rendered");
  }, [stateValue]);

  function formSubmit(e) {
    let data = { username: inputRef.current.value };
    e.preventDefault();
    fetch("/api/postdetails", {
      method: "POST",
      body: JSON.stringify(data), //sending the JSON data type
      // headers: {
      //   "Content-Type": "application/json",
      // },
    })
      .then((response) => {
        console.log("request success");
        return response.json();
      })
      .then((data) => {
        updateState((lastState) => {
          return data;
        });
      })
      .catch(() => {
        console.log("request failed");
      });
  }

  return (
    <Fragment>
      <form onSubmit={formSubmit}>
        <div
          style={{
            marginLeft: "25%",
            width: "50%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label style={{ paddingTop: "20px" }} htmlFor="f1">
            Profile Name:
          </label>
          <input
            style={{ margin: "20px 0" }}
            id="f1"
            type="text"
            ref={inputRef}
            placeholder="enter profile name"
          />
          <button type="submit">save</button>
        </div>
      </form>
      <h1>UserName DB Lists:</h1>
      <ul>
        {stateValue.map((e, index, totalArray) => (
          <li key={index}>{e.username}</li>
        ))}
      </ul>
    </Fragment>
  );
}

export default FormComponent;
