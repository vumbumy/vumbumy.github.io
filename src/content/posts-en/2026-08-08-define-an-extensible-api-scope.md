---
title: "How to Set the Scope of API Requests That May Overlap"
description: "A review of how we agreed on the immediate scope and later expansion points when API requests from different groups might overlap."
published: 2026-08-08
tags: [Problem Solving, API Design, Scope Management]
problem: "We needed to avoid delay and duplicate work because the current request might overlap with an API another group was preparing."
decision: "We decided to start the current request as planned, check possible overlap separately, and confirm the detailed scope with the people involved."
outcome: "We set the direction for the first work, but the exact limits of added features and overlap still need discussion."
draft: false
---

## What was the problem?

The hard part of reviewing an API request is often its scope, not the development itself. At first, this request seemed to be for a second API supporting one work function. However, another related group was preparing a broader public API at about the same time. Starting without checking their scope could cause duplicate work.

Waiting until the full scope of the planned API was clear was also not suitable. The immediate need was clear. There were already possible future requests for status changes, holds, attached documents, notes, and comments. We needed to separate the current need from possible later growth.

At first, the problem seemed to be checking whether the two efforts overlapped. In fact, that was only one part. We needed to start the required work without delay. We also needed to decide where to check the boundary with the planned public API.

Adding every future need to the first scope would require designs for features that were not confirmed. But a very narrow scope could also cause later changes. These could happen when status changes, holds, documents, notes, or comments were added.

The goal was not to solve every future need in advance. It was to separate current decisions from points that needed more checking.

## How I compared the choices

One choice was to stop the current request and agree on the full public API scope first. The other was to begin with the requested scope as it was.

I used three main questions. Was the current need clear enough? Where could the work really overlap? How much could the features grow later?

The review showed that the current request could start as planned. However, there was not enough evidence to decide which parts matched the planned public API.

For this reason, I did not treat the start and the overlap check as one decision. We would start the current work and check the possible overlap separately.

## What I chose and did

I decided to start the current request as planned. We would review possible overlap with the other group’s API separately.

I did not widen the detailed scope without agreement. The people involved would confirm the exact feature boundary through later planning discussions.

I also kept future growth as a point for those discussions. I did not put every possible feature into the first scope.

The review needed to cover more than status changes and holds. It also needed to consider attached documents, notes, and comments. These features have different purposes.

## What happened and what remains

We agreed to begin the current request without stopping it. We also made possible overlap with the planned public API a separate review point.

This avoided two problems. We did not stop all work only because the final scope was unclear. We also did not build a broad API before checking the overlap.

There is still clear work left. We need to find where the two APIs actually overlap. We must also agree how much future growth the current structure can support.

The result was not a complete API design. It was a boundary for the next decisions.

## What I will do next time

For similar requests, I will separate the decision to start from the final scope decision. If the current need is clear, I will begin the required work. Possible overlap with another group’s plan will remain a separate check.

I will not use possible future growth as a reason to make the first scope larger. Instead, I will list the features that may be added. Then, the people involved can confirm whether they belong to the same API responsibility.

Good scope does not mean answering every question at the start. It means knowing what we can decide now and what still needs agreement.
