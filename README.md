# post-n-bid
A Simple App where a user can post a product and other user's can bid for it

# Build
## Step 1 - Install dependencies
```
npm install
```
## Step 2 - Check
```
npx expo start
```
## Step 3 - Build and Run
```
npx expo run:android --variant release
```

# Build Tested On
* Expo SDK 49.0.0
* Android SDK Platform 33
* Android Build tools 30.0.3
* Android NDK 23.1.7779620
* Node 16.18.1
* OpenJDK 11

# Server & Database
Local server and MySQL database is used in this project
change API URL from `src/context.tsx`
```
export const API_URL = 'http://192.168.0.12:3300/api'
export const IMAGE_URL = 'http://192.168.0.12:3300/images'
```
