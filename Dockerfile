FROM node:21-alpine as development

ARG WORKSPACE

RUN apk add --no-cache libc6-compat
RUN apk update

RUN npm i -g turbo

WORKDIR /app

COPY . .

RUN npm install

ENV WORKSPACE_ENV ${WORKSPACE}

CMD turbo run dev --filter ${WORKSPACE_ENV}