/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/merchant_transaction_history.json`.
 */
export type MerchantTransactionHistory = {
  "address": "HL4kgSUiSG7CaC7GojG1UGt7zA6MeSqoBcXH9bjvDpu1",
  "metadata": {
    "name": "merchantTransactionHistory",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "addTransaction",
      "discriminator": [
        48,
        96,
        174,
        112,
        81,
        30,
        239,
        89
      ],
      "accounts": [
        {
          "name": "transaction",
          "writable": true,
          "signer": true
        },
        {
          "name": "merchant",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "productName",
          "type": "string"
        },
        {
          "name": "quantity",
          "type": "u64"
        },
        {
          "name": "price",
          "type": "u64"
        },
        {
          "name": "totalPrice",
          "type": "u64"
        },
        {
          "name": "solPaid",
          "type": "u64"
        }
      ]
    },
    {
      "name": "getTransaction",
      "discriminator": [
        179,
        57,
        34,
        95,
        37,
        52,
        122,
        47
      ],
      "accounts": [
        {
          "name": "transaction"
        }
      ],
      "args": [],
      "returns": {
        "defined": {
          "name": "transactionDetails"
        }
      }
    }
  ],
  "accounts": [
    {
      "name": "transaction",
      "discriminator": [
        11,
        24,
        174,
        129,
        203,
        117,
        242,
        23
      ]
    }
  ],
  "types": [
    {
      "name": "transaction",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "merchant",
            "type": "pubkey"
          },
          {
            "name": "productName",
            "type": "string"
          },
          {
            "name": "quantity",
            "type": "u64"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "totalPrice",
            "type": "u64"
          },
          {
            "name": "solPaid",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "transactionDetails",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "merchant",
            "type": "pubkey"
          },
          {
            "name": "productName",
            "type": "string"
          },
          {
            "name": "quantity",
            "type": "u64"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "totalPrice",
            "type": "u64"
          },
          {
            "name": "solPaid",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    }
  ]
};
