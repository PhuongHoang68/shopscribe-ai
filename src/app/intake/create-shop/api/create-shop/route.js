// /app/api/shop/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  console.log("API route hit");

  try {
    const body = await request.json();
    const { product, targetAudience, pricePoint, tangible, brandVibe } = body;

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
          { role: 'system', content: 'You are a top 0.01% Etsy seller making huge sales. You are helping me create a new Etsy shop.' },
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
    console.error('Error in /api/shop:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// export async function POST() {
//   console.log("API Route Hit!");
//   return NextResponse.json({ message: 'API route is working!' });
// }