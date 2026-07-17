---
title: "Useful shell one-liners"
date: 2026-07-16T14:20:00+0000
tags: [shell, bash]
draft: false
---

Find all files modified in last 7 days:

```bash
find . -type f -mtime -7
```

Quick disk usage sorted:

```bash

du -sh * | sort -h

for i in $(du -sh * | sort -h | awk '{print $2}'); do du -sh $i; done
```
