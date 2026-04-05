const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");

// Define the absolute path to our JSON database
const dataPath = path.join(__dirname, "../data/scores.json");

// --- Helper Functions ---
async function readScores() {
  try {
    const data = await fs.readFile(dataPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading scores.json:", error);
    // Fallback if file is missing or corrupted
    return { player1: { wins: 0, losses: 0, draws: 0 }, player2: { wins: 0, losses: 0, draws: 0 }, ai: { wins: 0, losses: 0, draws: 0 } };
  }
}

async function writeScores(scores) {
  try {
    await fs.writeFile(dataPath, JSON.stringify(scores, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing to scores.json:", error);
  }
}
// ------------------------

// @route   GET /api/scores
// @desc    Get all scores
router.get("/", async (req, res) => {
  try {
    const scores = await readScores();
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @route   PUT /api/scores/update
// @desc    Increment a specific stat for a player
router.put("/update", async (req, res) => {
  const { player, stat } = req.body;

  try {
    const scores = await readScores();

    // Ensure the requested player and stat exist in our JSON
    if (scores[player] && scores[player][stat] !== undefined) {
      scores[player][stat] += 1; // Increment the stat

      await writeScores(scores); // Save the file
      res.json(scores); // Send back the updated data
    } else {
      res.status(400).json({ message: "Invalid player or stat provided" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @route   POST /api/scores/reset
// @desc    Reset all scores back to 0
router.post("/reset", async (req, res) => {
  try {
    const defaultScores = { player1: { wins: 0, losses: 0, draws: 0 }, player2: { wins: 0, losses: 0, draws: 0 }, ai: { wins: 0, losses: 0, draws: 0 } };

    await writeScores(defaultScores);
    res.json(defaultScores);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
