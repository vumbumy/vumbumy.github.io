---
title: "Why I Stopped the Server Release of an Internal App That Collected Personal Account Access"
description: "I reviewed an internal app that stored several users' account access on a server and rejected its server release."
published: 2026-08-20
tags: [problem-solving, security, internal-tools]
problem: "An internal app needed to run all the time and keep several users' personal account access on a server."
decision: "I decided not to release it on the server unless the feature requiring personal access was removed."
outcome: "I rejected the server release of the existing app. An option without personal access has not been applied yet."
draft: false
---

An internal user built an app for reporting time away from work. I was asked to run it on an internal server 24 hours a day. The app reduced the work of writing repeated reports. However, some features needed personal account access from several users. The server had to keep this access information. Before keeping the app online, I needed to check whether this design was safe to release.

I reviewed the code and checked how the app received and stored access information. The server limited access to the file. The file was also excluded from version control. However, the stored information was not encrypted. It had no expiry date and was not deleted automatically.

## The problem I owned

The main request was to provide a server that could run the internal app all the time. However, the app could change a user's profile and status for them. Keeping this feature would collect several users' personal account access on one server.

If the server was attacked, the risk would not be limited to the app. The accounts of users who shared access could also be at risk. I had to decide whether this feature could remain in a form that was safe to operate. This was more than a review of the server setup.

## Facts and limits I checked

The code required each user to give the app personal access. This was needed to change their profile and status. The app kept this information in a local file on the server.

Access to the file was limited. However, the information was not encrypted and did not expire. There was also no automatic removal for former or inactive users.

Moving the file to a personal computer did not remove the problem. To edit another user's profile, someone still had to keep that user's access information. The app also needed to run 24 hours a day. Running it only on a personal computer could not easily meet this need.

## The choice I made

I did not allow the server release with the current design. It kept users' personal access information. I decided that small changes to file storage would not solve the main problem.

I suggested removing the feature that directly changed profiles and status. The app could instead publish a post about who was away.

The post could mark the person who was away. If someone wrote it for them, the post could also record the writer. This option would only use the app's own permission to publish posts. It would not need to collect personal access from several users.

## What I actually did

I checked the requested permissions and the code that stored them. I then listed where personal access information remained on the server.

I reviewed more than file permissions and exclusion from version control. I also checked encryption, expiry, and automatic removal. None of these controls were present.

Based on this review, I rejected the server release in its existing form. I suggested the posting method that did not use personal access. I also suggested using a built-in form in a collaboration tool.

Another option was to test the app on a personal computer for a limited period. We could review it again after that test.

## Confirmed results and remaining work

The confirmed result is that the existing app was not released on the internal server. The feature that kept personal account access was also not approved.

There is no record that the app was changed to use the suggested posting method. The server release was requested again because the app needed to run all the time.

A new design without personal access still needs to be built and tested. A later decision about server release also remains.
