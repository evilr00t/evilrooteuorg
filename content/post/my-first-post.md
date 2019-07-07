---
title: "My First Post"
date: 2019-07-07T00:21:01+01:00
draft: false
---

# TEST

haha test

# Bootstrapping k8s cluster

```sh
[~/repos/ticketing-infra-from-mbp/k8s/qa-env] @ feature/starter [f4339e6]!?
1（╯°□°）╯︵ ┻━┻ λ: export GOOGLE_PROJECT=$(gcloud config get-value project)
export GCP_PROJECT=peaceful-parity-245014
export GCE_CLUSTER=qa-k8s
gcloud container clusters get-credentials ${GCE_CLUSTER} --zone europe-west2-a --project ${GCP_PROJECT}

Fetching cluster endpoint and auth data.
kubeconfig entry generated for qa-k8s.
```

```sh
[~/repos/ticketing-infra-from-mbp/k8s/qa-env] @ feature/starter [f4339e6]!?
λ: ls
.rw-r--r-- 5.3k evilroot 12 Jun 17:25 -- 02-kube-dns.yaml
.rwxr-xr-x  239 evilroot 12 Jun 17:25 -- 01-scale-down.sh
[~/repos/ticketing-infra-from-mbp/k8s/qa-env] @ feature/starter [f4339e6]!?
λ: ./01-scale-down.sh
deployment.extensions/kube-dns-autoscaler scaled
deployment.extensions/kube-dns scaled

[~/repos/ticketing-infra-from-mbp/k8s/qa-env] @ feature/starter [f4339e6]!?
130（╯°□°）╯︵ ┻━┻ λ: kubectl apply -f 02-kube-dns.yaml
deployment.extensions/kube-dns configured
```

```python
import sys
import sqlite3 as lite
from prettytable import from_db_cursor

con = lite.connect('mailbox.sqlite')

def display_domains():
    with con:
        cur = con.cursor()
        cur.execute('SELECT * FROM virtual_domains')
        x = from_db_cursor(cur)
    print(x)

def display_accounts():
    with con:
        cur = con.cursor()
        cur.execute('SELECT * FROM virtual_users')
        x = from_db_cursor(cur)
    print(x)

def display_aliases():
    with con:
        cur = con.cursor()
        cur.execute('SELECT * FROM virtual_aliases')
        x = from_db_cursor(cur)
    print(x)



```


