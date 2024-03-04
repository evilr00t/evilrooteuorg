---
title: "Quickwit as a storage for OpenTelemetry (Jaeger) Traces and OpenTelemetry Collector"
description: "Because you don't want to deploy OpenSearch/ElasticSearch as it is hungry as your ex..."
date: 2024-03-04T21:11:00+0000
draft: false
keywords: linux, devops, observability, opentelemetry, jaeger, quickwit, storage, traces
---

## Introduction

This morning as I was working a bit on my homelab repo I wanted to introduce tracing to my services but I didn’t want to deploy ES/OS as they seemed to be too hungry for my simple homelab. I wanted something lightweight and easy to use. I stumbled upon [quickwit](https://quickwit.io) and I thought it would be a good fit as it is getting more attention and development in recent days. After nibbling with it for a bit I decided to write a blog post about it as I'm sure you could like this set-up as well.

![Diagram](/images/quickwit_opentelemetry.png)

As pictured on the diagram (from right to left - I know, but it was easy to draw it this way) we have our services that emit logs/traces using OpenTelemetry/OpenTracing/Jaeger and send them to our main colllector - OpenTelemetry (contrib version as it has additional receivers/exporters) frankly if you’re using just OpenTelemetry you could skip this and send your logs/metrics straight to Quickwit but by using OpenTelemetry you can collect even more metrics about your logs & spans and be aware how much traffic you generate and when something goes wrong.

I’m using Jaeger Query/UI to display my traces. Grafana can do this as well but Jaeger Query seems to have better UX for me - YRMV

##### Traffic

Our services send logs/traces to OpenTelemetry Collector using OTLP protocol and port 4317/tcp (you are not limited just to it - check OTEL docs)

OpenTelemetry Collector receivers our logs and puts them into an internal “pipeline” - they go through our processors (in our case just simple batch & memory_limiter) and are sent to exporter that sends them to Quickwit using OTLP protocol on port 7281/tcp.

Jaegery Query connects to QuickWit OTLP endpoint on port 7281/tcp that has Jaeger support (using grpc plugin) and displays our traces.

###### Jaeger UI

![Jaeger Query](/images/jaeger_spans.png)

###### Quickwit UI

![Quickwit](/images/quickwit_spans.png)

## Configuration

### opentelemetry.yaml

{{<highlight yaml>}}
receivers:
  jaeger:
    protocols:
      grpc:
      thrift_http:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318

processors:
  memory_limiter:
    check_interval: 5s
    limit_percentage: 90
  batch/metrics:
    send_batch_max_size: 300
    send_batch_size: 300

extensions:
  zpages:
    endpoint: ":55679"

exporters:
  otlp/quickwit:
    endpoint: http://${QUICKWIT_IP}:7281
    tls:
      insecure: true
  debug:

service:
  pipelines:
    traces:
      receivers: [otlp, jaeger]
      processors: [batch/metrics, memory_limiter]
      exporters: [otlp/quickwit]

  extensions: [zpages]
{{</highlight>}}

### quickwit

{{<highlight bash>}}
#environment variables
QW_ENABLE_OPENTELEMETRY_OTLP_EXPORTER="true"
OTEL_EXPORTER_OTLP_ENDPOINT="http://${OTEL_COLLECTOR_IP}:4317"
{{</highlight>}}



### jaeger ui

{{<highlight bash>}}
#environment variables
SPAN_STORAGE_TYPE="grpc-plugin"
GRPC_STORAGE_SERVER="${QUICKWIT_IP}:7281"
GRPC_STORAGE_TLS="false"
{{</highlight>}}
