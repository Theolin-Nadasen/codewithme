import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";

export default async function Get_Samples(req : NextApiRequest, res : NextApiResponse){
    const samples = await db.query("SELECT * FROM code_examples")
    res.status(200).json(samples)
}