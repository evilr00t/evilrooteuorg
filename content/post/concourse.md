---
title: "Configure Full Concourse Pipeline using Terraform"
description: "Modern CI/CD that is easy to configure and use :-)"
date: 2020-02-25T16:22:19+0000
draft: true
keywords: linux, devops
---

## Introduction

In this project we are going to use Terraform to provision our Concourse that will use GitHub as an authentication provider.

### Requirements

* `Docker`
* `fly` binary
* `Terraform` + `alphagov/terraform-provider-concourse`

You need to issue: `vault -dev -addr 0.0.0.0`

Create engine, `session_factory` and `scoped_session` object.


### Docker Compose

#### Configuration

First you'll need to adjust some settings on the `docker-compose.yml` file.

{{ <highlight diff "hl_lines=9-12"> }}
❯ git diff
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
modified: docker-compose.yml
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
@ docker-compose.yml:31 @ services:
       CONCOURSE_POSTGRES_DATABASE: concourse
       CONCOURSE_ADD_LOCAL_USER: test:test
       CONCOURSE_MAIN_TEAM_LOCAL_USER: test
+      CONCOURSE_MAIN_TEAM_GITHUB_ORG: evildot
+      CONCOURSE_MAIN_TEAM_GITHUB_USER: evilr00t
     logging:
       driver: "json-file"
       options:

{{ < /highlight > }}





<!-- {{< gist spf13 7896402 >}} -->
