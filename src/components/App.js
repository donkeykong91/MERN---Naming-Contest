import React from "react";

import Header from "./Header.js";

import ContestList from "./ContestList";

import Contest from "./Contest";

import * as api from "../api";


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


  fetchContest = (contestId) => {

    pushState(

      {currentContestId: contestId},

      `/contest/${contestId}`

    )

    api.fetchContest(contestId)

      .then( contest => {

        this.setState({

          pageHeader: contest.contestName,

          currentContestId: contest.id,

          contests: {

            ...this.state.contests,

            [contest.id]: contest

          }

        });

      });

  };


  currentContent() {

    if (this.state.currentContestId) {

      return (

        <Contest

          {...this.state.contests[this.state.currentContestId]}

        />

      );

    } else {

      return (

        <ContestList

          onContestClick={this.fetchContest}

          contests={this.state.contests}

        />

      );

    }

  }


  render() {

    return (


      <div className="App">

        <Header message={this.state.pageHeader} />

        {this.currentContent()}

      </div>


    );

  }

}


export default App;
