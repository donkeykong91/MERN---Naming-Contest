import React from "react";

import Header from "./Header.js";


class App extends React.Component {

  state = {

    pageHeader: "Naming Contests"

  };


  componentDidMount() {

    console.log("Did Mount");

    debugger;

  }


  componentWillUnmount() {

    console.log("Will Unmount");

    debugger;

  }


  render() {

    return (


      <div className="App">

        <Header message={this.state.pageHeader} />

        <div>

          ...

        </div>

      </div>


    );

  }

}


export default App;
