const express = require("express");

const router = express.Router();
const shortid = require("shortid");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
    key_id: "rzp_test_mAa9xKRpHr07z0",
    key_secret: "JihrpKhfeDLqVAtx6iVcOQVz",
});

router.post("/razorpay", async (req, res) => {
    const payment_capture = 1;
    const amount = req.body.amount;
    console.log(req.body);
    const currency = "INR";

    const options = {
        amount: amount * 100,
        currency,
        receipt: shortid.generate(),
        payment_capture,
    };

    try {
        const response = await razorpay.orders.create(options);
        console.log(response);
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        });
    } catch (error) {
        console.log(error);
    }
});

router.post("/verification", async (req, res) => {
    const secret = "";

    console.log(req.body);

    const crypto = require("crypto");

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    console.log(digest, req.headers["x-razorpay-signature"]);

    if (digest === req.headers["x-razorpay-signature"]) {
        console.log("verified");

        // require("fs").writeFileSync(
        //     "./verification.json",
        //     JSON.stringify(req.body, null, 4)
        // );
    } else {
        console.log("not verified");
    }

    res.json({status: "ok"});
});

module.exports = router;
