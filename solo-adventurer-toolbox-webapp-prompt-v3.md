# CLAUDE CODE MASTER PROMPT — SOLO ADVENTURER’S TOOLBOX WEB APP

## READ THIS FIRST — NON-NEGOTIABLE PRODUCT RULES

Build this as a **DIGITAL BOOK / REFERENCE LIBRARY OF PREWRITTEN TABLES**.

This is **NOT** a procedural generator app.
This is **NOT** an app that creates table content when the user clicks buttons.
This is **NOT** an app that rolls dice for the user.

The intended experience is exactly like owning a beautifully designed digital version of a tabletop sourcebook:

**Claude Code creates and fills every table during development. The complete table content is already inside the finished website. The player opens a section, opens a table, rolls their own physical dice, and reads the matching entry.**

### The distinction between CONTENT and NAVIGATION

The website has two completely separate things:

**1. CONTENT:**
The actual tables and all of their rows/results. These must be created by Claude Code while building the project. They are static content bundled into the site. They must already exist before the user visits the site.

**2. NAVIGATION:**
The buttons/cards/links on the homepage and section pages. These are simply bookmarks, like a table of contents in a PDF or a printed book. They take the user to an existing table. They do not create, calculate, randomize, combine, or reveal a new result.

For example:

```text
HOME
  ↓ click “SETTLEMENTS”
SETTLEMENTS INDEX
  ↓ click “STREET EVENTS”
STREET EVENTS TABLE
  ↓ player rolls their own physical d100
  ↓ player looks up the matching row
  ↓ player reads the result
```

At no point does the website perform the roll or generate the result.

### Absolutely required

- **Every table must be fully populated before the app is considered complete.**
- Do not leave empty table shells, placeholders, TODOs, sample-only tables, or “content to be added later.”
- Do not make the user click a button to generate table entries.
- Do not make the user click a button to randomly select an entry.
- Do not use an AI model, API, LLM, server-side generation, or prompt-based content generation at runtime.
- The site must work from its bundled static data.
- The player supplies all randomness with their own physical dice.

### Absolutely forbidden in the application

Do not implement any of the following:

- in-app dice rolling
- random-number generation
- `Math.random()` for game content
- “Roll” buttons
- “Generate” buttons
- “Generate Quest” buttons
- “Generate NPC” buttons
- “Generate Encounter” buttons
- “Roll 6d12” buttons
- random table selection
- automatic result selection
- dice animations
- dice physics
- roll history
- automatic combination of several table results into generated prose

A button labeled `Wilderness`, `Settlements`, `Quest Complications`, `Street Events`, etc. is fine because it is **navigation only**.

### How tables should work

Tables should look and behave like tables printed in a tabletop RPG book. For example:

| d100 | Result |
|---|---|
| 01–05 | A travelling merchant is struggling to repair a broken cart. |
| 06–10 | A messenger urgently searches the area for someone. |
| 11–15 | Strange tracks disappear beneath a nearby structure. |

The player rolls a physical d100, finds the matching range, and reads the result.

The application simply **displays the complete table**.

### What the homepage buttons mean

Homepage category cards are equivalent to **bookmarks / links in a PDF**. They are not gameplay actions.

`SETTLEMENTS` means “take me to the Settlement chapter.”

`DUNGEONS` means “take me to the Dungeon chapter.”

`QUESTS & STORY` means “take me to the Quest & Story chapter.”

They do NOT mean “generate a settlement,” “generate a dungeon,” or “generate a quest.”

### The 6d12 system

The 6d12 method should be included as a **reference chapter/table**. Explain the six categories, the thresholds, and what table the player should consult when a physical d12 produces a triggering value.

The user rolls six physical d12s. The website does not roll them.

### Design goal in one sentence

> **Build a beautiful, searchable digital solo-RPG sourcebook containing a large, complete collection of original prewritten tables; navigation buttons act only as bookmarks, and the player provides all dice rolls manually.**

---

# 1. Visual direction

Use the attached screenshot as the main visual reference.

The screenshot has:

- full-screen fantasy character/background artwork
- a dark translucent overlay over artwork so text stays readable
- centered fantasy-RPG panels
- ornate gold/bronze borders
- large serif display typography
- warm ivory text
- dark purple/black translucent surfaces
- restrained gold accents
- elegant fantasy-game UI details
- strong hierarchy and depth

Do **not** make a literal clone of the screenshot. Reinterpret its design language for a digital sourcebook.

The visual identity should feel like:

**fantasy RPG sourcebook + premium game UI + readable reference manual**.

Use:

- dark blue-green / charcoal / plum background tones
- nearly-black translucent panels
- warm ivory text
- muted gray-beige secondary text
- antique gold / bronze accents
- elegant serif headings
- extremely readable body text
- subtle textures and ornamentation

Important: the app contains a lot of textual information. **Readability is more important than decoration.** The background image must always remain secondary to the table content.

Use CSS variables for colors and typography so the theme can easily be changed later.

---

# 2. Technology — keep it simple

Use:

- Next.js
- TypeScript
- React
- Tailwind CSS
- static local data files in TypeScript or JSON
- localStorage only if needed for user preferences such as favorites or last-opened section
- Vercel deployment

No database.
No authentication.
No backend unless absolutely necessary for an external image-provider proxy.

Avoid unnecessary libraries.

The project should be easy for one person to maintain.

---

# 3. NO RANDOMIZATION OR DICE SYSTEM IN THE CODE

This deserves its own section because it is a major requirement.

Do **NOT** implement:

- Math.random() table selection
- random-number helpers
- dice rolling functions
- dice animations
- clickable dice
- roll buttons
- "roll again"
- generated results
- automatically selected table entries
- random encounter buttons
- random NPC buttons
- random quest buttons
- 3D dice
- dice physics
- roll history

The user's physical dice are the randomization system.

The app simply displays the tables and tells the user what die/range each row corresponds to.

Example:

| d100 | Result |
|---|---|
| 01–05 | A travelling merchant... |
| 06–10 | A wounded scout... |
| 11–15 | ... |

The user rolls a real d100, finds the corresponding range, and reads the result.

That is the core interaction.

---

# 4. HOME PAGE — THIS IS A TABLE OF CONTENTS

The home page should function like the table of contents / bookmark screen of a beautifully designed RPG book.

It should not be a generator dashboard.

The user should see large category cards/buttons such as:

- START ADVENTURE
- QUESTS & STORY
- WORLD & WILDERNESS
- SETTLEMENTS
- DUNGEONS
- ENCOUNTERS
- COMBAT
- INVESTIGATION & ORACLE
- NPCs
- TREASURE & MAGIC
- BOONS, BANES & EVENTS
- VILLAINS & LAIRS
- NAMES & KEYWORDS
- 6d12 ADVENTURE PRESENCE
- REFERENCE

Each card simply navigates to the relevant section.

Example:

`SETTLEMENTS` → Settlement section landing page.

The Settlement page then has navigation cards for:

`Settlement Population` → table
`Settlement Government` → table
`Districts` → table
`Streets` → table
`Buildings` → table
`Street Events` → table
etc.

This should feel like browsing chapters and bookmarks in an RPG sourcebook.

---

# 5. Navigation model

Use normal Next.js routes or a very simple client-side route structure.

Recommended structure:

```text
/
/start
/quests
/wilderness
/settlements
/dungeons
/encounters
/combat
/investigation
/npcs
/treasure
/events
/villains
/names
/6d12
/reference
```

Individual tables may use nested routes:

```text
/settlements/population
/settlements/districts
/settlements/streets
/settlements/buildings
/dungeons/rooms
/dungeons/traps
/wilderness/features
/quests/complications
/etc.
```

Every page should have:

- breadcrumbs
- section title
- short description of what the table is for
- the complete table
- links to closely related tables
- a "Back to Section" link
- a "Back to Toolbox" link

Buttons should **navigate**. They should not generate.

---

# 6. Table presentation

Create a reusable table component designed specifically for RPG reference tables.

Example:

## Wilderness Encounter — Forest

| Roll | Result |
|---|---|
| 01–05 | ... |
| 06–10 | ... |
| 11–15 | ... |
| ... | ... |
| 96–100 | ... |

Requirements:

- beautiful but extremely readable
- fixed/sticky header where helpful
- alternating subtle row backgrounds
- clear die/range column
- table title
- table purpose/description
- optional tags/context labels
- responsive layout
- mobile-friendly horizontal scrolling when necessary

For small tables, show the entire table immediately.

For very large tables, still include **all entries**; use a scrollable table area or clearly structured sections, but do not hide entries behind a random generator.

The app should never require the user to click "Generate" to see table content.

---

# 7. Search is important

Include a fast local search across the entire static content library.

Search examples:

`trap`

should find:

- Dungeon Trap
- Wilderness Trap
- Secret Door
- Trap-related reference material

`merchant`

should find:

- Merchant Types
- Merchant Quality
- Shop Tables
- Settlement Merchant Districts

Search is simply a way to navigate the book faster.

No backend search.
No AI search.
No semantic AI retrieval.
Just client-side filtering over the static data.

---

# 8. Favorites / bookmarks

Because this is a reference book, allow the user to favorite frequently used tables.

A small bookmark/star control on each table can save the table ID to localStorage.

The home page can show:

**MY FAVORITES**

and:

**RECENTLY VIEWED**

These features are navigation aids only.

---

# 9. Primary content categories

Use the following categories as the main information architecture.

## A. START ADVENTURE

Tables/pages:

- Starting Location
- Starting Situation
- First Quest Seed
- Quest Source / Patron
- Rumour Subject
- Rumour Location
- Character-Backstory Prompt
- Quick Adventure Seed

Purpose: help the player begin a freeform solo adventure quickly.

---

## B. QUESTS & STORY

Tables/pages:

- Quest Types
- Quest Goals
- Quest Sources
- Quest Locations
- Quest Complications
- Quest Rewards
- Quest Twists
- Story Events
- Major Events
- Unresolved Threads
- Quest Name Table
- Rumour Tables
- Clue / Lead Tables

The user should be able to manually combine results from these tables.

For example, they may roll once on Quest Goal, once on Quest Source, and once on Quest Complication.

The app does not perform those rolls.

---

## C. WORLD & WILDERNESS

Tables/pages:

- Wilderness Terrain
- Forest / Jungle
- Grassland
- Hills
- Mountains
- Desert
- Swamp
- Arctic
- Coastal
- Rivers / Waterways
- Wilderness Features
- Landmarks
- Natural Structures
- Small Woods
- Clearings
- Lakes
- Oases
- Rocky Outcrops
- Gullies
- Monuments
- Interesting Landscape Features
- Weather
- Travel Events
- Wilderness Encounters
- Wilderness Clues
- Wilderness Traps
- Campsites
- Camping Disturbances
- Unmarked Settlements
- Hidden Locations

This should cover both broad travel and local environmental dressing.

---

## D. SETTLEMENTS

This should be one of the largest sections.

The important design principle is **incremental discovery**.

The app should contain all the tables needed to build a town, city, village, or other settlement over time, but it should not automatically build one.

Tables/pages:

- Settlement Size
- Settlement Population
- Settlement Demographics
- Settlement Governance
- Settlement Law / Strictness
- Settlement District Count
- District Types
- District Disturbances
- Streets
- Street Description
- Street Details
- Street Activity
- Street Events
- Buildings
- Public Buildings
- Shops
- Merchants
- Merchant Quality
- Inns / Taverns
- Tavern Names
- Temples
- Military / Guards
- Government Buildings
- Markets
- Public Squares
- Market Squares
- Urban Landmarks
- Urban Encounters
- Urban Events
- Town Rumours
- Quick Citizens / NPCs
- Downtime Activities

The user can follow a manual workflow such as:

`Settlement tables → District tables → Street tables → Building tables → NPC/Event tables`

The application simply provides the appropriate tables at each stage.

---

## E. DUNGEONS

Tables/pages:

- Dungeon Type
- Dungeon Size
- Dungeon Theme
- Starting Area
- Passage
- Passage Contents
- Room
- Room Contents
- Architecture / Features
- Stairs
- Doors
- Secret Doors
- Traps
- Dungeon Clues
- Dungeon Features
- Dungeon Encounters
- Dungeon Events
- Dungeon Treasure
- Environmental Dressing

Again, the player uses physical dice and consults these tables manually while exploring.

---

## F. ENCOUNTERS

Tables/pages:

- Wilderness Encounters
- Urban Encounters
- Dungeon Encounters
- Generic Encounters
- Social Encounters
- Combat Encounter Seeds
- Non-Combat Encounter Seeds
- Encounter Difficulty Reference
- Encounter Terrain Features
- Encounter Complications
- Reinforcement / Escalation

---

## G. COMBAT

This section should be a compact in-session reference.

Tables/pages:

- Monster Intentions
- Monster Tactics
- Monster Reactions
- Morale
- Retreat
- Reinforcement
- Combat Events
- Battlefield Features
- Environmental Hazards
- Combat Complications
- Post-Combat Consequences

The tables should provide prompts and possible behaviors. They are not an AI monster controller.

---

## H. INVESTIGATION & ORACLE

Tables/pages:

- Yes / No Oracle
- Likelihood Modifiers
- Oracle Consequences
- Keyword Tables
- Keyword Pairs
- Keyword Trios
- Clues
- Evidence
- Investigation Leads
- Investigation Events
- False Leads
- Hidden Information
- Skill Challenges
- Typical DC Reference
- Skill Check / Likelihood Conversion

The Oracle is a **reference table**. The player performs the physical roll.

The app must not roll for the user.

---

## I. NPCs

Tables/pages:

- Names
- Ancestry / Species
- Occupations
- Personalities
- Emotions
- Motivations
- Goals
- Secrets
- Bonds
- Flaws
- Mannerisms
- Relationships
- Rumours about NPCs
- NPC Quick Generator Reference

A "Quick NPC" page may show the relevant component tables together, but it must still be manual-reference content rather than an automatic generator.

---

## J. TREASURE & MAGIC

Tables/pages:

- Mundane Items
- Valuable Items
- Loot
- Hoard Components
- Magic Item Concepts
- Magic Item Properties
- Relic Names
- Relic Concepts
- Consumables
- Weapon Features
- Armour Features
- Strange Magical Effects

Do not reproduce official copyrighted D&D magic-item text or official item lists. Keep these as original fantasy concepts and generic categories, unless the user later supplies their own custom data.

---

## K. BOONS, BANES & EVENTS

Tables/pages:

- Boons
- Banes
- Fortune
- Misfortune
- Random Events
- Major Events
- Life Events
- Opportunities
- Complications
- Cataclysm / Crisis Events

---

## L. VILLAINS & LAIRS

Tables/pages:

- Villain Motivations
- Villain Methods
- Villain Traits
- Villain Weaknesses
- Villain Secrets
- Villain Relationships
- Villain Clues
- Villain / BBEG Concepts
- Lair Concepts
- Lair Features
- Final Encounter Environments

These should be original and generic enough to work with whatever fantasy system the player is using.

---

## M. NAMES & KEYWORDS

Tables/pages:

- Character Names
- Settlement Names
- Tavern Names
- Place Names
- Quest Names
- Relic Names
- Fantasy Keywords
- Descriptive Keywords
- Action Keywords
- Adjective / Noun combinations

Do not automatically combine them into generated prose. The player should interpret them.

---

# 10. THE 6d12 SYSTEM — REFERENCE ONLY

The source material describes a six-dice method where six different d12s represent six kinds of adventure elements:

- Monsters
- Clues
- Environment Features
- NPCs
- Treasure
- Random Events

For the web app, reproduce the **conceptual structure and rules reference**, but not the source book's prose or tables verbatim.

Create a dedicated page:

`/6d12`

It should explain:

1. What the six dice represent.
2. Which type of thing each die checks for.
3. The relevant trigger thresholds for each environment/preset.
4. What table the player should consult if an element is triggered.
5. Cross-links to those tables.

Example layout:

| d12 | Element | Trigger / Interpretation | Consult |
|---|---|---|---|
| 1 | Monsters | See environment-specific threshold | Monster / Encounter tables |
| 2 | Clues | See environment-specific threshold | Clue tables |
| 3 | Environment Feature | See environment-specific threshold | Feature tables |
| 4 | NPC | See environment-specific threshold | NPC tables |
| 5 | Treasure | See environment-specific threshold | Treasure tables |
| 6 | Random Event | See environment-specific threshold | Event / Boon / Bane tables |

Provide separate reference tables for contexts such as:

- Standard Wilderness
- Special Wilderness
- Standard Room
- Special Room
- Passage

Use the known 6d12 trigger structure as configuration/reference, while creating the rest of the app's content originally.

**There must be no button that rolls the six dice.**

The user rolls six physical d12s, then comes to this page and checks what was triggered.

---

# 11. Context / cross-reference system

A major strength of the app should be **cross-linking between tables**.

Every table should know which related tables are useful next.

Example:

`Wilderness Clue Table`

Related tables:

- Wilderness Features
- Wilderness Encounters
- NPCs
- Quest Leads
- Investigation

Another example:

`Settlement Street Event`

Related tables:

- NPCs
- Urban Encounters
- Rumours
- Buildings
- District Disturbances

These should be hyperlinks/navigation buttons, not generation actions.

---

# 12. Static content data architecture

Use a consistent static data structure.

For example:

```ts
export type TableEntry = {
  id: string;
  range?: string;
  result: string;
  notes?: string;
  tags?: string[];
};

export type RollTable = {
  id: string;
  name: string;
  category: string;
  description: string;
  die: string;
  entries: TableEntry[];
  relatedTableIds?: string[];
};
```

There should be **no random selection method** attached to this type.

The data is simply the book content represented in code.

Organize the content into separate files/folders, for example:

```text
/data
  /start
  /quests
  /wilderness
  /settlements
  /dungeons
  /encounters
  /combat
  /investigation
  /npcs
  /treasure
  /events
  /villains
  /names
  /reference
```

Do not put hundreds of table rows directly inside React components.

---

# 13. ORIGINAL CONTENT REQUIREMENT

The app must ship with substantial, useful content.

Do NOT build an empty framework and expect the user to fill it later.

Claude Code should create the table content as part of the project.

At minimum, create:

### Start / Quest

- 20 starting situations
- 30 quest goals
- 30 quest sources/patrons
- 30 quest complications
- 30 quest locations
- 30 quest rewards
- 100 quest names
- 40 rumours
- 40 story twists

### Wilderness

- 50 terrain details
- 60 wilderness features
- 40 landmarks
- 40 natural structures
- 40 travel events
- 100 wilderness encounters
- 50 wilderness clues
- 30 weather results
- 30 campsite/camping results
- 30 wilderness traps

### Settlements

- 30 settlement concepts
- 20 settlement quirks
- 30 district types
- 80 street details
- 60 street activities
- 60 street events
- 80 buildings/locations
- 50 merchant/shop types
- 40 tavern concepts
- 30 urban landmarks
- 60 district disturbances
- 100 urban encounters
- 50 town rumours
- 50 quick citizen concepts

### Dungeons

- 25 dungeon types
- 25 dungeon themes
- 50 starting areas
- 60 room types
- 80 room contents
- 60 passages
- 80 dungeon features
- 60 traps
- 40 secret-door situations
- 50 dungeon clues
- 100 dungeon encounters
- 60 dungeon treasures
- 50 dungeon events

### NPCs

- 150 names
- 60 occupations
- 80 personality traits
- 50 motivations
- 50 goals
- 50 secrets
- 50 flaws
- 50 mannerisms
- 60 relationships
- 40 emotions

### Combat / Encounters

- 80 encounter seeds
- 60 encounter complications
- 60 battlefield features
- 50 environmental hazards
- 50 monster intentions
- 50 monster tactics
- 40 monster reactions
- 40 morale / turning-point results
- 40 retreat / reinforcement results

### Investigation

- 150 keywords
- 150 descriptive keywords
- 80 clues
- 60 evidence types
- 50 false leads
- 50 hidden truths
- 60 investigation events
- 60 skill challenge prompts
- complete oracle reference tables

### Treasure / Magic

- 100 mundane valuables
- 80 unusual valuables
- 80 original magic-item concepts
- 80 relic concepts
- 60 strange magical effects
- 50 boons
- 50 banes
- 80 random events

### Villains

- 50 villain motivations
- 50 methods
- 50 traits
- 50 weaknesses
- 50 secrets
- 40 villain clues
- 40 lair concepts
- 60 lair features

The entries must be **original**. Do not paraphrase the book line-by-line. Create fresh fantasy RPG content inspired by the categories and functions.

---

# 14. Table quality requirements

The content should not feel like filler.

Each table should have:

- coherent entries
- enough variety
- a good mix of mundane and unusual results
- results that can actually be interpreted in play
- context-appropriate language
- minimal repetition
- concise phrasing

Avoid dozens of entries that are essentially the same thing with one noun changed.

Where appropriate, make tables modular so several results can be combined creatively by the player.

---

# 15. Background image system

Background art should reinforce the atmosphere while remaining behind the content.

Support an image-provider abstraction such as:

```text
ImageProvider
  -> Unsplash
  -> Freepik (optional)
  -> Local fallback images
```

Requirements:

- never expose API keys in client-side source
- use environment variables for credentials when APIs are used
- the app must still work if no API key is configured
- use fallback image URLs or bundled/local images
- include unobtrusive attribution/source links where required
- use a strong dark gradient overlay
- optionally use backdrop blur behind UI surfaces
- do not load a new remote image every time the user changes tables

Environment variables may be:

```env
UNSPLASH_ACCESS_KEY=
FREEPIK_API_KEY=
```

Do not invent credentials.

Recommended visual themes:

- Home: mysterious fantasy landscape / lone adventurer
- Wilderness: forest / road / mountains / ruins
- Settlement: medieval-fantasy street / market / town
- Dungeon: ancient stone / underground ruins
- Investigation: archive / candlelit chamber / mysterious relic
- Magic: arcane ruins / moonlit landscape

The image should always remain subordinate to the text.

---

# 16. Optional lightweight user state

Because this is a reference book, persistence should remain minimal.

Useful localStorage features:

- favorite tables
- recently viewed tables
- last selected section
- theme preference
- collapsed/expanded table preferences

Do not turn the application into a full campaign manager unless it is genuinely useful.

A lightweight personal notes/journal feature can be included later, but it is **secondary** to the table reference itself.

---

# 17. Do NOT build these things

To prevent scope drift, do not add:

- AI generation
- LLM APIs
- chat interface
- automatic storytelling
- automatic quest generation
- automatic NPC generation
- automatic dungeon generation
- automatic settlement generation
- automatic encounter generation
- dice rolling
- dice animations
- random buttons
- database
- authentication
- multiplayer
- VTT/battlemap system
- 3D dice
- physics engine
- complicated campaign-management system
- elaborate character sheet

Those are not the purpose of this project.

---

# 18. Accessibility and readability

Because the app is image-heavy and table-heavy:

- maintain strong contrast
- never place important text directly on a bright image
- use opaque or translucent dark surfaces behind table text
- support keyboard navigation
- visible focus states
- semantic headings
- accessible buttons/links
- respect reduced-motion preferences
- mobile/tablet readable
- avoid tiny text

---

# 19. Responsive design

Desktop should be the primary experience because tables benefit from width.

However:

- tablet should work very well
- phone should remain usable
- long tables can scroll horizontally where necessary
- navigation should collapse cleanly

On mobile, category buttons can become a vertical list/card layout.

---

# 20. Home page layout suggestion

The first screen could look roughly like:

```text
┌──────────────────────────────────────────────┐
│                                              │
│        THE SOLO ADVENTURER'S TOOLBOX         │
│                                              │
│      A DIGITAL BOOK OF ADVENTURE TABLES      │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  CONTINUE / FAVORITES                        │
│                                              │
│  ┌─────────────┐  ┌─────────────┐            │
│  │ START       │  │ QUESTS      │            │
│  └─────────────┘  └─────────────┘            │
│                                              │
│  ┌─────────────┐  ┌─────────────┐            │
│  │ WILDERNESS  │  │ SETTLEMENTS │            │
│  └─────────────┘  └─────────────┘            │
│                                              │
│  ┌─────────────┐  ┌─────────────┐            │
│  │ DUNGEONS    │  │ ENCOUNTERS  │            │
│  └─────────────┘  └─────────────┘            │
│                                              │
│  ┌─────────────┐  ┌─────────────┐            │
│  │ INVESTIGATE │  │ NPCs        │            │
│  └─────────────┘  └─────────────┘            │
│                                              │
│  ┌─────────────┐  ┌─────────────┐            │
│  │ TREASURE    │  │ VILLAINS    │            │
│  └─────────────┘  └─────────────┘            │
│                                              │
│             6d12 ADVENTURE PRESENCE          │
│                                              │
└──────────────────────────────────────────────┘
```

Use artwork behind this, with a strong dark overlay.

---

# 21. A table page should feel like a book page

For example:

```text
WILDERNESS
────────────────────────────────────────────
FOREST TERRAIN

Use this table when travelling through or
exploring a forested region.

┌──────────┬───────────────────────────────┐
│ d100     │ RESULT                        │
├──────────┼───────────────────────────────┤
│ 01–05    │ ...                           │
│ 06–10    │ ...                           │
│ 11–15    │ ...                           │
│ ...      │ ...                           │
│ 96–100   │ ...                           │
└──────────┴───────────────────────────────┘

RELATED TABLES
[Wilderness Features] [Weather] [Encounters]

[← Wilderness] [⌂ Toolbox]
```

This is much closer to the desired product than a generator page.

---

# 22. Development sequence

Build in this order:

### Phase 1 — Foundation

- Next.js app
- Tailwind
- global theme
- responsive layout
- background/image system
- reusable navigation
- reusable table component
- static data architecture

### Phase 2 — Navigation

Build:

- home page
- category pages
- table pages
- breadcrumbs
- search
- favorites

Make navigation fully functional before polishing everything.

### Phase 3 — Content

Populate every required table with complete original content.

Do not leave placeholder data.

### Phase 4 — 6d12 Reference

Build the 6d12 reference page and link it to the appropriate tables.

Again: reference only. No rolling.

### Phase 5 — Visual polish

Refine:

- typography
- ornamental frames
- background imagery
- panel transparency
- responsive details
- hover/focus states
- spacing
- table styling

### Phase 6 — Testing

Test that:

- every home category navigates correctly
- every table route works
- every required table exists
- all table entries render
- search finds every table
- favorites persist
- the app works with no API keys
- the app builds successfully
- Vercel deployment works
- there are no accidental random-generation functions
- there are no AI/API model calls

---

# 23. Final quality bar

Before declaring the project complete, verify:

### Content

- The app contains a large, coherent set of original fantasy RPG tables.
- There are no empty placeholder tables.
- No important category exists only as a future idea.
- Tables are detailed enough to be genuinely useful during solo play.

### Interaction

- Clicking a category navigates to the relevant section.
- Clicking a table opens that table.
- Related-table links navigate to other tables.
- Search finds tables.
- Favorites/bookmarks work.
- **Nothing rolls automatically.**
- **Nothing generates randomly in the application.**

### Design

- It feels like a premium fantasy RPG book.
- Artwork is atmospheric but never harms readability.
- Tables are easy to scan during play.
- The gold/bronze fantasy UI aesthetic is present but restrained.

### Technical

- TypeScript is clean.
- No unnecessary dependencies.
- Static content is separated from UI code.
- No AI APIs.
- No database.
- Works without image API keys.
- Deploys to Vercel.

---

# 24. The core mental model for this project

Whenever there is ambiguity, use this rule:

> **The app is a beautiful digital book of prewritten tables. The user navigates to a table, rolls their own physical dice, and reads the corresponding entry.**

Not:

> "The user clicks a button and the application generates a result."

That distinction is essential.

Build the application accordingly.
