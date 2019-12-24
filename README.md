# Favorite Show Reminder

## Steps to run in Development Environment

### Start API server 

(Start this first, or else you will get error when web app attempt to call API)

```
cd app
npm install
npm start
```

    API is availble on port 8080

        http://localhost:8080

### Start NextJS App 

```
cd www
npm install
npm run build // may not need to do
npm start
```

    Web App is available on port 3000

        http://localhost:3000

## Steps to deploy

```
# From root folder where you have now.json
now
```
