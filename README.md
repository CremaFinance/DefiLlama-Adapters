# Marinade-web docs

## Defi Integration

- Provider pools can be added and updated in the marinade-web by adding integration code in /src/services/pools/{provider}.
- A [Provider](modules/providers.md#provider) needs to be exported from this folder.
- Please follow the docs there and get in touch if you have any questions.
- Francium's API CORS are allowed for localhost and marinade.finance domain, therefore will throw an error in deployment previews.
