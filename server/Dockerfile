FROM node:latest
WORKDIR /server
COPY package.json /server/package.json
RUN npm install --only=prod
COPY . /server/
WORKDIR /server/dist
EXPOSE 5001
CMD ["node", "app"]