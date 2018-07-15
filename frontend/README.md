# Stubber - Frontend

The site is available at the following URL

[https://stubber.space](https://stubber.space)

## Development

---

### Update contracts

Once you've compiled new [contracts using Truffle](../contract/README.md) you can run the following to update the local copies of these files.

```bash
npm run contracts
```

### Run

```bash
npm install
npm run start
```

### Build

```bash
npm run build
```

## Deploy

---

This application is built to run with Firebase as a blob storage backend. There are a couple dependencies that need to be setup in order to make sure the site can connect to a firebase instance.

### Firebase Config

**Make a copy** of `src/app/config/firebase.js.example` as `src/app/config/firebase.js`

Under `src/app/config/firebase.js` you'll have to populate the various fields with the configuration you recieve from Firebase when creating a new project.

```javascript
const firebaseConfig = {
  apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "stubber-space.firebaseapp.com",
  databaseURL: "https://stubber-space.firebaseio.com",
  projectId: "stubber-space",
  storageBucket: "stubber-space.appspot.com",
  messagingSenderId: "734465950191"
}
```

Also change **projects:defaults** in `.firebaserc` to your firebase ID!

Then you can simply run the following to have a new instance deployed to firebase.

```bash
cd functions
npm install
cd ..
npm run deploy
```
