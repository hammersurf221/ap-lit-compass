# App Content Editing Guide

This guide is a complete manual for customizing your AP Lit Compass app. It explains how the app works, how to safely edit the text, and what every single editable field controls.

## Table of Contents
1. [How the Scoring Logic Works](#1-how-the-scoring-logic-works)
2. [The 4 Golden Rules of Editing](#2-the-4-golden-rules-of-editing)
3. [Section 1: General Branding & Navigation](#3-section-1-general-branding--navigation)
4. [Section 2: The Intro Screen](#4-section-2-the-intro-screen)
5. [Section 3: Assessment Screens (Parts A & B)](#5-section-3-assessment-screens-parts-a--b)
6. [Section 4: The Scoring System (Questions & Thresholds)](#6-section-4-the-scoring-system-questions--thresholds)
7. [Section 5: The Tie-Breaker](#7-section-5-the-tie-breaker)
8. [Section 6: The Results Screen (Archetypes)](https://www.google.com/search?q=%238-section-6-the-results-screen-archetypes)
9. [Troubleshooting & AI Assistance](#9-troubleshooting--ai-assistance)

---

## 1. How the Scoring Logic Works (Currently)

To understand how to edit the scoring, you first need to know how the app calculates the results.

### The Point System
* **Two Sections:** The app measures **Insight** (Part A) and **Mechanics** (Part B) separately.
* **5 Questions Per Section:** There are exactly 5 questions in Part A and 5 questions in Part B.
* **1 to 5 Scale:** Students rate each question from 1 (Disagree) to 5 (Agree).

### The Totals
Since there are 5 questions worth up to 5 points each:
* **Minimum Possible Score:** 5 (Student picked "1" for everything).
* **Maximum Possible Score:** 25 (Student picked "5" for everything).
* **Neutral Score:** 15 (Student picked "3" for everything).

### The "Threshold" (Why is it 18?)
To decide if a student is "High" or "Low" in a skill, the app uses a specific score threshold.

* **Current Setting:** 18
* **Why?** A score of 15 is neutral (average). To be considered "High," a student needs to score above average. A score of 18 means they averaged mostly 4s (Agree) on their answers.

**How the App Decides:**
1.  **High Insight:** Score is 18 to 25.
2.  **Low Insight:** Score is 5 to 17.
3.  **High Mechanics:** Score is 18 to 25.
4.  **Low Mechanics:** Score is 5 to 17.

### The Tie-Breaker
If a student is borderline (e.g., they score exactly 17), the tie-breaker question gives them bonus points (usually +1 or +2) to push them over the line into a specific archetype.

---

## 2. The 4 Golden Rules of Editing

You do not need to know code to edit this file, but you must follow these syntax rules to keep the app from crashing.

**Rule 1: Use "Straight Quotes" Only**
* The code only understands straight quotes: `"Text"`
* It breaks if you use curved/smart quotes: `“Text”`
* **Tip:** Don't copy-paste from Word. Type directly in the editor.

**Rule 2: Don't Touch the Labels (Keys)**
* In a line like `appName: "Mr. Shapiro's Class",` you can change the text inside the quotes (`"Mr. Shapiro's Class"`).
* **Never** change the label on the left (`appName:`).

**Rule 3: Respect the Commas**
* In lists (like questions), every line usually ends with a comma.
* If you see a red error line appear, check if you accidentally deleted a comma.

**Rule 4: Quotation Marks Inside Text**
* If you want to use a quotation mark *inside* your text, you must put a backslash before it.
* **Bad:** `text: "The teacher said "Good job" to me."` (The computer thinks the text ended at 'said').
* **Good:** `text: "The teacher said \"Good job\" to me."`

---

## 3. Section 1: General Branding & Navigation

Locate the `APP_CONTENT` section at the top of the file. This controls the interface text.

**`general`**
* `appName`: The main title at the top left of the screen (e.g., "Mr. Shapiro's AP Lit Compass").
* `appTagline`: The small text underneath the title (e.g., "Diagnostic Tool").

**`nav`** (Navigation Bar)
* `sectionPrefix`: The text before the current step name (e.g., "Section:").
* `labels`: These are the names of the three progress steps shown in the top right.
    * `intro`: Name for the start screen (e.g., "Overview").
    * `assessment`: Name for the question screens (e.g., "Assessment").
    * `results`: Name for the final screen (e.g., "Analysis").

---

## 4. Section 2: The Intro Screen

These fields control the very first page the student sees.

**`intro`**
* `pill`: The small, rounded tag above the big title (e.g., "Self-Assessment").
* `titleNormal`: The first half of the main headline (e.g., "Find your").
* `titleItalic`: The second half of the headline; this part appears in *italics* (e.g., "literary archetype.").
* `description1...`: The first paragraph is split into parts so distinct words can be bolded.
    * `description1Start`: "Success requires..."
    * `description1Insight`: The word "Insight" (Appears Bold).
    * `description1And`: The word "and".
    * `description1Mechanics`: The word "Mechanics" (Appears Bold).
* `description2`: The second paragraph of text.
* `button`: The text inside the "Start" button.
* `timeEstimate`: The small text under the icon (e.g., "Est. 2 Minutes").

---

## 5. Section 3: Assessment Screens (Parts A & B)

These fields control the titles and buttons on the question pages.

**`partA` (Insight Section)**
* `pill`: Small tag above title (e.g., "Section 1 of 2").
* `title`: The main header (e.g., "The Insight Scale").
* `nextButton`: Text for the button to go to the next page.

**`partB` (Mechanics Section)**
* `pill`: Small tag above title (e.g., "Section 2 of 2").
* `title`: The main header (e.g., "The Mechanics Scale").
* `backButton`: Text for the "Go Back" button.
* `nextButton`: Text for the button to finish the quiz.

---

## 6. Section 4: The Scoring System (Questions & Thresholds)

**The Threshold**
Look for `export const THRESHOLD = 18;`.
* Change this number to adjust difficulty.
* Higher number (e.g., 20) = Harder to get "High" status.
* Lower number (e.g., 15) = Easier to get "High" status.

**The Questions (`QUESTIONS_PART_A` & `QUESTIONS_PART_B`)**
These are lists of questions. Format:
```typescript
{ id: 1, text: "Your question goes here." },

```

* **What to edit:** Just the text inside the quotes.
* **What NOT to edit:** The `id: 1` part. The app relies on these IDs to save the answers.

---

## 7. Section 5: The Tie-Breaker

This section (`tiebreaker` in `APP_CONTENT` and `TIE_BREAKER_OPTIONS`) appears if a student is borderline.

**Text Labels (`tiebreaker` section)**

* `title`: Header text (e.g., "One Last Thing...").
* `question`: The prompt text (e.g., "Which comment sounds most familiar?").

**The Options (`TIE_BREAKER_OPTIONS`)**

* `text`: The answer choice the student clicks.
* `adjA`: Points added to **Insight** if they choose this.
* `adjB`: Points added to **Mechanics** if they choose this.
* *Positive numbers (+1, +2)* increase the score.
* *Negative numbers (-1, -2)* decrease the score.


* `type`: Just a label for your reference (e.g., "Philosopher Bias"). It doesn't appear on screen.

---

## 8. Section 6: The Results Screen (Archetypes)

This controls the final dashboard.

**General Labels (`results` in `APP_CONTENT`)**

* `headerPill`: Tag at the top (e.g., "Diagnostic Complete").
* `exploreLabel`: Text instructing them to click other quadrants.
* `footerIconText`: The disclaimer at the bottom.
* `axis`: These control the labels on the 4 sides of the compass chart.
* `yTop` / `yBottom`: Vertical axis labels.
* `xRight` / `xLeft`: Horizontal axis labels.



**The Archetype Profiles (`ARCHETYPES`)**
This is the big block of data defining the 4 personalities.

* `name`: The large title (e.g., "The Philosopher").
* `tagline`: The subtitle (e.g., "High Insight, Lower Mechanics").
* `resultTitle`: The header for the description box.
* `resultQuote`: The "inner monologue" quote.
* `diagnosis`: The "Here is what you are doing" paragraph.
* `prescription`: The "Here is what you need to do" paragraph.
* `approach`: The long, detailed explanation paragraph.
* `strengths`: A list of 3 bullet points.
* Must be formatted like: `["Strength 1", "Strength 2", "Strength 3"],`


* `weaknesses`: A list of 3 bullet points.
* Must be formatted like: `["Weakness 1", "Weakness 2", "Weakness 3"],`



**Fields to IGNORE in Archetypes:**
Do not change these, as they control colors and icons:

* `id`
* `icon`
* `color`, `bg`, `borderColor`, `iconColor`

---

## 9. Troubleshooting & AI Assistance

### Manual Fixes

If the screen goes red/blank:

1. **Check Commas:** Did you remove a comma at the end of a line in a list?
2. **Check Quotes:** Did you accidentally delete a closing quote mark `"`?
3. **Check Brackets:** Did you delete a closing bracket `]` or brace `}`?
4. **Undo:** Press `Ctrl+Z` (Windows) or `Cmd+Z` (Mac) immediately to go back.

### Using AI to Write Code

If you want to rewrite a question or a result but are scared to touch the code, copy the prompt below and paste it into ChatGPT, Gemini, or Claude.

**Prompt Template:**

```text
I am a teacher editing a configuration file for a Typescript web app.

Here is the current code file:
[PASTE THE FULL CONTENT OF compassData.ts HERE]

Please rewrite the code with the following specific changes:
1. Change Question 3 in Part A to: "[Insert New Question]"
2. Change the "Philosopher" archetype name to: "[Insert New Name]"
3. Change the "Prescription" for the Captain archetype to: "[Insert New Text]"

IMPORTANT:
- Return the full, valid Typescript code.
- Do not change any variable names, IDs, or structural syntax.
- Ensure all commas, brackets, and quotes are perfectly formatted.
- Only change the text content I requested.
- Explain the changes you made and why so that I can make them on my own.

```

```

```