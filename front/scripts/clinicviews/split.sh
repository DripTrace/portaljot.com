#!/bin/bash

DRIPTRACE_MEDICAL="medical.driptrace.com"
LLPMG="lomalindapsych.com"
FSCLINICALS="fsclinicals.com"
AMH="access-mentalhealth.org"
AP="advancedpractice.io"

LOCAL_DRIPTRACE="localhost:2999"
LOCAL_LLPMG="localhost:4"
LOCAL_FSCLINICALS="localhost:65535"
LOCAL_AMH="localhost:42690"
LOCAL_AP="localhost:42689

if [ -z "$NODE_ENV" ]; then
    echo "NODE_ENV is not set. Defaulting to production mode."
    NODE_ENV="production"
fi

set_dev_domain() {
    case "$DEV_DOMAIN" in
        "medical") echo "$LOCAL_DRIPTRACE" ;;
        "llpmg") echo "$LOCAL_LLPMG" ;;
        "fsclinicals") echo "$LOCAL_FSCLINICALS" ;;
        "amh") echo "$LOCAL_AMH" ;;
        "ap") echo "$LOCAL_AP" ;;
        *) echo "$LOCAL_DRIPTRACE" ;; 
    esac
}

if [ "$NODE_ENV" = "development" ]; then
    export NEXT_PUBLIC_ROOT_DOMAIN=$(set_dev_domain)
else
    export NEXT_PUBLIC_ROOT_DOMAIN="$DRIPTRACE_MEDICAL"
fi

echo "NODE_ENV is set to: $NODE_ENV"
echo "NEXT_PUBLIC_ROOT_DOMAIN is set to: $NEXT_PUBLIC_ROOT_DOMAIN"

echo "Available production domains:"
echo "DRIPTRACE_MEDICAL: $DRIPTRACE_MEDICAL"
echo "LLPMG: $LLPMG"
echo "FSCLINICALS: $FSCLINICALS"
echo "AMH: $AMH"
echo "Available local development ports:"
echo "LOCAL_DRIPTRACE: $LOCAL_DRIPTRACE"
echo "LOCAL_LLPMG: $LOCAL_LLPMG"
echo "LOCAL_FSCLINICALS: $LOCAL_FSCLINICALS"
echo "LOCAL_AMH: $LOCAL_AMH"
echo "LOCAL_AMH: $LOCAL_AP"