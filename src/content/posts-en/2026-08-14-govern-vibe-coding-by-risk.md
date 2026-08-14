---
title: "Risk-Based Guardrails for Fast Vibe Coding"
description: "A review of how platform support can change based on risks in data, access, and ownership, while keeping the speed of vibe coding."
published: 2026-08-14
tags: ["Problem Solving", "Platform Governance"]
problem: "How can we manage sensitive data, access rights, and service ownership without controlling all vibe coding?"
decision: "Separate migration targets by user-facing screens and data sensitivity. Apply platform guardrails and pre-release reviews to high-risk services."
outcome: "The risk levels and migration order are set. Standard repositories, login links, and step-by-step migration still remain."
draft: false
---

Business teams were already building work screens and automation with spreadsheets and script tools. They could keep using familiar data and development methods. This helped them respond to needs quickly. It also kept more work context than having the platform team build every request.

Vibe coding was not the problem. One reviewed service handled employee names, teams, and work status. However, it had no separate login or role control. Anyone who opened it could edit the data. Its operating data and service ownership were also tied to a personal account. Other cases showed similar risks. Some release setups could bypass login checks in the code. They could also expose source data without login.

Stopping all vibe coding would reduce immediate risk. However, it would also remove the speed and freedom of business teams. The main question was not whether to ban it. The question was where to divide responsibility between business teams and the platform team.

## What was the problem?

At first, this looked like a problem with weak code. However, adding a login function was not enough. Protection could still fail if release ownership or access scope was wrong.

We also discussed moving only the data store. However, the old user screen would still remain. The risks of bypassed login and access without permission would also remain.

I therefore defined the problem as an operating structure issue, not a code quality issue. The key questions were clear. Who owns the service? Which identity can access the data? Who handles access changes and incidents after release?

Training and code reviews alone could not keep these responsibilities clear over time.

## How I compared the choices

The most useful test was whether people opened the screen in a browser. Automation inside a spreadsheet could stay within existing sharing rights. This included calculations and organising responses. That type of automation could remain.

A screen opened by users needed a separate login boundary.

The level of platform support depended on data sensitivity and write access. Low-risk tools could use automatic registration and checks after release. This would reduce the review burden.

Services that showed or changed sensitive staff data needed stronger controls. They required a review before release, a clear user list, and records of user actions. Blocking outside access could help. However, it could not replace login and role checks.

## What I chose and did

We decided to limit script tools to automation inside spreadsheets. High-risk screens opened by users would move to a standard environment.

The first migration target was an existing screen that showed and edited personal data. We did not decide to remove all automation at once. Only parts at the security boundary would move. These included user screens and server-side processing.

We also proposed a starter repository with safe settings already prepared. It would include login, server-only data access, and a service account with read-only access. A service account is an account used only by the service. The repository and release path would belong to the organisation.

Business teams could build screens and work features inside this structure. New data links or access changes would need a platform review.

However, the first repository has not yet been provided. The detailed link to the login system is also not complete.

## What happened and what remains

The review made the separation rules clearer. We can now decide which services should move and which can stay.

We do not need to reject all current development methods. We also have a clear reason for deeper platform support for sensitive user-facing services.

We set another boundary for data. Source data should remain read-only. Separate storage should hold operating data such as requests, status, and history.

More work remains. Moving several screens at once is difficult. Migration should start with screens that are both sensitive and often used.

We must also check whether the login system can provide role and department details. During implementation, we must test another access rule. People building the service should not need to see real data values.

## What I will do next time

The best way to protect speed is to prepare a safe default path. Removing reviews is not the answer.

If every team designs login, data access, and release ownership again, the same risks will return. The platform should provide these parts by default. Business teams can then focus on their work needs.

The level of platform support should depend on service risk, not developer skill. I will first check whether it is automation or a user-facing screen. I will then check whether access is read-only or allows changes. I will also check how sensitive the data is.

Low-risk tools should not face heavy controls. When risk becomes higher, the platform should take back operating responsibility.
