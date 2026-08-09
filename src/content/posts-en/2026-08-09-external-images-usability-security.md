---
title: "What We Found While Fixing Invisible Images"
description: "A record of reviewing external image display as both a usability need and a visitor tracking risk, then moving to internal storage"
published: 2026-08-09
tags: [Problem Solving, Security, Content Operations]
problem: "External images had to appear again while reducing the risk of third parties tracking visitors."
decision: "Instead of loading external images directly, I chose to copy them to internal storage and serve them from there."
outcome: "I fixed lost existing images, external image display, and video preview and playback issues. A later request about table editing remains."
draft: false
---

After a release, a request came in about external HTTPS images. They did not appear in an operations tool. At first, it looked like a simple display error. Allowing the image addresses again seemed enough. However, direct loading could send visitor information to a third party.

Users expect their content to look as they created it. In an operations tool, adding an image should not require a security review each time. Still, I could not allow all external content only for convenience. The key question was not whether to show images. It was who should provide them.

## What was the problem?

The first reported problem was that external images did not appear. The shortest fix was to load them directly from their original addresses. However, this could let a third party know when someone viewed the content.

I divided the problem into two parts. Authors needed an easy way to use external images. Visitors needed a display method without a direct connection to the external provider. I treated the feature and security needs as one requirement, not separate tasks.

## How I compared the choices

I used two main points to compare the choices. One was how much of the current user flow stayed the same. The other was whether visitors connected directly to an external provider.

Loading each image from its original address kept authoring simple. However, every display caused an external request. This left a risk that the provider could track visitors.

The other choice was to copy external images into internal storage. An internal service would then provide them. Users could still use external images. Visitors would not request them directly from the original provider.

This choice required more work. However, it could support user convenience while reducing the risk.

## What I chose and did

I chose to copy external images into internal storage and serve them from there. I did not stop after blocking the feature for security. I restored the expected display experience with a different design.

Changing only the image process did not solve every related issue. I fixed both lost existing images and external image display. I also worked on video previews and playback in the same content area.

I set the scope around how content was saved and shown again. I did not treat each symptom as a separate issue.

## What happened and what remains

I fixed the loss of existing images and the external image display issue. I also addressed video previews and playback again.

Users could still show external images. At the same time, internal storage reduced direct connections between visitors and third parties.

Later, another request came in about table editing. New rows and columns should use centre alignment by default. This was not directly related to security.

Still, it showed that the quality of an operations tool depends on more than its storage design. Small problems in repeated work also matter.

## What I will do next time

When external content does not appear, I will not first decide whether to allow it. I will check who fetches the content. I will also check how far the visitor’s request travels.

The same screen can have different risks depending on how content is delivered.

I will not assume that security requires removing the current user flow. A direct connection may be replaced with internal storage and delivery. This can keep the convenience.

When feature and security needs conflict, I will not first give up one of them. I will check whether the design can move the point where they conflict.
