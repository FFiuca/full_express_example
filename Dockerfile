FROM node:22-alpine
WORKDIR /app
copy package.json /app/
RUN npm install
COPY . /app
CMD ["sh", "-c", "npx migrate-mongo up && npm run start"]

