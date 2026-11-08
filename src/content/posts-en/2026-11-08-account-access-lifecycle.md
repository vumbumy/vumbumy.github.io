---
title: "Creating an account also creates a future access review"
description: "Adding access for external collaborators meant handling changes and revocation after sign-in. A reflection on the work that an access decision leaves behind."
published: 2026-11-08
tags: [technical-leadership, security, operations]
problem: "External collaborators needed internal content without employee accounts, while operators needed ways to change and revoke their access later."
decision: "I added external sign-in, account management, permission groups, and repeated access checks, while leaving content scope and actual account issuance as separate work."
outcome: "Features for issuing, extending, and revoking external accounts were deployed. The records do not establish that account issuance and content scope decisions were completed."
draft: false
---

External collaborators needed to read internal content. They did not have accounts for employee authentication. From the service side, this could look like a request for one more sign-in page.

Following the work beyond sign-in changed the picture. If a collaborator's scope shrank, their access should shrink too. When the work ended, access should end. We also needed to consider someone who was already signed in when that happened.

Issuing an account leaves work behind, even after the reason for that account disappears. In this change, I added management features for that later stage alongside the sign-in feature.

<figure class="article-figure">
  <a href="/images/illustrations/2026-11-08-account-access-lifecycle.webp" target="_blank" rel="noopener noreferrer" aria-label="Open full-size illustration">
    <img src="/images/illustrations/2026-11-08-account-access-lifecycle.webp" alt="A collaborator returning a key and visitor badge when leaving a shared workspace" width="1536" height="1024" loading="lazy" decoding="async" />
  </a>
  <figcaption>A metaphor for planning the return of access when collaboration begins, rather than a picture of the actual workplace.</figcaption>
</figure>

## An account is issued once, but the relationship keeps changing

Employees kept their existing organization sign-in. External collaborators used a separate authentication path. I also applied an extra identity check and reading logs to external accounts.

These features help establish who is entering. Whether that person still needs the same content today is a separate question.

When an account is first created, its contact person and purpose are usually clear. Over time, the work may change or the collaboration may end. An authentication method that still works does not by itself justify keeping the original access.

The management screen therefore included extension and revocation as well as account creation. An operator selected a permission group when issuing an account, and that group determined the accessible content. This gave operators a way to manage access around a work scope rather than attach content access separately to each account.

## A revoke button is not enough if the session keeps working

Changing a status in an admin screen does not finish access management. The new status must also affect the user's next access.

For this change, the service checked account expiry, lock status, and connection conditions when opening pages, rather than only at sign-in. This was intended to keep an active connection aligned with the state shown to the operator.

That distinction is easy to miss when looking only at account creation. Issuance succeeds and sign-in works, so the feature can appear complete. But if an existing session stays valid after revocation, the operator may believe they control access when they do not.

Revoking access also cannot take back information someone has already read or saved. Alongside checking identity, we still had to decide what to show in the first place.

## Deploying the features was different from opening collaboration

When I shared the update, external sign-in and account management were deployed. The external permission group, its content scope, and accounts for the actual collaborators were still pending. Even whether to include announcements had not been settled.

This was more than filling in a few settings. We needed a decision about which information could be used in external work before we could assign permissions. Having a working sign-in feature did not let me settle that scope on someone else's behalf.

Duration raised a similar issue. A later proposed update included an option for unlimited account duration. That was shared as planned work at the time. It would be too simple to claim that short expiry dates alone finish the operating task. Whether access is limited or long term, someone still needs to decide if it remains necessary and change it when it does not.

What I deployed was an entry path for external users and features that let operators manage their access. The records do not show that account issuance or revocation was tested in actual use. The ability to grant access was ready; the decisions about who could see what, and the operation that followed, were not recorded as complete.
