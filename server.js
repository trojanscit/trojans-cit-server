if (process.env.NODE_ENV !== "production") require("dotenv").config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());

app.use("/api", sheetsRoute);

app.get("/logo", (req, res) => {
    res.sendFile(path.join(__dirname, "logo.png"));
});

const razorpay = new Razorpay({
    key_id: "rzp_test_mAa9xKRpHr07z0",
    key_secret: "JihrpKhfeDLqVAtx6iVcOQVz",
});

app.post("/razorpay", async (req, res) => {
    const payment_capture = 1;
    const amount = 499;
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

app.post("/verification", async (req, res) => {
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

app.listen(process.env.PORT, () =>
    console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT}`)
);
