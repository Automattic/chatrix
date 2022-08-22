Chatrix lets you securely embed [Hydrogen](https://github.com/vector-im/hydrogen-web) within any website. Chatrix is a
fork of [Chatterbox](https://github.com/vector-im/chatterbox).
    
### Develop Instructions
---
1) Clone the repo.
2) Install dependencies (you only need to do this once):
    ```properties
    yarn install
    ```
3) Modify config.json in `public` directory with your homeserver details.  
   (See [`types/IChatrixConfig.ts`](https://github.com/Automattic/chatrix/blob/main/src/types/IChatrixConfig.ts)
   for the format)
4) Start develop server:
    ```properties
    yarn start
    ```

### Build Instructions
---
Follow the develop instructions above (steps 1-3), then:

- Build chatrix app into `/target` directory:
    ```properties
    yarn build
    ```

### Embed Instructions
---
Assuming that the build output (inside `/target`) is hosted at `<root>` (eg: chatrix.example.com), copy and paste the
following snippet before the closing `</body>` tag:

```html

<script>
	window.CHATRIX_CONFIG_LOCATION = "path_to_config";
</script>
<script src="<root>/assets/parent.js" type="module" id="chatrix-script"></script>
```

## Testing

Chatrix comes with a suite of integration tests, using cypress.

You can run them by doing
```sh
yarn cypress install
yarn cypress open
``` 

Ensure you copy the `cypress/fixtures/demoInstance.sample.json` file to `cypress/fixtures/demoInstance.json` and edit 
the keys accordingly.

## Releasing
Chatrix releases are automatically created through a GitHub Action, which is executed whenever a tag of the form `vX.Y.Z` is pushed. You can create and push a tag as follows.

First find the latest tag:

```shell
# Fetch tags from origin
git fetch

# Returns the latest tag, e.g. v0.1.0
git describe --tags --abbrev=0
```

Then create and push a tag that increments the latest one as per [Semantic Versioning](https://semver.org/):

```shell
git tag v0.1.1
git push origin v0.1.1
```

The [GitHub Action](https://github.com/Automattic/chatrix/actions) will launch automatically, and when completed will have created a **draft release** for the tag that was pushed. You should then edit that release to provide a meaningful title and description (ideally including a [changelog](https://keepachangelog.com/en/1.0.0/)), then publish the release.
