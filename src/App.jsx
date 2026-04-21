import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #080A12; --bg2: #0F1120; --bg3: #161929;
    --card: rgba(255,255,255,0.04); --card-border: rgba(255,255,255,0.08);
    --grad: linear-gradient(135deg, #833AB4, #C13584, #E1306C, #F77737);
    --grad2: linear-gradient(135deg, #833AB4 0%, #F77737 100%);
    --purple: #833AB4; --pink: #E1306C; --orange: #F77737;
    --text: #F0F2FF; --muted: #6B7280; --muted2: #9CA3AF;
    --green: #10B981; --red: #EF4444;
    --font-head: 'Syne', sans-serif; --font-body: 'DM Sans', sans-serif; --font-mono: 'DM Mono', monospace;
    --r: 14px; --r2: 20px; --shadow: 0 8px 40px rgba(0,0,0,0.5);
  }
  body { background: var(--bg); color: var(--text); font-family: var(--font-body); min-height: 100vh; -webkit-font-smoothing: antialiased; }
  ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: var(--bg); } ::-webkit-scrollbar-thumb { background: rgba(131,58,180,0.4); border-radius: 3px; }
  .app { min-height: 100vh; display: flex; flex-direction: column; }
  .nav { display: flex; align-items: center; justify-content: space-between; padding: 0 32px; height: 64px; background: rgba(8,10,18,0.85); backdrop-filter: blur(20px); border-bottom: 1px solid var(--card-border); position: sticky; top: 0; z-index: 100; }
  .nav-logo { font-family: var(--font-head); font-size: 18px; font-weight: 800; background: var(--grad); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .nav-tabs { display: flex; gap: 4px; }
  .nav-tab { padding: 6px 16px; border-radius: 8px; border: none; background: transparent; color: var(--muted2); font-family: var(--font-body); font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s; }
  .nav-tab:hover { color: var(--text); background: var(--card); }
  .nav-tab.active { color: var(--text); background: rgba(131,58,180,0.2); }
  .nav-right { display: flex; align-items: center; gap: 10px; }
  .nav-handle { font-size: 13px; color: var(--muted2); font-family: var(--font-mono); }
  .nav-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green); box-shadow: 0 0 6px var(--green); }
  .grid-bg { position: fixed; inset: 0; pointer-events: none; z-index: 0; background-image: linear-gradient(rgba(131,58,180,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(131,58,180,0.04) 1px, transparent 1px); background-size: 40px 40px; }
  .glow-orb { position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; filter: blur(100px); }
  .glow-1 { width: 500px; height: 500px; background: rgba(131,58,180,0.12); top: -150px; left: -100px; }
  .glow-2 { width: 400px; height: 400px; background: rgba(247,119,55,0.08); bottom: 0; right: -100px; }
  .page { flex: 1; position: relative; z-index: 1; padding: 40px 32px; max-width: 1200px; margin: 0 auto; width: 100%; }
  .auth-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; position: relative; z-index: 1; padding: 40px; }
  .auth-card { background: var(--bg2); border: 1px solid var(--card-border); border-radius: var(--r2); padding: 56px 52px; max-width: 460px; width: 100%; text-align: center; box-shadow: var(--shadow); animation: fadeUp 0.6s ease both; }
  .auth-logo { font-family: var(--font-head); font-size: 28px; font-weight: 800; background: var(--grad); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 8px; }
  .auth-icon { font-size: 48px; margin-bottom: 20px; display: block; }
  .auth-h1 { font-family: var(--font-head); font-size: 22px; font-weight: 700; margin-bottom: 10px; line-height: 1.3; }
  .auth-sub { color: var(--muted2); font-size: 14px; line-height: 1.6; margin-bottom: 32px; }
  .auth-features { display: flex; flex-direction: column; gap: 10px; margin-bottom: 32px; text-align: left; }
  .auth-feat { display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--muted2); }
  .auth-notice { margin-top: 20px; padding: 12px 16px; border-radius: 10px; background: rgba(247,119,55,0.08); border: 1px solid rgba(247,119,55,0.2); font-size: 12px; color: rgba(247,119,55,0.9); line-height: 1.5; }
  .btn-grad { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 14px 28px; border-radius: 12px; border: none; background: var(--grad); color: white; font-family: var(--font-body); font-size: 15px; font-weight: 600; cursor: pointer; width: 100%; transition: all 0.2s; box-shadow: 0 4px 20px rgba(131,58,180,0.35); }
  .btn-grad:hover { transform: translateY(-1px); box-shadow: 0 8px 28px rgba(131,58,180,0.5); }
  .btn-ghost { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 8px; border: 1px solid var(--card-border); background: var(--card); color: var(--muted2); font-family: var(--font-body); font-size: 13px; cursor: pointer; transition: all 0.2s; }
  .btn-ghost:hover { color: var(--text); border-color: rgba(255,255,255,0.15); }
  .input-wrap { background: var(--bg2); border: 1px solid var(--card-border); border-radius: var(--r2); padding: 24px 28px; margin-bottom: 32px; animation: fadeUp 0.4s ease both; }
  .input-label { font-size: 13px; color: var(--muted2); margin-bottom: 12px; font-family: var(--font-mono); }
  .input-row { display: flex; gap: 12px; }
  .url-input { flex: 1; background: var(--bg3); border: 1px solid var(--card-border); border-radius: 10px; padding: 12px 16px; color: var(--text); font-family: var(--font-body); font-size: 14px; outline: none; transition: border-color 0.2s; }
  .url-input:focus { border-color: rgba(131,58,180,0.5); }
  .url-input::placeholder { color: var(--muted); }
  .btn-analyze { padding: 12px 24px; border-radius: 10px; border: none; background: var(--grad); color: white; font-family: var(--font-body); font-size: 14px; font-weight: 600; cursor: pointer; white-space: nowrap; transition: all 0.2s; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 16px rgba(131,58,180,0.3); }
  .btn-analyze:hover { transform: translateY(-1px); }
  .btn-analyze:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
  .input-hint { font-size: 12px; color: var(--muted); margin-top: 10px; }
  .empty { text-align: center; padding: 80px 40px; animation: fadeUp 0.5s ease both 0.1s; }
  .empty-icon { font-size: 64px; margin-bottom: 20px; opacity: 0.6; }
  .empty-h { font-family: var(--font-head); font-size: 20px; font-weight: 700; margin-bottom: 8px; }
  .empty-p { color: var(--muted2); font-size: 14px; line-height: 1.6; max-width: 380px; margin: 0 auto; }
  .loading-wrap { animation: fadeUp 0.3s ease both; }
  .loading-text { text-align: center; color: var(--muted2); font-size: 13px; font-family: var(--font-mono); margin-bottom: 24px; padding-top: 8px; }
  .skeleton-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
  .skeleton-card { background: var(--card); border: 1px solid var(--card-border); border-radius: var(--r); padding: 20px; height: 100px; position: relative; overflow: hidden; }
  .skeleton-card::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%); animation: shimmer 1.5s infinite; }
  .results { animation: fadeUp 0.5s ease both; }
  .results-header { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 28px; flex-wrap: wrap; }
  .post-preview { background: var(--card); border: 1px solid var(--card-border); border-radius: var(--r); padding: 16px; display: flex; align-items: center; gap: 14px; flex: 1; min-width: 280px; }
  .post-thumb { width: 60px; height: 60px; border-radius: 10px; background: var(--bg3); display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0; }
  .post-type { display: inline-flex; align-items: center; gap: 4px; background: rgba(131,58,180,0.15); color: #C084FC; border: 1px solid rgba(131,58,180,0.2); padding: 2px 10px; border-radius: 20px; font-size: 11px; font-family: var(--font-mono); margin-bottom: 6px; }
  .post-handle { font-size: 14px; font-weight: 600; font-family: var(--font-mono); margin-bottom: 2px; }
  .post-date { font-size: 12px; color: var(--muted); }
  .creator-card { background: var(--card); border: 1px solid var(--card-border); border-radius: var(--r); padding: 16px; display: flex; align-items: center; gap: 14px; min-width: 240px; }
  .creator-avatar { width: 52px; height: 52px; border-radius: 50%; flex-shrink: 0; background: var(--grad); display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 700; }
  .creator-name { font-size: 14px; font-weight: 600; margin-bottom: 2px; }
  .creator-handle { font-size: 12px; color: var(--purple); font-family: var(--font-mono); margin-bottom: 6px; }
  .creator-stats { display: flex; gap: 14px; }
  .creator-stat { font-size: 12px; color: var(--muted2); }
  .creator-stat strong { color: var(--text); font-weight: 600; font-family: var(--font-mono); }
  .section-title { font-family: var(--font-head); font-size: 13px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 16px; }
  .metrics-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 14px; margin-bottom: 28px; }
  .metric-card { background: var(--card); border: 1px solid var(--card-border); border-radius: var(--r); padding: 20px; position: relative; overflow: hidden; transition: transform 0.2s, border-color 0.2s; animation: fadeUp 0.4s ease both; }
  .metric-card:hover { transform: translateY(-2px); border-color: rgba(131,58,180,0.3); }
  .metric-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--grad); opacity: 0; transition: opacity 0.2s; }
  .metric-card:hover::before { opacity: 1; }
  .metric-icon { font-size: 20px; margin-bottom: 12px; display: block; }
  .metric-label { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; font-family: var(--font-mono); margin-bottom: 6px; }
  .metric-value { font-family: var(--font-head); font-size: 26px; font-weight: 800; color: var(--text); line-height: 1; }
  .metric-value.na { color: var(--muted); font-size: 20px; }
  .metric-sub { font-size: 11px; color: var(--muted2); margin-top: 4px; }
  .metric-highlight .metric-value { background: var(--grad); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .eng-bar-wrap { background: var(--card); border: 1px solid var(--card-border); border-radius: var(--r); padding: 20px; margin-bottom: 28px; }
  .eng-bar-label { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
  .eng-bar-title { font-size: 13px; color: var(--muted2); }
  .eng-bar-val { font-family: var(--font-mono); font-size: 18px; font-weight: 700; background: var(--grad); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .eng-bar-track { height: 8px; background: var(--bg3); border-radius: 4px; overflow: hidden; }
  .eng-bar-fill { height: 100%; background: var(--grad); border-radius: 4px; transition: width 1s ease; }
  .eng-bar-bench { display: flex; justify-content: space-between; margin-top: 6px; }
  .eng-bench-label { font-size: 11px; color: var(--muted); font-family: var(--font-mono); }
  .save-badge { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-family: var(--font-mono); background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.25); color: #10B981; margin-bottom: 20px; animation: fadeUp 0.3s ease; }
  .error-box { background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.2); border-radius: 12px; padding: 14px 18px; margin-bottom: 24px; display: flex; align-items: center; gap: 10px; color: #FCA5A5; font-size: 13px; animation: fadeUp 0.3s ease; }
  .db-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px; }
  .db-h1 { font-family: var(--font-head); font-size: 22px; font-weight: 800; }
  .db-search { background: var(--bg2); border: 1px solid var(--card-border); border-radius: 10px; padding: 10px 16px; width: 280px; color: var(--text); font-family: var(--font-body); font-size: 14px; outline: none; transition: border-color 0.2s; }
  .db-search:focus { border-color: rgba(131,58,180,0.4); }
  .db-search::placeholder { color: var(--muted); }
  .db-table-wrap { background: var(--bg2); border: 1px solid var(--card-border); border-radius: var(--r2); overflow: hidden; }
  .db-table { width: 100%; border-collapse: collapse; }
  .db-th { padding: 12px 20px; text-align: left; font-size: 11px; font-family: var(--font-mono); color: var(--muted); text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid var(--card-border); background: var(--bg3); }
  .db-tr { border-bottom: 1px solid rgba(255,255,255,0.04); transition: background 0.15s; cursor: pointer; }
  .db-tr:hover { background: rgba(255,255,255,0.02); }
  .db-tr:last-child { border-bottom: none; }
  .db-td { padding: 14px 20px; font-size: 13px; vertical-align: middle; }
  .db-avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--grad); display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; flex-shrink: 0; }
  .db-handle { font-family: var(--font-mono); font-size: 13px; color: var(--text); font-weight: 500; }
  .db-mono { font-family: var(--font-mono); font-size: 13px; color: var(--muted2); }
  .db-expand { background: var(--bg3); border-top: 1px solid var(--card-border); padding: 16px 20px; animation: fadeUp 0.2s ease; }
  .db-posts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; margin-top: 12px; }
  .db-post-card { background: var(--bg2); border: 1px solid var(--card-border); border-radius: 10px; padding: 14px; }
  .db-post-stat { font-size: 12px; color: var(--muted2); display: flex; justify-content: space-between; padding: 3px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
  .db-post-stat:last-child { border: none; }
  .db-post-stat strong { font-family: var(--font-mono); color: var(--text); }
  .badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; border-radius: 20px; font-size: 11px; font-family: var(--font-mono); }
  .badge-reel { background: rgba(225,48,108,0.12); color: #F472B6; border: 1px solid rgba(225,48,108,0.2); }
  .badge-post { background: rgba(131,58,180,0.12); color: #C084FC; border: 1px solid rgba(131,58,180,0.2); }
  .footer { text-align: center; padding: 24px; font-size: 12px; color: var(--muted); border-top: 1px solid var(--card-border); position: relative; z-index: 1; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes shimmer { from { transform: translateX(-100%); } to { transform: translateX(100%); } }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.2); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block; }
  @media (max-width: 640px) { .nav { padding: 0 16px; } .page { padding: 24px 16px; } .auth-card { padding: 40px 28px; } .input-row { flex-direction: column; } .btn-analyze { width: 100%; justify-content: center; } .results-header { flex-direction: column; } .db-search { width: 100%; } .nav-tabs { display: none; } }
`;

function formatNum(n) {
  if (n == null || n === 0) return "—";
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n.toLocaleString();
}
function formatTime(ms) {
  if (!ms) return "—";
  const s = Math.round(ms / 1000);
  return Math.floor(s/60) + "m " + (s%60) + "s";
}

const MOCK = { ig_user_id:"demo_001", username:"stellar.create", full_name:"Stellar Creative Studio", biography:"Award-winning creative studio", followers_count:128400, follows_count:612, media_count:247, profile_picture_url:"", website:"stellarcreative.io", views:284750, reach:198430, impressions:312900, likes:18243, comments:1847, shares:3912, saves:5634, total_interactions:29636, watch_time_total:142375000, avg_watch_time:14.2 };

async function saveCreatorAndAnalysis(data, postUrl, mediaType) {
  const { error: e1 } = await supabase.from("creators").upsert({ ig_user_id:data.ig_user_id, username:data.username, full_name:data.full_name, biography:data.biography, followers_count:data.followers_count, follows_count:data.follows_count, media_count:data.media_count, profile_picture_url:data.profile_picture_url||"", website:data.website||"", last_analyzed_at:new Date().toISOString() }, { onConflict:"ig_user_id" });
  if (e1) { console.error(e1); return false; }
  const eng = data.reach > 0 ? ((data.likes+data.comments+data.shares+data.saves)/data.reach*100) : 0;
  const { error: e2 } = await supabase.from("post_analyses").insert({ creator_ig_user_id:data.ig_user_id, post_url:postUrl, media_id:data.ig_user_id+"_"+Date.now(), media_type:mediaType, views:data.views||0, reach:data.reach||0, impressions:data.impressions||0, likes:data.likes||0, comments:data.comments||0, shares:data.shares||0, saves:data.saves||0, total_interactions:data.total_interactions||0, watch_time_total:data.watch_time_total||0, avg_watch_time:data.avg_watch_time||0, engagement_rate:parseFloat(eng.toFixed(2)), analyzed_at:new Date().toISOString() });
  if (e2) { console.error(e2); return false; }
  return true;
}

async function fetchCreators() {
  const { data, error } = await supabase.from("creators").select("*, post_analyses(*)").order("last_analyzed_at", { ascending:false });
  if (error) { console.error(error); return []; }
  return data || [];
}

function MetricCard({ icon, label, value, sub, highlight, delay=0 }) {
  return (
    <div className={`metric-card${highlight?" metric-highlight":""}`} style={{animationDelay:`${delay}ms`}}>
      <span className="metric-icon">{icon}</span>
      <div className="metric-label">{label}</div>
      <div className={`metric-value${value==="—"?" na":""}`}>{value}</div>
      {sub && <div className="metric-sub">{sub}</div>}
    </div>
  );
}

function AuthScreen({ onAuth }) {
  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-logo">Insta Metrics Pro</div>
        <span className="auth-icon">📊</span>
        <h1 className="auth-h1">Professional Instagram Analytics. Instantly.</h1>
        <p className="auth-sub">Connect your Instagram Business or Creator account to unlock deep post and reel insights.</p>
        <div className="auth-features">
          {[["📈","Post & Reel performance metrics"],["⏱","Watch time & avg. view duration"],["🎯","Calculated engagement rates"],["🗄️","Creator database — powered by Supabase"]].map(([icon,text]) => (
            <div className="auth-feat" key={text}><span>{icon}</span><span>{text}</span></div>
          ))}
        </div>
        <button className="btn-grad" onClick={onAuth}><span>📷</span> Connect with Instagram</button>
        <div className="auth-notice">⚠️ Works with Instagram Business & Creator accounts only.</div>
      </div>
    </div>
  );
}

function Dashboard() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  function isValidIgUrl(u) { return /instagram\.com\/(p|reel|tv)\/[A-Za-z0-9_-]+/i.test(u); }

  async function analyze() {
    if (!url.trim()) return;
    if (!isValidIgUrl(url)) { setError("Please enter a valid Instagram Post or Reel URL"); return; }
    setError(""); setSaved(false); setLoading(true); setData(null);
    await new Promise(r => setTimeout(r, 2200));
    const isReel = url.includes("/reel/") || url.includes("/tv/");
    const result = { ...MOCK, watch_time_total: isReel ? MOCK.watch_time_total : null, avg_watch_time: isReel ? MOCK.avg_watch_time : null };
    setData(result);
    const ok = await saveCreatorAndAnalysis(result, url, isReel ? "REEL" : "POST");
    if (ok) setSaved(true);
    setLoading(false);
  }

  const eng = data && data.reach > 0 ? (((data.likes+data.comments+data.shares+data.saves)/data.reach)*100).toFixed(2) : "0.00";

  return (
    <div className="page">
      <div className="input-wrap">
        <div className="input-label">// PASTE INSTAGRAM LINK</div>
        <div className="input-row">
          <input className="url-input" placeholder="https://www.instagram.com/reel/ABC123..." value={url} onChange={e=>{setUrl(e.target.value);setError("");}} onKeyDown={e=>e.key==="Enter"&&analyze()} />
          <button className="btn-analyze" onClick={analyze} disabled={loading||!url.trim()}>
            {loading?<span className="spinner"/>:"⚡"} {loading?"Analyzing...":"Analyze"}
          </button>
        </div>
        <div className="input-hint">Supports Posts and Reels from Instagram Business & Creator accounts</div>
      </div>
      {error && <div className="error-box">⚠️ {error}</div>}
      {saved && <div className="save-badge">✅ Saved to Supabase database</div>}
      {!loading && !data && !error && (
        <div className="empty">
          <div className="empty-icon">📡</div>
          <div className="empty-h">Paste an Instagram link above to get started</div>
          <p className="empty-p">Insta Metrics Pro will fetch views, reach, watch time, engagement rate, and more — then save everything to your Supabase database automatically.</p>
        </div>
      )}
      {loading && (
        <div className="loading-wrap">
          <div className="loading-text">⚡ Insta Metrics Pro is crunching your data...</div>
          <div className="skeleton-grid">{Array(8).fill(0).map((_,i)=><div className="skeleton-card" key={i} style={{animationDelay:`${i*60}ms`}}/>)}</div>
        </div>
      )}
      {data && (
        <div className="results">
          <div className="results-header">
            <div className="post-preview">
              <div className="post-thumb">{url.includes("/reel/")||url.includes("/tv/")?"🎬":"🖼️"}</div>
              <div>
                <div className="post-type">{url.includes("/reel/")||url.includes("/tv/")?"🎬 Reel":"🖼️ Post"}</div>
                <div className="post-handle">@{data.username}</div>
                <div className="post-date">Analyzed · {new Date().toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</div>
              </div>
            </div>
            <div className="creator-card">
              <div className="creator-avatar">{data.username[0].toUpperCase()}</div>
              <div>
                <div className="creator-name">{data.full_name}</div>
                <div className="creator-handle">@{data.username}</div>
                <div className="creator-stats">
                  <div className="creator-stat"><strong>{formatNum(data.followers_count)}</strong> followers</div>
                  <div className="creator-stat"><strong>{data.media_count}</strong> posts</div>
                </div>
              </div>
            </div>
          </div>
          <div className="section-title">📊 Core Metrics</div>
          <div className="metrics-grid">
            {[{icon:"👁",label:"Views / Plays",value:formatNum(data.views),delay:0},{icon:"📡",label:"Reach",value:formatNum(data.reach),delay:60},{icon:"🔁",label:"Impressions",value:formatNum(data.impressions),delay:120},{icon:"❤️",label:"Likes",value:formatNum(data.likes),delay:180},{icon:"💬",label:"Comments",value:formatNum(data.comments),delay:240},{icon:"↗️",label:"Shares",value:formatNum(data.shares),delay:300},{icon:"🔖",label:"Saves",value:formatNum(data.saves),delay:360},{icon:"🤝",label:"Total Interactions",value:formatNum(data.total_interactions),delay:420}].map(m=><MetricCard key={m.label} {...m}/>)}
          </div>
          {data.watch_time_total && (<><div className="section-title">🎬 Reel Performance</div><div className="metrics-grid"><MetricCard icon="⏱" label="Total Watch Time" value={formatTime(data.watch_time_total)} sub="Lifetime" delay={0}/><MetricCard icon="📊" label="Avg Watch Time" value={data.avg_watch_time+"s"} sub="Per viewer" delay={60}/></div></>)}
          <div className="section-title">🎯 Engagement Rate</div>
          <div className="eng-bar-wrap">
            <div className="eng-bar-label"><span className="eng-bar-title">(Likes+Comments+Shares+Saves) ÷ Reach × 100</span><span className="eng-bar-val">{eng}%</span></div>
            <div className="eng-bar-track"><div className="eng-bar-fill" style={{width:`${Math.min(parseFloat(eng)*4,100)}%`}}/></div>
            <div className="eng-bar-bench"><span className="eng-bench-label">0% · Low</span><span className="eng-bench-label">3–6% · Good</span><span className="eng-bench-label">6%+ · Excellent</span></div>
          </div>
          <div className="section-title">📋 Summary</div>
          <div className="metrics-grid">
            <MetricCard icon="🎯" label="Engagement Rate" value={eng+"%"} highlight delay={0}/>
            <MetricCard icon="🏆" label="Performance" value={parseFloat(eng)>=6?"Excellent":parseFloat(eng)>=3?"Good":"Low"} sub="vs industry avg" delay={60}/>
          </div>
        </div>
      )}
    </div>
  );
}

function CreatorDatabase() {
  const [creators, setCreators] = useState([]);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [sort, setSort] = useState("recent");
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchCreators().then(d=>{ setCreators(d); setLoading(false); }); }, []);

  const filtered = creators
    .filter(c=>c.username?.toLowerCase().includes(search.toLowerCase())||c.full_name?.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b)=>sort==="followers"?(b.followers_count||0)-(a.followers_count||0):new Date(b.last_analyzed_at)-new Date(a.last_analyzed_at));

  return (
    <div className="page">
      <div className="db-header">
        <div><div className="db-h1">Creator Database</div><div style={{fontSize:13,color:"var(--muted2)",marginTop:4}}>{loading?"Loading...":`${creators.length} creator${creators.length!==1?"s":""} · stored in Supabase`}</div></div>
        <input className="db-search" placeholder="🔍  Search by @handle..." value={search} onChange={e=>setSearch(e.target.value)}/>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:20}}>
        {[["recent","Recently Analyzed"],["followers","Most Followers"]].map(([key,label])=>(
          <button key={key} className="btn-ghost" style={sort===key?{color:"var(--text)",borderColor:"rgba(131,58,180,0.4)",background:"rgba(131,58,180,0.12)"}:{}} onClick={()=>setSort(key)}>{label}</button>
        ))}
      </div>
      {loading ? <div className="skeleton-grid">{Array(4).fill(0).map((_,i)=><div className="skeleton-card" key={i} style={{height:60}}/>)}</div>
      : filtered.length===0 ? (
        <div className="empty" style={{padding:"60px 40px"}}>
          <div className="empty-icon">🗄️</div>
          <div className="empty-h">{creators.length===0?"No creators yet":"No results found"}</div>
          <p className="empty-p">{creators.length===0?"Analyze a post on the Dashboard tab and it will appear here automatically.":"Try a different search term."}</p>
        </div>
      ) : (
        <div className="db-table-wrap">
          <table className="db-table">
            <thead><tr>{["Creator","Followers","Following","Posts","Analyses","Last Analyzed"].map(h=><th key={h} className="db-th">{h}</th>)}</tr></thead>
            <tbody>
              {filtered.map(creator=>(
                <>
                  <tr key={creator.id} className="db-tr" onClick={()=>setExpanded(expanded===creator.id?null:creator.id)}>
                    <td className="db-td"><div style={{display:"flex",alignItems:"center",gap:10}}><div className="db-avatar">{(creator.username||"?")[0].toUpperCase()}</div><div><div className="db-handle">@{creator.username}</div><div style={{fontSize:11,color:"var(--muted)",marginTop:2}}>{creator.full_name}</div></div></div></td>
                    <td className="db-td db-mono">{formatNum(creator.followers_count)}</td>
                    <td className="db-td db-mono">{formatNum(creator.follows_count)}</td>
                    <td className="db-td db-mono">{creator.media_count}</td>
                    <td className="db-td db-mono">{creator.post_analyses?.length||0}</td>
                    <td className="db-td" style={{fontSize:12,color:"var(--muted2)"}}>{creator.last_analyzed_at?new Date(creator.last_analyzed_at).toLocaleDateString("en-IN",{day:"numeric",month:"short"}):"—"}</td>
                  </tr>
                  {expanded===creator.id && (
                    <tr key={`exp-${creator.id}`}><td colSpan={6} className="db-expand">
                      <div className="section-title" style={{marginBottom:12}}>Post History ({creator.post_analyses?.length||0})</div>
                      {(!creator.post_analyses||creator.post_analyses.length===0)?<div style={{color:"var(--muted)",fontSize:13}}>No analyses yet.</div>:(
                        <div className="db-posts-grid">
                          {creator.post_analyses.map(a=>(
                            <div className="db-post-card" key={a.id}>
                              <div style={{marginBottom:8}}><span className={`badge badge-${a.media_type?.toLowerCase()}`}>{a.media_type==="REEL"?"🎬":"🖼️"} {a.media_type}</span><span style={{marginLeft:8,fontSize:11,color:"var(--muted)"}}>{a.analyzed_at?new Date(a.analyzed_at).toLocaleDateString("en-IN",{day:"numeric",month:"short"}):""}</span></div>
                              {[["Views",formatNum(a.views)],["Likes",formatNum(a.likes)],["Comments",formatNum(a.comments)],["Shares",formatNum(a.shares)],["Saves",formatNum(a.saves)],["Eng. Rate",a.engagement_rate+"%"]].map(([l,v])=>(
                                <div className="db-post-stat" key={l}><span>{l}</span><strong>{v}</strong></div>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </td></tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Settings({ onDisconnect }) {
  const [status, setStatus] = useState("checking");
  useEffect(() => { supabase.from("creators").select("count",{count:"exact",head:true}).then(({error})=>setStatus(error?"error":"connected")); }, []);
  return (
    <div className="page">
      <div className="db-h1" style={{marginBottom:24}}>Settings</div>
      <div style={{background:"var(--bg2)",border:"1px solid var(--card-border)",borderRadius:"var(--r2)",padding:28,maxWidth:480,marginBottom:20}}>
        <div style={{fontSize:14,fontWeight:600,marginBottom:16}}>🗄️ Supabase Database</div>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
          <div style={{width:10,height:10,borderRadius:"50%",background:status==="connected"?"var(--green)":status==="error"?"var(--red)":"var(--muted)",boxShadow:status==="connected"?"0 0 6px var(--green)":"none"}}/>
          <span style={{fontSize:13,color:"var(--muted2)"}}>{status==="checking"?"Checking...":status==="connected"?"Connected — Supabase is live ✅":"Connection error — check your environment variables"}</span>
        </div>
        <div style={{fontFamily:"var(--font-mono)",fontSize:12,color:"var(--muted)",background:"var(--bg3)",padding:"10px 14px",borderRadius:8,wordBreak:"break-all"}}>{import.meta.env.VITE_SUPABASE_URL||"URL not set"}</div>
      </div>
      <div style={{background:"var(--bg2)",border:"1px solid var(--card-border)",borderRadius:"var(--r2)",padding:28,maxWidth:480,marginBottom:20}}>
        <div style={{fontSize:14,fontWeight:600,marginBottom:12}}>📷 Instagram Account</div>
        <div style={{fontSize:13,color:"var(--muted2)",marginBottom:16,lineHeight:1.6}}>Demo mode active — using mock data. Connect a real Meta Developer App to use live Instagram Graph API data.</div>
        <button className="btn-ghost" style={{color:"#FCA5A5",borderColor:"rgba(239,68,68,0.2)"}} onClick={onDisconnect}>⚠️ Sign Out</button>
      </div>
    </div>
  );
}

export default function App() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState("dashboard");
  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="grid-bg"/>
        <div className="glow-orb glow-1"/>
        <div className="glow-orb glow-2"/>
        {!authed ? <AuthScreen onAuth={()=>setAuthed(true)}/> : (
          <>
            <nav className="nav">
              <div className="nav-logo">Insta Metrics Pro</div>
              <div className="nav-tabs">
                {[["dashboard","📊 Dashboard"],["creators","🗄️ Creators"],["settings","⚙️ Settings"]].map(([key,label])=>(
                  <button key={key} className={`nav-tab${tab===key?" active":""}`} onClick={()=>setTab(key)}>{label}</button>
                ))}
              </div>
              <div className="nav-right"><div className="nav-dot"/><span className="nav-handle">Supabase Live</span></div>
            </nav>
            {tab==="dashboard" && <Dashboard/>}
            {tab==="creators" && <CreatorDatabase/>}
            {tab==="settings" && <Settings onDisconnect={()=>setAuthed(false)}/>}
            <footer className="footer">© 2025 Insta Metrics Pro · Powered by Supabase · Not affiliated with Meta or Instagram</footer>
          </>
        )}
      </div>
    </>
  );
}
