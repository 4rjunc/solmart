/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/solmart.json`.
 */
export type Solmart = {
  "address": "HL4kgSUiSG7CaC7GojG1UGt7zA6MeSqoBcXH9bjvDpu1",
  "metadata": {
    "name": "solmart",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "addInvoiceLink",
      "discriminator": [
        179,
        150,
        183,
        161,
        197,
        100,
        95,
        126
      ],
      "accounts": [
        {
          "name": "merchantData",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  114,
                  99,
                  104,
                  97,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true,
          "relations": [
            "merchantData"
          ]
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "cidHash",
          "type": "string"
        },
        {
          "name": "txSignature",
          "type": "string"
        }
      ]
    },
    {
      "name": "initializeMerchant",
      "discriminator": [
        7,
        90,
        74,
        38,
        99,
        111,
        142,
        77
      ],
      "accounts": [
        {
          "name": "merchantData",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  114,
                  99,
                  104,
                  97,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "merchantData",
      "discriminator": [
        56,
        192,
        70,
        28,
        212,
        51,
        231,
        149
      ]
    }
  ],
  "types": [
    {
      "name": "invoiceLink",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "cidHash",
            "type": "string"
          },
          {
            "name": "txSignature",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "merchantData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "invoiceCount",
            "type": "u32"
          },
          {
            "name": "invoiceLinks",
            "type": {
              "vec": {
                "defined": {
                  "name": "invoiceLink"
                }
              }
            }
          }
        ]
      }
    }
  ]
};
