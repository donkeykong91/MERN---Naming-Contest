import axios from "axios";

export const fetchContest = function (contestId) {

  return axios.get(`/api/contests/${contestId}`)

              .then(function (response) {

                return response.data;

              });

};

export const fetchContestList = function () {

  return axios.get(`/api/contests`)

              .then(function (response) {

                return response.data.contests;

              });

};


export const fetchNames = function (nameIds) {

  return axios.get(`/api/names/${nameIds.join(",")}`)

              .then(function (response) {

                return response.data.names;

              });

};
