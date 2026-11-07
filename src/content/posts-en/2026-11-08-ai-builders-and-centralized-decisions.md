---
title: "More people build with AI, but decisions still reach the same few people"
description: "A reflection on data standards, access approvals, and business decisions encountered while supporting teams building with AI."
tags: [ax, technical-leadership, team-operations]
problem: "More people could build with AI, but data standards, access, and business decisions still needed help from central teams."
decision: "I separated questions with existing answers, tasks requiring an owner to act, and business decisions without an agreed answer."
outcome: "Deployment support and documentation of open decisions are in place. The effect on repeated requests and waiting time has not yet been measured."
published: 2026-11-08
draft: false
---

As business staff started building tools with AI, the questions I received began to change.

Alongside “Can you build this feature?” came questions such as “I built this, but can I use this data?”, “Where should I deploy it?”, and “The numbers differ from the existing system. Which is right?”

I support several teams as both the AX Builder team lead and a member of the CTO staff. They build different services, but they often stop at similar points. They have reached a decision they cannot make alone, rather than a coding problem they cannot solve.


<figure class="article-figure">
  <a href="/images/articles/2026-11-08-ai-builders-and-centralized-decisions.en.svg" target="_blank" rel="noopener noreferrer" aria-label="Open full-size diagram">
    <img src="/images/articles/2026-11-08-ai-builders-and-centralized-decisions.en.svg" alt="Different questions need different responses. An existing answer: Make instructions easy to find → An action by an owner: Name who registers and approves → An open decision: Find the business decision owner. Types of support questions; wait-time impact unmeasured" width="760" height="700" loading="lazy" decoding="async" />
  </a>
  <figcaption>Different questions need different responses — Types of support questions; wait-time impact unmeasured</figcaption>
</figure>


## Some decisions could not be made in code

When preparing the base for HR tools, I separated the admin, employee, and external intake apps and set up beta deployment. But several questions remained open: how the new database should relate to the existing one, how to identify authors and editors, and which record should be the source for employee IDs.

AI can propose an implementation for these questions. But proposing a reasonable structure is different from deciding the standard the company will use.

I documented the open questions and recommendations together. I also added guidance for the agent to ask before doing work that depended on those decisions. I provided a base for development without deciding the business data standards on the team's behalf.

In another service, two calculations produced different totals. The operations spreadsheet multiplied the monthly rental fee by the contract length. The system added actual charges, including discounted periods. The choice affected settlement amounts and margins.

Neither calculation was difficult to code. First, we needed to establish what the amount meant and which value each business process should use.

## Having every question come to me would not scale

When these issues arise, I can check the details and connect the right people so work can move forward. In deployment support, for example, I handled infrastructure registration and asked builders to send me the PR link when a database access request appeared.

But as more people build, more requests arrive through the same route. AI reduces implementation time. It does not increase the amount of context I can review or the time other teams have to make decisions.

It is also hard to leave every decision to the builder. A convenient choice inside one app can conflict with another system's data rules or security requirements. Yet if every small choice needs central approval, people can build on their own only to join a queue at the next step.

This is the question I face as a team lead: can I keep handling these requests simply by answering faster?

## Different questions needed different owners

Looking back at recent support work, questions that arrived together actually needed different responses.

Questions with existing answers, such as deployment steps or how to use a shared storage module, could be answered with instructions and examples. Tasks such as service registration and access approval needed a clear owner and timing.

Writing more instructions could not settle questions that had no agreed answer, such as the source for employee IDs or the meaning of a settlement total. The people responsible for the business process needed to decide. My part was to explain what each choice would change and make the decision concrete.

If all of these requests are treated as development support, usage guidance, approval tasks, and business decisions end up in one queue. To the person waiting, development has stopped in every case. But each case needs a different way forward.

## What to look at after implementation speed

To understand the effect of more people building with AI, I think we need to look at where they wait next, as well as what they build and how quickly they build it.

The response should depend on whether someone cannot find an existing answer, is waiting for an owner to act, or is waiting because no standard has been agreed. Treating the last case like the first two sends the question between owners until it comes back to the same few people.

Today, I provide deployment foundations, explain support steps, and bring open business decisions into view. I have not yet measured how much this reduces repeated requests or waiting time.

But I now have a clearer question to ask when the next request arrives: **Do I need to answer it now, make an existing answer easier to find, or find the person who should decide?** As more people build, separating these three kinds of work is becoming a larger part of my role.
