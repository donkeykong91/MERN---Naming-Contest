import React from 'react';

import ReactDOM from 'react-dom';

import App from "./components/App";

import axios from "axios";


axios.get("/api/contests")

     .then( function (resp) {

       return (

         ReactDOM.render(

           <App initialContests={resp.data.contests} />,

           document.getElementById('root')

         )

       );

     })

     .catch(

       console.error

     );
