import { NextApiRequest , NextApiResponse} from "next";

export default function Hello(req : NextApiRequest, res : NextApiResponse){

    res.status(200).json({
        name : "theo",
        color : "blue"
    })

}