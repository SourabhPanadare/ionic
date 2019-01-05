# Initial Setup

  $ sudo npm install -g ionic

  $ ionic start ionic4-angular6-crud sidemenu --type=angular

  $ cd ./ionic4-angular6-crud npm install --save-dev @ionic/lab

  $ ionic serve -l

# Library Installation

  $ ionic g service rest-api, ionic g module material

  $ ionic g page detail, ionic g page edit, ionic g page create

# Json Server Configuration For Testing

  $ npm config set registry http://registry.npmjs.org/
  $ npm config set strict-ssl false

  $ sudo npm install -g json-server

  json-server -v

  json-server -p 4000 --watch db.json