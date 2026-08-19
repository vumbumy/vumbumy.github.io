---
title: "How I Fixed a CMS Error and Scoped a 30-Sheet Portal Request"
description: "Two real cases show how I found a CMS data problem and turned an unclear portal request into work that teams could review."
published: 2026-08-19
tags: [Problem Solving, Incident Response, Requirement Analysis]
problem: "I needed to fix a CMS upload failure and define a support portal request with no clear scope or owner."
decision: "I repaired the missing CMS data with SQL and reviewed 30 sheets before asking teams to decide the portal scope and owner."
outcome: "CMS uploads worked again, and the portal request gained a clear menu structure, feature boundary, and decision material."
draft: false
---

I recently handled two very different problems. One was a live CMS error that blocked every image upload. The other was a request to move support work from 30 spreadsheet tabs into one portal.

The first problem needed a quick recovery. The second had no clear scope or owner. In both cases, I checked the structure of the problem before changing code or starting more meetings.

## The problem I owned

The CMS returned a 500 error whenever an editor uploaded an image. New content could not be published without images. The operations team could not continue its normal work.

The portal request was less urgent but more unclear. Support work was spread across 30 tabs. No one had decided which work should move into the portal. The team also needed to decide which features belonged in the main customer system and which needed a small separate tool.

## Facts and limits I checked

It was easy to suspect the image upload code. I checked how Wagtail stores images first. Wagtail needs a top-level Collection node for this process. That root record was missing after a database migration. The application code was working, but the data structure was incomplete.

For the portal, the request document was not enough. I opened all 30 tabs and grouped the work. I separated repeated work, work that software could automate, and work that still needed human judgement. This gave us facts for discussing the system boundary.

## The choice I made

I did not change and redeploy the CMS code. Only the missing data needed repair. I chose an urgent SQL patch to restore the root Collection record because it was the shortest safe recovery path.

For the portal, I did not ask teams to choose an owner first. It was hard to choose an owner while the work was still unclear. I chose to turn the sheet review into features and menu groups before asking for an ownership decision.

## What I actually did

I repaired the missing root Collection record in the CMS database. I then checked that image uploads worked again without an application change. I also added root Collection creation to the database setup process to prevent the same issue.

For the portal, I changed the 30-tab list into menu groups and feature boundaries. The result showed which features could stay in the main system and which could use a smaller tool. I gave this material to the decision makers and asked them to decide the owner and direction.

## Confirmed results and remaining work

Image uploads and content publishing worked again in the CMS. We confirmed that the migration had missed required data. The database setup process was also updated.

The portal request became a structure that people could review by menu and feature. There was now enough material to discuss scope and ownership. Building the portal and moving each part of the work were still future tasks.

I did not create a new general method from these cases. I checked whether code or data was broken in the incident. For the portal, I made the work visible before asking for an owner. These checks made the next action clear in each case.
