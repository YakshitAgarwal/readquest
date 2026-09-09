require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const { paymentMiddleware, x402ResourceServer } = require("@x402/express");

const { ExactEvmScheme } = require("@x402/evm/exact/server");

const { HTTPFacilitatorClient } = require("@x402/core/server");

const app = express();
const PORT = process.env.PORT || 8000;

if (!process.env.WALLET_ADDRESS) {
  throw new Error("WALLET_ADDRESS is not defined in .env");
}

const facilitatorClient = new HTTPFacilitatorClient({
  url: "https://x402.org/facilitator",
});

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "PAYMENT-SIGNATURE",
      "Access-Control-Expose-Headers",
    ],

    exposedHeaders: ["PAYMENT-REQUIRED", "PAYMENT-RESPONSE"],
  }),
);

app.use(express.json());

app.use(
  paymentMiddleware(
    {
      "POST /api/blogs/:id/unlock": {
        accepts: [
          {
            scheme: "exact",
            price: "$0.001",
            network: "eip155:84532",
            payTo: process.env.WALLET_ADDRESS,
          },
        ],
        description: "Unlocking blog",
        mimeType: "application/json",
      },
    },

    new x402ResourceServer(facilitatorClient).register(
      "eip155:84532",
      new ExactEvmScheme(),
    ),
  ),
);

app.use("/api", require("./routes/main"));

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
