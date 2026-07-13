#!/bin/sh
set -eu

attempt=1
max_attempts=30

until node scripts/provision-admin.mjs; do
  if [ "$attempt" -ge "$max_attempts" ]; then
    echo "Administrator provisioning failed after ${max_attempts} attempts." >&2
    exit 1
  fi

  echo "Waiting for MongoDB before retrying administrator provisioning (${attempt}/${max_attempts})." >&2
  attempt=$((attempt + 1))
  sleep 2
done

exec node server.js
