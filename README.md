# Ezra's Game Hub

Ezra now has a mini game collection with a shared landing page:

- **KPS Jumper** (original action platformer)
- **Brain Quest** (new quiz challenge)

Play it: https://maisoncache.github.io/el-nido/

## Games

### 1) KPS Jumper
Run from Prep all the way to Grade 6, jump school-yard obstacles, grab stars, and become the KPS Champion.

#### How to play

- **Tap**, **click**, or press **Space / ↑** to jump.
- Press jump again in the air for a **double jump**.
- Grab ⭐ stars for **+50 bonus points** each. Finishing a level gives a **+500 finish bonus**.
- Pick a character on the **Choose Your Jumper** screen — they all play the same, just look different.
- Beat each level to unlock the next. Use **Choose a Level** to replay any unlocked level.
- Best score is saved per level on this device.
- Tap the 🔊 pill (or use the Sound button on the title) to toggle sound on/off.

#### Characters

- **Red Hat Runner** — cheerful kid with a red cap.
- **Blue Backpack Kid** — big blue backpack, ready for every level.
- **Star Shoes Kid** — bright star shoes for big jumps.
- **Sporty Kid** — sweatband, made for the oval and the courts.
- **Rainbow Hoodie Kid** — colourful rainbow hoodie, fun energy.

#### Levels

1. **Prep — Top Court**: bags, witches hats, drink bottles. Easy warm-up.
2. **Grade 1 — The Oval**: soccer balls, puddles, sticks, lunchboxes on grass.
3. **Grade 2 — The Long Silver Slide**: school-yard obstacles, then auto-ride the silver slide near the end.
4. **Grade 3 — Bottom Playground**: hoops, toy blocks, buckets, benches.
5. **Grade 4 — Bottom Courts**: cones, basketballs, drink bottles, lunchboxes.
6. **Grade 5 — Whole School Run**: a longer run that mixes everything together.
7. **Grade 6 — KPS Champion Level**: hardest grade — clear it to unlock Teacher's Challenge.
8. **Teacher's Challenge**: a wholesome school obstacle course with a friendly coach teacher cheering at the finish line.
9. **Principal's Challenge**: a longer school-wide course with a big "KPS CHALLENGE" banner, the principal at the finish line, and the whole school cheering.
10. **World Challenge**: the longest, hardest level. Bands of court / grass / playground / rainbow ground, world-themed obstacles (mountains, clouds, suitcases, globes, rainbow gates), and a big trophy finish — beat it to become **KPS Champion of the World**.

#### Sound

Sound effects are made with the Web Audio API (no audio files): jump, land, star pickup, hit, level complete, champion celebration, and button clicks. The sound default is on; tap the 🔊 / 🔇 pill in the HUD or the Sound button on the title screen to toggle. Audio only starts after the first tap/click/key press because browsers block audio until the user interacts.

### 2) Brain Quest
Brain Quest is a fast multiple-choice quiz game with 8 questions across science, math, vocabulary, and logic.

- Large touch-friendly answer buttons.
- Instant right/wrong feedback.
- Running score updates each round.
- End-of-quiz badge feedback with quick restart.

## Running locally

Plain HTML/CSS/JavaScript only (no build step or dependencies).

```sh
# from the repo root
python3 -m http.server 8000
# then open http://localhost:8000
```

Pages:

- `index.html` → Ezra's Game Hub (landing page)
- `kps-jumper.html` → KPS Jumper
- `brain-quest.html` → Brain Quest
- `draw.html` → Doodle Pad (free drawing with brushes, rainbow, eraser, and emoji stamps)
- `planet-house.html` → Planet House (create and name a planet, gather its resources, then build and decorate a house on it)

## Deployment

Hosted on GitHub Pages from the `main` branch (root). Pushing to `main` republishes automatically — give it about a minute.
