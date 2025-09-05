FROM node:20-bookworm

# Speed up installs and enable pnpm via corepack
RUN corepack enable && apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace
