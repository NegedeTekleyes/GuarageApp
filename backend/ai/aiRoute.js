const express = require('express');
const router = express.Router()
const askAI = require('../ai/chatbot')

router.post('/chat', async(req, res) => {
    try {
        const {message} = req.body
        const reply = await askAI(message)
        res.json({reply})
    } catch (error) {
        res.status(500).json({error: "AI error"})
    }
})
module.exports = router;