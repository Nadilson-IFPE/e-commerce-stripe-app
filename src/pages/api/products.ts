import type { NextApiRequest, NextApiResponse } from "next";
import { initMongoose } from "@/lib/mongoose";
import Product from "@/models/Products";

export default async function handleProducts(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await initMongoose();

    res.json(await Product.find().exec());
}
