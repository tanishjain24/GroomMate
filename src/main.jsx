import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Activity, ArrowRight, Bell, Check, CheckCircle2, ChevronRight, CircleHelp, Clock3, Droplets, Flame, Leaf, Menu, Plus, Search, ShieldCheck, Sparkles, Sun, Target, UserRound, X } from "lucide-react";
import "./styles.css";

const products = [
  { id: 1, name: "Daily Gentle Cleanser", type: "Cleansing", detail: "A simple first step for a fresh-feeling routine.", tag: "Daily care", when: "Morning & evening", color: "mint" },
  { id: 2, name: "Lightweight Moisturizer", type: "Moisturizing", detail: "Helps keep skin feeling comfortable through the day.", tag: "Hydration", when: "Morning & evening", color: "sand" },
  { id: 3, name: "Broad-Spectrum Sunscreen", type: "Sun protection", detail: "A daytime sun-protection step. Follow the product label.", tag: "Daytime", when: "Morning; reapply as directed", color: "blue" },
  { id: 4, name: "Nourishing Hair Shampoo", type: "Hair care", detail: "A basic hair-cleansing step for your wash days.", tag: "Hair care", when: "As needed", color: "lavender" }
];

function App() {
  const [tab, setTab] = useState("Overview");
  const [name, setName] = useState("Tanish");
  const [goal, setGoal] = useState("Build a consistent routine");
  const [focus, setFocus] = useState("Skin care");
  const [showSetup, setShowSetup] = useState(false);
  const [done, setDone] = useState(() => JSON.parse(localStorage.getItem("gm_done") || "[]"));
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem("gm_notes") || "[]"));
  const [note, setNote] = useState("");
  const [search, setSearch] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const tasks = [
    { id: "cleanse", label: "Cleanse", sub: "Start with a gentle cleanse", time: "Morning", icon: Droplets },
    { id: "moisturize", label: "Moisturize", sub: "Keep your skin feeling comfortable", time: "Morning", icon: Leaf },
    { id: "protect", label: "Sun protection", sub: "Use sunscreen as directed on the label", time: "Morning", icon: Sun },
    { id: "evening", label: "Evening reset", sub: "Cleanse and follow your evening routine", time: "Evening", icon: Clock3 }
  ];
  const progress = Math.round(done.length / tasks.length * 100);
  const filtered = products.filter(p => (p.name + p.type + p.detail).toLowerCase().includes(search.toLowerCase()));

  function toggleTask(id) {
    const next = done.includes(id) ? done.filter(x => x !== id) : [...done, id];
    setDone(next); localStorage.setItem("gm_done", JSON.stringify(next));
  }
  function addNote(e) {
    e.preventDefault();
    if (!note.trim()) return;
    const next = [{ id: Date.now(), text: note.trim(), date: new Date().toLocaleDateString() }, ...notes];
    setNotes(next); localStorage.setItem("gm_notes", JSON.stringify(next)); setNote("");
  }
  function saveSetup(e) {
    e.preventDefault();
    setShowSetup(false);
  }

  const nav = ["Overview", "My routine", "Explore products", "Journal"];
  return <div className="app-shell">
    <aside className={`sidebar ${mobileMenu ? "open" : ""}`}>
      <div className="brand"><div className="brand-mark"><Sparkles size={19}/></div><div><b>groommate</b><span>PERSONAL CARE COMPANION</span></div><button className="close-menu" onClick={()=>setMobileMenu(false)}><X size={18}/></button></div>
      <div className="profile-mini"><div className="avatar">A</div><div><b>{name}</b><span>Personal dashboard</span></div><ChevronRight size={16}/></div>
      <div className="nav-label">WORKSPACE</div>
      <nav>{nav.map((n,i)=><button key={n} className={`nav-item ${tab===n?"active":""}`} onClick={()=>{setTab(n);setMobileMenu(false)}}>{[Activity,CheckCircle2,Search,Target][i] && React.createElement([Activity,CheckCircle2,Search,Target][i],{size:18})}{n}</button>)}</nav>
      <div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><CircleHelp size={18}/></div><b>Need a little help?</b><p>Keep your routine simple and follow product instructions.</p><button onClick={()=>setTab("Explore products")}>Explore guide <ArrowRight size={14}/></button></div><div className="demo-label"><span></span> DEMO EXPERIENCE</div></div>
    </aside>
    {mobileMenu && <div className="scrim" onClick={()=>setMobileMenu(false)} />}
    <main className="main">
      <header className="topbar"><button className="mobile-toggle" onClick={()=>setMobileMenu(true)}><Menu/></button><div className="crumb">Workspace <span>/</span> {tab}</div><div className="top-actions"><span className="today">{new Date().toLocaleDateString(undefined,{weekday:"short",month:"short",day:"numeric"})}</span><button className="icon-btn" title="Notifications"><Bell size={18}/><i/></button><button className="user-btn" onClick={()=>setShowSetup(true)}><div className="avatar small">{name[0]?.toUpperCase()}</div><span>{name}</span><ChevronRight size={15}/></button></div></header>
      <div className="content">
        {tab==="Overview" && <>
          <div className="welcome-row"><div><div className="eyebrow"><Sparkles size={14}/> YOUR PERSONAL CARE SPACE</div><h1>Good to see you, {name}.</h1><p className="muted">Small, consistent steps make routines easier to maintain.</p></div><button className="outline-btn" onClick={()=>setShowSetup(true)}><UserRound size={16}/> Edit profile</button></div>
          <section className="hero"><div className="hero-copy"><span className="hero-pill"><span/> YOUR ROUTINE, MADE SIMPLE</span><h2>Feel good about<br/>the care you take.</h2><p>A calmer way to explore products, build a routine and reflect on how it works for you.</p><button className="light-btn" onClick={()=>setTab("My routine")}>View my routine <ArrowRight size={16}/></button></div><div className="hero-art"><div className="orb orb1"></div><div className="orb orb2"></div><div className="bottle"><div className="bottle-cap"></div><div className="bottle-label"><span>GM</span><b>DAILY<br/>CARE</b><small>ESSENTIALS</small></div></div><div className="floating-note"><Sparkles size={15}/> Keep it consistent</div></div></section>
          <div className="section-heading"><div><h3>Your overview</h3><p>A quick look at your personal care journey.</p></div><span className="soft-tag">TODAY</span></div>
          <div className="stats-grid"><div className="stat-card"><div className="stat-top"><span>Routine completion</span><div className="stat-icon teal"><CheckCircle2 size={18}/></div></div><div className="stat-number">{progress}<small>%</small></div><div className="progress-track"><div style={{width:progress+"%"}}/></div><span className="stat-foot">{done.length} of {tasks.length} steps completed</span></div><div className="stat-card"><div className="stat-top"><span>Current focus</span><div className="stat-icon peach"><Target size={18}/></div></div><div className="stat-text">{focus}</div><span className="stat-foot">Your selected care category</span></div><div className="stat-card"><div className="stat-top"><span>Your goal</span><div className="stat-icon lilac"><Flame size={18}/></div></div><div className="stat-goal">{goal}</div><span className="stat-foot">One step at a time</span></div></div>
          <div className="lower-grid"><section className="panel routine-panel"><div className="panel-head"><div><h3>Today's routine</h3><p>Check off each step as you go.</p></div><button className="text-link" onClick={()=>setTab("My routine")}>See all <ArrowRight size={14}/></button></div><div className="task-list">{tasks.slice(0,3).map(t=><Task key={t.id} task={t} checked={done.includes(t.id)} onToggle={()=>toggleTask(t.id)}/>)}</div></section><section className="panel tip-panel"><div className="tip-symbol"><ShieldCheck size={22}/></div><span className="eyebrow">A FRIENDLY REMINDER</span><h3>Keep your routine realistic.</h3><p>Introduce products thoughtfully, follow their labels and give your routine time. If irritation occurs, stop using the product and seek appropriate advice.</p><button className="text-link" onClick={()=>setTab("Explore products")}>Explore product guide <ArrowRight size={14}/></button></section></div>
        </>}
        {tab==="My routine" && <><PageTitle eyebrow="YOUR DAILY HABITS" title="My routine" subtitle="A simple checklist to help you stay consistent."/><div className="routine-banner"><div><span className="eyebrow">TODAY'S PROGRESS</span><h2>{progress}% <small>complete</small></h2><p>{done.length===4?"Nice work — you've checked off every step.":"Keep going. Every small step counts."}</p></div><div className="ring" style={{"--progress":progress+"%"}}><div>{progress}%</div></div></div><div className="panel"><div className="panel-head"><div><h3>Routine checklist</h3><p>Tap a step when you've completed it.</p></div><span className="soft-tag">{done.length}/{tasks.length} DONE</span></div><div className="task-list full">{tasks.map(t=><Task key={t.id} task={t} checked={done.includes(t.id)} onToggle={()=>toggleTask(t.id)}/>)}</div><button className="reset-btn" onClick={()=>{setDone([]);localStorage.setItem("gm_done","[]")}}>Reset today's checklist</button></div></>}
        {tab==="Explore products" && <><PageTitle eyebrow="DISCOVER WITH CONFIDENCE" title="Explore products" subtitle="A simple guide to common personal-care categories. Always check the actual product label."/><div className="searchbox"><Search size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search product categories..."/></div><div className="product-grid">{filtered.map(p=><div className="product-card" key={p.id}><div className={`product-art ${p.color}`}><div className="mini-bottle"><span>GM</span></div><span className="product-tag">{p.tag}</span></div><div className="product-info"><span className="eyebrow">{p.type}</span><h3>{p.name}</h3><p>{p.detail}</p><div className="product-bottom"><span><Clock3 size={14}/> {p.when}</span><button onClick={()=>setTab("My routine")}>Add to routine <Plus size={14}/></button></div></div></div>)}</div>{filtered.length===0&&<div className="empty">No matching items. Try another search.</div>}<p className="disclaimer"><ShieldCheck size={16}/> Demo catalogue only. These are generic examples, not verified Man Matters products or medical recommendations. Replace with approved brand catalogue before publishing.</p></>}
        {tab==="Journal" && <><PageTitle eyebrow="REFLECT & LEARN" title="Progress journal" subtitle="Record your experience and notice what works for your routine."/><div className="journal-grid"><section className="panel"><div className="panel-head"><div><h3>How has it been going?</h3><p>Write a quick note about your experience.</p></div><div className="stat-icon lilac"><Activity size={18}/></div></div><form onSubmit={addNote} className="note-form"><textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Today I noticed..." rows="5"/><button className="primary-btn" type="submit">Save journal entry <ArrowRight size={16}/></button></form></section><section className="panel"><div className="panel-head"><div><h3>Your entries</h3><p>Your notes stay in this browser.</p></div><span className="soft-tag">{notes.length} ENTRIES</span></div>{notes.length===0?<div className="empty-state"><div className="empty-icon"><Leaf/></div><b>Your journal starts here</b><p>Add a note to capture your experience.</p></div>:<div className="entries">{notes.map(n=><div className="entry" key={n.id}><span>{n.date}</span><p>{n.text}</p></div>)}</div>}</section></div></>}
        <footer>GroomMate prototype <span>•</span> Independent concept project <span>•</span> Demo data only</footer>
      </div>
    </main>
    {showSetup && <div className="modal-backdrop" onClick={()=>setShowSetup(false)}><form className="modal" onSubmit={saveSetup} onClick={e=>e.stopPropagation()}><button type="button" className="modal-close" onClick={()=>setShowSetup(false)}><X/></button><div className="eyebrow"><UserRound size={14}/> PERSONALIZE YOUR SPACE</div><h2>Make it yours.</h2><p className="muted">This information is stored only in this browser demo.</p><label>Your first name<input value={name} onChange={e=>setName(e.target.value)} maxLength="24"/></label><label>What are you focusing on?<select value={focus} onChange={e=>setFocus(e.target.value)}><option>Skin care</option><option>Hair care</option><option>Beard care</option><option>Overall grooming</option></select></label><label>Your goal<input value={goal} onChange={e=>setGoal(e.target.value)} maxLength="60"/></label><button className="primary-btn" type="submit">Save my preferences <Check size={16}/></button></form></div>}
  </div>;
}
function Task({task,checked,onToggle}){const Icon=task.icon;return <button className={`task ${checked?"checked":""}`} onClick={onToggle}><div className="task-icon"><Icon size={18}/></div><div className="task-copy"><b>{task.label}</b><span>{task.sub}</span></div><span className="task-time">{task.time}</span><div className="check-circle">{checked&&<Check size={14}/>}</div></button>}
function PageTitle({eyebrow,title,subtitle}){return <div className="page-title"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{subtitle}</p></div>}
createRoot(document.getElementById("root")).render(<App/>);