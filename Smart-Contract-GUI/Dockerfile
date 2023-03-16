FROM node:14-alpine

WORKDIR /app

USER node

COPY --chown=node:node . .

RUN npm i

RUN npm i --prefix Client/Xeries/
RUN npm run build --prefix Client/Xeries/

RUN npm i --prefix Client/Copyright/
RUN npm run build --prefix Client/Copyright/

RUN npm i --prefix Client/Real-T/
RUN npm run build --prefix Client/Real-T/

EXPOSE 5000
CMD [ "npm", "start", "Server.js" ]