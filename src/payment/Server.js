const express = require("express");

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(stripeSecretKey);

const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/test", (req, res) => {
  console.log("Test endpoint hit");
  res.send("Test endpoint successful");
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// This is your test secret API key.

const YOUR_DOMAIN = "http://localhost:4242";

app.get("/", (req, res) => {
  res.send("Checkout session endpoint is working!");
});

app.post("/create-checkout-session", async (req, res) => {
  const products = req.body;
  console.log("Received products:", products);

  try {
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "thb",
        product_data: {
          name: product.prod_name,
          images: [product.product_image],
        },
        unit_amount: product.prod_price,
      },
      quantity: 1,
    }));
    console.log("Line items being sent to Stripe:", lineItems);

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    res.json({ url: session.url }); // Send back the session URL
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).send("Error creating Stripe checkout session");
  }
});

app.listen(4242, () => console.log("Running on port 4242"));
