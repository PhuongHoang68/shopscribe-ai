// app/actions/createShop.js or app/shop/actions.js

'use server'


export async function createProduct(fullPayload) {
  console.log("api key", process.env.OPENAI_API_KEY);
  console.log("fullPayload", fullPayload);
  const _product = fullPayload.product;
  const _targetAudience = fullPayload.targetAudience;
  const _tone = fullPayload.tone;
  const _style = fullPayload.style
  const _priceRange = fullPayload.priceRange
  console.log("VALUES:", _product, _targetAudience, _tone, _style, _priceRange)

  const prompt = `The product I want to sell on Etsy is ${_product}. My target audience is ${_targetAudience}. The tone of this product listing is ${_tone}. The aesthetics and vibes of the product is ${_style}, and the product listing should reflect that. Our price range and price positioning is ${_priceRange} Give me SEO-optimized Product Title, Product Description, SEO-optimized Hash Tags, Pricing Suggestions for this product and why, Thank You Message and Review Message (post-purchase).
  
  Regardless of their input, always return your output with this *exact format* of clearly labeled sections in the following format:

1. Product Title:
[your text here]

2. Product Description:
[your text here]

3. SEO-optimized Hash Tags:
[your text here]

4. Pricing Suggestions:
[your text here]

5. Thank You Message:
[your text here]

6. Review Message:
[your text here]
Do NOT include any commentary, introductions, or explanations
`
  console.log("prompt", prompt);

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST', 
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo', 
      messages: [
        {role: 'system', content: ' you are top 0.01% Etsy seller, making huge sales. You are helping me create a new winning Etsy product listing'},
        {role: 'user', content: prompt}
      ]
    })
  })
  console.log("hit");
  const data = await res.json();
  console.log("data", data);
  const gptResponse = data.choices?.[0]?.message?.content;
  console.log("gptResponse", gptResponse);
  return gptResponse || "Something went wrong"
//   return data.choices?.[0]?.message?.content || "Something went wrong."
//   Optional: Save to database, etc.
}
