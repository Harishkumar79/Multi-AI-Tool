const express = require('express')
const router = express.Router();
const aiController = require("../controllers/aiControllers");

router.post("/deepseek" , aiController.useDeepseekAI);
router.post("/geminiai" , aiController.useGeminiAI);
router.post("/mistralai" , aiController.useMistralAI);
router.post("/cohereai" , aiController.useCohereAI);

module.exports = router;