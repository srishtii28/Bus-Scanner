const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/search", (req, res) => {
  const { from, to, date } = req.body;

  if (!from || !to || !date) {
    return res.status(400).json({ error: "Missing from, to or date in request" });
  }

  const buses = [
    {
      platform: "RedBus",
      name: "Raj Express",
      from,
      to,
      departure: "10:00 AM",
      arrival: "5:00 PM",
      duration: "7h",
      price: "₹899",
      link: "https://www.redbus.in"
    }
  ];

  res.json(buses);
});

app.listen(PORT, () => {
  console.log(`🚌 Server running at http://localhost:${PORT}`);
});
