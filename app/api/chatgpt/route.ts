import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json();
    const response = await fetch(`https://api.edenai.run/v2/text/generation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.EDENAI_API_KEY}`,
      },
      body: JSON.stringify({
        providers: "cohere",
        text: `Tell me ${title} ${content}`,
        temperature: 0.2,
        max_tokens: 250,
      }),
    });

    const data = await response.json();

    const success = data?.cohere?.status === "success";

    if (!success) {
      throw new Error("Could not get answer from Eden AI");
    }

    const aiAnswer = data?.cohere?.generated_text;

    return NextResponse.json({ aiAnswer });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message });
  }
}

// import { NextResponse } from "next/server";

// export const POST = async (request: Request) => {
//   const { question } = await request.json();

//   try {
//     const response = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: "chatgpt-3.5-turbo",
//         messages: [
//           {
//             role: "system",
//             content:
//               "You are a knowlegeable assistant that provides quality information.",
//           },
//           {
//             role: "user",
//             content: `Tell me ${question}`,
//           },
//         ],
//       }),
//     });

//     const responseData = await response.json();
//     const reply = responseData.choices[0].message.content;
//     return NextResponse.json({ reply });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message });
//   }
// };
