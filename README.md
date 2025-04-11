# Leaf Sync Server

A leaf sync server used by Incremental Social with an authenticated websocket and s3 storage adapter.

It will require several environment variables to connect to an s3-compatible storage service. Check the example docker-compose.yml file for what needs to be set.

## Commands

- `docker exec -it -e USERS_DB_FILE=/data/users.db {container_name} deno --allow-read --allow-write --allow-env --unstable-kv index.ts add_user {username} {password}`
- `docker exec -it -e USERS_DB_FILE=/data/users.db {container_name} deno --allow-read --allow-write --allow-env --unstable-kv index.ts remove_user {username}`

(yeah, all the flags deno requires seems a bit excessive to me too)
