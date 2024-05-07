# Run the full project with a single command 

# Clear the running ports 
pm2 stop all
pm2 delete all
fuser -k 3000/tcp
fuser -k 3001/tcp 
fuser -k 3002/tcp
fuser -k 3003/tcp



# Start User Module
echo "Start the Users module."
cd users
rm -r node_modules
rm -r package-lock.json
npm install
npm run build 
npm run serve

# Start Store Module
echo "Start the Store module."
cd ../store
rm -r node_modules
rm -r package-lock.json
npm install
npm run build 
npm run serve 

# Start Products Module
echo "Start the Products module."
cd ../products
rm -r node_modules
rm -r package-lock.json
npm install
npm run build 
npm run serve 




 # Start My-Gateway
echo "Start the Gateway Module."
cd  ../gateway
rm -rf node_modules
rm -rf package-lock.json
npm install --legacy-peer-deps
npm run serve 
