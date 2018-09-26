import React from "react";

import Header from "./Header.js";

import ContestList from "./ContestList";


const pushState = function (obj, url) {

  return window.history.pushState(obj, "", url);

};


class App extends React.Component {

  state = {

    pageHeader: "Naming Contests",

    contests: this.props.initialContests

  };


  componentDidMount() {

  }


  fetchContest = function (contestId) {

    return pushState(

            {currentContestId: contestId},

            `/contest/${contestId}`

           );

  };


  render() {

    return (


      <div className="App">

        <Header message={this.state.pageHeader} />

        <ContestList

          onContestClick={this.fetchContest}

          contests={this.state.contests}

        />

      </div>


    );

  }

}


export default App;
