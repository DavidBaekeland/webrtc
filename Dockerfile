FROM node:12-alpine
RUN apk add --no-cache python2 g++ make
WORKDIR /Zoom-Clone-With-WebRTC-master
COPY . .
RUN yarn install --production
CMD ["npm", "run","devStart"]
EXPOSE 3000