import { type S3ClientConfig } from "@aws-sdk/client-s3";
import { StorageManager } from "@muni-town/leaf/storage";
import { SuperPeer1 } from "@muni-town/leaf/sync1";
import { s3StorageAdapter } from "s3StorageAdapter";
import { addUser, handleRequest, removeUser } from "authenticatedSyncServer";

/** Start a websocket sync server */
export function startServer(
  opts: { port: number; bucket: string } & S3ClientConfig,
) {
  const { port, bucket, ...clientConfig } = opts;
  const superPeer = new SuperPeer1(
    new StorageManager(s3StorageAdapter(bucket, clientConfig)),
  );
  const server = Deno.serve({ port }, (req) => {
    return handleRequest(superPeer, req);
  });

  return server;
}

if (import.meta.main) {
  const [command, ...args] = Deno.args;
  if (command === "add_user" && args.length >= 2) {
    addUser(args[0], args[1]);
  } else if (command === "remove_user" && args.length >= 1) {
    removeUser(args[0]);
  } else {
    const port = parseInt(Deno.env.get("PORT") || "8000");
    const bucket = Deno.env.get("BUCKET");
    const accessKeyId = Deno.env.get("ACCESS_KEY_ID");
    const secretAccessKey = Deno.env.get("SECRET_ACCESS_KEY");
    const region = Deno.env.get("REGION");
    const endpoint = Deno.env.get("ENDPOINT");

    startServer({
      port,
      bucket,
      {
        credentials: { accessKeyId, secretAccessKey },
        region,
        endpoint
      }
    });
  }
}
