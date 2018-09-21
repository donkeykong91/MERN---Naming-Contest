import React from "react";

import PropTypes from "prop-types";


const Header = function( {message} = {} ) {

  return (

    <h2 className="text-center">

      {message}

    </h2>

  );

};


Header.propTypes = {

  message: PropTypes.string

};


export default Header;
