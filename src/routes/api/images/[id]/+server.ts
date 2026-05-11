
import { readFile } from "node:fs/promises";

export const GET = async ({ params }) => { 
    return new Response(await readFile(`public/images/${params.id}`), {
        headers: {
            "Content-Type": "image/jpeg"
        }
    }); 

}