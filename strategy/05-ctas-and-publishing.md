# CTAs and publishing

## One ask per video

The asks a business can make, and which fits where, are written in `channels.md` ("CTA per channel") by the `define-channels` guide, from what `profile.md` says a video should cause. The pattern:

| Viewer | Ask | Where it points |
|---|---|---|
| The peer, on own channels | Try it / book it / come in | the product page, the booking page, the shop |
| The peer, in a group or community | Read the guide / ask me below | a guide page; the comments (never a product pitch in a group) |
| The public | Show this to someone who [does the thing] | share |
| Organisations and decision-makers | Talk to [owner] | the owner's contact, LinkedIn |
| A specific local audience | Book a visit / a slot / a call | the booking page |

Rules:

- One ask. Spoken and on screen in the last five seconds. Never two.
- The CTA matches the primary channel named in the brief. A product CTA inside a community group gets the post removed and the business distrusted; a guide CTA on own channels wastes the view.
- Price is a fact that may sit in a caption; it is not an ask and not a hook. The one place price is explained is the offer / pricing explainer type (`08-video-types.md`). A trial ("free for the first month") is allowed as an ask because it is an action.
- A share ask ("show this to someone who…") names the someone.

## Captions

First line repeats the hook. Second line is the signature. Then one or two sentences and the link or share ask. Three lines minimum, five maximum.

```
<hook>
<signature>
<one or two sentences: what the video showed, in the business's voice>
<link or share ask>
```

Example (a how-to for the commuter group):

```
Your chain is a wear item. Nobody told you, so here's the thirty-second check.
I fix bikes for a living. Probably yours.
Measure it with a gauge; at 0.5 % (11-speed) or 0.75 % (fewer gears) the chain is done. Change it on time and the cassette lasts about three chains instead of one.
The full check is on the site. Ask me anything below.
```

Floors inherited from the edit laws: 1–3 sentences after the signature, postable as-is, specific (no "excited to share", no "we are thrilled"), tone-matched to the video and the voice file. One canonical caption per video in `output/caption.txt`; platform variants, if needed, in a separate note.

## Hashtags and keywords

Few and accurate. `channels.md` holds a pool per channel; three to six per post. Do not hashtag the business's own name until there is enough content for the tag to be worth clicking.

## Distribution line

Every brief carries one distribution line, settled at the brief summary ("Why now") and repeated in the publish block:

```
Distribution    <primary channel> · also: <reposts / cuts> · shared by: <who carries it into a group or organisation>
```

The channels and the rules for each come from `channels.md`; the mapping from pillar to channel from `pillars.md`. One video, one primary channel. Everything else is a repost of the same cut or a cut from the set (`04-formats.md`). Log each channel as its own row in `PERFORMANCE.md`.

## When to publish

The calendar in `calendar.md` sets the rhythm: the business's seasonality, key dates and launches, or a plain cadence the person can sustain. Inside a slot, alternate pillars (and tracks, if there are two) so no channel sees three of the same in a row. Shoot in season, publish out of season where the material allows; footage is the scarce thing.

## Languages

Anything aimed at a group, organisation or audience in another language gets subtitles in that language at minimum; `channels.md` names the languages. A character carries across languages better than a talking head does, so a voiced variant is worth considering where a character exists.

## The publish block (in every brief)

```
PUBLISH — <ID>
Caption          <the four lines above>
Hashtags         <3–6>
Poster           <the settled moment, at NN.N s; baked as frame 0>
Distribution     <primary> · also: … · shared by: …
Set              <for long form: the shorts, stills and cuts this source yields>
Log              <PERFORMANCE.md rows to create: one per channel>
```
