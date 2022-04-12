#!/bin/bash
docker build -t cypress-test-image:1.0.0 .
docker run cypress-test-image:1.0.0