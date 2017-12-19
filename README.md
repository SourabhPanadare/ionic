# Initial Setup
  1. sudo apt install npm
  2. sudo apt install nodejs-legacy
  3. npm install -g ionic@latest
  4. curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
  5. sudo apt-get install -y nodejs

# Initial Process
  1. Open Ionic Dashboard -> New App -> App Name -> Create
  
  2. ionic start --pro-id yourappid
     cd ionicproject
     
  3. SSH Setting:- 
       ionic ssh setup
       passphrase:- Office
       Private Key (../../.ssh/ionic/863797)
       Public Key (../../.ssh/ionic/863797.pub)
       Public Key SHA256:B0dApLr9La7EFTm6AyU3rnLuPS5gTYtB3oCdXjGjBRk
       
  4. ionic serve
  
# Cordova Plugin
  1. sudo npm install -g cordova
  2. ionic cordova platform add ios
  3. ionic cordova platform add android
  4. ionic cordova plugin add cordova-plugin-geolocation
  5. ionic cordova plugin add cordova-plugin-nativegeocoder
  
# Node Plugin
   1. npm install --save @ionic-native/native-geocoder
   2. npm install --save @ionic-native/geolocation
 
 # Git Process
   1. ionic link
   2  git add *
   3. git commit -m 'Your Message'
   4. git push ionic master
