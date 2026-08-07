---
title: "Setting Safe Limits Before Moving Internal Bots to the Cloud"
description: "How I chose network access and isolation when moving internal bots from a small office computer to the cloud."
published: 2026-08-06
tags: [ProblemSolving, Cloud, Security, Operations]
problem: "Internal bots needed more stable hosting without more public access or direct human access."
decision: "I used the existing cloud system with outgoing connections, central access control, and a separate network area."
outcome: "The new plan keeps access records and separates the bots without adding a public entry point."
draft: false
---

Several internal bots were running on one small computer. They worked, but the setup was not good for stable service all day.

Moving them to the cloud was more than moving files. It was a chance to set better rules for network access, human access, and separation from other systems.

## What was the problem?

The main question was not where the server should run. We needed to decide how the bots would connect to an outside service.

We also needed safe access for operators. Finally, the bots had to stay separate from other cloud systems.

## How I compared the choices

The first choice was about incoming traffic. Opening a public port would need firewall rules, login checks, and regular monitoring. A setup mistake could create a new risk.

I chose a model where each bot starts an outgoing connection. It receives events through that connection. The bots can work without a new public entry point.

I also looked at data storage. A separate database has useful features, but it adds passwords, cost, and more ways to fail. The bots held only a small amount of data, so local JSON files were enough for now.

## What I chose and did

For staff access, clear records were more important than easy access. Personal SSH keys are simple, but they are harder to manage and review.

I chose the cloud provider's central login and remote access tools. This keeps access rights and activity records in one place.

I also compared a new network with the existing network. A new network gives a strong boundary but adds more work. I chose the existing network and placed the bots in a separate area inside it.

## What happened and what remains

The plan does not expose the bots directly to the internet. Staff access is recorded, and the bots stay separate from other systems.

Local file storage still fits the current size. We should review this choice if the data grows or if several bot servers need to share it.

## What I will do next time

When a small tool becomes a regular service, I will not only move the program. I will also review every network path, human access method, and system boundary.

Keeping only needed access makes the service safer and easier to run.
