# dwc-dp-explorer

This experimental utility provides the ability to explore a DwC-DP. It uses clickhouse to query the CSV files and ReactJS to provide a simple UI.

Currently this is known to run on Mac and using the example data provided.

## Install and verify clickhouse works

Download Clickhouse
```
curl https://clickhouse.com/ | sh
```

Clickhouse will be started locally, with configuration to enable an HTTP service.
```
./clickhouse server -C config.xml
``` 

You can visit the UI on http://localhost:8123/play and issue this:
```
SELECT * FROM file('event.tsv');
```

## Build the JS project 
This requires nvm (node version manager) and node 22.
Get the correct version of node
``` 
cd ui
nvm use
```

Install dependencies
```
npm i
```

Start in developer mode
```
npm run dev
```
