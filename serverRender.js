import React from "react";

import ReactDOMServer from "react-dom/server";

import App from "./src/components/App";

import axios from "axios";

import config from "./config";


const getApiUrl = function (contestId) {

    if (contestId) {

      return `${config.serverUrl}/api/contests/${contestId}`;

    } else {

      return `${config.serverUrl}/api/contests`;

    }

};


const getInitialData = function (contestId, apiData) {

  if (contestId) {

    return {

      currentContestId: apiData.id,

      contests: {

        [apiData.id]: apiData

      }

    };

  } else {

    return {

      contests: apiData.contests

    };

  }

};


const serverRender = function (contestId) {

  return (

    axios.get(getApiUrl(contestId))

      .then( function (response) {

         const initialData = getInitialData(contestId, response.data);

         return {

           initialMarkup: ReactDOMServer.renderToString(

             <App

                initialData={initialData}

             />

           ),

           initialData

         }

      })

  );

};

export default serverRender;
