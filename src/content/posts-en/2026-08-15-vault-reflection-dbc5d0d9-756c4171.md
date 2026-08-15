---
title: "What Must Come Before a Real-Time Dashboard"
description: "This article looks at system load and unclear metric definitions when combining data from several systems."
published: 2026-08-15
tags: [Problem Solving, System Design, Data Governance]
problem: "We needed a dashboard structure that would protect core systems and keep shared metrics consistent."
decision: "The dashboard would read from a reporting data store instead of core systems. Metric definitions and ownership rules must be agreed first."
outcome: "We chose a separate read path and listed the data to check. Metrics, access rights, and integration remain undecided."
draft: false
---

A request for an internal dashboard first looked like a simple move from a mockup to a live service. However, the mockup mixed values from different systems. These included support status, attendance, sales results, and team mapping.

Building the screen was not the first task. We first needed to decide who owned each value. We also needed to understand how data requests could affect core work.

The request for real-time data made the problem harder. Regular queries to systems handling support and contracts could slow their main work. Reading copied data would reduce this load. However, copied data may be delayed or use different definitions.

This was not only a choice about system connections. It also set the limits of operational responsibility.

## What was the problem?

The main question was not where to build the dashboard interface. We needed a safe way to read shared data without harming core systems.

Support status was in the call system. Attendance was in the staff system. Results and work hours were in the customer management system. Team and customer mappings also needed separate management.

No single system could serve as the only trusted source.

Metrics with the same name also had different meanings. An existing report and the new dashboard used different states for successful acquisition. The base value for cancellation rate was not set. The scope of margin was also unclear.

Starting development in this state carried a risk. Quickly built numbers could make different views across teams harder to change.

## How I compared the choices

There were two choices. The dashboard could query core systems directly or read from a reporting data store.

Fresh data was not the only factor. We also considered the load on support work and how far failures could spread. Other factors included reuse of metric definitions and responsibility for data quality and update timing.

Direct queries provide a shorter path. However, dashboard use would then affect the capacity of core systems.

A reporting data store can separate the reading load. However, someone must manage update schedules and missing data.

In this case, second-by-second updates were less important. Stable core work and consistent metric definitions had higher priority.

## What I chose and did

I chose to separate the dashboard from core systems. It would read from a reporting data store instead.

A cache could be added before the data store if needed. The customer management system would only send data to the store.

Actual integration has not started because access rights are not yet available.

Before integration, I mapped the questions behind each metric. These covered work status, reference time, owner, and product group.

This was not a final design. It made the open questions clear for the related teams and data owners.

Existing call metrics were kept as possible reusable data. This could also avoid building the same logic again.

## What happened and what remains

We agreed on the direction of separating the read path from core systems. We also listed possible data fields in the reporting store.

The service has not been provided, and there are no performance results yet.

The main open issue is the meaning of each metric. The requesting teams and data owners must agree on several points.

They must define which work states count as successful acquisition. They must also define the base for cancellation rate and the margin formula. Ownership rules for cross-sales are still unclear.

Access limits for each centre and each role also remain open.

The reporting store needs a clear update schedule. Someone must also take responsibility for missing data. Without these decisions, the design cannot be operated safely.

## What I will do next time

When one screen combines several systems, I will define the numbers before the connections.

Each metric needs an agreed name, formula, reference time, owner, exception rule, and data owner. After that, we can decide how fresh the data must be.

A separate read path protects core systems. However, someone must still manage delays and quality in copied data.

Moving the load does not remove responsibility. Code can often be changed. A number accepted as an organisation-wide standard is harder to reverse.
