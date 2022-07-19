FROM node:lts

WORKDIR /app
COPY . .
RUN npm install && npm run build

CMD ["npm", "run", "test"]
