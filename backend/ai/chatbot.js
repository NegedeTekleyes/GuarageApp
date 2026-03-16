

const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

// create a function that send requet to ai
async function askAI(message) {
    const response = await openai.chat.completion.create({
        models: "gpt-4o-mini",
        message: [
           {
            role: "system",
            content: "You are an assistant for a car garage. Help customers with car problems and garage services.",

           } ,
           {
            role: "user",
            content: message,
           },
        ],
    })

    return response.choices[0].message.content
    
}
module.exports = {askAI};