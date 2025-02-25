# Leaflet Map with JSON-Server API 
The Map gets its parameters via the JSON-Server API which runs independently on its own port.

JSON-Server API can be run using the db.json file with following command
npx json-server db.json --port 5000

the db.json files has a large amount of data, but the important elements used to diplay the colors of paths on the Map are 'eemi_grade' and 'coordinates'

# Steps Performed

1) Fixed the Dockerfile so that it would containerize but the api was not working

2) Added Leaflet Map Component (MapLayout.jsx)

3) The coordinates from JSON Server needed to be modified as the coordinates were not correct to be specific they were reversed.

4) Added polylines to the Map for displaying roads with different eemi grade values.

5) Dropdown for selecting the different eemi grades available and displaying them.