---
title: "Screens Were Built Fast. Why Did the Launch Estimate Stay Long?"
description: "I compared two project histories and revised an estimate by separating screen work, external connections, and changes after launch."
published: 2026-10-18
tags: [estimation, ai-development, launch]
problem: "I needed to check whether fast screen development with AI could support the full estimate for another project."
decision: "I separated screen work, external connections, and changes after launch, then used different evidence for each."
outcome: "I recalculated the estimate. The final schedule and the actual launch result are still unconfirmed."
draft: false
---

While estimating a project, I looked at work from earlier projects. We had used AI to build screens quickly. I thought the time spent on each screen might help me make a better estimate for the next project.

But the project histories were hard to compare. One project was adding new features. Another had already moved into live use. Their screen counts covered different kinds of work. I had to check what each count meant.

## I separated commit dates from full workdays

For one project, I counted active dates, screens, APIs, and database tables from the Git history. An active date meant a date with a commit. People also worked on other tasks. It did not mean a full day spent on this project.

The screen, API, and table rates also used the same active dates. Adding these rates as separate amounts of work would count the same time more than once. Before using the numbers, I needed to explain what they measured.

For another project, I checked the time from development to launch. I also checked changes made after launch. This covered more work than the first project's fast feature creation.

## I counted screens and working external connections separately

The project with fast feature growth had started external connections, but their actual completion was not confirmed. Having screens and server code did not prove that real identity checks or payments worked from start to finish.

The project already in live use included changes made after customers began using its screens. Comparing only the first version would miss this work. The difference in screen rates did not, by itself, show a difference in developer or tool performance.

I therefore looked at admin screens and changes to customer flows separately. For external connections, I used separate records and outside procedures. I did not estimate them from screen counts.

## I recalculated the estimate with different kinds of work

First, I applied the fast development record to a screen-based estimate. Then I used work from the live project for customer screens. I added external connections, shared setup, testing, and data migration separately. The estimated range changed depending on which project record I used.

The confirmed result is a revised estimate with clearer evidence. A final schedule has not been agreed through this analysis, and the new project has not completed its launch. Some external connection and launch conditions still need checking.

Fast screen development with AI was useful evidence. But it described screen development. To estimate the time needed for live use, I also had to include work that was still unfinished and changes that appeared after launch.
