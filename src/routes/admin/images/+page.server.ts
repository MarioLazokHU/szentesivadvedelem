import e from "../../../lib/server/e";
import { client } from "../../../lib/server/e";

export const load = async () => {
    return {
        images: await e.select(e.Image, image => ({
            ...image['*']
        })).run(client)
    };
}