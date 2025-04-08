FROM denoland/deno:alpine-2.2.8

WORKDIR /app

COPY . .
RUN deno cache index.ts

USER deno
EXPOSE 8000

CMD ["run", "-A", "--unstable-kv", "index.ts"]