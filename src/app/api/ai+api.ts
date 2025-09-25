import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { exerciseName } = await request.json();
  if (!exerciseName) {
    return Response.json(
      {
        error: "Missing exercise name",
      },
      {
        status: 404,
      }
    );
  }
  const prompt = `
    Bạn là một fitness coach.
    Bạn được cung cấp 1 bài tập, hãy đưa ra chỉ dẫn rõ ràng về cách thực hiện. Bao gồm bất kỳ dụng cụ nào cần thiết. Giải thích bài tập chi tiết và cho người mới tập.
    
    Tên của bài tập là: ${exerciseName}

    Tạo câu trả lời ngắn và súc tích. Sử dụng định dạng markdown.

    Sử dụng định dạng sau:thiết
    
    ## Dụng cụ cần thiết

    ## Hướng dẫn

    ## Tips

    ## Biến thể

    ## An toàn

    Giữ khoảng cách giữa tiêu đề và nội dung.

    Luôn sử dụng heading và subheading
    `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });
    console.log(response);
    return Response.json({ message: response.choices[0].message.content });
  } catch (error) {
    console.error("Error fetching AI guidance:", error);
    return Response.json(
      { error: "Error fetching AI guidance" },
      { status: 500 }
    );
  }
}
