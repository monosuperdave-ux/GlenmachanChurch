const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const res = await fetch("https://www.youtube.com/feeds/videos.xml?channel_id=UCPbVdwA94cp7y8XfDK0yatA");
    if (!res.ok) {
      return new Response(JSON.stringify({ error: "YouTube feed unavailable" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const xml = await res.text();
    const ids = [...xml.matchAll(/<yt:videoId>([^<]+)<\/yt:videoId>/g)].map((m) => m[1]);
    const titles = [...xml.matchAll(/<entry>[\s\S]*?<title>([^<]+)<\/title>/g)].map((m) => m[1]);
    return new Response(JSON.stringify({ videoId: ids[0] ?? null, title: titles[0] ?? null }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
