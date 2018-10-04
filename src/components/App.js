import React from "react";

import Header from "./Header.js";

import ContestList from "./ContestList";

import Contest from "./Contest";

import * as api from "../api";

import PropTypes from "prop-types";


const pushState = function (obj, url) {

  return window.history.pushState(obj, "", url);

};


const onPopState = function (handler) {

  window.onpopstate = handler;

};


class App extends React.Component {

  static propTypes = {

    initialData: PropTypes.object.isRequired

  }

  state = this.props.initialData;


  componentDidMount() {

    onPopState( event => {

      this.setState({

        currentContestId: (event.state || {}).currentContestId

      });

    });

  }


  componentWillUnmount() {

    onPopState(null);

  }


  fetchContest = (contestId) => {

    pushState(

      {currentContestId: contestId},

      `/contest/${contestId}`

    );

    api.fetchContest(contestId)

      .then( contest => {

        this.setState({

          currentContestId: contest._id,

          contests: {

            ...this.state.contests,

            [contest._id]: contest

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


  fetchNames = nameIds => {

    if (nameIds.length === 0) {

      return;

    }

    api.fetchNames(nameIds).then( names => {

      this.setState({

        names

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


  lookupName = nameId => {

    if (!this.state.names || !this.state.names[nameId]) {

      return {

        name: "..."

      };

    }

    return this.state.names[nameId];

  };


  addName = (newName, contestId) => {

    api.addName(newName, contestId)

      .then ( response => {

        this.setState({

          contests: {

            ...this.state.contests,

            [response.updatedContest._id]: response.updatedContest

          },

          names: {

            ...this.state.names,

            [response.newName._id]: response.newName

          }

        });

      })

      .catch(console.error);

  }


  currentContent() {

    if (this.state.currentContestId) {

      return (

        <Contest

          contestListClick={this.fetchContestList}

          fetchNames={this.fetchNames}

          lookupName={this.lookupName}

          addName={this.addName}

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
