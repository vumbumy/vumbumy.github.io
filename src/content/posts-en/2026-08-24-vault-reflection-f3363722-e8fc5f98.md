---
title: "Why I Kept a Real-Time Dashboard Away from the Live System"
description: "A record of choosing a data path that could provide live metrics to several teams without adding load to the live system"
published: 2026-08-24
tags: [problem-solving, data-design]
problem: "I needed to provide customer management metrics to real-time dashboards without increasing load on the live system."
decision: "I chose a data path where the dashboards read metrics from a reporting database instead of calling the live system."
outcome: "I linked each metric to its data source and status value, then chose the reporting database path. Some metric definitions and access rights are still not confirmed."
draft: false
---

Two real-time dashboard requests came in for an internal customer management system. One team wanted a combined view by group. Another team wanted live sales results. My task was not to build the screens. I needed to decide where to read the metrics and how to provide them.

If the dashboards kept querying the live system, their use could add load to it. Using the reporting database avoided this risk. However, I first had to match each metric with the correct data and status value. Different teams also used some metrics with different meanings.

## The problem I owned

I was responsible for providing the customer management metrics needed by both dashboards. The existing dashboard system already handled call metrics. I had to separate the data our system should provide from data handled elsewhere.

I also needed to keep the dashboards separate from the live system. More dashboard views should not create direct calls to the servers that handle customer management work.

## Facts and limits I checked

I first reviewed the provided static screen designs and the existing dashboard code. I then examined the customer management code indirectly. This helped me link each requested metric to its source table and status value.

I found that some terms could have different meanings. For example, one sales metric could mean a waiting request or a waiting application. This was not decided. Each meaning would count different records, so I could not start writing code.

Access to the reporting database was also not ready. We still needed to define links between groups and users. Access scopes for people with management responsibility and other users also needed agreement.

## The choice I made

I chose to provide data from the reporting database, not the live system. The reason was clear. Dashboard traffic should not affect the servers that handle customer management work.

A separate layer would handle screen display and combine data from several sources. The customer management side would focus on providing confirmed metrics through an API. I did not make guesses about metrics that still had conflicting definitions.

## What I actually did

I listed the required metrics from both screen designs and the existing code. In the customer management code, I found the source table and status value for each metric. I also separated areas already handled by another system, such as call metrics.

I prepared questions needed to confirm the metric definitions. For the unclear sales metric, I left the exact status as an open issue. The related teams still need to confirm which status should be counted.

## Confirmed results and remaining work

We decided to provide metrics through the reporting database without calling the live system directly. Code analysis also linked each metric to its data source and status value.

API work has not started yet. We need access to the reporting database before planning the connection. Some metric definitions are still unclear. Links between groups and users and differences in access rights also remain open. These points must be confirmed before we can check whether the totals match the requested dashboard views.
