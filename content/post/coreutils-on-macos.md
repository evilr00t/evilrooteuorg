---
title: "CoreUtils on MacOS"
description: "To have GNU experience and consistency with Linux tools"
date: 2020-06-04T10:46:09+0100
draft: true
keywords: linux, devops
---

## Introduction

MacOS is bundled with a bunch of tools that we already know, altho some of those tools are not from the GNU toolkit - they're from BSD!

Now, you'll ask me - what's the difference? Keyword here is: **consistency** between your environment and production machines.

Example:

```sh
[~] (⎈ |N/A:default)
❯ gtar --version
tar (GNU tar) 1.32
Copyright (C) 2019 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <https://gnu.org/licenses/gpl.html>.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Written by John Gilmore and Jay Fenlason.
[~] (⎈ |N/A:default)
❯ tar --version
bsdtar 2.8.3 - libarchive 2.8.3

[~] (⎈ |N/A:default)
❯ /usr/bin/awk --version
awk version 20070501
[~] (⎈ |N/A:default)
❯ awk --version
GNU Awk 5.1.0, API: 3.0 (GNU MPFR 4.0.2, GNU MP 6.2.0)
Copyright (C) 1989, 1991-2020 Free Software Foundation.

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see http://www.gnu.org/licenses/.
```

Linux is bundled with the [coreutils](https://www.gnu.org/software/coreutils/coreutils.html) package and MacOS has its own toolset.

Main difference is that some of them have different arguments or don't have modern features.

### Requirements

