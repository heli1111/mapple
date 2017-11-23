main page
nav bar - logo title login/logout
secondary nav bar - my maps, new map
body - top maps (rolling)
     - rest of the maps feed into page like tweeter (load 9 at a time, 3 per column)
Benefits - palceholder, marketing 
Footer - copy right, contacts

Dependencies - 
login 
logout
/user/:id // my maps button
/maps/new // new map button
/maps/:id // existing map

-----------\
maps/new page // create new map (API)
nav bar - logo, title, login status
secondary nav bar - new map, my maps
body    - name, description - from
        - pins - name, description, img, long/lat info, submit - from
        - submit
        - pin collection - display all pins, with delete and edit button
footer

Dependencies -
/maps/user/:id - my maps button
logout
/maps/:id  - submit map button
------------\
user/:id page // my maps
nav bar - logo title login/logout
secondary nav bar - my maps, new map
body - top maps (rolling)
     - rest of the maps feed into page like tweeter (load 9 at a time, 3 per column)
Footer - copy right, contacts

Dependensies - 
new map
maps/:id
logout



