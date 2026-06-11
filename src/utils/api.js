const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-4-20250514";

export async function generateText(prompt) {
  const response = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      system:
        "You are a technical report writer specializing in WASH (Water, Sanitation, and Hygiene) infrastructure projects in rural Pakistan. Write professional, formal, data-rich report sections. Use clear paragraphs, no bullet points unless specifically appropriate. Avoid markdown formatting—plain text only.",
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const textBlock = data.content?.find((b) => b.type === "text");
  return textBlock?.text || "";
}