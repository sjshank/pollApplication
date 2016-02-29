
# Poll Application

Poll/Feedback is web based portal where user can add/search questions and cast their votes. User can see voting summary in graphical representation. Application developed on top of MEAN Stack.

Programming Language :

    1.JavaScript

Web/Application Server :

    1.Nodejs

Frameworks :

    1. Expressjs - server side framework
    2. Angularjs - client side framework
    
Libraries : 

    1. RequireJS - Dynamic module loader
    2. AngularAMD - Utility that facilitates the use of RequireJS in AngularJS applications 
    3. grunt - Automatiom task manager
    4. express-session/connect-mongo - server side session manager
    5. angular-google-plus - for google+ login
    6. all.js - facebook login
    7. mongoose - mongodb connection, datamanipualtion for Nodejs/Expressjs
    8. express3-handlebars - view engine manager
    9. angular-route - angular routing
    10. angular-cookies - client side session storing in cookies
    11. less - compiling less into css
    12. Angular-chart - To show voting summary in ghraphical representation doughnut/bar/pie dynamically
    
Database :

    1.NoSql - Mongodb

Tools :

    1.SublimeText2
    
Steps to follow for running app :

    1. install Nodejs from here https://nodejs.org/en/ and make node env up. This will automatically install NPM package in your system.
    2. Install mongodb from here https://www.mongodb.org and make it up. No need to create new db for this sample. It will             create by own.
    3. Install Python 2.7+ version from here https://www.python.org/download/releases/2.7/
    4. Run 'npm install' on 'package.json'. This will create new folder 'node_modules' inside same directory where you can see       all the mentioned dependencies inside 'package.json' will gets installed.
    5. Run 'grunt less' for compiling style.less into style.css
    6. Run either 'grunt' or 'node app.js' over root directory. 'grunt' command will execute all the task mentioned inside           'gruntfile.js'.
    
    Hit "localhost:3000" to see running application
