---
title: "What to Check Before Changing the Incoming Traffic Setup"
description: "A review of choosing a small test target first and checking network and firewall conditions."
published: 2026-08-11
tags: [problem-solving, networking, infrastructure-change]
problem: "To change the incoming traffic setup safely, I had to define the test scope and network conditions first."
decision: "I chose to test a small target first, then check access rules and the firewall before making the change."
outcome: "The first test target was chosen, but the change must wait until the access path and firewall review are complete."
draft: false
---

Changing how external requests enter a system can look like a simple setting change. However, moving from one proxy setup to another needs more checks. We must know how the new environment will reach the internal server. We must also check whether policy allows that path.

For this work, I chose a small test target before changing the whole setup. The test was large enough to check whether the new setup worked. It also limited the effect of conditions that had not been checked.

## What was the problem?

At first, the problem seemed to be moving the existing proxy service to a new setup. While reviewing the test target, the real issue became clearer. We needed to confirm that the new incoming path could reach the internal server safely.

Access from a cloud virtual network to an internal office server needed a separate network policy. Testing only whether the new setup accepted external requests was not enough. The review also needed to cover the internal access path and firewall conditions.

## How I compared the choices

The main points were the test scope and the conditions required before the change. A wide change from the start could give results closer to the real environment. However, the network policy was not yet confirmed. This would make it hard to find where a problem started.

A small target made the test scope easier to control. It also helped separate possible causes. The issue could come from the incoming setup, internal access rules, or the firewall.

The test target was not only a service that was easy to move. It was also a way to limit the effect of conditions that were still unclear.

## What I chose and did

I selected a service for the first test and shared the choice with the people involved. I also confirmed that access to the internal office server needed a network policy.

I did not rush into the change. The safe access path and firewall setup needed a review by the person responsible for infrastructure. I made that review a required condition for the next decision.

This separated the conditions that had to be met first. The application settings and network changes would not happen at the same time.

## What happened and what remains

So far, the test target and the network conditions have been defined. The possible target for the new setup is now clear. The people involved also know that internal server access needs more review.

However, the actual change is not complete. The safe access path and firewall setup are still under review. We cannot yet say that the new setup works correctly in the live environment.

The result was not a completed change. It was a clearer boundary around the problems that must be solved first.

## What I will do next time

When changing an external incoming setup, I will first choose a test target with limited impact. Then I will check the network policy and firewall conditions needed to reach internal resources.

If required conditions remain, I will not treat starting configuration work as progress. I will first agree on the review owner and decision rules. After the review, I will decide whether to make the actual change.

A small test is not a step that slows the work. It is a way to reveal problems that are still unsolved.
