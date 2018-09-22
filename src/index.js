import React from 'react';

import ReactDOM from 'react-dom';

import App from "./components/App";

import data from "./testData";


ReactDOM.render(

  <App contests={data.contests} />,

  document.getElementById('root')

);

setTimeout( function () {

  ReactDOM.render(

    <h2>....</h2>,

    document.getElementById("root")

  );

}, 4000);
