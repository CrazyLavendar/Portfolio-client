import axios from "axios";

export const createTech = async (tech) =>
  await axios.post(`${process.env.REACT_APP_API}/techs`, tech);

export const getTechs = async () =>
  await axios.get(`${process.env.REACT_APP_API}/techs`);
