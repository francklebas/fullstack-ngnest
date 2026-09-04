# syntax=docker/dockerfile:1
FROM node:22-alpine AS builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:22-alpine AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production && yarn cache clean
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/nest-cli.json ./nest-cli.json
# si tu as des assets statiques, décommente :
# COPY --from=builder /usr/src/app/public ./public
EXPOSE 3000
USER node
CMD ["node", "dist/main.js"]
