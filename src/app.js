import React from "react";
import { connect } from "react-redux";

// ACTION CREATORS
import { fetchData } from "./actions";

function App(props) {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <button onClick={() => props.fetchData()}>LAOD DATA</button>
      <section />
    </div>
  );
}

const mapStateToProps = state => {
  console.log(state);
  return {
    appData: state.appData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(fetchData())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
