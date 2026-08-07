---
title: "Turning an Ambiguous Request into an Executable Scope"
description: "A retrospective on translating a manual-work migration request into concrete requirements, a smaller scope, and a staged rollout."
published: 2026-08-06
tags: [ProblemSolving, Requirements, ScopeManagement]
problem: "A request existed to move manual work into a web service, but neither the true migration scope nor the definition of done was clear."
decision: "I inspected actual usage, reduced the scope, and separated a fast first release from the deeper integration that would follow."
outcome: "The migration scope narrowed to seven active areas, with clear ownership and an agreed staged release strategy."
draft: false
---

The request sounded straightforward: move work managed manually into an internal web service. The direction was clear, but the boundary was not. The source contained thirty tabs, and the request also mentioned integrations with other internal services. Starting from that sentence alone might have produced screens quickly, but the scope and the definition of done would have kept moving.

## Redefining the problem

I first rewrote the request as separate capabilities: database storage, continued manual entry, customer-system integration, attendance data, single sign-on, and role-based access. The phrase “build one portal” contained several different questions about where data came from, which existing workflows should remain, and who could access what. Once separated, it became easier to distinguish implementation work from decisions that required other teams.

## How I compared the options

Ownership had to be decided early as well. We needed to choose between a support group and the team building the service directly. The eventual split assigned infrastructure and runtime support to one group while leaving product development with the team closest to the request. This was more than task allocation: it established who would judge future changes and where operating responsibility would sit.

## The decision and implementation

Inspecting the source material directly was the most effective way to reduce the scope. The thirty tabs included empty sheets, copies, and old versions. Treating every title as a migration target would have recreated work that no longer mattered. Reviewing actual usage reduced the real migration set to seven items. I also checked how three existing services and their development data were organized, avoiding a design that discovered integration constraints only after the new interface was built.

Rather than integrate everything at once, I separated the first release from later work. The initial version would gather access to existing systems in one place through links, while data-level integration would proceed in stages. Waiting for authentication, permissions, and every data connection would delay all value. But treating a link directory as the final product would fail to reduce manual work. The quick release therefore remained an explicit intermediate step, with the remaining integration scope recorded separately.

## Outcome and remaining questions

The target was narrowed from thirty nominal tabs to seven areas that were actually in use. Infrastructure support and service-development responsibilities were separated, and the first release focused on bringing existing access paths together. Authentication, authorization, and deeper data integration remain as follow-up work.

## A principle to carry forward

Clarifying an ambiguous request is not the same as writing a longer requirements document. It means checking real usage, reducing the scope, assigning responsibility, and separating immediate value from integration that still needs to happen. A quick first release is useful only when the next boundary is just as explicit.
