---
title: "Before Changing Code, I Made the Decision Clear"
description: "I restored a broken CMS data rule and turned a 30-sheet portal request into clear choices about scope and ownership."
published: 2026-08-19
tags: [Staff Engineering, Incident Response, Decision Making]
problem: "One problem needed a fast service recovery. The other had no clear scope or owner."
decision: "I checked the CMS data rule before changing code. For the portal, I reviewed 30 tabs before asking teams to choose the scope and owner."
outcome: "The CMS recovered with a small change. The portal gained seven targets, an owner, and a phased launch plan."
draft: false
---

A staff engineer does not only solve hard technical problems. The work also includes unclear decisions. This happens when no one knows if code or data is broken. It also happens when many teams cannot agree on scope and ownership.

I faced both types of problems recently. In a CMS incident, I found a required system rule and made a small repair. In a support portal project, I changed unclear work into material that teams could review and decide on.

## Case 1. CMS 500 error: Find the broken rule

The live CMS returned a 500 error for every image upload. Editors could not publish new content. The operations team needed a fast recovery.

It was easy to suspect the upload code or a recent release. However, a quick code change could hide the real problem. I first checked the data structure that Wagtail needs for image storage.

Wagtail needs a top-level Collection node. This root record was missing after a database migration. The application code was working. A required part of the data structure was missing.

### Choose the smallest recovery path

There were two choices. I could add special code and deploy it. I could also restore the missing data. The cause was clear, so I did not change the application.

I restored the root Collection record with SQL. I then checked image uploads again. This kept the change small and avoided a new application release.

After recovery, I added root Collection creation to the database setup process. The incident showed a rule that the system must always keep. The setup process now includes that rule.

## Case 2. A 30-sheet portal request: Prepare the decision first

The second problem was a request for an internal support portal. Work was spread across 30 spreadsheet tabs. The request also included data links, customer data, login, and access control. No one had chosen the development team.

Choosing an owner first would not solve the problem. Each team could imagine a different product. I needed to make the work clear before asking for a team decision.

### Change work data into system boundaries

I opened all 30 tabs. I removed copies, old versions, and repeated items. I grouped work that could be automated and work that still needed human judgement. This reduced the real migration targets to seven.

I then changed the list into menu groups and features. The result showed which parts belonged in the main customer system. It also showed which parts could stay in a smaller tool. Existing services were included in the review.

I used this material to ask two clear questions. Which team should own development? Should we build one full system now, or start with a smaller first launch?

The business team took ownership. For the first launch, existing services would be linked from one place. Full integration would happen later. The decision was possible because the scope and choices were visible.

## The output was more than a fix

| Area | CMS incident | Support portal |
| --- | --- | --- |
| First view | Image upload returned 500 | Move 30 sheets to the web |
| What I checked | A required Wagtail data rule | Real work and feature boundaries |
| Action | Restore the missing root data with SQL | Prepare menus, features, and launch choices |
| Result | Service recovery and a better setup process | Seven targets, one owner, and a first launch plan |

In the CMS case, I reduced technical uncertainty. In the portal case, I reduced uncertainty between teams. The tools were different because the problems were different.

I do not want to turn two cases into a general method. I can only describe what I did. I did not accept the first symptom or request as the full problem. I checked the facts that blocked the next decision. I chose a small next step. I also left an output that other people could use later.

For me, this is an important part of staff engineering. The goal is not to solve more problems alone. The goal is to help technical systems and teams make better decisions.
