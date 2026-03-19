# Individual Question Bank

This page is the movie-first front-end translation of the canonical IOV wellbeing state.
The UI should stay simple, cinematic, and relatable while the backend mapping remains spec-aligned.

## How to use this bank

- **Short label**: compact UI label for a card, slider, or section
- **Plain-English question**: what the user actually sees
- **Backend mapping**: the canonical wellbeing variable(s) this question supports
- **Suggested UI text**: a movie-first tone that feels natural on the page

## Physiology

| Short label | Plain-English question | Backend mapping | Suggested UI text |
|---|---|---|---|
| Sound after-effect | Did the sound or loud scenes leave your ears ringing? | `~WellbeingProtocol > ~~Physiology > ~~~Movement / ~~~Rest` | “Did the film hit your body in a real way?” |
| Eyes adjusting | Did your eyes need time to adjust after stepping out of the dark theatre? | `~WellbeingProtocol > ~~Physiology > ~~~Rest` | “Did the movie leave you needing a moment?” |
| Still or restless | Did you feel like sitting still, shifting, or moving around during the film? | `~WellbeingProtocol > ~~Physiology > ~~~Movement` | “Was your body calm, tense, or restless?” |
| Breath pace | Did the movie change your breathing pace during tense scenes? | `~WellbeingProtocol > ~~Physiology > ~~~Breathwork` | “Did the film change your rhythm?” |
| Post-film cravings | Did you want junk food, tea, a cigarette, or a walk afterward? | `~WellbeingProtocol > ~~Physiology > ~~~Diet / ~~~Movement / ~~~Rest` | “What did your body ask for after the credits?” |

## Emotion + Feeling

| Short label | Plain-English question | Backend mapping | Suggested UI text |
|---|---|---|---|
| Mood residue | What stayed with you after the credits? | `~WellbeingProtocol > ~~Feeling` | “What stayed with you after the movie?” |
| Emotional tone | Did the movie leave you moved, calm, unsettled, angry, hopeful, or heavy? | `~WellbeingProtocol > ~~Feeling` | “What emotional weather did it leave behind?” |
| Lingering feeling | Did the feeling fade quickly or stay through the day? | `~WellbeingProtocol > ~~Feeling` | “Did the feeling leave quickly or stay in the room with you?” |

## Thought

| Short label | Plain-English question | Backend mapping | Suggested UI text |
|---|---|---|---|
| Opinion shift | Did the film break an old opinion? | `~WellbeingProtocol > ~~Thought > ~~~MentalModel` | “Did the movie change how you see things?” |
| Issue lens | Did it change how you think about India, Pakistan, violence, power, family, or justice? | `~WellbeingProtocol > ~~Thought > ~~~CognitiveState / ~~~MentalModel` | “Did it move your view on a bigger issue?” |
| Trust shift | Did it make you trust or doubt a trailer, tweet, review, or celebrity take more than before? | `~WellbeingProtocol > ~~Thought > ~~~CognitiveBias` | “Did the movie change what you believe?” |
| Decision shift | Did it change a decision you were already about to make? | `~WellbeingProtocol > ~~Thought > ~~~ThinkingSystem / ~~~MentalModel` | “Did the movie nudge a real choice?” |

## Habit

| Short label | Plain-English question | Backend mapping | Suggested UI text |
|---|---|---|---|
| Next action | Did the movie change what you wanted to do next? | `~WellbeingProtocol > ~~Habit > ~~~Cue / ~~~Routine` | “What did the movie make you want to do next?” |
| Share impulse | Did it make you want to post, talk, share, or rewatch? | `~WellbeingProtocol > ~~Habit > ~~~Reward / ~~~Consistency` | “Did it change your next habit?” |
| Routine shift | Did it shift your evening routine? | `~WellbeingProtocol > ~~Habit > ~~~Routine` | “Did the movie nudge your evening off track or into a new rhythm?” |

## Performance

| Short label | Plain-English question | Backend mapping | Suggested UI text |
|---|---|---|---|
| Focus | Did the film affect your focus? | `~WellbeingProtocol > ~~Performance > ~~~LearningOutput / ~~~SkillApplication` | “Did it sharpen your attention or scatter it?” |
| Energy | Did it energize or drain your work, study, or creative output? | `~WellbeingProtocol > ~~Performance > ~~~LearningOutput / ~~~EarningOutput` | “Did the film help your day or slow it down?” |
| Day quality | Did the rest of your day feel easier or harder? | `~WellbeingProtocol > ~~Performance > ~~~CommunityContext` | “What kind of day did the movie leave you with?” |

## Suggested page flow

1. **Start with a quick vibe check**
2. **Ask the body questions first**
3. **Then ask what changed in mood and thinking**
4. **End with habit and performance**
5. **Show the result as a movie-value summary**

## Tone rules

- Keep the copy short
- Make the questions feel like post-movie reactions, not a survey form
- Avoid technical language on the page
- Keep the mapping invisible in the UI, but exact in the data model
- Make the whole thing feel like a fun India-first movie reflection, not an academic instrument
