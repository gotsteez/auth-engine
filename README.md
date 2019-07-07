# auth-engine
Authentication API with ability to link to discord. 

# src/config.json
The src/config.json is used for keys and general configuration needed in the api.
Structured like
```
{
  "jwt": {
    "secret": ""
  },
  "db": {
    "uri": ""
  }
}
```

# TO DO
- Add discord oauth w/o passportjs
- Add jwt w/ refresh tokens