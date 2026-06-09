FROM node:20-alpine AS base
WORKDIR /usr/src/app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* ./
RUN npm install
COPY . .

# Build-time vars baked into the Next.js bundle
ARG NEXT_PUBLIC_SOCIAL_EMAIL
ARG NEXT_PUBLIC_SOCIAL_WHATSAPP
ARG NEXT_PUBLIC_SOCIAL_LINKEDIN
ARG NEXT_PUBLIC_SOCIAL_INSTAGRAM
ARG NEXT_PUBLIC_SOCIAL_FACEBOOK
ARG NEXT_PUBLIC_SOCIAL_SUPPORT

RUN npm run build

FROM node:20-alpine AS prod
WORKDIR /usr/src/app
RUN apk add --no-cache libc6-compat
COPY --from=base /usr/src/app .
RUN npm install --production --no-audit --silent || true
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "start"]
