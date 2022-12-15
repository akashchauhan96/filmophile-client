## Filmophile

Filmophile is a movie database that renders the most popular movies from The Movie Database API and allows user to add and delete movies into their own custom movie list (eg. Horror movies from 2022, Movies The Inspire Me, etc). Many movie streaming database websites such as Netflix don't have that feature so my app helps to provide that functionality.

## ENV Info for Client Side

REACT_APP_PORT
REACT_APP_CLIENT_URL
REACT_APP_SERVER_URL
REACT_APP_TMDB_API_BASE_URL="https://api.themoviedb.org/3"
REACT_APP_API_KEY_QUERY

## ENV Info for Server Side

PORT
DB_USER
DB_PASSWORD
DB_NAME

## Installation Instructions

### Server side setup

```bash
cd filmophile-server # if you are currently not in the folder
npm i     # install all dependecy modules
npm run migrate   # create the table with the columns that will store the data
npm run dev     # starts the development environment
```

### Client side setup

```bash
cd filmophile-client # if you are currently not in the folder
npm run start  #renders your react app on the browser
```

### `movie_lists`

| id (int) | name (string) | description (string)     | number_of_movies (int) | created at (timestamp) | updated at (timestamp) |
| -------- | ------------- | ------------------------ | ---------------------- | ---------------------- | ---------------------- |
| 1        | Fav mov 2022  | My best movies from 2022 | 2                      | 2022-12-15 13:20:21    | 2022-12-15 13:20:21    |

### `single_movie_list`

| id (char) | name (string) | release_year (int) | movie_lists_id (foreign-key) | image_url | created at |------------------------------------- | ------------- | ----------------- | --------------------------- | --------- | --------- |
| 060ca5e1-659f-4508-b825-838098d9ec85 | Avatar | 2022 | 1 | http://... | 2022-12... |

## API Endpoints

### GET `/movie-lists`

Get information from all movie lists.

```json
[
  {
    "id": 1,
    "name": "Comedy list from 2022",
    "description": "My favorite comedies from 2022",
    "number_of_movies": 2,
    "movie_lists_id": 1,
    "image_url": "https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.jpg"
  }

    {
    "id": 1,
    "name": "Comedy list from 2022",
    "description": "My favorite comedies from 2022",
    "number_of_movies": 2,
    "movie_lists_id": 1,
    "image_url": "https://image.tmdb.org/t/p/original/wwemzKWadgadfhadfhadfhaBcm.jpg"  # different url for a different movie that belongs to same list
  }
]
```

### POST `/movie-lists`

Add a new post.

```json
  The following gets inserted into your movie_Lists table
[
  {
    "name": "Comedy list from 2022",
    "description": "My favorite comedies from 2022",
    "number_of_movies": 2,
  }

  The following json is added to the single_movie_list table in the same post request using promise chaining
  {
    "id": "532543-346326-4632642-34632263",
    "name": "The Matrix",
    "release_year": 2022,
    "movie_lists_id": 2,  ### This id is a foreign key that links this specific movie to unique list it belongs to
    "image_url": "https://image.tmdb.org/t/p/original/wwemzKWadgadfhadfhadfhaBcm.jpg"
  }
]
```

### DELETE `/movie-lists/:id`

The following movie list will be deleted and because of delete functionality the corresponding movies linking to the movie-list id will also be deleted

```json
[
  {
    "id": 2,
    "name": "Name of List",
    "description": "My List",
    "number_of_movies": 2
  }
]
```
