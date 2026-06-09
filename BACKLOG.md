# Towers — Enhancement Roadmap

## Completed

### Tier 1: Game Feel ✅ v10
- [x] Card deploy/retreat animations (bounce, slide)
- [x] Lane win/loss/draw flash on resolution
- [x] Formation badge pulse when triggered
- [x] Breakthrough screen shake + gold particle burst
- [x] Sound effects (Web Audio API — deploy, formation, breakthrough, round win/lose, pass, concede, card select)
- [x] Ambient highstorm wind loop (toggle)
- [x] Mobile responsive (3 breakpoints: 900px, 700px, 420px)

### Tier 2: Strategic Depth ✅ v11–v12
- [x] Deck Builder — pick 20 from 40-card pool, 5 presets, AI personality-weighted decks, PvP dual building ✅ v11
- [x] Campaign Mode — 5-chapter Stormlight narrative, carry-forward effects, win/lose story consequences ✅ v12

### Tier 3: Interaction Polish ✅ v13–v14
Smoother gameplay, less friction, more visual feedback.

- [x] **Drag-and-drop deploy** — drag from hand to lane with snap zones and ghost preview ✅ v14
- [x] **Undo last action** — revert your last deploy/move before AI responds ✅ v14
- [x] **Card hover tooltips** — detailed breakdown: base value + synergy + formation + fatigue = effective strength ✅ v13
- [x] **Optimal lane highlights** — when a card is selected, lanes glow green (best) / gold (ok) / dim (weak) based on impact ✅ v13
- [x] **AI speed control** — fast / normal / slow toggle for AI thinking delay ✅ v13
- [x] **Shardbearer fatigue visual** — cracking border effect that worsens over turns, resets on Shardwall ✅ v14
- [x] **Auto-pass option** — toggle to auto-pass when no beneficial plays remain ✅ v14

---

## Next Up

### Tier 4: Content Expansion
More to fight, more to track, more to replay.

- [ ] **New AI opponents** — Navani (tech/siege focus, buffing adjacent units), Wit/Hoid (chaotic wildcard, random strategy shifts mid-game)
- [ ] **Match history** — persistent win/loss record per opponent, best streaks, campaign completion stats (localStorage)
- [ ] **Campaign Act 2** — Chapters 6–10 following Words of Radiance / Oathbringer arc (new opponents, new effects)
- [ ] **New formations** — Siege Line (Archers + Shardbearers), Shield Brothers (2+ Cavalry in same lane), Bridge Four (all 4 types in one lane)
- [ ] **Card art variants** — alternate SVG art for high-value cards (8-10) to visually distinguish elite units

### Tier 5: Multiplayer & Social
Take it online.

- [ ] **Online multiplayer** — Supabase Realtime or WebRTC peer-to-peer, lobby + matchmaking
- [ ] **Spectator mode** — watch AI vs AI matches with commentary
- [ ] **Share replays** — export match as a replayable JSON, shareable link
- [ ] **Leaderboard** — anonymous or named rankings across campaign and quick play
- [ ] **Challenge links** — send a URL that drops someone into a match against your saved deck

### Tier 6: Platform & Intelligence
Level up the tech.

- [ ] **PWA install** — service worker, offline play, "Add to Home Screen" prompt
- [ ] **LLM-powered Wit** — Claude Haiku API integration for natural language strategy advice based on live board state
- [ ] **Custom themes** — swap visual themes (Shattered Plains, Urithiru, Shadesmar) with different CSS palettes
- [ ] **Mod support** — JSON-configurable card pools, formation rules, and campaign chapters for community content
- [ ] **Analytics dashboard** — track play patterns, most-used formations, win rates by deck composition

---

## Implementation Notes

**Priority guidance:** Tier 3 is pure UX polish — low risk, high quality-of-life. Tier 4 adds replay value. Tier 5 is a bigger architectural lift (networking). Tier 6 is long-term platform investment.

**Architecture constraint:** Single-file HTML remains the target through Tier 4. Tier 5+ may require splitting into multiple files or adding a backend.

**Testing approach:** Node.js eval with mock DOM for logic tests. Browser manual testing for visual/interaction changes. Campaign narrative tested for perspective consistency (always good-guy POV).
