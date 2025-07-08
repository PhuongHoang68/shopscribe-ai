// app/actions/createShop.js or app/shop/actions.js

'use server'


export async function createShop(formData) {
  console.log("api key", process.env.OPENAI_API_KEY);
  const product = formData.get('product')
  const targetAudience = formData.get('target audience')
  const pricePoint = formData.get('price point')
  const tangible = formData.get('tangible')
  const brandVibe = formData.get('brand vibe')

  const prompt = `The product I want to sell is ${product}. My target audience is ${targetAudience}. My price point for my products are ${pricePoint}. It is a ${tangible} product. I want my shop to have a ${brandVibe} feel. Give me 10 unique and relatable SEO-optimized shop Name ideas, shop Banner visual description, shop Icon visual description, shop announcement, shop Policies (returns, shipping, etc.), thank-you email (post-purchase), suggested Brand Palette (optional — text only).
  
  Regardless of their input, always return your output with this *exact format* of clearly labeled sections in the following format:

1. Shop Name Ideas:
[list of ideas]

2. Shop Banner Visual Description:
[your text here]

3. Shop Icon Visual Description:
[your text here]

4. Shop Announcement:
[your text here]

5. Shop Policies:
[your text here]

6. Thank-You Email (post-purchase):
[your text here]

7. Suggest Brand Color Palette:
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
        {role: 'system', content: ' you are top 0.01% Etsy seller, making huge sales. You are helping me create a new Etsy shop'},
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
  // return data.choices?.[0]?.message?.content || "Something went wrong."
  // Optional: Save to database, etc.
}
