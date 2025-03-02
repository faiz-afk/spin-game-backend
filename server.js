const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let userWinProbabilities = {}; // Menyimpan peluang menang berdasarkan username

// Endpoint untuk mengatur peluang kemenangan berdasarkan username
app.post("/set-win-probability", (req, res) => {
    const { username, probability } = req.body;
    if (typeof probability === "number" && probability >= 0 && probability <= 100) {
        userWinProbabilities[username] = probability;
        res.json({ message: "Win probability updated", username, winProbability: probability });
    } else {
        res.status(400).json({ error: "Invalid probability value" });
    }
});

// Endpoint untuk spin game berdasarkan username
app.post("/spin", (req, res) => {
    const { username } = req.body;
    const winProbability = userWinProbabilities[username] || 50; // Default 50% jika belum diatur
    const randomValue = Math.random() * 100;
    const isWin = randomValue < winProbability;
    res.json({ result: isWin ? "win" : "lose" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});