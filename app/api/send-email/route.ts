import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const requiredEnvVars = [
    "EMAILJS_SERVICE_ID",
    "EMAILJS_TEMPLATE_ID",
    "EMAILJS_PUBLIC_KEY",
  ];

  const missingEnvVars = requiredEnvVars.filter((env) => !process.env[env]);
  if (missingEnvVars.length > 0) {
    return NextResponse.json(
      { error: `Missing environment variables: ${missingEnvVars.join(", ")}` },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const { name, email, message } = body;

    const url = "https://api.emailjs.com/api/v1.0/email/send";

    const data = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      template_params: {
        from_name: name,
        from_email: email,
        message: message,
        to_name: "Sakda Chin",
        reply_to: email,
      },
      accessToken: process.env.EMAILJS_PRIVATE_KEY,
    };

    await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      },
    });

    return NextResponse.json(
      { success: true, message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Email sending failed:", error);

    let errorMessage = "Failed to send email. Please try again later.";
    let statusCode = 500;

    if (axios.isAxiosError(error)) {
      statusCode = error.response?.status || 500;
      errorMessage = error.response?.data?.error || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
