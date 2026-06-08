# Towers — Backlog

## Priority 1: Tutorial Mode

### Basic Tutorial
- [ ] Interactive walkthrough overlay that activates on first play
- [ ] Step-by-step guide covering: card types, lane mechanics, formations, The Tower
- [ ] "Practice Round" mode with guided hints and undo capability
- [ ] Base strategies section: when to pass, when to concede, formation building order

### LLM-Powered Advisor (Stretch)
- [ ] Integrate a lightweight LLM (Claude Haiku via API) for natural language Q&A
- [ ] "Ask the Advisor" button that accepts freeform questions about strategy
- [ ] Context-aware responses based on current board state (pass lane data to prompt)
- [ ] Example queries: "Why can't I play this card?", "Should I concede?", "How do I build a Phalanx?"
- [ ] Fallback: pre-written FAQ if no API key configured

### Implementation Notes
- Tutorial overlay can be a state machine: `TUTORIAL_INTRO → CARD_TYPES → DEPLOY_DEMO → FORMATION_DEMO → TOWER_DEMO → DONE`
- Store `tutorialComplete` in localStorage to skip on return visits
- LLM integration: POST to Claude API with board state JSON, parse response into advisor panel

---

## Priority 2: Card & Action Polish

### Visual Enhancements
- [x] Card deploy animation (slide from hand into lane) ✅ v10
- [x] Card retreat animation (slide back to hand) ✅ v10
- [x] Lane win/loss flash effect on resolution ✅ v10
- [x] Formation badge pulse animation when triggered ✅ v10
- [ ] Shardbearer fatigue visual (cracking border effect)
- [x] Breakthrough victory: screen-shake + gold particle burst ✅ v10
- [ ] Card hover tooltip showing effective strength with all bonuses broken down

### Action Flow Improvements
- [ ] Auto-highlight optimal deploy lanes when a card is selected (green = good, yellow = ok, grey = weak)
- [ ] One-click deploy: click card, click lane (skip the lane selection bar)
- [ ] Drag-and-drop from hand to lane (with snap zones)
- [ ] Auto-pass when no beneficial plays remain (optional toggle)
- [ ] Undo last action (before AI responds)
- [ ] Speed control for AI thinking delay (fast/normal/slow)

### Audio ✅ v10
- [x] Card deploy sound (parchment/thud) ✅ v10
- [x] Formation trigger chime ✅ v10
- [x] Breakthrough horn blast ✅ v10
- [x] Ambient highstorm wind (toggle) ✅ v10

---

## Priority 3: Future Features

- [ ] Online multiplayer (WebSocket or WebRTC peer-to-peer)
- [x] Deck builder: customize your 20-card deck from the 40-card pool before a match ✅ v11
- [ ] Campaign mode: sequence of AI opponents with escalating difficulty
- [ ] Additional AI personalities (Navani = tech/siege focus, Wit = chaotic/random)
- [ ] Match history and win/loss tracking
- [ ] Spectator mode for watching AI vs AI matches
- [x] Mobile-optimized layout (vertical card stacking) ✅ v10
