---
title: "Quick kubectl tip"
date: 2026-07-17T10:30:00+0000
tags: [kubernetes, cli]
draft: false
---

Found a neat way to watch pod status changes:

```bash
kubectl get pods -w
```

The `-w` flag streams updates live. Useful for deployments.
