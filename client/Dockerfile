FROM node:latest AS front
WORKDIR /client
COPY package.json /client/package.json
RUN npm install
COPY . /client/
RUN npm run build
ENV NODE_ENV=production
EXPOSE 80
CMD [ "npm", "start" ]