---
title: "Turning team-built tools into services the company can operate"
description: "Moving consultation and site systems while handling data review, live intake, notifications, and an existing reporting bot."
tags: [ax, service-operations, system-migration]
problem: "The move had to cover data entry rules, customer intake, notifications, and automation that depended on the old systems."
decision: "I separated data review from the live switch and handled the final copy, intake, notifications, and old links together."
outcome: "The live switch is complete. Review, stabilization, contract-message integration, and the reporting bot still need follow-up."
published: 2026-11-06
draft: false
---

I moved the customer consultation and site management systems into one workspace. Along with consultation records, attachments, and site information, I moved customer intake and notifications to the new system.

My work did not end with building new screens. I also had to set when business staff should stop using the old system, when they should check the copied data, and when the new system should start receiving live work.

As the AX Builder team lead and a member of the CTO staff, I often face this kind of request. Helping business staff build a tool and making that tool ready for continued business use are parts of the same job.


<figure class="article-figure">
  <a href="/images/articles/2026-11-06-turn-team-tools-into-operated-services.en.svg" target="_blank" rel="noopener noreferrer" aria-label="Open full-size diagram">
    <img src="/images/articles/2026-11-06-turn-team-tools-into-operated-services.en.svg" alt="Separate data review from the live switch. Copy and review: Keep live work in the old system → Live switch: Stop edits; move data, intake, notices → Follow-up: Review old bots and pending links. Live switch complete; review and some links pending" width="760" height="700" loading="lazy" decoding="async" />
  </a>
  <figcaption>Separate data review from the live switch — Live switch complete; review and some links pending</figcaption>
</figure>


## I separated data review from the live switch

First, I copied the existing data into the new system and asked business staff to check it. I asked them to open familiar customers and sites, check the attachments, and confirm access to the menus they needed.

The new screens were available, but they were not ready for live work yet. Customer requests still went to the old system. The source data kept changing during the review.

I made the usage rules clear. Staff should keep working in the old system and use the new one only for review. I explained that the final move would copy the old data again, so edits made in the new screens would not remain.

Without this rule, staff would have to decide which system to update. Developers would also lack a clear source for the final data copy.

## I switched data entry, intake, and notifications together

Before the final move, I asked staff to stop entering and editing data in the old screens. I also warned that changes made after the work started might not be included.

The move covered paths outside the screens. Customer intake, customer messages, Slack notifications, and scheduled notices all depended on the old system. If those paths stayed unchanged, new requests could still arrive in the old system, or a notification could take staff back to an old screen.

After the final data copy, I switched intake and notifications to the new system. I also made old addresses and links in earlier notices lead to the new screens. I told users where to go, where to report access problems, and which connections were still unfinished.

## A separate reporting bot stopped after the switch

After the move, I also investigated a bot that logged into the old admin screen to read performance data.

The old address now led to the new app, which used a different login method. The bot could no longer sign in with its email and password. Sending it back to the old system would not solve the problem either: the data there had stopped updating.

I proposed two options. We could give the bot a dedicated read endpoint and keep the existing sheets and notifications. Or we could build the reporting screen inside the new app and reduce the need for a laptop and spreadsheets. The choice had not yet been made.

People were not the only users of the old screens. An automated process also used them as a data source. Finding and handling that dependency became part of the work after the switch.

## What I took responsibility for

Along with the data migration, I handled the timing for business use, review requests, the intake and notification switch, and old addresses. I separated changes I could make myself from items that needed another owner to check or decide.

The consultation and site systems have switched to live operation in the new workspace. Business review and stabilization continue. The connection that turns contract messages into draft site approvals and the follow-up work on the reporting bot are still pending.

Even after changing the incoming paths, I am continuing the transition by checking the work that still depends on the old systems.
