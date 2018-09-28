import React from "react";

import Header from "./Header.js";

import ContestList from "./ContestList";

import Contest from "./Contest";

import * as api from "../api";

import PropTypes from "prop-types";


const pushState = function (obj, url) {

  return window.history.pushState(obj, "", url);

};


class App extends React.Component {

  static propTypes = {

    initialData: PropTypes.object.isRequired

  }

  state = this.props.initialData;


  componentDidMount() {

    window.onpopstate = function (event) {

      console.log(event);

    }

  }


  fetchContest = (contestId) => {

    pushState(

      {currentContestId: contestId},

      `/contest/${contestId}`

    );

    api.fetchContest(contestId)

      .then( contest => {

        this.setState({

          currentContestId: contest.id,

          contests: {

            ...this.state.contests,

            [contest.id]: contest

          }

        });

      });

  };


  fetchContestList = () => {

    pushState(

      {currentContestId: null},

      `/`

    );

    api.fetchContestList()

      .then( contests => {

        this.setState({

          currentContestId: null,

          contests

        });

      });

  };


  currentContest() {

    return this.state.contests[this.state.currentContestId];

  }


  pageHeader() {

    if (this.state.currentContestId) {

      return this.currentContest().contestName;

    } else {

      return "Naming Contests";

    }

  }


  currentContent() {

    if (this.state.currentContestId) {

      return (

        <Contest

          contestListClick={this.fetchContestList}

          {...this.currentContest()}

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

        <Header message={this.pageHeader()} />

        {this.currentContent()}

      </div>


    );

  }

}


export default App;
