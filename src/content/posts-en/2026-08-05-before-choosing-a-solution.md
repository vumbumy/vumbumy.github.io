---
title: "What to Clarify Before Choosing a Solution"
description: "Why scope, ownership, and verification criteria should be written down before comparing solutions to a complex work problem."
published: 2026-08-05
tags: [ProblemSolving, DecisionMaking]
problem: "Solutions often appear quickly even when the scope of the problem and the boundaries of responsibility remain unclear."
decision: "Before implementation, I write down the affected systems, ownership boundaries, and the evidence needed to call a change safe."
outcome: "The basis for discussion and verification becomes clearer, and there is a known point to return to if the change fails."
draft: false
translationSlug: "첫-기록"
---

At work, a solution often comes to mind before the problem itself is clear. In those situations, the most costly mistake is not choosing the wrong answer. It is defining the wrong boundary around the problem.

## Redefining the problem

Before comparing solutions, I need to know who will be affected, who can make the decision, and what must be verified. Technical choices should be made within those boundaries.

## How I compare the options

When a problem is complex, I write down three things before discussing implementation:

1. Which people and systems will this change affect?
2. Where does my authority end, and where does another team's responsibility begin?
3. What evidence would let us say the decision was safe?

Even this short exercise makes requests more concrete and meetings shorter. It also reveals the point to which we can return if something goes wrong.

## The decision and implementation

Waiting until every uncertainty is resolved means never beginning. Instead, I test within a small boundary and keep the existing path available. I also preserve a way back to the original state. In real systems, a safe experiment is often more useful than a perfect prediction.

## Outcome and remaining questions

These questions do not remove every uncertainty. They do make the unknowns visible and show when the next decision will be needed.

## A principle to carry forward

This blog is where I intend to record those choices, along with what only became clear afterward.
