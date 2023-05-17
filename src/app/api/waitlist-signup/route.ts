import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const res = await request.json();
  console.log(res);

  const email = res.email;
  if (!email) {
    return new Response("Please provide an email", {
      status: 400,
    });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  if (!supabaseUrl) {
    return new Response("Internal server error", {
      status: 500,
    });
  }

  const supabaseKey = process.env.SUPABASE_KEY;
  if (!supabaseKey) {
    return new Response("Internal server error", {
      status: 500,
    });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase.from("waitlist").insert([{ email }]);

  if (error) {
    if ((error.code = "23505")) {
      return new Response("Your email is already in the waitlist", {
        status: 400,
      });
    }
    return new Response("Internal server error", {
      status: 500,
    });
  }

  return new Response(null, { status: 201 });
}
