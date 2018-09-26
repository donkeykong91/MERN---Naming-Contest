import React from "react";

import ContestPreview from "./ContestPreview";

import PropTypes from "prop-types";


const ContestList = function ( { contests, onContestClick }={} ) {

  return (

    <div className="ContestList">

      {Object.keys(contests).map( function (contestId) {

        return (

          <ContestPreview

            key={contestId}

            onClick={onContestClick}

            {...contests[contestId]}

          />

        );

      })}

    </div>

  );

}


ContestList.propTypes = {

  contests: PropTypes.object,

  onContestClick: PropTypes.func.isRequired

}

export default ContestList;
