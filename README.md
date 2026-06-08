# Towers — A Rosharan Card Game

> *"The purpose of a storyteller is not to tell you how to think, but to give you questions to think about."* — Brandon Sanderson

~Created by DC

A strategic card game based on the fictional "Towers" game from Brandon Sanderson's **The Stormlight Archive**. Built as a single-file browser game (HTML/CSS/JavaScript) with multiple AI opponents, formations, smack talk, and multiplayer.

**Play now:** [stangdjc.github.io/Stormlight](https://stangdjc.github.io/Stormlight/)

---

## Game Overview

Two players deploy armies across a multi-lane battlefield. Win lanes by outmaneuvering your opponent with unit synergies and formations. Win 2 of 3 rounds to win the match — but all deployed cards are eliminated after each round, creating a brutal attrition game.

**The Tower** (Center lane) adds a secondary win condition: dominate it by 10+ margin with a flank win for an instant Breakthrough victory.

---

## Features

### AI Opponents (5, with progression unlocks)

| Opponent | Style | Unlock |
|----------|-------|--------|
| 🔴 **Sadeas** | Ruthless flanker, baits Center, concedes freely | Available |
| 🔵 **Dalinar** | Formation-heavy, holds The Tower, rarely concedes | Available |
| 🟡 **Adolin** | Balanced, adapts to your strategy | Beat 1 opponent |
| 🟤 **Taravangian** | Calculating, sacrifices lanes to win wars | Beat 2 opponents |
| 🟣 **Odium** | Overwhelming, relentless pressure everywhere | Beat 3 opponents |

Each AI has unique personality-driven **smack talk** that triggers during gameplay — taunts on deploy, round wins, and concedes.

### Game Modes

| Mode | Lanes | Win | Special |
|------|-------|-----|---------|
| **Standard** | 3 | 2 of 3 | The Tower, Formations, Fatigue |
| **Flatface** | 3 | 2 of 3 | Opponent cards face-down until resolution |
| **Crosswise Chull** | 5 | 3 of 5 | Archers reach 2 lanes, 13 cards dealt |
| **PvP Hotseat** | 3/5 | Any mode | Two humans, same screen, hand-hiding between turns |

### Unit Types

| Unit | Icon | Ability |
|------|------|---------|
| Spearmen | ⚔️ ♣ | +1 per other Spearman in lane. 3+ = Phalanx |
| Archers | 🏹 ♦ | +2 to adjacent lanes. Best in center |
| Cavalry | 🐴 ♥ | Charge: reposition 1 card on deploy. Solo = Vanguard |
| Shardbearers | 🗡️ ♠ | ×2 strength. Max 1/lane. Fatigues without Shardwall |

### Formations (auto-detected)

| Formation | Requirement | Bonus |
|-----------|------------|-------|
| **Phalanx** | 3+ Spearmen | +3 per Spearman |
| **Skirmish Line** | Archer + Cavalry | +3/archer, +2/cavalry |
| **Shardwall** | Shardbearer + 2 Spearmen | Negates fatigue |
| **Vanguard** | Solo Cavalry | +4 per Cavalry |
| **Crossfire** | Archers in adjacent lanes | +2 per Archer |

### Turn Actions

Deploy (click card → click lane) · Move (adjacent lane, −1 str) · Retreat · Pass · Concede 🤝

### Interactive Features

- **Click-to-deploy**: Select a card, lanes light up as targets with +N strength preview
- **Smart action hints**: Pass button pulses gold when winning, Concede pulses red when losing badly
- **Lane status bar**: Inline chips above battlefield showing +/− per lane
- **Formations bar**: Below hand, shows all formations with active highlights
- **Smack talk**: AI opponents taunt during gameplay, personality-matched
- **Opponent progression**: Beat opponents to unlock harder ones

### Wit Watch (Floating Advisor)

A floating 🃏 chat bubble with Hoid's personality. Moveable left/right, minimizable.

**Modes:**
- **Normal** — Answers when asked via dropdown or free text
- **Enhanced** — Proactive advice on key moments (formation opportunities, critical lanes)
- **Cheat** — Shows AI hand breakdown, optimal play, lane win probabilities

**16 topic categories** available via dropdown selector. Free text input for natural questions with fuzzy topic matching.

### Sound & Atmosphere

- **Sound effects** (Web Audio API, zero external files): card deploy thud, formation chime, Breakthrough horn, round win/lose stingers, pass/concede sounds, card select click
- **Ambient highstorm** wind loop (toggle with 💨 button)
- **Sound toggle** 🔊/🔇 in top bar — mutes all sounds instantly
- All sounds procedurally generated — no audio files needed

### Animations & Effects

- **Enhanced card deploy**: smooth slide with slight bounce on entry
- **Lane flash**: green/red/gold flash on lane win/lose/draw at resolution
- **Breakthrough victory**: screen shake + 60-particle gold burst explosion
- **Formation trigger glow** on badges when a new formation activates

### Mobile Responsive

- Fully playable on phones (tested down to 320px width)
- Vertical lane stacking on narrow screens
- Touch-friendly card and button targets
- Responsive Wit chat, menu, tutorial, and overlays
- Three breakpoints: 900px, 700px, 420px

### Campaign: The War of Reckoning

A 5-chapter narrative campaign following the Stormlight Archive story arc. You play as a young Brightlord aligned with Dalinar's coalition.

- **Chapter 1 — The Betrayal at the Tower** vs Sadeas (Standard): Survive the betrayal on the plateau
- **Chapter 2 — The Codes of War** vs Dalinar (Standard): Prove yourself to the Blackthorn in a sparring match
- **Chapter 3 — The Duel** vs Adolin (Standard): Fight for political momentum in the arena
- **Chapter 4 — The Diagram** vs Taravangian (Flatface): Uncover the hidden schemer's plans
- **Chapter 5 — The Last Desolation** vs Odium (Crosswise Chull): The final battle for Roshar

**Carry-forward effects**: Win/lose outcomes alter subsequent chapters — bonus deck slots, formation buffs, scout intel, or enemy advantages stack across the campaign. Every playthrough feels different.

### Deck Builder

Before each match, pick 20 cards from the full 40-card pool. Shape your strategy before the first deploy.

- **Grid selection**: Cards grouped by type (Spearmen, Archers, Cavalry, Shardbearers), click to toggle
- **5 presets**: Balanced, Formation Heavy, Shard Rush, Cavalry Blitz, Elite Force
- **Quick Play**: Random deck for fast starts
- **Live stats**: Type breakdown, average strength, 20-card progress bar
- **AI personality decks**: Each opponent builds differently — Sadeas favors cavalry flanks, Dalinar loads spearmen for formations, Taravangian cherry-picks high-value, Odium takes the strongest of everything
- **PvP dual building**: Both players build decks with hand-hiding between

### Tutorial

8-step interactive walkthrough accessible from the menu ("How to Play") or in-game ("?" button). Covers card types, formations, The Tower, fatigue, and strategy tips.

---

## Fatigue & Logistics

- **Shardbearer fatigue**: −1 strength per 3 turns deployed. Shardwall negates.
- **Move penalty**: −1 strength when repositioned to adjacent lane.
- **Minimum strength**: Cards never drop below 1.

## The Tower — Win Condition

Center lane = The Tower 🏰. Win it by **+10 margin** AND hold **1 flank** = **Breakthrough** = instant match win.

---

## Technical Details

- **Single HTML file**, zero dependencies, runs in any modern browser
- **~100KB** total (HTML + CSS + JS + inline SVG art)
- SVG unit silhouettes (spear formation, bow, mounted rider, Shardblade)
- CSS gradient card backgrounds with type-specific coloring
- Shardbearer pulse glow animation
- Card deploy slide animation
- Battlefield terrain texture (Shattered Plains aesthetic)

## Physical Deck

Strip a 52-card deck to A–10 (40 cards). ♣=Spearmen, ♦=Archers, ♥=Cavalry, ♠=Shardbearers. Deal 10 each.

---

## Version History

| Version | Changes |
|---------|---------|
| v1 | Core game engine, 3 lanes, 4 unit types, basic AI |
| v2 | Advisor panel, blocked-card feedback, Flatface + Crosswise Chull variants |
| v3 | Formations, fatigue, The Tower, AI personalities (Sadeas/Dalinar), Move action |
| v4 | Full-screen layout, Wit Watch AI chat |
| v5 | Card polish (gradients, effective strength), advisor + Wit split panel |
| v6 | Click-to-deploy, lane preview, smart action hints, Wit cheat mode |
| v7 | Rosharan SVG card art, battlefield atmosphere, deploy animations, Wit spam fix |
| v8 | Layout restructure (lane status top, formations bottom), floating Wit with dropdown topics, chat reset |
| v9 | Moveable Wit (left/right), 5 AI opponents with progression, smack talk system |
| v10 | Sound effects (Web Audio), card/lane animations, Breakthrough particles + screen shake, mobile responsive, ambient highstorm |
| v11 | Deck Builder — pick 20 cards from 40-card pool, 5 presets, AI personality-weighted decks, PvP dual deck building |
| v12 | Campaign Mode — 5-chapter Stormlight narrative, carry-forward effects, win/lose story consequences |

---

## File Structure

```
Stormlight/
├── towers.html           # The game (single file)
├── README.md             # This file
├── BACKLOG.md            # Future features roadmap
├── DEPLOY.md             # GitHub Pages deployment guide
├── ROADMAP.md            # Sharing & multiplayer roadmap
└── towers_backup_*.html  # Version backups
```

---

*Life before death. Strength before weakness. Journey before destination.*
