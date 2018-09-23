import React from "react";

import Header from "./Header.js";

import ContestPreview from "./ContestPreview";

import data from "../testData";


class App extends React.Component {

  state = {

    pageHeader: "Naming Contests",

    contests: []

  };


  componentDidMount() {

    this.setState(

      {

        contests: data.contests

      }

    );

  }


  render() {

    return (


      <div className="App">

        <Header message={this.state.pageHeader} />

        <div>

          {this.state.contests.map( function (contest) {

            return (

              <ContestPreview

                key={contest.id}

                {...contest}

              />

            );

          })}

        </div>

      </div>


    );

  }

}


export default App;
