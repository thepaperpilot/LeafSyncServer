import { StorageManager } from "@muni-town/leaf/storage";
import { SuperPeer1 } from "@muni-town/leaf/sync1";
import { s3StorageAdapter } from "https://raw.githubusercontent.com/thepaperpilot/LeafS3StorageAdapter/3b33339fc447e43b11cead55c443075e057f43ad/src/index.ts";
import { addUser, removeUser, handleRequest } from "https://raw.githubusercontent.com/thepaperpilot/AuthenticatedLeafSyncServer/29c23bd972007687e330f64b388d30398900e225/src/index.ts";

/** Start a websocket sync server */
export async function startServer(opts: { port: number }) {

  const superPeer = new SuperPeer1(
    new StorageManager(s3StorageAdapter(db)),
  );
  const server = Deno.serve({ port: opts.port }, (req) => {
    return handleRequest(superPeer, req);
  });

  return server;
}

if (import.meta.main) {
  const [command, ...args] = Deno.args[0];
  if (command === "add_user" && args.length >= 2) {
    addUser(args[0], args[1]);
  } else if (command === "remove_user" && args.length >= 1) {
    removeUser(args[0]);
  } else {
    const port = parseInt(Deno.env.get("PORT") || "8000");

    startServer({ port });
  }
}
