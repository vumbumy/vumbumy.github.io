---
title: "Setting Boundaries Before Moving Internal Bots to the Cloud"
description: "How I chose connectivity, access controls, and network isolation while moving internal bots off a small on-premise machine."
published: 2026-08-06
tags: [ProblemSolving, Cloud, Security, Operations]
problem: "Internal bots needed more reliable hosting without increasing public exposure or unmanaged human access."
decision: "I reused the existing cloud environment while requiring outbound-only connections, centralized access, and an isolated network segment."
outcome: "The operating model gained traceable access and resource isolation without adding a new public entry point."
draft: false
---

Several internal automation bots were running on a single small machine. They worked, but the setup was not ideal for dependable, around-the-clock operation. Moving them to the cloud was not just a change of location. It was an opportunity to redraw the boundaries around connectivity, access, and isolation.

## Redefining the problem

The real question was not where the server should run. We needed to decide how it would communicate with an external platform, how operators would reach it, and how strongly it should be separated from other cloud resources.

## How I compared the options

The first decision concerned inbound traffic. Opening a port for incoming events would create another surface that needed firewall rules, authentication, and continuous monitoring. A configuration mistake could also introduce a new risk. I therefore chose a model in which the bot initiates an outbound connection and receives events through that established channel. It preserves the required functionality while avoiding another public entry point.

I applied the same reasoning to storage. A separate database would offer stronger management and scaling features, but it would also add credentials, dependencies, and failure modes. The state these bots held did not justify that cost, so local JSON files were sufficient for the current scope. Simplicity can be an operational advantage when the scale is genuinely small.

## The decision and implementation

For administrative access, traceability mattered more than convenience. Personal SSH keys are familiar, but they make consistent auditing and key lifecycle management harder. Instead, access would go through the cloud provider's centralized identity and remote-management controls, so that permissions and activity could be recorded in one place.

I also compared a new network with reuse of the existing one. A separate network creates a clearer boundary but introduces more infrastructure to operate. Reusing the existing network reduces that overhead but can blur separation from other workloads. The compromise was to reuse the existing environment while placing the bots in their own isolated segment.

## Outcome and remaining questions

The chosen design receives the events it needs without exposing the server directly to the internet. Operator access is recorded through the centralized identity system, and the bots run in a segment separated from other resources. Local file storage remains a decision tied to today's scale; it should be revisited if state grows or multiple instances must coordinate.

## A principle to carry forward

The essential part of this migration was not choosing a server location. It was deciding which connections to permit, how to record human access, and where to draw the boundary around other resources. Once a small automation tool becomes an ongoing service, moving the process alone is not enough. Keeping only the necessary entry points and making the operating boundary explicit makes everything that follows easier to manage.
