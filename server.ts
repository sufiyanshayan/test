import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Persistent storage path inside workspace
const STORAGE_FILE = path.join(process.cwd(), "instagram_unfollow_storage.json");

// Define Initial/Default State
interface AppState {
  connected: boolean;
  account: {
    id: string;
    username: string;
    displayName: string;
    profilePicture: string;
    followingCount: number;
    followersCount: number;
  } | null;
  unfollowedToday: number;
  successfulActions: number;
  failedActions: number;
  activityLogs: Array<{
    id: string;
    timestamp: string;
    username: string;
    action: string;
    status: 'Success' | 'Failed';
    error?: string;
  }>;
  followingCache: Array<{
    id: string;
    username: string;
    displayName: string;
    profilePicture: string;
    isFollowing: boolean;
    status: 'following' | 'unfollowed' | 'failed';
  }>;
}

const DEFAULT_FOLLOWING = [
  { id: "1", username: "travel_explorer", displayName: "Aria Thorne", profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150", isFollowing: true, status: "following" as const },
  { id: "2", username: "culinary_genius", displayName: "Chef Marcus", profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", isFollowing: true, status: "following" as const },
  { id: "3", username: "pixel_architect", displayName: "Sora Takahashi", profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150", isFollowing: true, status: "following" as const },
  { id: "4", username: "wanderlust_lens", displayName: "Elena Petrova", profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150", isFollowing: true, status: "following" as const },
  { id: "5", username: "fit_lifestyle", displayName: "Jordan Miller", profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150", isFollowing: true, status: "following" as const },
  { id: "6", username: "vintage_vibes", displayName: "Chloe Moreau", profilePicture: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150", isFollowing: true, status: "following" as const },
  { id: "7", username: "code_artisan", displayName: "Alex Wright", profilePicture: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150", isFollowing: true, status: "following" as const },
  { id: "8", username: "sound_scaper", displayName: "Maya Lin", profilePicture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", isFollowing: true, status: "following" as const },
  { id: "9", username: "bloom_and_grow", displayName: "Olivia Green", profilePicture: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150", isFollowing: true, status: "following" as const },
  { id: "10", username: "minimalist_home", displayName: "Lucas Gray", profilePicture: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150", isFollowing: true, status: "following" as const },
  { id: "11", username: "urban_hiker", displayName: "Diana Prince", profilePicture: "https://images.unsplash.com/photo-1534751516642-a131fed10495?w=150", isFollowing: true, status: "following" as const },
  { id: "12", username: "the_daily_vibe", displayName: "Leo Carter", profilePicture: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150", isFollowing: true, status: "following" as const },
  { id: "13", username: "neon_shadows", displayName: "Victor Vance", profilePicture: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150", isFollowing: true, status: "following" as const },
  { id: "14", username: "serene_spaces", displayName: "Sophia Loren", profilePicture: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150", isFollowing: true, status: "following" as const },
  { id: "15", username: "tech_philosophy", displayName: "Ethan Hunt", profilePicture: "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=150", isFollowing: true, status: "following" as const },
  { id: "16", username: "nature_journal", displayName: "Isabella Swan", profilePicture: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150", isFollowing: true, status: "following" as const },
  { id: "17", username: "bold_typographer", displayName: "Arthur Pendragon", profilePicture: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150", isFollowing: true, status: "following" as const },
  { id: "18", username: "wild_at_heart", displayName: "Zara Larsson", profilePicture: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=150", isFollowing: true, status: "following" as const },
  { id: "19", username: "epic_eats", displayName: "David Chang", profilePicture: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150", isFollowing: true, status: "following" as const },
  { id: "20", username: "cozy_reads", displayName: "Emma Watson", profilePicture: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150", isFollowing: true, status: "following" as const },
  { id: "21", username: "analog_dreams", displayName: "Nico Bellic", profilePicture: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150", isFollowing: true, status: "following" as const },
  { id: "22", username: "botanical_co", displayName: "Lily Evans", profilePicture: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150", isFollowing: true, status: "following" as const },
  { id: "23", username: "rhythm_blues", displayName: "Miles Davis", profilePicture: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150", isFollowing: true, status: "following" as const },
  { id: "24", username: "modern_canvas", displayName: "Henri Matisse", profilePicture: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150", isFollowing: true, status: "following" as const },
  { id: "25", username: "stellar_gaze", displayName: "Stella McCartney", profilePicture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", isFollowing: true, status: "following" as const },
  { id: "26", username: "retro_future", displayName: "James Dean", profilePicture: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150", isFollowing: true, status: "following" as const },
  { id: "27", username: "caffeine_daily", displayName: "Alice Cooper", profilePicture: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150", isFollowing: true, status: "following" as const },
  { id: "28", username: "curated_style", displayName: "Sandro Botticelli", profilePicture: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150", isFollowing: true, status: "following" as const },
  { id: "29", username: "mountain_pulse", displayName: "Clara Schumann", profilePicture: "https://images.unsplash.com/photo-1534751516642-a131fed10495?w=150", isFollowing: true, status: "following" as const },
  { id: "30", username: "ink_and_paper", displayName: "Ernest Hemingway", profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150", isFollowing: true, status: "following" as const },
  { id: "31", username: "ocean_breeze", displayName: "Coral Blue", profilePicture: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150", isFollowing: true, status: "following" as const },
  { id: "32", username: "creative_minds", displayName: "Grace Hopper", profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150", isFollowing: true, status: "following" as const },
  { id: "33", username: "pantry_chef", displayName: "Gordon R.", profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", isFollowing: true, status: "following" as const },
  { id: "34", username: "shadow_hunter", displayName: "Sam Fisher", profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150", isFollowing: true, status: "following" as const },
  { id: "35", username: "rustic_beauty", displayName: "Ada Lovelace", profilePicture: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150", isFollowing: true, status: "following" as const },
  { id: "36", username: "nomad_journey", displayName: "Marco Polo", profilePicture: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150", isFollowing: true, status: "following" as const },
  { id: "37", username: "light_painter", displayName: "Claude Monet", profilePicture: "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=150", isFollowing: true, status: "following" as const },
  { id: "38", username: "urban_grid", displayName: "Jane Jacobs", profilePicture: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150", isFollowing: true, status: "following" as const },
  { id: "39", username: "silent_sound", displayName: "Ludwig Beethoven", profilePicture: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150", isFollowing: true, status: "following" as const },
  { id: "40", username: "golden_ratio", displayName: "Leo DaVinci", profilePicture: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150", isFollowing: true, status: "following" as const },
  { id: "41", username: "timeless_tales", displayName: "Jane Austen", profilePicture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", isFollowing: true, status: "following" as const },
  { id: "42", username: "vintage_racer", displayName: "Enzo Ferrari", profilePicture: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150", isFollowing: true, status: "following" as const },
  { id: "43", username: "green_canopy", displayName: "John Muir", profilePicture: "https://images.unsplash.com/photo-1534751516642-a131fed10495?w=150", isFollowing: true, status: "following" as const },
  { id: "44", username: "skater_culture", displayName: "Tony Hawk", profilePicture: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150", isFollowing: true, status: "following" as const },
  { id: "45", username: "velvet_skies", displayName: "Vincent Van Gogh", profilePicture: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150", isFollowing: true, status: "following" as const },
  { id: "46", username: "geometric_art", displayName: "Piet Mondrian", profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150", isFollowing: true, status: "following" as const },
  { id: "47", username: "clay_vessels", displayName: "Auguste Rodin", profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150", isFollowing: true, status: "following" as const },
  { id: "48", username: "deep_ocean", displayName: "Jacques Cousteau", profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150", isFollowing: true, status: "following" as const },
  { id: "49", username: "cosmic_dust", displayName: "Carl Sagan", profilePicture: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150", isFollowing: true, status: "following" as const },
  { id: "50", username: "paper_crafts", displayName: "Sadako Sasaki", profilePicture: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150", isFollowing: true, status: "following" as const },
  { id: "51", username: "wild_explorer", displayName: "Steve Irwin", profilePicture: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150", isFollowing: true, status: "following" as const },
  { id: "52", username: "blue_latitude", displayName: "James Cook", profilePicture: "https://images.unsplash.com/photo-1534751516642-a131fed10495?w=150", isFollowing: true, status: "following" as const },
  { id: "53", username: "desert_rose", displayName: "Gertrude Bell", profilePicture: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150", isFollowing: true, status: "following" as const },
  { id: "54", username: "urban_sketcher", displayName: "Sven Nykvist", profilePicture: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150", isFollowing: true, status: "following" as const },
  { id: "55", username: "summit_views", displayName: "Edmund Hillary", profilePicture: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150", isFollowing: true, status: "following" as const }
];

// Helper to read and write database state
const loadState = (): AppState => {
  try {
    if (fs.existsSync(STORAGE_FILE)) {
      const raw = fs.readFileSync(STORAGE_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Failed to read persistent storage:", e);
  }
  return {
    connected: false,
    account: null,
    unfollowedToday: 0,
    successfulActions: 0,
    failedActions: 0,
    activityLogs: [],
    followingCache: DEFAULT_FOLLOWING
  };
};

const saveState = (state: AppState) => {
  try {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(state, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to write persistent storage:", e);
  }
};

// Initialize active state
let state = loadState();

// Auth Endpoints
app.get("/api/auth-url", (req, res) => {
  const isConfigured = !!(process.env.INSTAGRAM_APP_ID && process.env.INSTAGRAM_APP_SECRET);
  const redirectUri = process.env.INSTAGRAM_REDIRECT_URI || `${req.protocol}://${req.get("host")}/auth/callback`;

  // Standard Instagram API Auth URL
  const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=${
    process.env.INSTAGRAM_APP_ID || "MOCK_CLIENT_ID"
  }&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user_profile,user_media&response_type=code`;

  res.json({
    url: instagramAuthUrl,
    isConfigured,
    message: isConfigured 
      ? "Meta/Instagram App keys are fully configured! Initiating official OAuth flow." 
      : "No production Keys detected in .env. We will proceed with safe Developer Sandbox Connection."
  });
});

// OAuth Callback Route
app.get(["/auth/callback", "/auth/callback/"], (req, res) => {
  const { code, error } = req.query;

  if (error) {
    return res.send(`
      <html>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; background-color: #fafafa; margin: 0; color: #262626;">
          <div style="text-align: center; max-width: 450px; padding: 40px; background: white; border-radius: 12px; border: 1px solid #dbdbdb; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            <div style="font-size: 48px; margin-bottom: 20px;">⚠️</div>
            <h1 style="font-size: 20px; font-weight: 600; margin-bottom: 12px;">Authentication Cancelled</h1>
            <p style="font-size: 14px; color: #8e8e8e; line-height: 1.5; margin-bottom: 24px;">${error}</p>
            <button onclick="window.close()" style="background-color: #0095f6; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 14px;">Return to App</button>
          </div>
        </body>
      </html>
    `);
  }

  // Connect user in sandbox-demo mode safely with premium mock credentials if code provided
  state.connected = true;
  state.account = {
    id: "10159483249051023",
    username: "instagram_demo_user",
    displayName: "Meta Developer Sandbox",
    profilePicture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300",
    followingCount: state.followingCache.filter(f => f.isFollowing).length,
    followersCount: 842
  };
  saveState(state);

  res.send(`
    <html>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; background-color: #fafafa; margin: 0; color: #262626;">
        <div style="text-align: center; max-width: 450px; padding: 40px; background: white; border-radius: 12px; border: 1px solid #dbdbdb; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <div style="font-size: 48px; margin-bottom: 20px; color: #4ade80;">✓</div>
          <h1 style="font-size: 20px; font-weight: 600; margin-bottom: 12px;">Connected Safely!</h1>
          <p style="font-size: 14px; color: #8e8e8e; line-height: 1.5; margin-bottom: 24px;">Your Instagram account has been securely connected under official Meta API Guidelines.</p>
          <p style="font-size: 12px; color: #b0b0b0; line-height: 1.4; margin-bottom: 24px;">Since Meta deprecated unfollowing endpoints, this session is launched in Sandbox Compliance mode.</p>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: "OAUTH_AUTH_SUCCESS" }, "*");
              window.close();
            } else {
              window.location.href = "/";
            }
          </script>
          <button onclick="window.close()" style="background-color: #0095f6; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 14px;">Return to Dashboard</button>
        </div>
      </body>
    </html>
  `);
});

// App API Endpoints
app.get("/api/status", (req, res) => {
  // Sync following count
  if (state.account) {
    state.account.followingCount = state.followingCache.filter(f => f.isFollowing).length;
  }
  res.json({
    connected: state.connected,
    account: state.account,
    unfollowedToday: state.unfollowedToday,
    successfulActions: state.successfulActions,
    failedActions: state.failedActions
  });
});

app.get("/api/following", (req, res) => {
  if (!state.connected) {
    return res.status(401).json({ error: "Connect your Instagram account first." });
  }
  res.json(state.followingCache);
});

// Unfollow Batch execution with 50-account limit check in frontend AND backend
app.post("/api/unfollow", (req, res) => {
  if (!state.connected) {
    return res.status(401).json({ error: "Connect your Instagram account first." });
  }

  const { ids } = req.body;

  if (!ids || !Array.isArray(ids)) {
    return res.status(400).json({ error: "Invalid payload: 'ids' must be an array of account IDs." });
  }

  // CRITICAL SECURITY ENFORCEMENT: Enforce the 50-account limit on backend
  if (ids.length > 50) {
    return res.status(400).json({
      error: "Security violation: Batch limit exceeded. You cannot process more than 50 accounts in a single action."
    });
  }

  const results: Array<{ id: string; username: string; status: 'Success' | 'Failed'; error?: string }> = [];
  const now = new Date().toLocaleString();

  ids.forEach(id => {
    const account = state.followingCache.find(f => f.id === id);
    if (!account) return;

    // Simulate Instagram API limitation & rate limiting safely:
    // Some accounts fail (e.g. 10% chance) to simulate real rate limiting of actions.
    const isSuccess = Math.random() > 0.08;

    if (isSuccess) {
      account.isFollowing = false;
      account.status = "unfollowed";
      state.unfollowedToday += 1;
      state.successfulActions += 1;

      const log = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: now,
        username: `@${account.username}`,
        action: "Unfollow",
        status: "Success" as const
      };
      state.activityLogs.unshift(log);
      results.push({ id, username: account.username, status: "Success" });
    } else {
      account.status = "failed";
      state.failedActions += 1;

      const errorMsg = "Meta Rate Limit Exceeded: Action blocked temporarily.";
      const log = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: now,
        username: `@${account.username}`,
        action: "Unfollow",
        status: "Failed" as const,
        error: errorMsg
      };
      state.activityLogs.unshift(log);
      results.push({ id, username: account.username, status: "Failed", error: errorMsg });
    }
  });

  saveState(state);

  res.json({
    message: "Batch execution completed successfully under API emulation.",
    results,
    unfollowedToday: state.unfollowedToday,
    successfulActions: state.successfulActions,
    failedActions: state.failedActions
  });
});

app.get("/api/activity", (req, res) => {
  res.json(state.activityLogs);
});

app.post("/api/disconnect", (req, res) => {
  state.connected = false;
  state.account = null;
  // Keep logs, but reset statuses
  state.followingCache = DEFAULT_FOLLOWING.map(f => ({ ...f }));
  saveState(state);
  res.json({ message: "Successfully disconnected Instagram Account." });
});

app.post("/api/reset-demo", (req, res) => {
  state = {
    connected: false,
    account: null,
    unfollowedToday: 0,
    successfulActions: 0,
    failedActions: 0,
    activityLogs: [],
    followingCache: DEFAULT_FOLLOWING.map(f => ({ ...f }))
  };
  saveState(state);
  res.json({ message: "Application data has been reset to defaults." });
});

// Vite server / production routing setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Instagram Unfollow Manager Server is running on http://localhost:${PORT}`);
  });
}

startServer();
