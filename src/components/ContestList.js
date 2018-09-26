import React from "react";

import ContestPreview from "./ContestPreview";

import PropTypes from "prop-types";


const ContestList = function ( { contests, onContestClick }={} ) {

  return (

    <div className="ContestList">

      {contests.map( function (contest) {

        return (

          <ContestPreview

            key={contest.id}

            onClick={onContestClick}

            {...contest}

          />

        );

      })}

    </div>

  );

}


ContestList.propTypes = {

  contests: PropTypes.array,

  onContestClick: PropTypes.func.isRequired

}

export default ContestList;
