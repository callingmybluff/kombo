# Notes
## Generic
1. Joined city and station together in one entity: Location
1. I can easily see us needing a name per language for stations as well, so treated it as cities in regards to naming (If you are new to Germany, Berlin Hauptbanhof may just wanna write "Berlin Central Station").  
This is not in the current requirements, but it is mroe future-proof.
1. Used `sequelize-typescript-generator` package to generate the TS files.
1. Instead of the class Cache, in real production we can use a DB, like Radis

## DB
1. For IDs, I chose `MEDIUMINT` since `SMALLINT` is too small, and `INT` is probably too big for our case.
1. We may need a tables for `Station` / `City` later on, but we are okay now.
1. Some references for values used
    - `i18n.name` https://en.wikipedia.org/wiki/List_of_long_place_names
    - `location.longitude` https://stackoverflow.com/a/1196429/9714920
1. We can make `address.city` as text as well, but that is much more prune to error / typo, and we already have an auto-complete service which we can adjust for this.
1. `ON DELETE CASCADE` and `ON UPDATE CASCADE` are possible. Dropping few rows should cause the DB to update, but do we really delete cities or stations? The database we have now is mostly `read-only` mode, and maybe `addition` mode sometimes.

# Usage
1. Start docker `docker-compose up`
2. Populate some date (need mysql)  
    `mysql -h 127.0.0.1 --protocol="TCP" -p123456 -uismaeel < data/00-clear.sql`  
    `mysql -h 127.0.0.1 --protocol="TCP" -p123456 -uismaeel < data/01-creation.sql`  
    `mysql -h 127.0.0.1 --protocol="TCP" -p123456 -uismaeel < data/02-languages.sql`  
    `mysql -h 127.0.0.1 --protocol="TCP" -p123456 -uismaeel < data/03-location.sql`  
    `mysql -h 127.0.0.1 --protocol="TCP" -p123456 -uismaeel < data/04-i18n.sql`  
    `mysql -h 127.0.0.1 --protocol="TCP" -p123456 -uismaeel < data/05-cityOfStation.sql`  
