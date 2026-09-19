# AI Research V3 Development

Branch: `v3-development`  
Base: official V2.6.0 release commit `6125c263ccfb23ec132eaa6e685577e3ad821823`

## V3 direction

V3 expands AI Research from an investing/school desktop app into a broader personal research and planning workspace. Investing remains a major module, but it is no longer the center of the whole product.

Core principle:

**Ask → Research → Organize → Save → Connect → Track → Revisit**

## Milestone 1 — Foundation (implemented)

### Local profile and security
- Login-style lock screen
- Local profile name
- Optional 4–12 digit PIN
- PIN stored as a salted scrypt hash
- Five failed attempts trigger a temporary in-memory lockout
- Manual Lock button
- Lock on next app launch once enabled
- OpenAI / Twelve Data actions are blocked in the main process while locked
- Existing API keys continue to use Electron / OS safeStorage encryption
- V2.6 API keys remain compatible
- Profile lock is local app access control; it is not a cloud account system

### General AI Workspace
- Research topics unrelated to investing
- Categories: General, Travel, Technology, Career, Business, Buying decision, Creative, Other
- Quick / Normal / Deep
- Optional current web research
- Source rendering
- Save Workspace result into Notes
- Local workspace history

### Projects
- Project name
- Category
- Status
- Progress %
- Notes
- Update progress
- Delete
- Persisted locally / backed up

### Notes & Knowledge
- Title
- Tags
- Note body
- Search
- Pin / unpin
- Workspace-to-note save
- Persisted locally / backed up

### Travel
- Destination
- Start/end dates
- Budget
- Planning notes
- Send trip into AI Workspace for research
- Persisted locally / backed up

### Goals
- Goal
- Target date
- Progress %
- Notes
- Progress updates
- Persisted locally / backed up

### Tech Lab
- PC builds
- Hardware
- Software
- Workshop
- Electronics
- Other technical projects
- Budget / requirements / notes
- Send project into AI Workspace
- Persisted locally / backed up

### Compatibility
- Existing localStorage key `aiResearchDesktopV21` remains unchanged
- V2.6 Portfolio, Watchlist, Investment Research, School, Planner, Usage, Backup and Settings data remain readable
- V3 backup includes both old and new modules

### Missions — core foundation implemented
- Create outcome-based Missions
- Mission category / target date / status
- Mission task lists
- Task completion drives Mission progress
- AI plan sends Mission context into AI Workspace
- Projects, Notes, Trips, Goals and Tech builds can link to a Mission
- Mission cards summarize linked items
- Missions appear in global search, Home Continue and Quick Capture
- V2.6 migration creates an empty Missions collection without affecting old data

## Planned major V3 phases

### V3 Home
- Personal home dashboard
- Continue where you left off
- Upcoming goals/trips/projects
- Recent research across every module
- Quick Capture
- Custom dashboard cards

### Universal Search / Knowledge Graph
- Search everything
- Link projects, notes, trips, school topics, research and tech builds
- Backlinks / related items
- AI-assisted connections
- Tags across modules

### Projects 2.0
- Tasks / checklists
- Deadlines
- Attachments
- AI project planning
- Project research
- Project activity timeline

### Notes 2.0
- Richer editor
- Attachments
- Convert research to structured notes
- Summaries
- Related-note suggestions
- Templates

### Travel 2.0
- Destination research
- Itinerary builder
- Budget breakdown
- Packing lists
- Saved places
- Currency / weather / transport research
- Compare destinations

### Tech Lab 2.0
- Parts lists
- Build cost calculator
- Compatibility checks
- PC build comparison
- Workshop project steps
- Troubleshooting workspace

### Goals 2.0
- Milestones
- Recurring habits
- Progress history
- Links to projects
- Review / reflection

### School 3.0
- Study dashboard
- Better document workspace
- Test Builder
- Revision plans
- Formula sheets
- Adaptive practice improvements
- Cross-topic weakness tracking

### Investing 3.0
- Portfolio dashboard redesign
- Better charts
- Watchlist intelligence
- Research chat
- Opportunity scanner
- Company timelines
- Research-change tracking improvements

### Security / account future
- Optional encrypted local vault for broader app data
- Profile export / import
- Multiple local profiles
- Cloud sync only if deliberately designed later
- Never store API keys in GitHub/source

## Release rule

V3 will not replace V2.6 until:
1. V3 automated integration checks pass.
2. Windows installer builds successfully.
3. V2.6 data migration is verified.
4. Profile lock is tested on a real Windows install.
5. New modules survive restart and backup/restore.
6. A real-PC acceptance pass is completed.
