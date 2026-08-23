---
title: "How I Rebuilt the Rules for Tracking AI Use"
description: "I aligned metrics and logs that covered different areas. I then set tracking rules for budget and seat planning, with clear limits for automation."
published: 2026-08-23
tags: [Problem Solving, AI Operations, Cost Management]
problem: "Metrics and logs covered different areas. I needed one tracking method that could support budget and seat planning."
decision: "I limited usage data to spending and cost decisions. I automated totals and advice, but left operating changes to people."
outcome: "I defined repeatable tracking rules and automation limits. Building the automation and setting seat and usage limits are still unfinished."
draft: false
---

I needed to use AI usage data for budget and paid seat planning. But I could not treat the numbers as performance.

The collected cost was not the amount actually paid. It was a spending estimate based on the price of API use. An API is a way for software systems to communicate.

The system also did not keep all user logs for a long time. I needed to keep tracking but limit its purpose to cost management. I also needed to separate automatic work from human decisions.

The first analysis found missing data. It counted user logs from only one environment. Use of the same tool in two other environments was missing.

The total usage data included all three environments. So, the user analysis and total usage covered different areas.

## The problem I owned

I needed to know how much each person used the tools. This was needed for budgets and paid seat changes.

High usage alone did not prove strong work performance. One day of data was also not enough for seat changes.

In the actual data, the same user moved between low and high levels on different days. Some teams were outside the data because remote tracking was not connected.

## Facts and limits I checked

The two data sources had different roles.

The metrics showed total cost and total tokens in a stable way. Tokens are small text units processed by an AI system. However, the metrics had no user details.

The logs included the user, request, model, and session. However, each request could only return a limited number of records. The logs were also kept for a short time.

To estimate each user's cost, I first calculated their share from log samples across several time periods. I then applied that share to the total metrics. This did not count every record.

The actual usage limit included with each seat was also not a public fixed number. I needed to record when users reached the limit. I also needed their total spending up to that point.

Without this adjustment value, I could not confirm the budget for extra credits.

## The choice I made

In the tracking document, I treated usage as a spending measure, not a performance measure.

I used metrics as the source for each day's total. I used log samples to estimate each user's share.

For seat levels, I proposed using the average across recent working days over several weeks. I did not use one day's value.

I also separated the work that could be automated.

Repeated totals, unusual activity alerts, and seat change advice could be automated. Actions that directly affect people would still need a human decision.

These actions included seat changes, personal limit changes, and approval of extra credits.

## What I actually did

I separated the roles and limits of the two data sources. I also documented a process that others could repeat.

The process covered daily total usage, each user's share from log samples, and estimated monthly spending.

I also listed patterns that could increase cost. These included long input requests, heavy use of one model, and spending by session.

Based on the first missing-data case, I stated that user logs must not use one environment as a filter.

The logs are not kept for long. So, I recorded that weekly totals must be stored separately.

When a sample reached the query limit, the time range should be reduced. Another option was to average several smaller time ranges.

## Confirmed results and remaining work

I defined how to calculate usage again and how the results should be understood.

The same rules can now check total spending, each user's estimated share, and costly usage patterns.

I did not claim that usage proves work performance.

The system build and operating decisions are still unfinished.

An automatic dashboard and alerts need permission to write data. The weekly report and seat advice table are still being designed.

It is not decided who will approve credits. The review period for lowering a seat is also not decided.

It is also unclear who may see personal usage data. The measures for performance and completed checks remain an open question.
