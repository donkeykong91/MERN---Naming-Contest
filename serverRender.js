import axios from "axios";

import config from "./config";


axios.get(`${config.serverUrl}/api/contests`)

     .then( function (resp) {

       return console.log(resp.data);

     })
