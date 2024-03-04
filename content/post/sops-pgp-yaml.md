---
title: "SOPS - an easy way to encrypt your credentials..."
description: "SOPS + PGP + kubernetes..."
date: 2019-08-14T13:51:07+0100
draft: true
keywords: linux, devops
---

## Introduction

As the project

### Requirements

### Let's kick off!

First of all we should generate a PGP key pair just for our team/app/deployment.

{{<highlight ruby>}}
module FeedBuilder
  module_function

  def for(user)
    Tweet.where(author: user.followed_users)
         .order(created_at: :desc)
         .limit(10)
  end
end
{{</highlight>}}

{{<highlight python>}}
import click  # noqa: WPS226
import prettytable  # noqa: WPS226
from old_db import Database


@click.group()
@click.option("--debug/--no-debug", default=False)
@click.option(
    "-p",
    "--path",
    default="mailbox.sqlite",
    help="Path to database",
    metavar="PATH",
    show_default=True,
)
@click.pass_context
def cli(ctx, debug, path):
    """
    Script to manage E-DOT simple mail service.

    WARNING: Be sure to make a backup before you're trying to change something.

    \t\t\t\t\t\tevilroot <k@e-dot.uk>
    """

    # Let's ensure we have dict()
    ctx.ensure_object(dict)

    # Define variables across our context
    ctx.obj["DEBUG"] = debug
    ctx.obj["PATH"] = path


@cli.command()  # noqa: WPS210
@click.pass_context
def list_users(ctx):
    """
    Simple function to display all users
    """
    db = Database(ctx.obj["PATH"])
    with db:
        db.query(
            "SELECT virtual_users.id, email,gid,uid,home,quota_in_mb FROM virtual_users"
        )
        myTable = prettytable.from_db_cursor(db.cursor)
        print(myTable)  # noqa: WPS421


@cli.command()
@click.pass_context
def list_aliases(ctx):
    """
    Simple function to display all users
    """
    db = Database(ctx.obj["PATH"])
    with db:
        db.query("SELECT id, source, destination from virtual_aliases")
        myTable = prettytable.from_db_cursor(db.cursor)
        print(myTable)  # noqa: WPS421


def main():
    cli()


if __name__ == "__main__":
    main()

{{< /highlight >}}

{{<highlight shell "hl_lines=1 10 11 15 30">}}
λ: pgp --gen-key
gpg (GnuPG) 2.2.16; Copyright (C) 2019 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Note: Use "gpg --full-generate-key" for a full featured key generation dialog.

GnuPG needs to construct a user ID to identify your key.

Real name: SOPS Encryption Key
Email address: foo@bar.com
You selected this USER-ID:
    "SOPS Encryption Key <foo@bar.com>"

Change (N)ame, (E)mail, or (O)kay/(Q)uit? O
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
gpg: key AB6CE450F5F7D4BC marked as ultimately trusted
gpg: directory '/Users/evilroot/.gnupg/openpgp-revocs.d' created
gpg: revocation certificate stored as '/Users/evilroot/.gnupg/openpgp-revocs.d/02180B48E7B405DA289652E6AB6CE450F5F7D4BC.rev'
public and secret key created and signed.

pub   rsa2048 2019-07-17 [SC] [expires: 2021-07-16]
      02180B48E7B405DA289652E6AB6CE450F5F7D4BC
uid                      SOPS Encryption Key <foo@bar.com>
sub   rsa2048 2019-07-17 [E] [expires: 2021-07-16]


{{< /highlight >}}

{{< gist spf13 7896402 >}}
