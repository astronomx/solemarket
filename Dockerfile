# selecting image to run on
FROM node:18-alpine as base

# installing dependencies required for building npm packages
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY package*.json ./
EXPOSE 3000

# creating a stage named 'common' for building the project
FROM base as common
WORKDIR /app
COPY . .
RUN npm run build

# creating a stage named 'dev' for development purposes, comment out when using production
FROM base as dev
ENV NODE_ENV=development
RUN npm install
COPY . .
CMD npm run dev

# creating a stage named 'prod' for production purposes, uncomment to use it
# FROM base as production
# WORKDIR /app
# ENV NODE_ENV=production
# RUN npm ci
# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nextjs -u 1001
# USER nextjs
# COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/public ./public
# CMD npm start

