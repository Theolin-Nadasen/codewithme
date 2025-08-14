import { LanguageSamples } from "./learn/samples";
import { db } from "@/lib/db";

export function Seed(){
    LanguageSamples.c.map((item) => {
        const query = "INSERT INTO code_examples(language, name, content, inputs) values($1, $2, $3, $4)"
        const values = ["c", item.name, item.content, item.inputs]
        //db.query(query, values)
    })
}