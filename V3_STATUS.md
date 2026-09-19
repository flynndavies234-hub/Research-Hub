# AI Research V3 Status

Branch: `v3-development`  
Base release: `v2.6.0`  
V2.6 base commit: `6125c263ccfb23ec132eaa6e685577e3ad821823`

## Release state

V3 is **not released**. Do not create `v3.0.1` or a `release/v3.0.1` branch until the final latest-head Windows CI build and real-PC acceptance pass are complete.

## Product direction

V3 expands AI Research from an investing/school tool into a broader personal research and planning workspace.

Core flow:

**Capture → Organize → Research → Connect → Act → Track → Review**

## Implemented V3 systems

### Architecture
- Renderer extracted from the old giant inline HTML script into `renderer.js`.
- Styles extracted into `styles.css`.
- Shared modules under `src/data` and `src/security`.
- Legacy local storage key `aiResearchDesktopV21` intentionally preserved for V2.6 data continuity.
- Windows build packages all required V3 source modules.

### Local profile & security
- Login-style local profile screen.
- Optional 4–12 digit PIN.
- Salted scrypt PIN hashing.
- Timing-safe PIN verification.
- Failed-attempt temporary lockout.
- Manual Lock button.
- Lock on next launch when enabled.
- Main-process API/market actions blocked while locked.
- OpenAI/Twelve Data secrets use Electron/OS `safeStorage`.
- V3 refuses to write API keys in plaintext if OS secure storage is unavailable.
- Profile lock is local access control, not a cloud account or full-disk encryption.

### Home / app navigation
- V3 Home dashboard.
- Quick Capture.
- Continue/recent items.
- Today card.
- Upcoming calendar items.
- Favorites.
- Recent Activity.
- Collapsible sidebar preserved.
- Focus Mode.
- Keyboard shortcuts help.
- First-run V3 onboarding.

### Command Palette
- `Ctrl+K`.
- Jump to modules.
- Create common items.
- Open Assistant.
- Lock app.
- Toggle Focus Mode.
- Universal Search results appear alongside commands.

### Universal Inbox
- Capture Idea, Link, Task, Question, Reminder or Other.
- Convert into Note, Mission, Project, Goal, Trip, Tech or AI Workspace research.
- Conversion logic is unit tested.

### Missions
- Outcome-based Missions.
- Category, target date, status.
- Task/checklist support.
- Task-driven progress.
- Open Mission workspace/detail panel.
- Linked Projects, Notes, Trips, Goals and Tech.
- AI planning from Mission context.
- Favorites.
- Edit support.
- Search / Home integration.

### AI Workspace
- General research unrelated to investing.
- General, Travel, Technology, Career, Business, Buying Decision, Creative and Other.
- Quick / Normal / Deep.
- Optional web research and sources.
- Save output to Notes.
- Local research history.

### V3 Assistant
- Persistent right-side assistant drawer.
- `Ctrl+Shift+A`.
- Local conversation history.
- Optional current-page app context.
- Context builder intentionally sends compact summaries rather than entire local database contents.
- Note bodies are not automatically added to Assistant context.
- Optional current web research.
- Optional higher reasoning.
- Save Assistant replies to Notes.
- Selected Mission context supported.
- Investing context remains research/analysis only; no brokerage control.

### Projects 2.0
- Project categories/status/progress.
- Mission linking.
- Deadlines.
- Project tasks/checklists.
- Task-driven progress.
- AI project planning.
- Calendar deadline integration.
- Favorites.
- Shared Edit modal.

### Notes & Knowledge
- Notes and tags.
- Search.
- Pin/unpin.
- Mission linking.
- Workspace/Assistant output can be saved to Notes.
- Shared Edit modal.

### Travel 2.0
- Destination, dates, budget and notes.
- Mission linking.
- Packing checklist with progress.
- Dated itinerary items.
- Itinerary appears in Calendar.
- AI trip research/planning.
- Favorites.
- Shared Edit modal.

### Goals
- Target date.
- Progress.
- Mission linking.
- Favorites.
- Calendar integration.
- Shared Edit modal.

### Tech Lab 2.0
- PC Build / Hardware / Software / Workshop / Electronics / Other.
- Mission linking.
- Budget.
- Parts/components list.
- Quantity and unit price.
- Total build cost.
- Budget remaining / over-budget calculation.
- Parts included in AI planning context.
- Favorites.
- Shared Edit modal.

### Calendar & Reminders
- Aggregates Mission targets, Project deadlines, Goal targets, Trip start/end and itinerary dates.
- Custom reminders.
- Native Windows notifications while AI Research is running.
- Reminder completion/deletion.
- 30-day upcoming and later sections.
- Home Today/Upcoming integration.

### Activity & Recovery
- Recent activity log.
- Creation/conversion/edit/delete events.
- One-step Undo Last Delete during the current session.
- Mission delete undo restores Mission links where possible.

### Templates
- Learn a skill.
- Plan a trip.
- Build something.
- Exam preparation.
- Compare a purchase.
- Tech build.
- Templates create connected Missions/tasks/module items.

### Existing V2.6 features retained
- Portfolio.
- Watchlist.
- Investment Research Agent.
- Company comparison.
- Research Memory / What Changed.
- Portfolio Intelligence.
- Planner/budget.
- School Lab.
- Subject Workspaces.
- Teach Me This.
- Practice 2.0.
- Mistake Book.
- Attachments.
- Usage tracking.
- Backup/restore.
- Diagnostics.
- Auto updater.

## Automated validation

V3 CI checks:
- Main process syntax.
- Preload syntax.
- Renderer syntax.
- Static cross-file integration audit.
- Unique DOM IDs.
- Every renderer `q()` reference resolves.
- Navigation/UI contract.
- V2.6 → V3 data migration.
- Backup round trip.
- Secret exclusion from JSON backup.
- Profile PIN hashing and verification.
- Mission calculations.
- Project progress.
- Inbox conversion.
- Calendar/reminder calculations.
- Template creation.
- Assistant context size/privacy.
- Universal Search.
- Tech build costs.
- Travel packing/itinerary logic.
- Official release workflow contract.
- Real Windows NSIS installer build.

## Security/backup boundaries

- JSON workspace backups do **not** contain OpenAI/Twelve Data API keys.
- JSON workspace backups do **not** contain the profile PIN hash/salt.
- Secrets stay in the separate Electron settings path and are OS-encrypted when saved.
- Profile PIN is an app lock; it does not encrypt all local workspace data at rest.

## Remaining release blockers

1. Latest exact V3 head must complete the full Windows CI pipeline successfully.
2. Download that exact CI artifact and perform a real Windows acceptance test.
3. Confirm V2.6 data remains after installing V3 test build.
4. Test profile create → lock → wrong PIN → correct PIN → restart.
5. Test Command Palette, Inbox conversion, Mission tasks/linking, Calendar reminder, Assistant context, Projects tasks, Tech parts and Travel packing/itinerary.
6. Export a V3 backup and confirm restart persistence.
7. Fix any acceptance issues.
8. Only then prepare final `v3.0.1` release.

## Release rule

V2.6 remains the public stable fallback until every blocker above is complete.
