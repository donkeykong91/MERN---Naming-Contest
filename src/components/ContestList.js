import React from "react";

import ContestPreview from "./ContestPreview";

import PropTypes from "prop-types";


const ContestList = function ( { contests }={} ) {

  return (

    <div className="ContestList">

      {contests.map( function (contest) {

        return (

          <ContestPreview

            key={contest.id}

            {...contest}

          />

        );

      })}

    </div>

  );

}


ContestList.propTypes = {

  contests: PropTypes.array

}

export default ContestList;
