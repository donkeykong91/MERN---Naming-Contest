import React from "react";

import Header from "./Header.js";

import ContestPreview from "./ContestPreview";

import axios from "axios";


class App extends React.Component {

  state = {

    pageHeader: "Naming Contests",

    contests: []

  };


  componentDidMount() {

    axios.get("/api/contests")

         .then( (resp) => {

           this.setState(

             {

               contests: resp.data.contests

             }

           );

         })

         .catch(

           console.error

         )

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
