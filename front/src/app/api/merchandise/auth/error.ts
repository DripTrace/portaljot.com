import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    console.log("ERROR RETRIEVING SESSION >>> ", req.body);
    const errorQuery = req.query.error;

    res.status(200).send({ error: errorQuery });
};
