import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://hsjzyqnpigxurnovlxvs.supabase.co",
  process.env.SUPABASE_SERVICE_KEY // stored safely in Vercel
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { player_name } = req.body;

  // increment vote count securely
  const { data, error } = await supabase
    .from("votes")
    .update({ vote_count: supabase.rpc("increment", { x: 1 }) })
    .eq("player_name", player_name)
    .select();

  if (error) return res.status(400).json({ error });
  res.status(200).json({ success: true, data });
}
