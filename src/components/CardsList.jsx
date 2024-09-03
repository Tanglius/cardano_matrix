import { Container, Grid } from "@mui/material";
import { useState } from "react";

import ExpandableCard from "./ExpandableCard";

const data = [
  {
    title: "Blockfrost",
    description: "Instant and scalable API to the Cardano blockchain.",
    preview: 'require("./builder-tools/blockfrost.png")',
    website: "https://blockfrost.io",
    getstarted: "/docs/get-started/blockfrost",
    tags: ["favorite", "getstarted", "api"],
    releases: [
      {
        version: "0.3.2",
        latest: true,
        dependencies: [
          {
            name: "cardano-node",
            url: "https://github.com/input-output-hk/cardano-node",
          },
        ],
        traits: ["alonzo", "cip31"],
      },
      {
        version: "0.3.1",
        dependencies: [
          {
            name: "cardano-node",
            url: "https://github.com/input-output-hk/cardano-node",
          },
        ],
        traits: ["alonzo"],
      },
    ],
  },
  {
    title: "Cardano Serialization Library",
    description:
      "Library for serialization & deserialization of data structures used in Cardano's Haskell implementation.",
    preview: 'require("./builder-tools/cardano-serialization-lib.png")',
    website: "https://github.com/Emurgo/cardano-serialization-lib",
    getstarted: "/docs/get-started/cardano-serialization-lib/overview",
    tags: ["getstarted", "library", "rust"],
    releases: [
      {
        version: "10.0.0",
        latest: true,
        dependencies: [
          {
            name: "cardano-node",
            url: "https://github.com/input-output-hk/cardano-node",
          },
        ],
        traits: ["babbage", "cip32", "cip33"],
      },
      {
        version: "9.3.0",
        dependencies: [
          {
            name: "cardano-node",
            url: "https://github.com/input-output-hk/cardano-node",
          },
        ],
        traits: ["alonzo", "cip31"],
      },
    ],
  },
  {
    title: "cardanocli-js",
    description: "A library that wraps the cardano-cli in JavaScript.",
    preview: 'require("./builder-tools/cardanocli-js.png")',
    website: "https://github.com/Berry-Pool/cardanocli-js",
    getstarted: "/docs/get-started/cardanocli-js",
    tags: ["getstarted", "library"],
    releases: [
      {
        version: "1.2.1",
        latest: true,
        dependencies: [
          {
            name: "cardano-cli",
            url: "https://github.com/input-output-hk/cardano-cli",
          },
        ],
        traits: ["alonzo", "cip31"],
      },
      {
        version: "1.2.0",
        dependencies: [
          {
            name: "cardano-cli",
            url: "https://github.com/input-output-hk/cardano-cli",
          },
        ],
        traits: ["alonzo"],
      },
    ],
  },
  {
    title: "Dandelion APIs",
    description:
      "Kubernetes-based project to easily deploy Cardano APIs and a free, hosted community service to access all of them instantly.",
    preview: 'require("./builder-tools/dandelion-apis.png")',
    website: "https://gimbalabs.com/dandelion",
    getstarted: "/docs/get-started/dandelion-apis",
    tags: ["getstarted", "api"],
    releases: [
      {
        version: "0.9.0",
        latest: true,
        dependencies: [
          {
            name: "cardano-http-bridge",
            url: "https://github.com/input-output-hk/cardano-http-bridge",
          },
          {
            name: "cardano-node",
            url: "https://github.com/input-output-hk/cardano-node",
          },
        ],
        traits: ["byron", "privacy"],
      },
      {
        version: "0.8.5",
        dependencies: [
          {
            name: "cardano-http-bridge",
            url: "https://github.com/input-output-hk/cardano-http-bridge",
          },
          {
            name: "cardano-node",
            url: "https://github.com/input-output-hk/cardano-node",
          },
        ],
        traits: ["alonzo"],
      },
    ],
  },
  {
    title: "Ogmios",
    description:
      "Ogmios is a lightweight bridge interface (WebSocket + JSON/RPC) for cardano-node.",
    preview: 'require("./builder-tools/ogmios.png")',
    website: "https://ogmios.dev",
    getstarted: "/docs/get-started/ogmios",
    tags: ["bridge", "api"],
    releases: [
      {
        version: "4.3.0",
        latest: true,
        dependencies: [
          {
            name: "ouroboros-network",
            url: "https://github.com/input-output-hk/ouroboros-network",
          },
          {
            name: "cardano-node",
            url: "https://github.com/input-output-hk/cardano-node",
          },
        ],
        traits: ["babbage", "cip32", "cip33"],
      },
      {
        version: "4.2.0",
        dependencies: [
          {
            name: "ouroboros-network",
            url: "https://github.com/input-output-hk/ouroboros-network",
          },
          {
            name: "cardano-node",
            url: "https://github.com/input-output-hk/cardano-node",
          },
        ],
        traits: ["alonzo", "cip31"],
      },
    ],
  },
  {
    title: "Cardano Client Library",
    description:
      "A client library for Cardano in Java. For some features like transaction signing and address generation, it currently uses cardano-serialization-lib rust library through JNI.",
    preview: 'require("./builder-tools/cardano-client-lib.png")',
    website: "https://github.com/bloxbean/cardano-client-lib",
    getstarted: null,
    tags: ["library", "java"],
    releases: [
      {
        version: "2.1.5",
        latest: true,
        dependencies: [
          {
            name: "cardano-node",
            url: "https://github.com/input-output-hk/cardano-node",
          },
        ],
        traits: ["babbage", "alonzo", "cip31", "cip32"],
      },
      {
        version: "2.1.0",
        dependencies: [
          {
            name: "cardano-node",
            url: "https://github.com/input-output-hk/cardano-node",
          },
        ],
        traits: ["alonzo", "cip31"],
      },
    ],
  },
  {
    title: "cardano-addresses TypeScript binding",
    description:
      "This is a Typescript/Javascript version of the cardano-addresses API. It includes a web demo.",
    preview:
      'require("./builder-tools/cardano-addresses-typescript-binding.png")',
    website: "https://www.npmjs.com/package/cardano-addresses",
    getstarted: null,
    tags: ["library", "typescript"],
    releases: [
      {
        version: "1.0.3",
        latest: true,
        dependencies: [
          {
            name: "cardano-addresses",
            url: "https://github.com/input-output-hk/cardano-addresses",
          },
        ],
        traits: ["alonzo", "cip31", "shelley"],
      },
      {
        version: "1.0.2",
        dependencies: [
          {
            name: "cardano-addresses",
            url: "https://github.com/input-output-hk/cardano-addresses",
          },
        ],
        traits: ["shelley", "alonzo"],
      },
    ],
  },
  {
    title: "Heidrun",
    description:
      "A lightweight, event-driven framework for building Cardano-native dApps.",
    preview: 'require("./builder-tools/heidrun.png")',
    website: "https://heidrun.io",
    getstarted: null,
    tags: ["library", "framework"],
    releases: [
      {
        version: "1.5.2",
        latest: true,
        dependencies: [
          {
            name: "cardano-node",
            url: "https://github.com/input-output-hk/cardano-node",
          },
          {
            name: "ouroboros-network",
            url: "https://github.com/input-output-hk/ouroboros-network",
          },
        ],
        traits: ["alonzo", "cip31", "cip32"],
      },
      {
        version: "1.5.1",
        dependencies: [
          {
            name: "cardano-node",
            url: "https://github.com/input-output-hk/cardano-node",
          },
          {
            name: "ouroboros-network",
            url: "https://github.com/input-output-hk/ouroboros-network",
          },
        ],
        traits: ["alonzo", "cip31"],
      },
    ],
  },
  {
    title: "cardano-wallet-js",
    description:
      "A JavaScript library for interacting with the Cardano wallet.",
    preview: 'require("./builder-tools/cardano-wallet-js.png")',
    website: "https://github.com/input-output-hk/cardano-wallet-js",
    getstarted: null,
    tags: ["library", "javascript"],
    releases: [
      {
        version: "2.0.0",
        latest: true,
        dependencies: [
          {
            name: "cardano-wallet",
            url: "https://github.com/input-output-hk/cardano-wallet",
          },
        ],
        traits: ["babbage", "cip32", "cip33"],
      },
      {
        version: "1.5.0",
        dependencies: [
          {
            name: "cardano-wallet",
            url: "https://github.com/input-output-hk/cardano-wallet",
          },
        ],
        traits: ["alonzo", "cip31"],
      },
    ],
  },
  {
    title: "CardanoSharp Wallet",
    description: "A .NET library for interacting with the Cardano blockchain.",
    preview: 'require("./builder-tools/cardanosharp-wallet.png")',
    website: "https://github.com/CardanoSharp/cardanosharp-wallet",
    getstarted: null,
    tags: ["library", "dotnet"],
    releases: [
      {
        version: "3.0.0",
        latest: true,
        dependencies: [
          {
            name: "cardano-node",
            url: "https://github.com/input-output-hk/cardano-node",
          },
          {
            name: "cardano-wallet",
            url: "https://github.com/input-output-hk/cardano-wallet",
          },
        ],
        traits: ["babbage", "cip32"],
      },
      {
        version: "2.5.0",
        dependencies: [
          {
            name: "cardano-node",
            url: "https://github.com/input-output-hk/cardano-node",
          },
          {
            name: "cardano-wallet",
            url: "https://github.com/input-output-hk/cardano-wallet",
          },
        ],
        traits: ["alonzo", "cip31"],
      },
    ],
  },
  {
    title: "Cardano Metadata Oracle",
    description:
      "A framework for creating and managing metadata oracles on the Cardano blockchain.",
    preview: 'require("./builder-tools/cardano-metadata-oracle.png")',
    website: "https://github.com/input-output-hk/cardano-metadata-oracle",
    getstarted: null,
    tags: ["library", "metadata"],
    releases: [
      {
        version: "1.0.1",
        latest: true,
        dependencies: [
          {
            name: "cardano-node",
            url: "https://github.com/input-output-hk/cardano-node",
          },
        ],
        traits: ["alonzo", "cip31"],
      },
      {
        version: "1.0.0",
        dependencies: [
          {
            name: "cardano-node",
            url: "https://github.com/input-output-hk/cardano-node",
          },
        ],
        traits: ["alonzo"],
      },
    ],
  },
  {
    title: "Guild Operators Suite",
    description: "A collection of tools for Cardano stake pool operators.",
    preview: 'require("./builder-tools/guild-operators-suite.png")',
    website: "https://cardano-community.github.io/guild-operators/",
    getstarted: null,
    tags: ["operations", "tools"],
    releases: [
      {
        version: "5.2.0",
        latest: true,
        dependencies: [
          {
            name: "cardano-node",
            url: "https://github.com/input-output-hk/cardano-node",
          },
        ],
        traits: ["babbage", "cip32", "cip33"],
      },
      {
        version: "5.1.0",
        dependencies: [
          {
            name: "cardano-node",
            url: "https://github.com/input-output-hk/cardano-node",
          },
        ],
        traits: ["alonzo", "cip31"],
      },
    ],
  },
  {
    title: "libada-go",
    description: "A Go library for working with the Cardano blockchain.",
    preview: 'require("./builder-tools/libada-go.png")',
    website: "https://github.com/cardano-community/libada-go",
    getstarted: null,
    tags: ["library", "golang"],
    releases: [
      {
        version: "0.3.0",
        latest: true,
        dependencies: [
          {
            name: "cardano-node",
            url: "https://github.com/input-output-hk/cardano-node",
          },
        ],
        traits: ["alonzo", "cip31", "cip32"],
      },
      {
        version: "0.2.5",
        dependencies: [
          {
            name: "cardano-node",
            url: "https://github.com/input-output-hk/cardano-node",
          },
        ],
        traits: ["alonzo"],
      },
    ],
  },
  {
    title: "Pooldata API",
    description: "API service providing detailed information on Cardano pools.",
    preview: 'require("./builder-tools/pooldata-api.png")',
    website: "https://pool.pm",
    getstarted: null,
    tags: ["api", "pools"],
    releases: [
      {
        version: "1.4.0",
        latest: true,
        dependencies: [
          {
            name: "cardano-node",
            url: "https://github.com/input-output-hk/cardano-node",
          },
        ],
        traits: ["babbage", "cip32"],
      },
      {
        version: "1.3.5",
        dependencies: [
          {
            name: "cardano-node",
            url: "https://github.com/input-output-hk/cardano-node",
          },
        ],
        traits: ["alonzo", "cip31"],
      },
    ],
  },
  {
    title: "Python Module",
    description: "A Python module for interacting with the Cardano blockchain.",
    preview: 'require("./builder-tools/python-module.png")',
    website: "https://pypi.org/project/cardano/",
    getstarted: null,
    tags: ["library", "python"],
    releases: [
      {
        version: "0.2.0",
        latest: true,
        dependencies: [
          {
            name: "cardano-node",
            url: "https://github.com/input-output-hk/cardano-node",
          },
        ],
        traits: ["alonzo", "cip31", "cip32"],
      },
      {
        version: "0.1.5",
        dependencies: [
          {
            name: "cardano-node",
            url: "https://github.com/input-output-hk/cardano-node",
          },
        ],
        traits: ["alonzo"],
      },
    ],
  },
  {
    title: "Plutus Playground",
    description: "A web-based environment to write and test Plutus contracts.",
    preview: 'require("./builder-tools/plutus-playground.png")',
    website: "https://playground.plutus.iohkdev.io/",
    getstarted: null,
    tags: ["playground", "plutus"],
    releases: [
      {
        version: "1.7.0",
        latest: true,
        dependencies: [
          {
            name: "cardano-node",
            url: "https://github.com/input-output-hk/cardano-node",
          },
          { name: "plutus", url: "https://github.com/input-output-hk/plutus" },
        ],
        traits: ["alonzo", "cip31", "cip32"],
      },
      {
        version: "1.6.5",
        dependencies: [
          {
            name: "cardano-node",
            url: "https://github.com/input-output-hk/cardano-node",
          },
        ],
        traits: ["alonzo"],
      },
    ],
  },
  {
    title: "Marlowe Playground",
    description: "A web-based environment to write and test Marlowe contracts.",
    preview: 'require("./builder-tools/marlowe-playground.png")',
    website: "https://playground.marlowe.iohkdev.io/",
    getstarted: null,
    tags: ["playground", "marlowe"],
    releases: [
      {
        version: "0.9.0",
        latest: true,
        dependencies: [
          {
            name: "cardano-node",
            url: "https://github.com/input-output-hk/cardano-node",
          },
          {
            name: "marlowe",
            url: "https://github.com/input-output-hk/marlowe",
          },
        ],
        traits: ["alonzo", "cip31", "cip32"],
      },
      {
        version: "0.8.5",
        dependencies: [
          {
            name: "cardano-node",
            url: "https://github.com/input-output-hk/cardano-node",
          },
          {
            name: "marlowe",
            url: "https://github.com/input-output-hk/marlowe",
          },
        ],
        traits: ["alonzo"],
      },
    ],
  },
];

const CardsList = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleExpand = (title) => {
    setExpandedCard(title === expandedCard ? null : title);
  };

  const expandedData = data.find((item) => item.title === expandedCard);

  return (
    <Container sx={{ marginTop: 4 }}>
      <Grid container spacing={3}>
        {expandedCard && (
          <Grid item xs={12}>
            <ExpandableCard
              {...expandedData}
              onExpand={handleExpand}
              expanded={true}
            />
          </Grid>
        )}

        {data.map((item, index) => {
          if (item.title === expandedCard) return null;

          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ExpandableCard
                {...item}
                onExpand={handleExpand}
                expanded={false}
              />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default CardsList;
