import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// [STYLES REMAIN THE SAME - Keeping them compact for space]
const styles = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}:root{--bg:#080A12;--bg2:#0F1120;--bg3:#161929;--card:rgba(255,255,255,0.04);--card-border:rgba(255,255,255,0.08);--grad:linear-gradient(135deg,#833AB4,#C13584,#E1306C,#F77737);--purple:#833AB4;--text:#F0F2FF;--muted:#6B7280;--muted2:#9CA3AF;--green:#10B981;--red:#EF4444;--yellow:#F59E0B;--font-head:'Syne',sans-serif;--font-body:'DM Sans',sans-serif;--font-mono:'DM Mono',monospace;--r:14px;--r2:20px;--shadow:0 8px 40px rgba(0,0,0,0.5)}body{background:var(--bg);color:var(--text);font-family:var(--font-body);min-height:100vh}.app{min-height:100vh;display:flex;flex-direction:column}.nav{display:flex;align-items:center;justify-content:space-between;padding:0 32px;height:64px;background:rgba(8,10,18,0.85);backdrop-filter:blur(20px);border-bottom:1px solid var(--card-border);position:sticky;top:0;z-index:100}.nav-logo{font-family:var(--font-head);font-size:18px;font-weight:800;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.nav-right{display:flex;align-items:center;gap:12px}.nav-user{font-size:13px;color:var(--muted2);font-family:var(--font-mono)}.btn-signout{padding:6px 12px;border-radius:8px;border:1px solid var(--card-border);background:var(--card);color:var(--muted2);font-size:12px;cursor:pointer}.btn-signout:hover{color:var(--red);border-color:var(--red)}.grid-bg{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(131,58,180,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(131,58,180,0.04) 1px,transparent 1px);background-size:40px 40px}.glow-orb{position:fixed;border-radius:50%;pointer-events:none;z-index:0;filter:blur(100px)}.glow-1{width:500px;height:500px;background:rgba(131,58,180,0.12);top:-150px;left:-100px}.glow-2{width:400px;height:400px;background:rgba(247,119,55,0.08);bottom:0;right:-100px}.page{flex:1;position:relative;z-index:1;padding:40px 32px;max-width:1200px;margin:0 auto;width:100%}.auth-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;z-index:1;padding:40px}.auth-card{background:var(--bg2);border:1px solid var(--card-border);border-radius:var(--r2);padding:48px 44px;max-width:420px;width:100%;box-shadow:var(--shadow)}.auth-logo{font-family:var(--font-head);font-size:24px;font-weight:800;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:8px;text-align:center}.auth-h1{font-family:var(--font-head);font-size:20px;font-weight:700;margin-bottom:8px;text-align:center}.auth-sub{color:var(--muted2);font-size:13px;margin-bottom:28px;text-align:center}.auth-form{display:flex;flex-direction:column;gap:14px}.auth-input{background:var(--bg3);border:1px solid var(--card-border);border-radius:10px;padding:12px 16px;color:var(--text);font-size:14px;outline:none}.auth-input:focus{border-color:rgba(131,58,180,0.5)}.auth-error{background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);border-radius:8px;padding:10px 14px;color:#FCA5A5;font-size:12px}.btn-primary{padding:12px 24px;border-radius:10px;border:none;background:var(--grad);color:white;font-size:14px;font-weight:600;cursor:pointer}.btn-primary:disabled{opacity:0.6;cursor:not-allowed}.btn-ghost{padding:10px 16px;border-radius:8px;border:1px solid var(--card-border);background:transparent;color:var(--muted2);font-size:13px;cursor:pointer;margin-top:12px;width:100%;text-align:center}.btn-ghost:hover{color:var(--text);background:var(--card)}.input-wrap{background:var(--bg2);border:1px solid var(--card-border);border-radius:var(--r2);padding:24px 28px;margin-bottom:32px}.input-label{font-size:13px;color:var(--muted2);margin-bottom:12px;font-family:var(--font-mono)}.input-row{display:flex;gap:12px}.url-input{flex:1;background:var(--bg3);border:1px solid var(--card-border);border-radius:10px;padding:12px 16px;color:var(--text);font-size:14px;outline:none}.url-input:focus{border-color:rgba(131,58,180,0.5)}.btn-analyze{padding:12px 24px;border-radius:10px;border:none;background:var(--grad);color:white;font-size:14px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:8px}.btn-analyze:disabled{opacity:0.6;cursor:not-allowed}.input-hint{font-size:12px;color:var(--muted);margin-top:10px}.empty{text-align:center;padding:80px 40px}.empty-icon{font-size:64px;margin-bottom:20px;opacity:0.6}.empty-h{font-family:var(--font-head);font-size:20px;font-weight:700;margin-bottom:8px}.empty-p{color:var(--muted2);font-size:14px;max-width:380px;margin:0 auto}.loading-text{text-align:center;color:var(--muted2);font-size:13px;margin-bottom:24px}.skeleton-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px}.skeleton-card{background:var(--card);border:1px solid var(--card-border);border-radius:var(--r);padding:20px;height:100px}.results-header{display:flex;gap:20px;margin-bottom:28px;flex-wrap:wrap}.post-preview{background:var(--card);border:1px solid var(--card-border);border-radius:var(--r);padding:16px;display:flex;align-items:center;gap:14px;flex:1;min-width:280px}.post-thumb{width:60px;height:60px;border-radius:10px;background:var(--bg3);display:flex;align-items:center;justify-content:center;font-size:24px}.post-type{background:rgba(131,58,180,0.15);color:#C084FC;padding:2px 10px;border-radius:20px;font-size:11px;margin-bottom:6px;display:inline-block}.post-handle{font-size:14px;font-weight:600;margin-bottom:2px}.post-date{font-size:12px;color:var(--muted)}.section-title{font-family:var(--font-head);font-size:13px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:16px}.metrics-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:14px;margin-bottom:28px}.metric-card{background:var(--card);border:1px solid var(--card-border);border-radius:var(--r);padding:20px}.metric-icon{font-size:20px;margin-bottom:12px}.metric-label{font-size:11px;color:var(--muted);text-transform:uppercase;margin-bottom:6px}.metric-value{font-family:var(--font-head);font-size:26px;font-weight:800;color:var(--text)}.metric-value.na{color:var(--muted);font-size:20px}.metric-sub{font-size:11px;color:var(--muted2);margin-top:4px}.metric-highlight .metric-value{background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.badge{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:20px;font-size:12px;margin-bottom:20px}.badge-permit{background:rgba(16,185,129,0.1);color:#10B981;border:1px solid rgba(16,185,129,0.25)}.badge-captured{background:rgba(245,158,11,0.1);color:#F59E0B;border:1px solid rgba(245,158,11,0.25)}.error-box{background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);border-radius:12px;padding:14px 18px;margin-bottom:24px;color:#FCA5A5;font-size:13px}.footer{text-align:center;padding:24px;font-size:12px;color:var(--muted);border-top:1px solid var(--card-border)}.spinner{width:16px;height:16px;border:2px solid rgba(255,255,255,0.2);border-top-color:white;border-radius:50%;animation:spin 0.7s linear infinite;display:inline-block}@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@media (max-width:640px){.input-row{flex-direction:column}.btn-analyze{width:100%;justify-content:center}}`;

function formatNum(n) {
  if (n == null || n === 0) return "—";
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n.toLocaleString();
}

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function signUp(email, password, fullName, phone) {
  const passwordHash = await hashPassword(password);
  const { data, error } = await supabase
    .from("users")
    .insert({ email, password_hash: passwordHash, full_name: fullName, phone })
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function signIn(email, password) {
  const passwordHash = await hashPassword(password);
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .eq("password_hash", passwordHash)
    .single();
  if (error || !data) throw new Error("Invalid email or password");
  return data;
}

// Save creator and analysis with profile type tracking
async function saveCreatorAndAnalysis(data, postUrl, mediaType, userId, profileType, dataSource) {
  const { error: e1 } = await supabase.from("creators").upsert(
    {
      ig_user_id: data.ig_user_id,
      username: data.username,
      full_name: data.full_name,
      biography: data.biography || "",
      followers_count: data.followers_count || 0,
      follows_count: data.follows_count || 0,
      media_count: data.media_count || 0,
      profile_picture_url: data.profile_picture_url || "",
      website: data.website || "",
      profile_type: profileType, // 'permit-granted' or 'captured-profile'
      is_verified: data.is_verified || false,
      account_type: data.account_type || null,
      last_analyzed_at: new Date().toISOString(),
    },
    { onConflict: "ig_user_id" }
  );
  if (e1) return false;
  
  const eng = data.reach > 0 ? ((data.likes + data.comments + data.shares + data.saves) / data.reach) * 100 : 0;
  const { error: e2 } = await supabase.from("post_analyses").insert({
    user_id: userId,
    creator_ig_user_id: data.ig_user_id,
    post_url: postUrl,
    media_id: data.media_id || data.ig_user_id + "_" + Date.now(),
    media_type: mediaType,
    data_source: dataSource, // 'insights-api' or 'business-discovery'
    views: data.views || 0,
    reach: data.reach || 0,
    impressions: data.impressions || 0,
    likes: data.likes || 0,
    comments: data.comments || 0,
    shares: data.shares || 0,
    saves: data.saves || 0,
    total_interactions: data.total_interactions || 0,
    watch_time_total: data.watch_time_total || 0,
    avg_watch_time: data.avg_watch_time || 0,
    engagement_rate: parseFloat(eng.toFixed(2)),
    analyzed_at: new Date().toISOString(),
  });
  return !e2;
}

function MetricCard({ icon, label, value, sub, highlight }) {
  return (
    <div className={`metric-card${highlight ? " metric-highlight" : ""}`}>
      <span className="metric-icon">{icon}</span>
      <div className="metric-label">{label}</div>
      <div className={`metric-value${value === "—" ? " na" : ""}`}>{value}</div>
      {sub && <div className="metric-sub">{sub}</div>}
    </div>
  );
}

function AuthScreen({ onSignIn, onSignUp }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isSignUp) {
        if (!fullName.trim()) throw new Error("Please enter your full name");
        const user = await signUp(email, password, fullName, phone);
        onSignUp(user);
      } else {
        const user = await signIn(email, password);
        onSignIn(user);
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-logo">Insta Metrics Pro</div>
        <h1 className="auth-h1">{isSignUp ? "Create Account" : "Welcome Back"}</h1>
        <p className="auth-sub">
          {isSignUp ? "Sign up to analyze any Instagram professional account" : "Sign in to access your analytics dashboard"}
        </p>
        <form className="auth-form" onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <input className="auth-input" type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              <input className="auth-input" type="tel" placeholder="Phone Number (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </>
          )}
          <input className="auth-input" type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="auth-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          {error && <div className="auth-error">⚠️ {error}</div>}
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? <span className="spinner" /> : isSignUp ? "Sign Up" : "Sign In"}
          </button>
          <button className="btn-ghost" type="button" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Dashboard({ user }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [profileType, setProfileType] = useState(null);

  async function analyze() {
    if (!url.trim()) return;
    
    // Check if it's a URL or just a username
    const isUrl = /instagram\.com\/(p|reel|tv)\/[A-Za-z0-9_-]+/i.test(url);
    const isUsername = /^@?[A-Za-z0-9._]+$/.test(url.trim());
    
    if (!isUrl && !isUsername) {
      setError("Please enter a valid Instagram URL or @username");
      return;
    }
    
    setError("");
    setSaved(false);
    setLoading(true);
    setData(null);
    setProfileType(null);

    try {
      const igBusinessId = import.meta.env.VITE_IG_BUSINESS_ACCOUNT_ID;
      const accessToken = import.meta.env.VITE_IG_ACCESS_TOKEN;

      if (!igBusinessId || !accessToken) {
        throw new Error("Instagram API credentials not configured");
      }

      // If username, use Business Discovery API
      if (isUsername) {
        await analyzeByUsername(url.replace('@', ''), igBusinessId, accessToken);
      } else {
        // If URL, determine if it's permit-granted or captured
        await analyzeByUrl(url, igBusinessId, accessToken);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch data from Instagram");
    } finally {
      setLoading(false);
    }
  }

  // BUSINESS DISCOVERY API - For any public professional account
  async function analyzeByUsername(username, igBusinessId, accessToken) {
    const response = await fetch(
      `https://graph.instagram.com/v21.0/${igBusinessId}?fields=business_discovery.username(${username}){id,username,name,biography,followers_count,follows_count,media_count,profile_picture_url,is_verified,media{id,media_type,media_url,permalink,timestamp,like_count,comments_count,caption}}&access_token=${accessToken}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to fetch account data. Make sure it's a public Business/Creator account.");
    }

    const responseData = await response.json();
    const account = responseData.business_discovery;
    
    if (!account) throw new Error("Account not found");

    // Get latest media for analysis
    const latestMedia = account.media?.data?.[0];
    const mediaType = latestMedia?.media_type === "VIDEO" ? "REEL" : "POST";

    const result = {
      ig_user_id: account.id,
      username: account.username,
      full_name: account.name || account.username,
      biography: account.biography || "",
      followers_count: account.followers_count || 0,
      follows_count: account.follows_count || 0,
      media_count: account.media_count || 0,
      profile_picture_url: account.profile_picture_url || "",
      is_verified: account.is_verified || false,
      account_type: "BUSINESS",
      media_id: latestMedia?.id || "",
      views: 0, // Not available in Business Discovery
      reach: 0, // Not available in Business Discovery
      impressions: 0, // Not available in Business Discovery
      likes: latestMedia?.like_count || 0,
      comments: latestMedia?.comments_count || 0,
      shares: 0, // Not available
      saves: 0, // Not available
      total_interactions: (latestMedia?.like_count || 0) + (latestMedia?.comments_count || 0),
      watch_time_total: null,
      avg_watch_time: null,
    };

    setData(result);
    setProfileType("captured-profile");

    const ok = await saveCreatorAndAnalysis(
      result,
      latestMedia?.permalink || `https://instagram.com/${username}`,
      mediaType,
      user.id,
      "captured-profile",
      "business-discovery"
    );
    if (ok) setSaved(true);
  }

  // INSIGHTS API - For permit-granted accounts (your own)
  async function analyzeByUrl(url, igBusinessId, accessToken) {
    const match = url.match(/\/(p|reel|tv)\/([A-Za-z0-9_-]+)/);
    const shortcode = match[2];
    const mediaType = match[1] === "reel" || match[1] === "tv" ? "REEL" : "POST";

    // Step 1: Try to get media from YOUR account (permit-granted path)
    const mediaResponse = await fetch(
      `https://graph.instagram.com/v21.0/${igBusinessId}/media?fields=id,media_url,permalink,username&access_token=${accessToken}`
    );
    
    if (!mediaResponse.ok) throw new Error("Failed to fetch media from Instagram API");
    
    const mediaData = await mediaResponse.json();
    const media = mediaData.data?.find((m) => m.permalink.includes(shortcode));

    if (media) {
      // This is YOUR post - use full Insights API (permit-granted)
      await analyzeOwnPost(media, url, mediaType, igBusinessId, accessToken);
    } else {
      // This is someone else's post - extract username and use Business Discovery
      const usernameMatch = url.match(/instagram\.com\/([^/]+)\//);
      if (usernameMatch) {
        await analyzeByUsername(usernameMatch[1], igBusinessId, accessToken);
      } else {
        throw new Error("Could not extract username from URL. Try entering @username instead.");
      }
    }
  }

  async function analyzeOwnPost(media, url, mediaType, igBusinessId, accessToken) {
    // Get full insights for YOUR own posts
    const metrics = mediaType === "REEL" 
      ? "impressions,reach,plays,total_interactions,ig_reels_avg_watch_time,ig_reels_video_view_total_time,saved"
      : "impressions,reach,engagement,saved";
    
    const insightsResponse = await fetch(
      `https://graph.instagram.com/v21.0/${media.id}/insights?metric=${metrics}&access_token=${accessToken}`
    );

    if (!insightsResponse.ok) throw new Error("Failed to fetch insights");

    const insightsData = await insightsResponse.json();
    const insights = {};
    insightsData.data?.forEach((metric) => {
      insights[metric.name] = metric.values?.[0]?.value || 0;
    });

    const result = {
      ig_user_id: igBusinessId,
      username: media.username || "Your Account",
      full_name: media.username || "Your Account",
      biography: "",
      followers_count: 0,
      follows_count: 0,
      media_count: 0,
      profile_picture_url: "",
      account_type: "BUSINESS",
      media_id: media.id,
      views: mediaType === "REEL" ? insights.plays || 0 : insights.impressions || 0,
      reach: insights.reach || 0,
      impressions: insights.impressions || 0,
      likes: 0, // Deprecated but estimated from engagement
      comments: 0,
      shares: 0,
      saves: insights.saved || 0,
      total_interactions: insights.total_interactions || insights.engagement || 0,
      watch_time_total: mediaType === "REEL" ? insights.ig_reels_video_view_total_time || 0 : null,
      avg_watch_time: mediaType === "REEL" ? insights.ig_reels_avg_watch_time || 0 : null,
    };

    setData(result);
    setProfileType("permit-granted");

    const ok = await saveCreatorAndAnalysis(
      result,
      url,
      mediaType,
      user.id,
      "permit-granted",
      "insights-api"
    );
    if (ok) setSaved(true);
  }

  const eng = data && data.reach > 0 
    ? (((data.likes + data.comments + data.shares + data.saves) / data.reach) * 100).toFixed(2) 
    : data && data.total_interactions > 0 
    ? "~" + ((data.total_interactions / (data.followers_count || 1000)) * 100).toFixed(2)
    : "0.00";

  return (
    <div className="page">
      <div className="input-wrap">
        <div className="input-label">// ANALYZE INSTAGRAM CONTENT</div>
        <div className="input-row">
          <input 
            className="url-input" 
            placeholder="https://instagram.com/reel/ABC... or @username" 
            value={url} 
            onChange={(e) => { setUrl(e.target.value); setError(""); }} 
            onKeyDown={(e) => e.key === "Enter" && analyze()} 
          />
          <button className="btn-analyze" onClick={analyze} disabled={loading || !url.trim()}>
            {loading ? <span className="spinner" /> : "⚡"} {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>
        <div className="input-hint">
          💡 Enter a post/reel URL or @username. Your own posts get full insights (permit-granted), others get public data (captured-profile)
        </div>
      </div>
      
      {error && <div className="error-box">⚠️ {error}</div>}
      
      {saved && profileType && (
        <div className={`badge badge-${profileType === 'permit-granted' ? 'permit' : 'captured'}`}>
          ✅ Saved as {profileType === 'permit-granted' ? '🔐 Permit-Granted' : '📡 Captured-Profile'}
        </div>
      )}
      
      {!loading && !data && !error && (
        <div className="empty">
          <div className="empty-icon">🎯</div>
          <div className="empty-h">Two-Tier Analytics System</div>
          <p className="empty-p">
            <strong>🔐 Permit-Granted:</strong> Full insights for YOUR authorized posts<br/>
            <strong>📡 Captured-Profile:</strong> Public data for ANY professional account
          </p>
        </div>
      )}
      
      {loading && (
        <div>
          <div className="loading-text">⚡ Fetching Instagram data...</div>
          <div className="skeleton-grid">
            {Array(6).fill(0).map((_, i) => <div className="skeleton-card" key={i} />)}
          </div>
        </div>
      )}
      
      {data && (
        <div className="results">
          <div className="results-header">
            <div className="post-preview">
              <div className="post-thumb">{data.is_verified ? "✓" : "📊"}</div>
              <div>
                <div className="post-type">
                  {profileType === 'permit-granted' ? '🔐 Full Insights' : '📡 Public Data'}
                </div>
                <div className="post-handle">@{data.username}</div>
                <div className="post-date">{data.full_name}</div>
              </div>
            </div>
          </div>
          
          <div className="section-title">👤 Profile Stats</div>
          <div className="metrics-grid">
            <MetricCard icon="👥" label="Followers" value={formatNum(data.followers_count)} />
            <MetricCard icon="📸" label="Posts" value={formatNum(data.media_count)} />
            <MetricCard icon="🔗" label="Following" value={formatNum(data.follows_count)} />
          </div>
          
          <div className="section-title">📊 {profileType === 'permit-granted' ? 'Full Metrics (Your Account)' : 'Public Metrics'}</div>
          <div className="metrics-grid">
            {profileType === 'permit-granted' ? (
              <>
                <MetricCard icon="👁" label="Views/Plays" value={formatNum(data.views)} />
                <MetricCard icon="📡" label="Reach" value={formatNum(data.reach)} />
                <MetricCard icon="🔁" label="Impressions" value={formatNum(data.impressions)} />
                <MetricCard icon="🔖" label="Saves" value={formatNum(data.saves)} />
                <MetricCard icon="🤝" label="Interactions" value={formatNum(data.total_interactions)} />
              </>
            ) : (
              <>
                <MetricCard icon="❤️" label="Likes" value={formatNum(data.likes)} sub="Latest post" />
                <MetricCard icon="💬" label="Comments" value={formatNum(data.comments)} sub="Latest post" />
                <MetricCard icon="🤝" label="Engagement" value={formatNum(data.total_interactions)} sub="Latest post" />
              </>
            )}
          </div>
          
          {data.watch_time_total && (
            <>
              <div className="section-title">🎬 Reel Performance</div>
              <div className="metrics-grid">
                <MetricCard icon="⏱" label="Total Watch Time" value={Math.round(data.watch_time_total / 1000) + "s"} />
                <MetricCard icon="📊" label="Avg Watch Time" value={data.avg_watch_time + "s"} />
              </div>
            </>
          )}
          
          <div className="section-title">🎯 Performance</div>
          <div className="metrics-grid">
            <MetricCard 
              icon="🎯" 
              label="Engagement Rate" 
              value={eng + "%"} 
              sub={profileType === 'permit-granted' ? 'Interactions ÷ Reach' : 'Estimated'} 
              highlight 
            />
            <MetricCard 
              icon="📈" 
              label="Data Source" 
              value={profileType === 'permit-granted' ? 'Full API' : 'Public API'} 
              sub={profileType === 'permit-granted' ? 'All metrics' : 'Basic metrics'} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("insta_metrics_user");
    if (savedUser) setUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);

  function handleSignIn(userData) {
    setUser(userData);
    localStorage.setItem("insta_metrics_user", JSON.stringify(userData));
  }

  function handleSignOut() {
    setUser(null);
    localStorage.removeItem("insta_metrics_user");
  }

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="app">
          <div className="grid-bg" />
          <div className="glow-orb glow-1" />
          <div className="glow-orb glow-2" />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
            <span className="spinner" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="grid-bg" />
        <div className="glow-orb glow-1" />
        <div className="glow-orb glow-2" />
        {!user ? (
          <AuthScreen onSignIn={handleSignIn} onSignUp={handleSignIn} />
        ) : (
          <>
            <nav className="nav">
              <div className="nav-logo">Insta Metrics Pro</div>
              <div className="nav-right">
                <div className="nav-user">{user.full_name}</div>
                <button className="btn-signout" onClick={handleSignOut}>Sign Out</button>
              </div>
            </nav>
            <Dashboard user={user} />
            <footer className="footer">
              © 2025 Insta Metrics Pro · 🔐 Permit-Granted + 📡 Captured-Profile System
            </footer>
          </>
        )}
      </div>
    </>
  );
}
