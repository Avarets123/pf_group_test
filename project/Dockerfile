FROM node:22-alpine as builder

USER node
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY --chown=node:node . .

RUN npm run build \
    && npm prune --production

FROM node:22-alpine as production


USER node
WORKDIR /var/www/pf_group

COPY --from=builder --chown=node:node /usr/src/app/package*.json ./
COPY --from=builder --chown=node:node /usr/src/app/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /usr/src/app/dist/ ./dist/

CMD ["npm", "run", "start:prod"]