const express = require("express");
const router = express.Router();
const { get, set } = require("@vercel/edge-config");

const defaultScores = {
  player1: { wins: 0, losses: 0, draws: 0 },
  player2: { wins: 0, losses: 0, draws: 0 },
  ai: { wins: 0, losses: 0, draws: 0 },
};

async function readScores() {
  try {
    const scores = await get("scores");
    return scores || defaultScores;
  } catch (error) {
    console.error("Error reading scores from Edge config:", error);
    return defaultScores;
  }
}

async function writeScores(scores) {
  try {
    await set("scores", scores);
  } catch (error) {
    console.error("Error writing to Edge config:", error);
  }
}

router.get("/", async (req, res) => {
  try {
    const scores = await readScores();
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/update", async (req, res) => {
  const { player, stat } = req.body;

  try {
    const scores = await readScores();

    if (scores[player] && scores[player][stat] !== undefined) {
      scores[player][stat] += 1;

      await writeScores(scores);
      res.json(scores);
    } else {
      res.status(400).json({ message: "Invalid player or stat provided" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/reset", async (req, res) => {
  try {
    await writeScores(defaultScores);
    res.json(defaultScores);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
