const Service = require("../models/serviceModel");
const stringSimilarity = require("string-similarity");

exports.recommendService = async (req, res) => {
  const { problem } = req.body;

  if (!problem) {
    return res.json({ recommendation: "Please describe your issue." });
  }

  try {
    // 1. Load real services from DB
    const services = await Service.find().lean();

    // 2. Build keyword lists from service name + description + category
    const scored = services.map((service) => {
      const keywords = [
        ...service.name.split(" "),
        ...service.description.split(" "),
        service.category
      ].map((w) => w.toLowerCase());

      // 3. Fuzzy match each keyword against the problem text
      const scores = keywords.map((keyword) =>
        stringSimilarity.compareTwoStrings(problem.toLowerCase(), keyword)
      );

      // 4. Best fuzzy score for this service
      const bestScore = Math.max(...scores);

      return {
        name: service.name,
        score: bestScore
      };
    });

    // 5. Pick the highest scoring service
    const best = scored.sort((a, b) => b.score - a.score)[0];

    // If nothing matches well, fallback
    if (!best || best.score < 0.2) {
      return res.json({ recommendation: "General Diagnostic" });
    }

    return res.json({ recommendation: best.name });

  } catch (err) {
    console.error(err);
    return res.json({ recommendation: "AI service unavailable." });
  }
};
