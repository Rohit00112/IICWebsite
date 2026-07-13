#!/bin/sh
set -eu

max_attempts=30

retry_until_ready() {
  description="$1"
  shift
  attempt=1

  until "$@"; do
    if [ "$attempt" -ge "$max_attempts" ]; then
      echo "${description} failed after ${max_attempts} attempts." >&2
      exit 1
    fi

    echo "Waiting for Database before retrying ${description} (${attempt}/${max_attempts})." >&2
    attempt=$((attempt + 1))
    sleep 2
  done
}

retry_until_ready "administrator provisioning" node scripts/provision-admin.mjs

exec node server.js
