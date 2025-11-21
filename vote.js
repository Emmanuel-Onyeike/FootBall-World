// Replace with your project URL
const PROJECT_URL = "https://YOUR_PROJECT_ID.supabase.co";

// Your PUBLIC key (safe to expose)
const PUBLIC_ANON_KEY = "YOUR_PUBLIC_ANON_KEY";

// Supabase client
const supabase = supabase.createClient(PROJECT_URL, PUBLIC_ANON_KEY);


// Fetch players
async function loadPlayers() {
    const { data, error } = await supabase
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


// Vote function (connects to Supabase Edge Function)
async function vote(playerId) {
    const res = await fetch(`${PROJECT_URL}/functions/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerId })
    });

    const result = await res.json();
    alert(result.message);
    loadPlayers();
}


// Auto-run
document.addEventListener("DOMContentLoaded", loadPlayers);
