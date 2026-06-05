# Towers — Sharing & Multiplayer Roadmap

## Phase 1: Share for Feedback ✅ READY NOW

**Status:** Game is a single HTML file. Deploy to GitHub Pages for a shareable URL.

- See `DEPLOY.md` for step-by-step GitHub Pages setup
- Zero dependencies — opens in any browser
- Includes: AI opponents (Sadeas/Dalinar), Hotseat PvP, 3 game modes, tutorial, formations, The Tower

**Feedback channels to set up:**
- GitHub Issues on the repo (tag: feedback, bug, feature-request)
- Optional: Google Form linked from the game menu
- Optional: Discord server for community playtesting

---

## Phase 2: Hotseat PvP ✅ DONE

Two humans, same screen. Hand-hiding between turns. No advisor in PvP (keeps it fair).

---

## Phase 3: Online Multiplayer

**Effort:** 1–2 weeks · **Prerequisite:** Phase 1 feedback validates the core game is fun

### Recommended Stack: Supabase Realtime

**Why Supabase:**
- Free tier covers early usage
- Realtime channels (WebSocket) for game state sync
- Postgres for match history / leaderboards later
- Auth built-in if we want accounts

### Architecture

```
Player A (Browser)  ←→  Supabase Realtime Channel  ←→  Player B (Browser)
                              ↕
                    Supabase Postgres (match state)
```

### Implementation Steps

1. **Lobby system** — Create/join game via 4-letter room code
2. **State sync** — Game state stored in Supabase row, broadcast on change
3. **Turn validation** — Server-side function validates moves (prevents cheating)
4. **Reconnection** — Player can refresh and rejoin via room code
5. **Timer** — 30-second turn timer to prevent stalling

### Key Decisions (Before Building)

| Decision | Options | Recommendation |
|----------|---------|----------------|
| Matchmaking | Room codes only / Public queue / Both | Room codes first |
| Auth | Anonymous / Google / Email | Anonymous first |
| Turn timer | None / 30s / 60s | 30s with pause option |
| Spectators | Yes / No | Not in v1 |
| Chat | Yes / No | No — keeps scope small |

### Migration Path

The current single-file game needs minimal refactoring:
- Extract game state into a serializable JSON object (already close)
- Replace local turn flow with send-action / receive-state pattern
- Add a thin networking layer (~200 lines)
- Keep all rendering client-side

---

## Phase 4: Polish & Scale

**Only after multiplayer is stable and players are active.**

| Feature | Effort | Value |
|---------|--------|-------|
| Deck Builder | 1 week | High — meta-strategy |
| Campaign Mode | 2 weeks | High — solo replayability |
| ELO / Leaderboard | 3 days | Medium — competitive draw |
| New AI: Navani, Wit | 2 days each | Medium — variety |
| Card Animations | 1 week | Medium — polish |
| Mobile PWA | 2 days | High — accessibility |
| Sound Effects | 1 day | Low — nice-to-have |

### Priority Order

1. Deck Builder (changes how people approach the game)
2. Mobile PWA (most people will play on phones)
3. Campaign Mode (gives solo players a reason to return)
4. ELO + Leaderboard (competitive hook)
5. Everything else
