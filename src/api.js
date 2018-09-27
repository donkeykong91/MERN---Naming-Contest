import axios from "axios";

export const fetchContest = function (contestId) {

  return axios.get(`/api/contests/${contestId}`)

              .then(function (response) {

                return response.data;

              });

}
