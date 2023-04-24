import { initMongoose } from "@/lib/mongoose";
import Product from "@/models/Products";
import { NextApiRequest, NextApiResponse } from "next";
const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req: NextApiRequest,
    res: NextApiResponse) {
    await initMongoose();

    if (req.method !== 'POST') {
        res.json(`should be a post but it's not!`);
        return;
    }

    const { email, name, address, city } = req.body;
    const productsIds = req.body.products.split(',');
    const uniqIds = [...new Set(productsIds)];
    const products = await Product.find({ _id: { $in: uniqIds } }).exec();

    let line_items = [];
    for (let productId of uniqIds) {
        const quantity = productsIds.filter((id: string) => id === productId).length;
        const product = products.find(p => p._id.toString() === productId);
        line_items.push({
            quantity,
            price_data: {
                currency: 'USD',
                product_data: { name: product.name },
                unit_amount: product.price * 100,
            },
        });
    }

    const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: 'payment',
        customer_email: email,
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
    });

    res.redirect(303, session.url);
}