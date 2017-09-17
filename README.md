#GOY Hackathon ERP Frontend

### Summary

This project is built using ReactJS for the front end, we load all the questions and responses from spec.json.

### To run it locally
```
npm install
npm start
```

### Heroku deployment guide
```
git init
heroku create -b https://github.com/mars/create-react-app-buildpack.git
git add .
git commit -m "react-create-app on Heroku"
git push heroku master
heroku open
```
