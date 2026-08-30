interface Env {
  AI: any;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;
    const body = (await request.json()) as any;
    const { question, archetype, zodiacSign } = body;

    const systemPrompt = `You are the Cosmic Oracle, a divine celestial guide. The user is a ${archetype || 'Soul'} (Zodiac: ${zodiacSign || 'Unknown'}). Answer their spiritual question with profound cosmic wisdom, astrological insight, and empowering guidance. Keep it under 2 paragraphs. Use elegant, celestial language. Do not use sci-fi, matrix, simulation, or technical terminology. Speak softly and spiritually.`;

    const response = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question || "What is my path?" }
      ]
    });

    return new Response(JSON.stringify({ answer: response.response }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, 
      headers: { "Content-Type": "application/json" } 
    });
  }
};
