import type { NextApiRequest, NextApiResponse } from "next";
import { initMongoose } from "@/lib/mongoose";
import Product from "@/models/Products";

export async function findAllProducts() {
    return Product.find().exec();
}
export default async function handleProducts(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await initMongoose();

    const { ids } = req.query;

    if (ids) {
        const idsArray = (ids as string).split(',');
        res.json(
            await Product.find({
                '_id': { $in: idsArray }
            }).exec()
        );
    } else {

        res.json(await findAllProducts());
    }
}
