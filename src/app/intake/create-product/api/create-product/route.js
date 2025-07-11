import { NextResponse } from 'next/server';
// /app/api/product/route.js

export async function POST(request) {
  console.log("API route hittt");

  try {
    // Parse the incoming request body
    const body = await request.json();
    const { product, targetAudience, tone, style, priceRange } = body;

    // Construct the prompt for OpenAI API
    const prompt = `The product I want to sell on Etsy is ${product}. My target audience is ${targetAudience}. The tone of this product listing is ${tone}. The aesthetics and vibes of the product is ${style}, and the product listing should reflect that. Our price range and price positioning is ${priceRange}. Give me SEO-optimized Product Title, Product Description, SEO-optimized Hash Tags, Pricing Suggestions for this product and why, Thank You Message and Review Message (post-purchase).

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
    Do NOT include any commentary, introductions, or explanations`;

    // Make the request to the OpenAI API
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are top 0.01% Etsy seller, making huge sales. You are helping me create a new winning Etsy product listing' },
          { role: 'user', content: prompt },
        ],
      }),
    });

    // Check if the response status is OK (200)
    if (!res.ok) {
      const errorText = await res.text(); // Read the response as text
      console.error(`Error from OpenAI: ${res.status} - ${res.statusText}`);
      console.error('Response Text:', errorText); // Log the full response
      return NextResponse.json({ error: 'OpenAI API error', details: errorText }, { status: res.status });
    }

    // Check the Content-Type of the response to see if it's JSON
    const contentType = res.headers.get('Content-Type');
    if (!contentType || !contentType.includes('application/json')) {
      const textResponse = await res.text(); // Read the response as text
      console.error('Expected JSON, but received HTML:', textResponse);
      return NextResponse.json({ error: 'Received non-JSON response' }, { status: 500 });
    }

    // Parse the response body as JSON if it's valid
    const data = await res.json();
    console.log("data:", data.choices?.[0]?.message.content);
    const gptResponse = data.choices?.[0]?.message?.content;

    // If the response from OpenAI is empty or invalid, handle that case
    if (!gptResponse) {
      console.error('No valid response from OpenAI');
      return NextResponse.json({ error: 'No valid response from OpenAI' }, { status: 500 });
    }

    // Return the successful response
    return NextResponse.json({ result: gptResponse });

  } catch (error) {
    // Handle unexpected errors
    console.error('Error in /api/product:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
