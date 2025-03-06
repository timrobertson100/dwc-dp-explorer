# dwc-dp-explorer

This experimental utility provides the ability to explore a DwC-DP. It uses clickhouse to query the CSV files and ReactJS to provide a simple UI.

Currently this is known to run on Mac and using the example data provided.

### Install clickhouse 

```
curl https://clickhouse.com/ | sh
```

### Build the JS project 

This requires....

``` 
npm morten voodoo
```

### Start clickhouse

Clickhouse will be started locally, with configuration to enable an HTTP service.

```
./clickhouse server -C config.xml
``` 

You can visit the UI on http://localhost:8123/play and issue this:

```
select * from file('event.tsv')
```
