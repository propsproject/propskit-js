define({ "api": [  {    "type": "",    "url": "ActivityPayload",    "title": "ActivityPayload",    "name": "ActivityPayload",    "group": "Interfaces",    "success": {      "examples": [        {          "title": "interface ActivityPayload ",          "content": "interface ActivityPayload \n{\n   userId: string;\n   applicationId: string;\n   date: number;\n   timestamp: number;\n }",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "lib/payloads/activity_payload.ts",    "groupTitle": "Interfaces"  },  {    "type": "",    "url": "AppUserBalance",    "title": "AppUserBalance",    "name": "AppUserBalance",    "group": "Interfaces",    "success": {      "examples": [        {          "title": "interface ApplicationUserBalance",          "content": "interface ApplicationUserBalance\n{\n   userId: string;\n   applicationId: string;\n   pending: string; // bigNumber\n   totalPending: string; // bigNumber\n   transferable: string; // bigNumber\n   bonded: string; // bigNumber\n   delegated: string; // bigNumber\n   delegatedTo: string; // address\n   total: string; // bigNumber = APP Power = totalPending + transferable + delegated\n   timestamp: number;\n   linkedWallet: string;\n   lastUpdateType: number;\n   type: number;\n }",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "lib/transaction_manager.ts",    "groupTitle": "Interfaces"  },  {    "type": "",    "url": "ApplicationUser",    "title": "ApplicationUser",    "name": "ApplicationUser",    "group": "Interfaces",    "success": {      "examples": [        {          "title": "interface ApplicationUser",          "content": "interface ApplicationUser\n{\n   userId: string;\n   applicationId: string;\n }",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "lib/transaction_manager.ts",    "groupTitle": "Interfaces"  },  {    "type": "",    "url": "TransactionPayload",    "title": "TransactionPayload",    "name": "TransactionPayload",    "group": "Interfaces",    "success": {      "examples": [        {          "title": "interface TransactionPayload ",          "content": "interface TransactionPayload \n{\n   transactionType: Method;\n   userId: string;\n   applicationId: string;\n   amount: number;\n   timestamp?: number;\n   description: string;\n   adminDescription?: string;\n   fraudPeriod?: number;\n   userDescription?: string;\n }",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "lib/payloads/transaction_payload.ts",    "groupTitle": "Interfaces"  },  {    "type": "",    "url": "WalletBalance",    "title": "WalletBalance",    "name": "WalletBalance",    "group": "Interfaces",    "success": {      "examples": [        {          "title": "interface WalletBalance",          "content": "interface WalletBalance\n{\n   wallet: string;\n   pending: string; // bigNumber\n   totalPending: string; // bigNumber\n   transferable: string; // bigNumber\n   bonded: string; // bigNumber\n   delegated: string; // bigNumber\n   delegatedTo: string; // address\n   total: string; // bigNumber = APP Power = totalPending + transferable + delegated\n   timestamp: number;\n   linkedWallet: string;\n   lastUpdateType: number;\n   type: number;\n }",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "lib/transaction_manager.ts",    "groupTitle": "Interfaces"  },  {    "type": "",    "url": "WalletLinkPayload",    "title": "WalletLinkPayload",    "name": "WalletLinkPayload",    "group": "Interfaces",    "success": {      "examples": [        {          "title": "interface WalletLinkPayload",          "content": "interface WalletLinkPayload\n{\n   userId: string;\n   applicationId: string;\n   address: string;\n   signature: string;\n }",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "lib/payloads/wallet_link_payload.ts",    "groupTitle": "Interfaces"  },  {    "type": "",    "url": "addressLookup",    "title": "addressLookup",    "description": "<p>Get data stored at a specific sidechain state address</p>",    "name": "addressLookup",    "group": "TransactionManager_Utils",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "string",            "optional": false,            "field": "address",            "description": "<p>Sidechain state address</p>"          },          {            "group": "Parameter",            "type": "string",            "optional": false,            "field": "type",            "description": "<p>TRANSACTION | LASTETHBLOCK | BALANCE | WALLETLINK | ACTIVITY_LOG | SETTLEMENT | BALANCE_UPDATE</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Promise<any>",          "content": "The protobuffer representing the object",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "lib/transaction_manager.ts",    "groupTitle": "TransactionManager_Utils"  },  {    "type": "",    "url": "commitTransactions",    "title": "commitTransactions",    "description": "<p>Submit transactions accumaleted when used with setAccumulateTransactions api</p>",    "name": "commitTransactions",    "group": "TransactionManager_Utils",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "string",            "optional": false,            "field": "pk",            "description": "<p>Private key used to sign the transactions for the sidechain</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Promise<boolean>",          "content": "response from sidechain can be retrieved upon success with getSubmitResponse API",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "lib/transaction_manager.ts",    "groupTitle": "TransactionManager_Utils"  },  {    "type": "",    "url": "getBalanceByAppUser",    "title": "getBalanceByAppUser",    "description": "<p>Get an application user balance object</p>",    "name": "getBalanceByAppUser",    "group": "TransactionManager_Utils",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "string",            "optional": false,            "field": "applicationId",            "description": ""          },          {            "group": "Parameter",            "type": "string",            "optional": false,            "field": "userId",            "description": ""          }        ]      }    },    "success": {      "examples": [        {          "title": "Promise<AppUserBalance>",          "content": ".",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "lib/transaction_manager.ts",    "groupTitle": "TransactionManager_Utils"  },  {    "type": "",    "url": "getBalanceByWallet",    "title": "getBalanceByWallet",    "description": "<p>Get a wallet balance object</p>",    "name": "getBalanceByWallet",    "group": "TransactionManager_Utils",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "string",            "optional": false,            "field": "wallet",            "description": ""          }        ]      }    },    "success": {      "examples": [        {          "title": "Promise<WalletBalance>",          "content": ".",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "lib/transaction_manager.ts",    "groupTitle": "TransactionManager_Utils"  },  {    "type": "",    "url": "getLatestEthBlockId",    "title": "getLatestEthBlockId",    "description": "<p>Retreive the last synched Ethereum block id</p>",    "name": "getLatestEthBlockId",    "group": "TransactionManager_Utils",    "success": {      "examples": [        {          "title": "Promise<number>",          "content": "Etheruem block number",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "lib/transaction_manager.ts",    "groupTitle": "TransactionManager_Utils"  },  {    "type": "",    "url": "getLinkedWalletApplicationUsers",    "title": "getLinkedWalletApplicationUsers",    "description": "<p>Get list of application user objects linked to a wallet link address</p>",    "name": "getLinkedWalletApplicationUsers",    "group": "TransactionManager_Utils",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "string",            "optional": false,            "field": "walletLinkAddress",            "description": "<p>The wallet link address on the sidechain can be calculated using getWalletLinkAddress API</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Promise<ApplicationUser[]>",          "content": ".",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "lib/transaction_manager.ts",    "groupTitle": "TransactionManager_Utils"  },  {    "type": "",    "url": "recoverFromSignature",    "title": "recoverFromSignature",    "description": "<p>Recovers the accountn address from the message signed and the signature</p>",    "name": "recoverFromSignature",    "group": "TransactionManager_Utils",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "string",            "optional": false,            "field": "msg",            "description": "<p>Message that was signed</p>"          },          {            "group": "Parameter",            "type": "string",            "optional": false,            "field": "sig",            "description": "<p>Signed message</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "string",          "content": "address",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "lib/transaction_manager.ts",    "groupTitle": "TransactionManager_Utils"  },  {    "type": "",    "url": "setAccumulateTransactions",    "title": "setAccumulateTransactions",    "description": "<p>By turning this on you can create many transactions and later commit them with commitTransactions api</p>",    "name": "setAccumulateTransactions",    "group": "TransactionManager_Utils",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "boolean",            "optional": false,            "field": "b",            "description": "<p>Turn on or off. By default this is off.</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "lib/transaction_manager.ts",    "groupTitle": "TransactionManager_Utils"  },  {    "type": "",    "url": "signMessage",    "title": "signMessage",    "description": "<p>Signs an Ethereum style message using web3</p>",    "name": "signMessage",    "group": "TransactionManager_Utils",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "string",            "optional": false,            "field": "msg",            "description": "<p>Message to be signed</p>"          },          {            "group": "Parameter",            "type": "string",            "optional": false,            "field": "address",            "description": "<p>Address which belongs to this private key</p>"          },          {            "group": "Parameter",            "type": "string",            "optional": false,            "field": "pk",            "description": "<p>Private key used to sign the msg</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "string",          "content": "signature",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "lib/transaction_manager.ts",    "groupTitle": "TransactionManager_Utils"  },  {    "type": "",    "url": "submitActivityLog",    "title": "submitActivityLog",    "description": "<p>Submits a daily application user activity</p>",    "name": "submitActivityLog",    "group": "TransactionManager",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "string",            "optional": false,            "field": "pk",            "description": "<p>Private key used to sign the transactions for the sidechain</p>"          },          {            "group": "Parameter",            "type": "ActivityPayload[]",            "optional": false,            "field": "activityPayloads",            "description": "<p>wallet address to link</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Promise<boolean>",          "content": ".",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "lib/transaction_manager.ts",    "groupTitle": "TransactionManager"  },  {    "type": "",    "url": "submitBalanceUpdateTransaction",    "title": "submitBalanceUpdateTransaction",    "description": "<p>Submits an etheruem transfer balance update transaction to the sidechain</p>",    "name": "submitBalanceUpdateTransaction",    "group": "TransactionManager",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "string",            "optional": false,            "field": "pk",            "description": "<p>Private key used to sign the transactions for the sidechain</p>"          },          {            "group": "Parameter",            "type": "string",            "optional": false,            "field": "address",            "description": "<p>Wallet address</p>"          },          {            "group": "Parameter",            "type": "string",            "optional": false,            "field": "addressBalance",            "description": "<p>Balance of the wallet address (BigNumber)</p>"          },          {            "group": "Parameter",            "type": "string",            "optional": false,            "field": "txHash",            "description": "<p>Ethereum transaction hash</p>"          },          {            "group": "Parameter",            "type": "number",            "optional": false,            "field": "blockId",            "description": "<p>Ethereum block number of the above transaction hash / balance update</p>"          },          {            "group": "Parameter",            "type": "number",            "optional": false,            "field": "timestamp",            "description": "<p>Ethereum block timestamp of the above transaction hash / balance update</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Promise<boolean>",          "content": ".",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "lib/transaction_manager.ts",    "groupTitle": "TransactionManager"  },  {    "type": "",    "url": "submitIssueTransaction",    "title": "submitIssueTransaction",    "description": "<p>Submits an issue transaction to the sidechain</p>",    "name": "submitIssueTransaction",    "group": "TransactionManager",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "string",            "optional": false,            "field": "pk",            "description": "<p>Private key used to sign the transactions for the sidechain</p>"          },          {            "group": "Parameter",            "type": "TransactionPayload[]",            "optional": false,            "field": "payloads",            "description": "<p>Payload for issue transaction</p>"          },          {            "group": "Parameter",            "type": "number",            "optional": false,            "field": "timestamp",            "description": "<p>Timestamp of the transaction</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Promise<boolean>",          "content": ".",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "lib/transaction_manager.ts",    "groupTitle": "TransactionManager"  },  {    "type": "",    "url": "submitLinkWalletTransaction",    "title": "submitLinkWalletTransaction",    "description": "<p>Submits the wallet and signature to connect an application user to a wallet</p>",    "name": "submitLinkWalletTransaction",    "group": "TransactionManager",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "string",            "optional": false,            "field": "pk",            "description": "<p>Private key used to sign the transactions for the sidechain</p>"          },          {            "group": "Parameter",            "type": "WalletLinkPayload",            "optional": false,            "field": "payload",            "description": ""          }        ]      }    },    "success": {      "examples": [        {          "title": "Promise<boolean>",          "content": ".",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "lib/transaction_manager.ts",    "groupTitle": "TransactionManager"  },  {    "type": "",    "url": "submitNewEthBlockIdTransaction",    "title": "submitNewEthBlockIdTransaction",    "description": "<p>Submits the Ethereum blockId and timestamp which was lastly synched</p>",    "name": "submitNewEthBlockIdTransaction",    "group": "TransactionManager",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "string",            "optional": false,            "field": "pk",            "description": "<p>Private key used to sign the transactions for the sidechain</p>"          },          {            "group": "Parameter",            "type": "number",            "optional": false,            "field": "blockId",            "description": "<p>Block number on Ethereum</p>"          },          {            "group": "Parameter",            "type": "number",            "optional": false,            "field": "timestamp",            "description": "<p>Timestamp of the last block id</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Promise<boolean>",          "content": ".",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "lib/transaction_manager.ts",    "groupTitle": "TransactionManager"  },  {    "type": "",    "url": "submitRevokeTransaction",    "title": "submitRevokeTransaction",    "description": "<p>Submits a revoke transaction to the sidechain</p>",    "name": "submitRevokeTransaction",    "group": "TransactionManager",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "string",            "optional": false,            "field": "pk",            "description": "<p>Private key used to sign the transactions for the sidechain</p>"          },          {            "group": "Parameter",            "type": "TransactionPayload[]",            "optional": false,            "field": "payloads",            "description": "<p>Payload for revoke transaction</p>"          },          {            "group": "Parameter",            "type": "number",            "optional": false,            "field": "timestamp",            "description": "<p>Timestamp of the transaction</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Promise<boolean>",          "content": ".",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "lib/transaction_manager.ts",    "groupTitle": "TransactionManager"  },  {    "type": "",    "url": "submitSettlementTransaction",    "title": "submitSettlementTransaction",    "description": "<p>Submits an etheruem settlement transactions to generate a settlement</p>",    "name": "submitSettlementTransaction",    "group": "TransactionManager",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "string",            "optional": false,            "field": "pk",            "description": "<p>Private key used to sign the transactions for the sidechain</p>"          },          {            "group": "Parameter",            "type": "string",            "optional": false,            "field": "applicationId",            "description": ""          },          {            "group": "Parameter",            "type": "string",            "optional": false,            "field": "userId",            "description": ""          },          {            "group": "Parameter",            "type": "string",            "optional": false,            "field": "amount",            "description": "<p>(BigNumber)</p>"          },          {            "group": "Parameter",            "type": "string",            "optional": false,            "field": "toAddress",            "description": "<p>user's wallet address</p>"          },          {            "group": "Parameter",            "type": "string",            "optional": false,            "field": "fromAddress",            "description": "<p>application's rewards address</p>"          },          {            "group": "Parameter",            "type": "string",            "optional": false,            "field": "txHash",            "description": "<p>Ethereum transaction hash</p>"          },          {            "group": "Parameter",            "type": "number",            "optional": false,            "field": "blockId",            "description": "<p>Ethereum block number of the above transaction hash / balance update</p>"          },          {            "group": "Parameter",            "type": "number",            "optional": false,            "field": "timestamp",            "description": "<p>Ethereum block timestamp of the above transaction hash / balance update</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Promise<boolean>",          "content": ".",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "lib/transaction_manager.ts",    "groupTitle": "TransactionManager"  }] });
