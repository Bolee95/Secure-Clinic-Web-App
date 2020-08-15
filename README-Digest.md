*README Highlights*

Definicija ENV promenjivih: 
- Napraviti .env fajl u root projekta
- Prefix svake promenjive bi trebao da bude REACT_APP_

Pribavljanje podataka:
- Koristi se uglavnom *axios* ili fetch() API *Strana 35*

Dubugging u VC Code: 
'''
Then add the block below to your launch.json file and put it inside the .vscode folder in your app���s root directory.

json { "version": "0.2.0", "configurations": [ { "name": "Chrome", "type": "chrome", "request": "launch", "url": "http://localhost:3000", "webRoot": "${workspaceRoot}/src", "sourceMapPathOverrides": { "webpack:///src/*": "${webRoot}/*" } } ] }

Start your app by running npm start, and start debugging in VS Code by pressing F5 or by clicking the green debug icon. 
'''

Setup proxija koji prosledjuje API pozive sa Webpack dev servera na zeljeni server:
- Dodati u package.json fajl sledecu liniju - "proxy": "http://localhost:3010/"