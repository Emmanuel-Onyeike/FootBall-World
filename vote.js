// Supabase project details
const PROJECT_URL = "https://hsjzyqnpigxurnovlxvs.supabase.co";

const PUBLIC_ANON_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhzanp5cW5waWd4dXJub3ZseHZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3NTMwNDgsImV4cCI6MjA3OTMyOTA0OH0.U2FGDGJq2ym0tK0eWkBruJoSkS0rqwJ1scW4Wvj_gyg";

// Create Supabase client
const supabaseClient = supabase.createClient(PROJECT_URL, PUBLIC_ANON_KEY);



// ----------------------------
// Load Players
// ----------------------------
async function loadPlayers() {
    const { data, error } = await supabaseClient
        .from("players")
        .select("*")
        .order("player_name");

    if (error) {
        console.error("Error loading players:", error);
        return;
    }

    const list = document.getElementById("playerList");
    list.innerHTML = "";

    data.forEach(player => {
        const btn = document.createElement("button");
        btn.className = "vote-btn";
        btn.textContent = `${player.player_name} (Votes: ${player.vote_count})`;
        btn.onclick = () => vote(player.id);
        list.appendChild(btn);
    });
}



// ----------------------------
// Vote Function (Edge Function)
// ----------------------------
async function vote(playerId) {
    try {
        const res = await fetch(`${PROJECT_URL}/functions/vote`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ playerId })
        });

        const result = await res.json();
        alert(result.message);
        loadPlayers();

    } catch (err) {
        console.error("Network error:", err);
        alert("Error submitting vote.");
    }
}



// Auto-run on page load
document.addEventListener("DOMContentLoaded", loadPlayers);
