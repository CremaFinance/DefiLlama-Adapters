/* eslint-disable */

import { min } from "bn.js";
import { NextApiRequest, NextApiResponse } from "next";

// const data = fetch("data/validators.json", {
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
// });
import validatorData from "../../../public/data/validators.json";

const n = validatorData.length;

const validators = (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200;
  const { pageNumber } = req.body;

  const validators = [];

  for (
    let i = 10 * pageNumber;
    i < Math.min(n, 10 * (pageNumber + 1));
    i += 1
  ) {
    validators.push(validatorData[i]);
  }

  res.json(validators);
};

export default validators;
