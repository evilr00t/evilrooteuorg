---
title: "Configure Vault using Terraform"
description: "Your private like KMS & Secret Manager backed by GitHub Auth"
date: 2020-06-01T00:06:13+0100
draft: true
keywords: linux, devops, security, devsecops
---

## Introduction

Vault is simple and yet so powerful. I'll show you how to configure and kick off with Vault using practical examples.

### Docker Compose

#### Configuration

First you'll need to adjust some settings on the `docker-compose.yml` file.

{{<highlight terraform>}}
resource "vault_policy" "admin_policy" {
  name   = "admins"
  policy = file("policies/admin_policy.hcl")
}

resource "vault_mount" "developers" {
  path        = "developers"
  type        = "kv-v2"
  description = "KV2 Secrets Engine for Developers."
}

resource "vault_mount" "operations" {
  path        = "operations"
  type        = "kv-v2"
  description = "KV2 Secrets Engine for Operations."
}

resource "vault_generic_secret" "developer_sample_data" {
  path = "${vault_mount.developers.path}/test_account"

  data_json = <<EOT
{
  "username": "foo",
  "password": "bar"
}
EOT
}

{{</highlight>}}
