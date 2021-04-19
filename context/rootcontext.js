/**
 * Added the skeleton structure; implementation in project is in ****pending****
 *
 * **************************************************************************************
 * **************************************************************************************
 * ********** Code block is in pending, added the root level state management ***********
 * ********** using react-context.We wrap whole component with <RootContext/> ***********
 * ********** and use "Provider" to send the state props to all the components **********
 * ********** by avoiding the chaining the props from parent to the childrens. **********
 * ********** We can implement this using REDUX also, but for  small projects ***********
 * ********** usig "React.createContext()" is prefered. *********************************
 * **************************************************************************************
 * **************************************************************************************
 *
 */
import React, { Fragment, useEffect, useState } from "react";

let rootContext = React.createContext({
  isLoading: false,
  isError: false,
  isSuccess: true,
});

function RootContext(props) {
  let [stateValue, updateState] = useState({
    isLoading: false,
    isError: false,
    isSuccess: true,
  });

  function updateLoad(data) {
    updateState((prevstate) => {
      Object.assign({}, prevstate, { isLoading: data });
    });
  }
  function updateStatus(data) {
    updateState((prevstate) => {
      Object.assign({}, prevstate, {
        isError: data.error,
        isSuccess: data.success,
      });
    });
  }

  let contextValue = {
    ...stateValue,
    updateStatus,
    updateLoad,
  };

  useEffect(() => {
    console.log("do domething here");

    return () => {
      console.log("cleanup function");
    };
  }, []);

  return (
    <Fragment>
      <rootContext.Provider value={contextValue}>
        {props.children}
      </rootContext.Provider>
    </Fragment>
  );
}

export default RootContext;
