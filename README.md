# TangleID

## Introduction

TangleID is a secure, easy-to-use system for self-sovereign identity,
built on IOTA/Tangle. An identity can be cryptographically linked to
offline data stores. Each identity is capable of storing the hash of
an attributed data blob, whether on Google Cloud, Azure, AWS, Dropbox,
etc., which is where all data associated with that identity is securely
stored.

TangleID, an identity system, aims to be a flexible and easy-to-use method
of interacting with decentralized applications as well as off-Tangle
 identity related tasks by abstracting away the public key cryptography from
the end user to make the user experience intuitive.

Check [the documentation about TangleID](https://tangleid.github.io/docs/)
for details.

## Get started

### Setup environment

TangleID depends on [swarm node](https://github.com/yillkid/iota-swarm-node) to
accelerate the interaction between API calls and IRI nodes. Therefore, you shall
configure the swarm node host in advance.

- Create new file named `.env` and specify `IRI_HOST`, `SWARM_HOST` and `API_HOST`
  * `IRI_HOST`: an address (IP or domain) to the IRI node.
  * `SWARM_HOST`: an address (IP or domain) to the swarm node that accepts TangleID extension.
  * `API_HOST`: main entry point for the API that TangleID invokes on client side.

Default host-specific configurations:
```
IRI_HOST=http://node1.puyuma.org:14266
SWARM_HOST=http://node2.puyuma.org:8000
API_HOST=http://localhost:3000/api
```

You can modify these entries in file `.env` accordingly,
but please note that the default environment runs on testnet.

### Run TangleID

Build TangleID from scratch:

```shell
$> npm install
```

Launch TangleID service, for either development or production build:
- Development build
    ```shell
    $> npm run dev
    ```
- Production build
    ```shell
    $> npm run build && npm start
    ```

## Licensing
TangleID is freely redistributable under the MIT License. Use of this source
code is governed by a MIT-style license that can be found in the `LICENSE` file.
