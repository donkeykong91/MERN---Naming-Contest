import React from "react";

import ReactDOMServer from "react-dom/server";

import App from "./src/components/App";

import axios from "axios";

import config from "./config";


const serverRender = function () {

  return (

    axios.get(`${config.serverUrl}/api/contests`)

      .then( function (resp) {

         return {

           initialMarkup: ReactDOMServer.renderToString(

             <App

                initialContests={resp.data.contests}

             />

           ),

           initialData: resp.data

         }

      })

  );

};

export default serverRender;
