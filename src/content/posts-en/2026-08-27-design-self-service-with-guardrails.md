---
title: "The Boundary Between Custom Landing Pages and a Shared Base"
description: "I kept page creation fast while placing data links and release rules in a shared base."
published: 2026-08-27
tags: [problem-solving, self-service, guardrails]
problem: "People needed to create campaign pages while keeping form data, tracking, and release quality consistent."
decision: "People could build page screens, while shared modules and automatic checks controlled forms, data transfer, tracking, releases, and repository access."
outcome: "I built a shared form package and a self-service repository base, then handed them over. The login design for sensitive data still needs confirmation."
draft: false
---

People needed a way to build campaign pages with AI coding tools and release them automatically. However, open page creation created some risks. Form data formats, source details, user tracking, and release steps could differ across pages. My task was to keep page creation open while moving repeated links into a shared base.

I separated page design from the parts that needed shared control. People could build static pages. Reusable code and repository rules handled forms, data transfer, tracking, and release checks.

## The problem I owned

My work had two parts. First, I separated the existing contact form into a web component package. It could be used on any page.

Second, I built the base of a self-service repository. People could add campaign pages themselves. After building this base, I also handed it to the people who would manage it later.

## Facts and limits I checked

Each page needed more than a screen. The data sent to the contact system had to match. Source and campaign details also had to match. User action tracking and release paths needed the same rules.

The repository also needed access rules and required checks. If every page creator built these links again, pages could use different data formats and tracking methods.

## The choice I made

I separated the form from any specific screen technology. I built it as a standard web component.

Campaign pages could be made as static files. The repository included shared modules and tracking rules.

I did not leave releases and access control to manual work. I used an automatic release process, author checks, and code ownership rules.

People had freedom over page design. The shared base controlled data links, tracking, and release steps.

## What I actually did

I made the first version of the shared form package. I organised its property structure and added a catalogue with usage examples.

I also created a process that released the package automatically through a content delivery network. This network delivers files from shared servers.

The form began to detect its running environment from its address. I also improved the data sent to the contact system. It collected campaign details automatically and included source values and an extra summary field.

I added shared design and data connection modules to the self-service repository. I made a tracking setup function and automatic tracking through HTML properties. These became the default settings. I also wrote a creation guide.

I set up automatic checks, author checks, code ownership rules, and team access mapping. I moved the paths of existing pages and added permanent redirects. I then handed the system over.

## Confirmed results and remaining work

The shared form package and its automatic release process were completed. The self-service base included tracking rules and repository guardrails. The handover was also completed.

The source did not confirm page creation results or operating measures. I have not reported them as results.

A starter kit for internal tools that handle sensitive data is still in the design stage. The plan is to check login access on every path. Data access would also be limited to the server.

The login connection method is still waiting for confirmation. The first repository has not been created. Therefore, I cannot say that login access has been applied or tested.
