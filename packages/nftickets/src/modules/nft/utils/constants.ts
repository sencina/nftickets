export const NFTicket1155Artifact = {
  _format: 'hh-sol-artifact-1',
  contractName: 'NFTicket1155',
  sourceName: 'contracts/NFTicket1155.sol',
  abi: [
    {
      inputs: [
        {
          internalType: 'string',
          name: 'uri_',
          type: 'string',
        },
        {
          internalType: 'string[]',
          name: '_sectors',
          type: 'string[]',
        },
        {
          internalType: 'uint256[]',
          name: '_capacity',
          type: 'uint256[]',
        },
        {
          internalType: 'uint256',
          name: '_maxMintPerTransaction',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'balance',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'needed',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'ERC1155InsufficientBalance',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'approver',
          type: 'address',
        },
      ],
      name: 'ERC1155InvalidApprover',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'idsLength',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'valuesLength',
          type: 'uint256',
        },
      ],
      name: 'ERC1155InvalidArrayLength',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
      ],
      name: 'ERC1155InvalidOperator',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'receiver',
          type: 'address',
        },
      ],
      name: 'ERC1155InvalidReceiver',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
      ],
      name: 'ERC1155InvalidSender',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
      ],
      name: 'ERC1155MissingApprovalForAll',
      type: 'error',
    },
    {
      inputs: [],
      name: 'ERC1167FailedCreateClone',
      type: 'error',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'bool',
          name: 'approved',
          type: 'bool',
        },
      ],
      name: 'ApprovalForAll',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'strategyId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'implementation',
          type: 'address',
        },
      ],
      name: 'StrategyRegistered',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'id',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'sectorId',
          type: 'uint256',
        },
      ],
      name: 'TokenMinted',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'strategyId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'bytes',
          name: 'initData',
          type: 'bytes',
        },
      ],
      name: 'TokenStrategySet',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256[]',
          name: 'ids',
          type: 'uint256[]',
        },
        {
          indexed: false,
          internalType: 'uint256[]',
          name: 'values',
          type: 'uint256[]',
        },
      ],
      name: 'TransferBatch',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'id',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'TransferSingle',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'string',
          name: 'value',
          type: 'string',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'id',
          type: 'uint256',
        },
      ],
      name: 'URI',
      type: 'event',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'authenticate',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'id',
          type: 'uint256',
        },
      ],
      name: 'balanceOf',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address[]',
          name: 'accounts',
          type: 'address[]',
        },
        {
          internalType: 'uint256[]',
          name: 'ids',
          type: 'uint256[]',
        },
      ],
      name: 'balanceOfBatch',
      outputs: [
        {
          internalType: 'uint256[]',
          name: '',
          type: 'uint256[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          internalType: 'uint256[]',
          name: 'sectorIds',
          type: 'uint256[]',
        },
        {
          internalType: 'string[]',
          name: 'metadataURIs',
          type: 'string[]',
        },
      ],
      name: 'batchMint',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          internalType: 'uint256[]',
          name: 'sectorIds',
          type: 'uint256[]',
        },
        {
          internalType: 'uint256[]',
          name: 'amounts',
          type: 'uint256[]',
        },
        {
          internalType: 'string[]',
          name: 'metadataURIs',
          type: 'string[]',
        },
        {
          internalType: 'uint256[]',
          name: 'strategyIds',
          type: 'uint256[]',
        },
        {
          internalType: 'bytes[]',
          name: 'initDatas',
          type: 'bytes[]',
        },
      ],
      name: 'batchMint',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256[]',
          name: 'ids',
          type: 'uint256[]',
        },
        {
          internalType: 'uint256[]',
          name: 'amounts',
          type: 'uint256[]',
        },
        {
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
      ],
      name: 'batchTransferWithStrategy',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'id',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'burn',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          internalType: 'uint256[]',
          name: 'ids',
          type: 'uint256[]',
        },
        {
          internalType: 'uint256[]',
          name: 'values',
          type: 'uint256[]',
        },
      ],
      name: 'burnBatch',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'capacities',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'currentId',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getCurrentId',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'getTokenURI',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
      ],
      name: 'isApprovedForAll',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'isAuthenticated',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'isTokenUsed',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'maxMintPerTransaction',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'sector',
          type: 'uint256',
        },
        {
          internalType: 'string',
          name: 'metadataURI',
          type: 'string',
        },
      ],
      name: 'mint',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'nextStrategyId',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'implementation',
          type: 'address',
        },
      ],
      name: 'registerStrategy',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256[]',
          name: 'ids',
          type: 'uint256[]',
        },
        {
          internalType: 'uint256[]',
          name: 'amounts',
          type: 'uint256[]',
        },
        {
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
      ],
      name: 'safeBatchTransferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'id',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
      ],
      name: 'safeTransferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'sectors',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          internalType: 'bool',
          name: 'approved',
          type: 'bool',
        },
      ],
      name: 'setApprovalForAll',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'newuri',
          type: 'string',
        },
      ],
      name: 'setBaseURI',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_maxMintPerTransaction',
          type: 'uint256',
        },
      ],
      name: 'setMaxMintPerTransaction',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'strategyId',
          type: 'uint256',
        },
        {
          internalType: 'bytes',
          name: 'initData',
          type: 'bytes',
        },
      ],
      name: 'setTokenTransferStrategy',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'strategyImplementations',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes4',
          name: 'interfaceId',
          type: 'bytes4',
        },
      ],
      name: 'supportsInterface',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'ticketsIssuedBySector',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'tokenIdToSectorId',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'tokenStrategyContracts',
      outputs: [
        {
          internalType: 'contract ITransferStrategy',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'id',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
      ],
      name: 'transferWithStrategy',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'uri',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ],
  bytecode:
    '0x60806040523480156200001157600080fd5b5060405162006513380380620065138339818101604052810190620000379190620006bf565b836200004981620001c960201b60201c565b5083600f90816200005b9190620009cf565b5033600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060006004819055506001600c819055508060058190555060005b83518110156200014457838181518110620000d757620000d662000ab6565b5b6020026020010151600660008381526020019081526020016000209081620001009190620009cf565b5082818151811062000117576200011662000ab6565b5b602002602001015160076000838152602001908152602001600020819055508080600101915050620000b7565b5062000181604051620001579062000303565b604051809103906000f08015801562000174573d6000803e3d6000fd5b50620001de60201b60201c565b50620001be604051620001949062000311565b604051809103906000f080158015620001b1573d6000803e3d6000fd5b50620001de60201b60201c565b505050505062000c46565b8060029081620001da9190620009cf565b5050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160362000251576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620002489062000b46565b60405180910390fd5b6000600c6000815480929190620002689062000b97565b91905055905082600b600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550807fa681544f91d5d9e3c40b0939a43ef1ca39f3eeeab6438e5e2b7ae27d1b39599284604051620002f2919062000c29565b60405180910390a280915050919050565b6103c28062005d9383390190565b6103be806200615583390190565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b62000388826200033d565b810181811067ffffffffffffffff82111715620003aa57620003a96200034e565b5b80604052505050565b6000620003bf6200031f565b9050620003cd82826200037d565b919050565b600067ffffffffffffffff821115620003f057620003ef6200034e565b5b620003fb826200033d565b9050602081019050919050565b60005b83811015620004285780820151818401526020810190506200040b565b60008484015250505050565b60006200044b6200044584620003d2565b620003b3565b9050828152602081018484840111156200046a576200046962000338565b5b6200047784828562000408565b509392505050565b600082601f83011262000497576200049662000333565b5b8151620004a984826020860162000434565b91505092915050565b600067ffffffffffffffff821115620004d057620004cf6200034e565b5b602082029050602081019050919050565b600080fd5b6000620004fd620004f784620004b2565b620003b3565b90508083825260208201905060208402830185811115620005235762000522620004e1565b5b835b818110156200057157805167ffffffffffffffff8111156200054c576200054b62000333565b5b8086016200055b89826200047f565b8552602085019450505060208101905062000525565b5050509392505050565b600082601f83011262000593576200059262000333565b5b8151620005a5848260208601620004e6565b91505092915050565b600067ffffffffffffffff821115620005cc57620005cb6200034e565b5b602082029050602081019050919050565b6000819050919050565b620005f281620005dd565b8114620005fe57600080fd5b50565b6000815190506200061281620005e7565b92915050565b60006200062f6200062984620005ae565b620003b3565b90508083825260208201905060208402830185811115620006555762000654620004e1565b5b835b818110156200068257806200066d888262000601565b84526020840193505060208101905062000657565b5050509392505050565b600082601f830112620006a457620006a362000333565b5b8151620006b684826020860162000618565b91505092915050565b60008060008060808587031215620006dc57620006db62000329565b5b600085015167ffffffffffffffff811115620006fd57620006fc6200032e565b5b6200070b878288016200047f565b945050602085015167ffffffffffffffff8111156200072f576200072e6200032e565b5b6200073d878288016200057b565b935050604085015167ffffffffffffffff8111156200076157620007606200032e565b5b6200076f878288016200068c565b9250506060620007828782880162000601565b91505092959194509250565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620007e157607f821691505b602082108103620007f757620007f662000799565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620008617fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000822565b6200086d868362000822565b95508019841693508086168417925050509392505050565b6000819050919050565b6000620008b0620008aa620008a484620005dd565b62000885565b620005dd565b9050919050565b6000819050919050565b620008cc836200088f565b620008e4620008db82620008b7565b8484546200082f565b825550505050565b600090565b620008fb620008ec565b62000908818484620008c1565b505050565b5b81811015620009305762000924600082620008f1565b6001810190506200090e565b5050565b601f8211156200097f576200094981620007fd565b620009548462000812565b8101602085101562000964578190505b6200097c620009738562000812565b8301826200090d565b50505b505050565b600082821c905092915050565b6000620009a46000198460080262000984565b1980831691505092915050565b6000620009bf838362000991565b9150826002028217905092915050565b620009da826200078e565b67ffffffffffffffff811115620009f657620009f56200034e565b5b62000a028254620007c8565b62000a0f82828562000934565b600060209050601f83116001811462000a47576000841562000a32578287015190505b62000a3e8582620009b1565b86555062000aae565b601f19841662000a5786620007fd565b60005b8281101562000a815784890151825560018201915060208501945060208101905062000a5a565b8683101562000aa1578489015162000a9d601f89168262000991565b8355505b6001600288020188555050505b505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600082825260208201905092915050565b7f496e76616c696420696d706c656d656e746174696f6e00000000000000000000600082015250565b600062000b2e60168362000ae5565b915062000b3b8262000af6565b602082019050919050565b6000602082019050818103600083015262000b618162000b1f565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600062000ba482620005dd565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820362000bd95762000bd862000b68565b5b600182019050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600062000c118262000be4565b9050919050565b62000c238162000c04565b82525050565b600060208201905062000c40600083018462000c18565b92915050565b61513d8062000c566000396000f3fe608060405234801561001057600080fd5b50600436106102055760003560e01c8063893b45e91161011a578063d3fc9864116100ad578063f242432a1161007c578063f242432a14610644578063f2439f0c14610660578063f4c37b9b14610690578063f5298aca146106c0578063f5c2c430146106dc57610205565b8063d3fc9864146105be578063e00dd161146105da578063e985e9c5146105f8578063eb602a0d1461062857610205565b80639caea80a116100e95780639caea80a14610526578063a22cb46514610542578063accf25c11461055e578063ae1890781461058e57610205565b8063893b45e9146104785780638da5cb5b146104a85780639006b7a6146104c657806395cdca12146104f657610205565b80633bb3a24d1161019d578063646a2bb61161016c578063646a2bb6146103ea5780636590770f146104065780636b20c454146104225780636c1438621461043e5780637d28934a1461045c57610205565b80633bb3a24d1461033e5780633ff364931461036e5780634e1273f41461039e57806355f804b3146103ce57610205565b8063185f8447116101d9578063185f8447146102b8578063267a8998146102d65780632e6cebe5146103065780632eb2c2d61461032257610205565b8062fdd58e1461020a57806301f569971461023a57806301ffc9a7146102585780630e89341c14610288575b600080fd5b610224600480360381019061021f9190613661565b61070c565b60405161023191906136b0565b60405180910390f35b610242610766565b60405161024f91906136b0565b60405180910390f35b610272600480360381019061026d9190613723565b61076c565b60405161027f919061376b565b60405180910390f35b6102a2600480360381019061029d9190613786565b61084e565b6040516102af9190613843565b60405180910390f35b6102c0610997565b6040516102cd91906136b0565b60405180910390f35b6102f060048036038101906102eb9190613786565b61099d565b6040516102fd91906136b0565b60405180910390f35b610320600480360381019061031b9190613786565b6109b5565b005b61033c60048036038101906103379190613a62565b610a4f565b005b61035860048036038101906103539190613786565b610c32565b6040516103659190613843565b60405180910390f35b61038860048036038101906103839190613786565b610c44565b6040516103959190613843565b60405180910390f35b6103b860048036038101906103b39190613bf4565b610ce4565b6040516103c59190613d2a565b60405180910390f35b6103e860048036038101906103e39190613ded565b610ded565b005b61040460048036038101906103ff9190613a62565b610e90565b005b610420600480360381019061041b9190613e36565b611073565b005b61043c60048036038101906104379190613ea5565b61140f565b005b6104466114bb565b60405161045391906136b0565b60405180910390f35b61047660048036038101906104719190613f30565b6114c5565b005b610492600480360381019061048d9190613786565b611640565b60405161049f9190613fd6565b60405180910390f35b6104b0611673565b6040516104bd9190613fd6565b60405180910390f35b6104e060048036038101906104db9190613786565b611699565b6040516104ed91906136b0565b60405180910390f35b610510600480360381019061050b9190613661565b6116b1565b60405161051d919061376b565b60405180910390f35b610540600480360381019061053b91906140d2565b61172c565b005b61055c60048036038101906105579190614189565b611920565b005b61057860048036038101906105739190613786565b611936565b60405161058591906136b0565b60405180910390f35b6105a860048036038101906105a39190613786565b61194e565b6040516105b5919061376b565b60405180910390f35b6105d860048036038101906105d391906141c9565b611978565b005b6105e2611c64565b6040516105ef91906136b0565b60405180910390f35b610612600480360381019061060d9190614238565b611c6a565b60405161061f919061376b565b60405180910390f35b610642600480360381019061063d9190614359565b611cfe565b005b61065e60048036038101906106599190613f30565b61223b565b005b61067a60048036038101906106759190613786565b6123b6565b604051610687919061376b565b60405180910390f35b6106aa60048036038101906106a59190613786565b6123d6565b6040516106b791906144d1565b60405180910390f35b6106da60048036038101906106d591906144ec565b612409565b005b6106f660048036038101906106f1919061453f565b6124b5565b60405161070391906136b0565b60405180910390f35b600080600083815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60055481565b60007fd9b67a26000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061083757507f0e89341c000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806108475750610846826125d3565b5b9050919050565b60606000600e600084815260200190815260200160002080546108709061459b565b80601f016020809104026020016040519081016040528092919081815260200182805461089c9061459b565b80156108e95780601f106108be576101008083540402835291602001916108e9565b820191906000526020600020905b8154815290600101906020018083116108cc57829003601f168201915b505050505090506000815111156109035780915050610992565b600f80546109109061459b565b80601f016020809104026020016040519081016040528092919081815260200182805461093c9061459b565b80156109895780601f1061095e57610100808354040283529160200191610989565b820191906000526020600020905b81548152906001019060200180831161096c57829003601f168201915b50505050509150505b919050565b600c5481565b60096020528060005260406000206000915090505481565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610a45576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a3c9061463e565b60405180910390fd5b8060058190555050565b60005b8351811015610c1d576000600a6000868481518110610a7457610a7361465e565b5b6020026020010151815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610b1c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b13906146d9565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1663a02ff6858888888681518110610b4d57610b4c61465e565b5b6020026020010151888781518110610b6857610b6761465e565b5b60200260200101516040518563ffffffff1660e01b8152600401610b8f94939291906146f9565b602060405180830381865afa158015610bac573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bd09190614753565b610c0f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c06906147cc565b60405180910390fd5b508080600101915050610a52565b50610c2b858585858561263d565b5050505050565b6060610c3d8261084e565b9050919050565b60066020528060005260406000206000915090508054610c639061459b565b80601f0160208091040260200160405190810160405280929190818152602001828054610c8f9061459b565b8015610cdc5780601f10610cb157610100808354040283529160200191610cdc565b820191906000526020600020905b815481529060010190602001808311610cbf57829003601f168201915b505050505081565b60608151835114610d3057815183516040517f5b059991000000000000000000000000000000000000000000000000000000008152600401610d279291906147ec565b60405180910390fd5b6000835167ffffffffffffffff811115610d4d57610d4c61386a565b5b604051908082528060200260200182016040528015610d7b5781602001602082028036833780820191505090505b50905060005b8451811015610de257610db8610da082876126e590919063ffffffff16565b610db383876126f990919063ffffffff16565b61070c565b828281518110610dcb57610dca61465e565b5b602002602001018181525050806001019050610d81565b508091505092915050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610e7d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e749061463e565b60405180910390fd5b80600f9081610e8c91906149b7565b5050565b60005b835181101561105e576000600a6000868481518110610eb557610eb461465e565b5b6020026020010151815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610f5d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f54906146d9565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1663a02ff6858888888681518110610f8e57610f8d61465e565b5b6020026020010151888781518110610fa957610fa861465e565b5b60200260200101516040518563ffffffff1660e01b8152600401610fd094939291906146f9565b602060405180830381865afa158015610fed573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110119190614753565b611050576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611047906147cc565b60405180910390fd5b508080600101915050610e93565b5061106c8585858585610a4f565b5050505050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611103576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110fa9061463e565b60405180910390fd5b6000600b600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036111aa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111a190614ad5565b60405180910390fd5b60006111cb8273ffffffffffffffffffffffffffffffffffffffff1661270d565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361123c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161123390614b41565b60405180910390fd5b60008360405160240161124f9190614bb6565b6040516020818303038152906040527f439fab91000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050905060008273ffffffffffffffffffffffffffffffffffffffff16826040516112f59190614c14565b6000604051808303816000865af19150503d8060008114611332576040519150601f19603f3d011682016040523d82523d6000602084013e611337565b606091505b505090508061137b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161137290614c77565b60405180910390fd5b82600a600089815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555085877fac00a50a9bc0f28664b8669296466c465a838cb4e57c7b96e6eeb87fa59e6ad3876040516113fe9190614bb6565b60405180910390a350505050505050565b6114176127be565b73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614158015611460575061145e836114596127be565b611c6a565b155b156114ab5761146d6127be565b836040517fe237d9220000000000000000000000000000000000000000000000000000000081526004016114a2929190614c97565b60405180910390fd5b6114b68383836127c6565b505050565b6000600454905090565b6000600a600085815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361156c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611563906146d9565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1663a02ff685878787876040518563ffffffff1660e01b81526004016115ab94939291906146f9565b602060405180830381865afa1580156115c8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115ec9190614753565b61162b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611622906147cc565b60405180910390fd5b611638868686868661223b565b505050505050565b600b6020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60076020528060005260406000206000915090505481565b6000806116be848461070c565b14806116e75750600d600083815260200190815260200160002060009054906101000a900460ff165b156116f55760009050611726565b6001600d600084815260200190815260200160002060006101000a81548160ff021916908315150217905550600190505b92915050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146117bc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117b39061463e565b60405180910390fd5b60008251905060008167ffffffffffffffff8111156117de576117dd61386a565b5b60405190808252806020026020018201604052801561180c5781602001602082028036833780820191505090505b50905060008267ffffffffffffffff81111561182b5761182a61386a565b5b6040519080825280602002602001820160405280156118595781602001602082028036833780820191505090505b50905060008367ffffffffffffffff8111156118785761187761386a565b5b6040519080825280602002602001820160405280156118ab57816020015b60608152602001906001900390816118965790505b50905060005b848110156119085760018482815181106118ce576118cd61465e565b5b60200260200101818152505060018382815181106118ef576118ee61465e565b5b60200260200101818152505080806001019150506118b1565b50611917878785888686611cfe565b50505050505050565b61193261192b6127be565b838361285a565b5050565b60086020528060005260406000206000915090505481565b6000600d600083815260200190815260200160002060009054906101000a900460ff169050919050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611a08576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119ff9061463e565b60405180910390fd5b6000600167ffffffffffffffff811115611a2557611a2461386a565b5b604051908082528060200260200182016040528015611a535781602001602082028036833780820191505090505b509050600181600081518110611a6c57611a6b61465e565b5b6020026020010181815250506000600167ffffffffffffffff811115611a9557611a9461386a565b5b604051908082528060200260200182016040528015611ac35781602001602082028036833780820191505090505b5090508381600081518110611adb57611ada61465e565b5b6020026020010181815250506000600167ffffffffffffffff811115611b0457611b0361386a565b5b604051908082528060200260200182016040528015611b3757816020015b6060815260200190600190039081611b225790505b5090508381600081518110611b4f57611b4e61465e565b5b60200260200101819052506000600167ffffffffffffffff811115611b7757611b7661386a565b5b604051908082528060200260200182016040528015611ba55781602001602082028036833780820191505090505b509050600181600081518110611bbe57611bbd61465e565b5b6020026020010181815250506000600167ffffffffffffffff811115611be757611be661386a565b5b604051908082528060200260200182016040528015611c1a57816020015b6060815260200190600190039081611c055790505b5090506040518060200160405280600081525081600081518110611c4157611c4061465e565b5b6020026020010181905250611c5a888587868686611cfe565b5050505050505050565b60045481565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611d8e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611d859061463e565b60405180910390fd5b83518551148015611da0575082518451145b8015611dad575081518351145b8015611dba575080518251145b611df9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611df090614d0c565b60405180910390fd5b60055485511115611e3f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611e3690614d78565b60405180910390fd5b6000855167ffffffffffffffff811115611e5c57611e5b61386a565b5b604051908082528060200260200182016040528015611e8a5781602001602082028036833780820191505090505b5090506000865167ffffffffffffffff811115611eaa57611ea961386a565b5b604051908082528060200260200182016040528015611ed85781602001602082028036833780820191505090505b50905060005b87518110156121fb5760076000898381518110611efe57611efd61465e565b5b6020026020010151815260200190815260200160002054878281518110611f2857611f2761465e565b5b6020026020010151600860008b8581518110611f4757611f4661465e565b5b6020026020010151815260200190815260200160002054611f689190614dc7565b1115611fa9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611fa090614e47565b60405180910390fd5b6000600660008a8481518110611fc257611fc161465e565b5b602002602001015181526020019081526020016000208054611fe39061459b565b905011612025576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161201c90614eb3565b60405180910390fd5b6000816004546120359190614dc7565b90508084838151811061204b5761204a61465e565b5b60200260200101818152505087828151811061206a5761206961465e565b5b60200260200101518383815181106120855761208461465e565b5b6020026020010181815250506120b5818884815181106120a8576120a761465e565b5b60200260200101516129ca565b8882815181106120c8576120c761465e565b5b60200260200101516009600083815260200190815260200160002081905550612126818784815181106120fe576120fd61465e565b5b60200260200101518785815181106121195761211861465e565b5b6020026020010151611073565b8782815181106121395761213861465e565b5b6020026020010151600860008b85815181106121585761215761465e565b5b60200260200101518152602001908152602001600020600082825461217d9190614dc7565b925050819055508973ffffffffffffffffffffffffffffffffffffffff16817f2d03118aa776f7008445f6ca8490a6782ede2db364d741513555ba656ab1879f8b85815181106121d0576121cf61465e565b5b60200260200101516040516121e591906136b0565b60405180910390a3508080600101915050611ede565b50612217888383604051806020016040528060008152506129ef565b86516004600082825461222a9190614dc7565b925050819055505050505050505050565b6000600a600085815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036122e2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016122d9906146d9565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1663a02ff685878787876040518563ffffffff1660e01b815260040161232194939291906146f9565b602060405180830381865afa15801561233e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906123629190614753565b6123a1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612398906147cc565b60405180910390fd5b6123ae8686868686612a75565b505050505050565b600d6020528060005260406000206000915054906101000a900460ff1681565b600a6020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6124116127be565b73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415801561245a5750612458836124536127be565b611c6a565b155b156124a5576124676127be565b836040517fe237d92200000000000000000000000000000000000000000000000000000000815260040161249c929190614c97565b60405180910390fd5b6124b0838383612b1d565b505050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603612525576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161251c90614f1f565b60405180910390fd5b6000600c600081548092919061253a90614f3f565b91905055905082600b600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550807fa681544f91d5d9e3c40b0939a43ef1ca39f3eeeab6438e5e2b7ae27d1b395992846040516125c29190613fd6565b60405180910390a280915050919050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b60006126476127be565b90508073ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff161415801561268c575061268a8682611c6a565b155b156126d05780866040517fe237d9220000000000000000000000000000000000000000000000000000000081526004016126c7929190614c97565b60405180910390fd5b6126dd8686868686612bc4565b505050505050565b600060208202602084010151905092915050565b600060208202602084010151905092915050565b6000763d602d80600a3d3981f3363d3d373d3d3d363d730000008260601b60e81c176000526e5af43d82803e903d91602b57fd5bf38260781b17602052603760096000f09050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036127b9576040517fc2f868f400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b919050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036128385760006040517f01a8351400000000000000000000000000000000000000000000000000000000815260040161282f9190613fd6565b60405180910390fd5b612855836000848460405180602001604052806000815250612cbc565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036128cc5760006040517fced3e1000000000000000000000000000000000000000000000000000000000081526004016128c39190613fd6565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31836040516129bd919061376b565b60405180910390a3505050565b80600e600084815260200190815260200160002090816129ea91906149b7565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603612a615760006040517f57f447ce000000000000000000000000000000000000000000000000000000008152600401612a589190613fd6565b60405180910390fd5b612a6f600085858585612cbc565b50505050565b6000612a7f6127be565b90508073ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff1614158015612ac45750612ac28682611c6a565b155b15612b085780866040517fe237d922000000000000000000000000000000000000000000000000000000008152600401612aff929190614c97565b60405180910390fd5b612b158686868686612d6e565b505050505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603612b8f5760006040517f01a83514000000000000000000000000000000000000000000000000000000008152600401612b869190613fd6565b60405180910390fd5b600080612b9c8484612e79565b91509150612bbd856000848460405180602001604052806000815250612cbc565b5050505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603612c365760006040517f57f447ce000000000000000000000000000000000000000000000000000000008152600401612c2d9190613fd6565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1603612ca85760006040517f01a83514000000000000000000000000000000000000000000000000000000008152600401612c9f9190613fd6565b60405180910390fd5b612cb58585858585612cbc565b5050505050565b612cc885858585612ea9565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614612d67576000612d066127be565b90506001845103612d56576000612d276000866126f990919063ffffffff16565b90506000612d3f6000866126f990919063ffffffff16565b9050612d4f838989858589613251565b5050612d65565b612d64818787878787613405565b5b505b5050505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603612de05760006040517f57f447ce000000000000000000000000000000000000000000000000000000008152600401612dd79190613fd6565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1603612e525760006040517f01a83514000000000000000000000000000000000000000000000000000000008152600401612e499190613fd6565b60405180910390fd5b600080612e5f8585612e79565b91509150612e708787848487612cbc565b50505050505050565b60608060405191506001825283602083015260408201905060018152826020820152604081016040529250929050565b8051825114612ef357815181516040517f5b059991000000000000000000000000000000000000000000000000000000008152600401612eea9291906147ec565b60405180910390fd5b6000612efd6127be565b905060005b835181101561310c576000612f2082866126f990919063ffffffff16565b90506000612f3783866126f990919063ffffffff16565b9050600073ffffffffffffffffffffffffffffffffffffffff168873ffffffffffffffffffffffffffffffffffffffff161461306457600080600084815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508181101561300c57888183856040517f03dee4c50000000000000000000000000000000000000000000000000000000081526004016130039493929190614f87565b60405180910390fd5b81810360008085815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff16146130ff578060008084815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546130f79190614dc7565b925050819055505b5050806001019050612f02565b5060018351036131cb57600061312c6000856126f990919063ffffffff16565b905060006131446000856126f990919063ffffffff16565b90508573ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6285856040516131bc9291906147ec565b60405180910390a4505061324a565b8373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8686604051613241929190614fcc565b60405180910390a45b5050505050565b60008473ffffffffffffffffffffffffffffffffffffffff163b11156133fd578373ffffffffffffffffffffffffffffffffffffffff1663f23a6e6187878686866040518663ffffffff1660e01b81526004016132b2959493929190615003565b6020604051808303816000875af19250505080156132ee57506040513d601f19601f820116820180604052508101906132eb9190615072565b60015b613372573d806000811461331e576040519150601f19603f3d011682016040523d82523d6000602084013e613323565b606091505b50600081510361336a57846040517f57f447ce0000000000000000000000000000000000000000000000000000000081526004016133619190613fd6565b60405180910390fd5b805181602001fd5b63f23a6e6160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916146133fb57846040517f57f447ce0000000000000000000000000000000000000000000000000000000081526004016133f29190613fd6565b60405180910390fd5b505b505050505050565b60008473ffffffffffffffffffffffffffffffffffffffff163b11156135b1578373ffffffffffffffffffffffffffffffffffffffff1663bc197c8187878686866040518663ffffffff1660e01b815260040161346695949392919061509f565b6020604051808303816000875af19250505080156134a257506040513d601f19601f8201168201806040525081019061349f9190615072565b60015b613526573d80600081146134d2576040519150601f19603f3d011682016040523d82523d6000602084013e6134d7565b606091505b50600081510361351e57846040517f57f447ce0000000000000000000000000000000000000000000000000000000081526004016135159190613fd6565b60405180910390fd5b805181602001fd5b63bc197c8160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916146135af57846040517f57f447ce0000000000000000000000000000000000000000000000000000000081526004016135a69190613fd6565b60405180910390fd5b505b505050505050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006135f8826135cd565b9050919050565b613608816135ed565b811461361357600080fd5b50565b600081359050613625816135ff565b92915050565b6000819050919050565b61363e8161362b565b811461364957600080fd5b50565b60008135905061365b81613635565b92915050565b60008060408385031215613678576136776135c3565b5b600061368685828601613616565b92505060206136978582860161364c565b9150509250929050565b6136aa8161362b565b82525050565b60006020820190506136c560008301846136a1565b92915050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b613700816136cb565b811461370b57600080fd5b50565b60008135905061371d816136f7565b92915050565b600060208284031215613739576137386135c3565b5b60006137478482850161370e565b91505092915050565b60008115159050919050565b61376581613750565b82525050565b6000602082019050613780600083018461375c565b92915050565b60006020828403121561379c5761379b6135c3565b5b60006137aa8482850161364c565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156137ed5780820151818401526020810190506137d2565b60008484015250505050565b6000601f19601f8301169050919050565b6000613815826137b3565b61381f81856137be565b935061382f8185602086016137cf565b613838816137f9565b840191505092915050565b6000602082019050818103600083015261385d818461380a565b905092915050565b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6138a2826137f9565b810181811067ffffffffffffffff821117156138c1576138c061386a565b5b80604052505050565b60006138d46135b9565b90506138e08282613899565b919050565b600067ffffffffffffffff821115613900576138ff61386a565b5b602082029050602081019050919050565b600080fd5b6000613929613924846138e5565b6138ca565b9050808382526020820190506020840283018581111561394c5761394b613911565b5b835b818110156139755780613961888261364c565b84526020840193505060208101905061394e565b5050509392505050565b600082601f83011261399457613993613865565b5b81356139a4848260208601613916565b91505092915050565b600080fd5b600067ffffffffffffffff8211156139cd576139cc61386a565b5b6139d6826137f9565b9050602081019050919050565b82818337600083830152505050565b6000613a05613a00846139b2565b6138ca565b905082815260208101848484011115613a2157613a206139ad565b5b613a2c8482856139e3565b509392505050565b600082601f830112613a4957613a48613865565b5b8135613a598482602086016139f2565b91505092915050565b600080600080600060a08688031215613a7e57613a7d6135c3565b5b6000613a8c88828901613616565b9550506020613a9d88828901613616565b945050604086013567ffffffffffffffff811115613abe57613abd6135c8565b5b613aca8882890161397f565b935050606086013567ffffffffffffffff811115613aeb57613aea6135c8565b5b613af78882890161397f565b925050608086013567ffffffffffffffff811115613b1857613b176135c8565b5b613b2488828901613a34565b9150509295509295909350565b600067ffffffffffffffff821115613b4c57613b4b61386a565b5b602082029050602081019050919050565b6000613b70613b6b84613b31565b6138ca565b90508083825260208201905060208402830185811115613b9357613b92613911565b5b835b81811015613bbc5780613ba88882613616565b845260208401935050602081019050613b95565b5050509392505050565b600082601f830112613bdb57613bda613865565b5b8135613beb848260208601613b5d565b91505092915050565b60008060408385031215613c0b57613c0a6135c3565b5b600083013567ffffffffffffffff811115613c2957613c286135c8565b5b613c3585828601613bc6565b925050602083013567ffffffffffffffff811115613c5657613c556135c8565b5b613c628582860161397f565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b613ca18161362b565b82525050565b6000613cb38383613c98565b60208301905092915050565b6000602082019050919050565b6000613cd782613c6c565b613ce18185613c77565b9350613cec83613c88565b8060005b83811015613d1d578151613d048882613ca7565b9750613d0f83613cbf565b925050600181019050613cf0565b5085935050505092915050565b60006020820190508181036000830152613d448184613ccc565b905092915050565b600067ffffffffffffffff821115613d6757613d6661386a565b5b613d70826137f9565b9050602081019050919050565b6000613d90613d8b84613d4c565b6138ca565b905082815260208101848484011115613dac57613dab6139ad565b5b613db78482856139e3565b509392505050565b600082601f830112613dd457613dd3613865565b5b8135613de4848260208601613d7d565b91505092915050565b600060208284031215613e0357613e026135c3565b5b600082013567ffffffffffffffff811115613e2157613e206135c8565b5b613e2d84828501613dbf565b91505092915050565b600080600060608486031215613e4f57613e4e6135c3565b5b6000613e5d8682870161364c565b9350506020613e6e8682870161364c565b925050604084013567ffffffffffffffff811115613e8f57613e8e6135c8565b5b613e9b86828701613a34565b9150509250925092565b600080600060608486031215613ebe57613ebd6135c3565b5b6000613ecc86828701613616565b935050602084013567ffffffffffffffff811115613eed57613eec6135c8565b5b613ef98682870161397f565b925050604084013567ffffffffffffffff811115613f1a57613f196135c8565b5b613f268682870161397f565b9150509250925092565b600080600080600060a08688031215613f4c57613f4b6135c3565b5b6000613f5a88828901613616565b9550506020613f6b88828901613616565b9450506040613f7c8882890161364c565b9350506060613f8d8882890161364c565b925050608086013567ffffffffffffffff811115613fae57613fad6135c8565b5b613fba88828901613a34565b9150509295509295909350565b613fd0816135ed565b82525050565b6000602082019050613feb6000830184613fc7565b92915050565b600067ffffffffffffffff82111561400c5761400b61386a565b5b602082029050602081019050919050565b600061403061402b84613ff1565b6138ca565b9050808382526020820190506020840283018581111561405357614052613911565b5b835b8181101561409a57803567ffffffffffffffff81111561407857614077613865565b5b8086016140858982613dbf565b85526020850194505050602081019050614055565b5050509392505050565b600082601f8301126140b9576140b8613865565b5b81356140c984826020860161401d565b91505092915050565b6000806000606084860312156140eb576140ea6135c3565b5b60006140f986828701613616565b935050602084013567ffffffffffffffff81111561411a576141196135c8565b5b6141268682870161397f565b925050604084013567ffffffffffffffff811115614147576141466135c8565b5b614153868287016140a4565b9150509250925092565b61416681613750565b811461417157600080fd5b50565b6000813590506141838161415d565b92915050565b600080604083850312156141a05761419f6135c3565b5b60006141ae85828601613616565b92505060206141bf85828601614174565b9150509250929050565b6000806000606084860312156141e2576141e16135c3565b5b60006141f086828701613616565b93505060206142018682870161364c565b925050604084013567ffffffffffffffff811115614222576142216135c8565b5b61422e86828701613dbf565b9150509250925092565b6000806040838503121561424f5761424e6135c3565b5b600061425d85828601613616565b925050602061426e85828601613616565b9150509250929050565b600067ffffffffffffffff8211156142935761429261386a565b5b602082029050602081019050919050565b60006142b76142b284614278565b6138ca565b905080838252602082019050602084028301858111156142da576142d9613911565b5b835b8181101561432157803567ffffffffffffffff8111156142ff576142fe613865565b5b80860161430c8982613a34565b855260208501945050506020810190506142dc565b5050509392505050565b600082601f8301126143405761433f613865565b5b81356143508482602086016142a4565b91505092915050565b60008060008060008060c08789031215614376576143756135c3565b5b600061438489828a01613616565b965050602087013567ffffffffffffffff8111156143a5576143a46135c8565b5b6143b189828a0161397f565b955050604087013567ffffffffffffffff8111156143d2576143d16135c8565b5b6143de89828a0161397f565b945050606087013567ffffffffffffffff8111156143ff576143fe6135c8565b5b61440b89828a016140a4565b935050608087013567ffffffffffffffff81111561442c5761442b6135c8565b5b61443889828a0161397f565b92505060a087013567ffffffffffffffff811115614459576144586135c8565b5b61446589828a0161432b565b9150509295509295509295565b6000819050919050565b600061449761449261448d846135cd565b614472565b6135cd565b9050919050565b60006144a98261447c565b9050919050565b60006144bb8261449e565b9050919050565b6144cb816144b0565b82525050565b60006020820190506144e660008301846144c2565b92915050565b600080600060608486031215614505576145046135c3565b5b600061451386828701613616565b93505060206145248682870161364c565b92505060406145358682870161364c565b9150509250925092565b600060208284031215614555576145546135c3565b5b600061456384828501613616565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806145b357607f821691505b6020821081036145c6576145c561456c565b5b50919050565b7f4f6e6c79206f776e65722063616e2063616c6c20746869732066756e6374696f60008201527f6e00000000000000000000000000000000000000000000000000000000000000602082015250565b60006146286021836137be565b9150614633826145cc565b604082019050919050565b600060208201905081810360008301526146578161461b565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f537472617465677920636f6e7472616374206e6f742073657400000000000000600082015250565b60006146c36019836137be565b91506146ce8261468d565b602082019050919050565b600060208201905081810360008301526146f2816146b6565b9050919050565b600060808201905061470e6000830187613fc7565b61471b6020830186613fc7565b61472860408301856136a1565b61473560608301846136a1565b95945050505050565b60008151905061474d8161415d565b92915050565b600060208284031215614769576147686135c3565b5b60006147778482850161473e565b91505092915050565b7f5472616e73666572206e6f7420616c6c6f776564206279207374726174656779600082015250565b60006147b66020836137be565b91506147c182614780565b602082019050919050565b600060208201905081810360008301526147e5816147a9565b9050919050565b600060408201905061480160008301856136a1565b61480e60208301846136a1565b9392505050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026148777fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8261483a565b614881868361483a565b95508019841693508086168417925050509392505050565b60006148b46148af6148aa8461362b565b614472565b61362b565b9050919050565b6000819050919050565b6148ce83614899565b6148e26148da826148bb565b848454614847565b825550505050565b600090565b6148f76148ea565b6149028184846148c5565b505050565b5b818110156149265761491b6000826148ef565b600181019050614908565b5050565b601f82111561496b5761493c81614815565b6149458461482a565b81016020851015614954578190505b6149686149608561482a565b830182614907565b50505b505050565b600082821c905092915050565b600061498e60001984600802614970565b1980831691505092915050565b60006149a7838361497d565b9150826002028217905092915050565b6149c0826137b3565b67ffffffffffffffff8111156149d9576149d861386a565b5b6149e3825461459b565b6149ee82828561492a565b600060209050601f831160018114614a215760008415614a0f578287015190505b614a19858261499b565b865550614a81565b601f198416614a2f86614815565b60005b82811015614a5757848901518255600182019150602085019450602081019050614a32565b86831015614a745784890151614a70601f89168261497d565b8355505b6001600288020188555050505b505050505050565b7f5374726174656779206e6f742072656769737465726564000000000000000000600082015250565b6000614abf6017836137be565b9150614aca82614a89565b602082019050919050565b60006020820190508181036000830152614aee81614ab2565b9050919050565b7f5374726174656779206372656174696f6e206661696c65640000000000000000600082015250565b6000614b2b6018836137be565b9150614b3682614af5565b602082019050919050565b60006020820190508181036000830152614b5a81614b1e565b9050919050565b600081519050919050565b600082825260208201905092915050565b6000614b8882614b61565b614b928185614b6c565b9350614ba28185602086016137cf565b614bab816137f9565b840191505092915050565b60006020820190508181036000830152614bd08184614b7d565b905092915050565b600081905092915050565b6000614bee82614b61565b614bf88185614bd8565b9350614c088185602086016137cf565b80840191505092915050565b6000614c208284614be3565b915081905092915050565b7f537472617465677920696e697469616c697a6174696f6e206661696c65640000600082015250565b6000614c61601e836137be565b9150614c6c82614c2b565b602082019050919050565b60006020820190508181036000830152614c9081614c54565b9050919050565b6000604082019050614cac6000830185613fc7565b614cb96020830184613fc7565b9392505050565b7f417272617973206c656e677468206d69736d6174636800000000000000000000600082015250565b6000614cf66016836137be565b9150614d0182614cc0565b602082019050919050565b60006020820190508181036000830152614d2581614ce9565b9050919050565b7f45786365656473206d6178206d696e7420706572207472616e73616374696f6e600082015250565b6000614d626020836137be565b9150614d6d82614d2c565b602082019050919050565b60006020820190508181036000830152614d9181614d55565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000614dd28261362b565b9150614ddd8361362b565b9250828201905080821115614df557614df4614d98565b5b92915050565b7f4578636565647320736563746f72206361706163697479000000000000000000600082015250565b6000614e316017836137be565b9150614e3c82614dfb565b602082019050919050565b60006020820190508181036000830152614e6081614e24565b9050919050565b7f536563746f7220646f6573206e6f742065786973740000000000000000000000600082015250565b6000614e9d6015836137be565b9150614ea882614e67565b602082019050919050565b60006020820190508181036000830152614ecc81614e90565b9050919050565b7f496e76616c696420696d706c656d656e746174696f6e00000000000000000000600082015250565b6000614f096016836137be565b9150614f1482614ed3565b602082019050919050565b60006020820190508181036000830152614f3881614efc565b9050919050565b6000614f4a8261362b565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203614f7c57614f7b614d98565b5b600182019050919050565b6000608082019050614f9c6000830187613fc7565b614fa960208301866136a1565b614fb660408301856136a1565b614fc360608301846136a1565b95945050505050565b60006040820190508181036000830152614fe68185613ccc565b90508181036020830152614ffa8184613ccc565b90509392505050565b600060a0820190506150186000830188613fc7565b6150256020830187613fc7565b61503260408301866136a1565b61503f60608301856136a1565b81810360808301526150518184614b7d565b90509695505050505050565b60008151905061506c816136f7565b92915050565b600060208284031215615088576150876135c3565b5b60006150968482850161505d565b91505092915050565b600060a0820190506150b46000830188613fc7565b6150c16020830187613fc7565b81810360408301526150d38186613ccc565b905081810360608301526150e78185613ccc565b905081810360808301526150fb8184614b7d565b9050969550505050505056fea26469706673582212204eda732810cbaf84bbf8a98b5ddf5c10777c9f84ef105e018afa6258b4a9674564736f6c63430008180033608060405234801561001057600080fd5b506103a2806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063439fab911461003b578063a02ff68514610057575b600080fd5b610055600480360381019061005091906101f2565b610087565b005b610071600480360381019061006c91906102cf565b61008a565b60405161007e9190610351565b60405180910390f35b50565b600060019050949350505050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6100ff826100b6565b810181811067ffffffffffffffff8211171561011e5761011d6100c7565b5b80604052505050565b6000610131610098565b905061013d82826100f6565b919050565b600067ffffffffffffffff82111561015d5761015c6100c7565b5b610166826100b6565b9050602081019050919050565b82818337600083830152505050565b600061019561019084610142565b610127565b9050828152602081018484840111156101b1576101b06100b1565b5b6101bc848285610173565b509392505050565b600082601f8301126101d9576101d86100ac565b5b81356101e9848260208601610182565b91505092915050565b600060208284031215610208576102076100a2565b5b600082013567ffffffffffffffff811115610226576102256100a7565b5b610232848285016101c4565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006102668261023b565b9050919050565b6102768161025b565b811461028157600080fd5b50565b6000813590506102938161026d565b92915050565b6000819050919050565b6102ac81610299565b81146102b757600080fd5b50565b6000813590506102c9816102a3565b92915050565b600080600080608085870312156102e9576102e86100a2565b5b60006102f787828801610284565b945050602061030887828801610284565b9350506040610319878288016102ba565b925050606061032a878288016102ba565b91505092959194509250565b60008115159050919050565b61034b81610336565b82525050565b60006020820190506103666000830184610342565b9291505056fea2646970667358221220772a36e511ab92abd4b9f6ebe6546624da01579cab6a7bb19bbe3f9fa6ee818f64736f6c63430008180033608060405234801561001057600080fd5b5061039e806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063439fab911461003b578063a02ff68514610057575b600080fd5b610055600480360381019061005091906101ee565b610087565b005b610071600480360381019061006c91906102cb565b61008a565b60405161007e919061034d565b60405180910390f35b50565b6000949350505050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6100fb826100b2565b810181811067ffffffffffffffff8211171561011a576101196100c3565b5b80604052505050565b600061012d610094565b905061013982826100f2565b919050565b600067ffffffffffffffff821115610159576101586100c3565b5b610162826100b2565b9050602081019050919050565b82818337600083830152505050565b600061019161018c8461013e565b610123565b9050828152602081018484840111156101ad576101ac6100ad565b5b6101b884828561016f565b509392505050565b600082601f8301126101d5576101d46100a8565b5b81356101e584826020860161017e565b91505092915050565b6000602082840312156102045761020361009e565b5b600082013567ffffffffffffffff811115610222576102216100a3565b5b61022e848285016101c0565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061026282610237565b9050919050565b61027281610257565b811461027d57600080fd5b50565b60008135905061028f81610269565b92915050565b6000819050919050565b6102a881610295565b81146102b357600080fd5b50565b6000813590506102c58161029f565b92915050565b600080600080608085870312156102e5576102e461009e565b5b60006102f387828801610280565b945050602061030487828801610280565b9350506040610315878288016102b6565b9250506060610326878288016102b6565b91505092959194509250565b60008115159050919050565b61034781610332565b82525050565b6000602082019050610362600083018461033e565b9291505056fea264697066735822122097465617b0787402e12afe3687d92a78752072fc69fa7994cc8d31ec5798f2c364736f6c63430008180033',
  deployedBytecode:
    '0x608060405234801561001057600080fd5b50600436106102055760003560e01c8063893b45e91161011a578063d3fc9864116100ad578063f242432a1161007c578063f242432a14610644578063f2439f0c14610660578063f4c37b9b14610690578063f5298aca146106c0578063f5c2c430146106dc57610205565b8063d3fc9864146105be578063e00dd161146105da578063e985e9c5146105f8578063eb602a0d1461062857610205565b80639caea80a116100e95780639caea80a14610526578063a22cb46514610542578063accf25c11461055e578063ae1890781461058e57610205565b8063893b45e9146104785780638da5cb5b146104a85780639006b7a6146104c657806395cdca12146104f657610205565b80633bb3a24d1161019d578063646a2bb61161016c578063646a2bb6146103ea5780636590770f146104065780636b20c454146104225780636c1438621461043e5780637d28934a1461045c57610205565b80633bb3a24d1461033e5780633ff364931461036e5780634e1273f41461039e57806355f804b3146103ce57610205565b8063185f8447116101d9578063185f8447146102b8578063267a8998146102d65780632e6cebe5146103065780632eb2c2d61461032257610205565b8062fdd58e1461020a57806301f569971461023a57806301ffc9a7146102585780630e89341c14610288575b600080fd5b610224600480360381019061021f9190613661565b61070c565b60405161023191906136b0565b60405180910390f35b610242610766565b60405161024f91906136b0565b60405180910390f35b610272600480360381019061026d9190613723565b61076c565b60405161027f919061376b565b60405180910390f35b6102a2600480360381019061029d9190613786565b61084e565b6040516102af9190613843565b60405180910390f35b6102c0610997565b6040516102cd91906136b0565b60405180910390f35b6102f060048036038101906102eb9190613786565b61099d565b6040516102fd91906136b0565b60405180910390f35b610320600480360381019061031b9190613786565b6109b5565b005b61033c60048036038101906103379190613a62565b610a4f565b005b61035860048036038101906103539190613786565b610c32565b6040516103659190613843565b60405180910390f35b61038860048036038101906103839190613786565b610c44565b6040516103959190613843565b60405180910390f35b6103b860048036038101906103b39190613bf4565b610ce4565b6040516103c59190613d2a565b60405180910390f35b6103e860048036038101906103e39190613ded565b610ded565b005b61040460048036038101906103ff9190613a62565b610e90565b005b610420600480360381019061041b9190613e36565b611073565b005b61043c60048036038101906104379190613ea5565b61140f565b005b6104466114bb565b60405161045391906136b0565b60405180910390f35b61047660048036038101906104719190613f30565b6114c5565b005b610492600480360381019061048d9190613786565b611640565b60405161049f9190613fd6565b60405180910390f35b6104b0611673565b6040516104bd9190613fd6565b60405180910390f35b6104e060048036038101906104db9190613786565b611699565b6040516104ed91906136b0565b60405180910390f35b610510600480360381019061050b9190613661565b6116b1565b60405161051d919061376b565b60405180910390f35b610540600480360381019061053b91906140d2565b61172c565b005b61055c60048036038101906105579190614189565b611920565b005b61057860048036038101906105739190613786565b611936565b60405161058591906136b0565b60405180910390f35b6105a860048036038101906105a39190613786565b61194e565b6040516105b5919061376b565b60405180910390f35b6105d860048036038101906105d391906141c9565b611978565b005b6105e2611c64565b6040516105ef91906136b0565b60405180910390f35b610612600480360381019061060d9190614238565b611c6a565b60405161061f919061376b565b60405180910390f35b610642600480360381019061063d9190614359565b611cfe565b005b61065e60048036038101906106599190613f30565b61223b565b005b61067a60048036038101906106759190613786565b6123b6565b604051610687919061376b565b60405180910390f35b6106aa60048036038101906106a59190613786565b6123d6565b6040516106b791906144d1565b60405180910390f35b6106da60048036038101906106d591906144ec565b612409565b005b6106f660048036038101906106f1919061453f565b6124b5565b60405161070391906136b0565b60405180910390f35b600080600083815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60055481565b60007fd9b67a26000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061083757507f0e89341c000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806108475750610846826125d3565b5b9050919050565b60606000600e600084815260200190815260200160002080546108709061459b565b80601f016020809104026020016040519081016040528092919081815260200182805461089c9061459b565b80156108e95780601f106108be576101008083540402835291602001916108e9565b820191906000526020600020905b8154815290600101906020018083116108cc57829003601f168201915b505050505090506000815111156109035780915050610992565b600f80546109109061459b565b80601f016020809104026020016040519081016040528092919081815260200182805461093c9061459b565b80156109895780601f1061095e57610100808354040283529160200191610989565b820191906000526020600020905b81548152906001019060200180831161096c57829003601f168201915b50505050509150505b919050565b600c5481565b60096020528060005260406000206000915090505481565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610a45576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a3c9061463e565b60405180910390fd5b8060058190555050565b60005b8351811015610c1d576000600a6000868481518110610a7457610a7361465e565b5b6020026020010151815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610b1c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b13906146d9565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1663a02ff6858888888681518110610b4d57610b4c61465e565b5b6020026020010151888781518110610b6857610b6761465e565b5b60200260200101516040518563ffffffff1660e01b8152600401610b8f94939291906146f9565b602060405180830381865afa158015610bac573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bd09190614753565b610c0f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c06906147cc565b60405180910390fd5b508080600101915050610a52565b50610c2b858585858561263d565b5050505050565b6060610c3d8261084e565b9050919050565b60066020528060005260406000206000915090508054610c639061459b565b80601f0160208091040260200160405190810160405280929190818152602001828054610c8f9061459b565b8015610cdc5780601f10610cb157610100808354040283529160200191610cdc565b820191906000526020600020905b815481529060010190602001808311610cbf57829003601f168201915b505050505081565b60608151835114610d3057815183516040517f5b059991000000000000000000000000000000000000000000000000000000008152600401610d279291906147ec565b60405180910390fd5b6000835167ffffffffffffffff811115610d4d57610d4c61386a565b5b604051908082528060200260200182016040528015610d7b5781602001602082028036833780820191505090505b50905060005b8451811015610de257610db8610da082876126e590919063ffffffff16565b610db383876126f990919063ffffffff16565b61070c565b828281518110610dcb57610dca61465e565b5b602002602001018181525050806001019050610d81565b508091505092915050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610e7d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e749061463e565b60405180910390fd5b80600f9081610e8c91906149b7565b5050565b60005b835181101561105e576000600a6000868481518110610eb557610eb461465e565b5b6020026020010151815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610f5d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f54906146d9565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1663a02ff6858888888681518110610f8e57610f8d61465e565b5b6020026020010151888781518110610fa957610fa861465e565b5b60200260200101516040518563ffffffff1660e01b8152600401610fd094939291906146f9565b602060405180830381865afa158015610fed573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110119190614753565b611050576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611047906147cc565b60405180910390fd5b508080600101915050610e93565b5061106c8585858585610a4f565b5050505050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611103576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110fa9061463e565b60405180910390fd5b6000600b600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036111aa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111a190614ad5565b60405180910390fd5b60006111cb8273ffffffffffffffffffffffffffffffffffffffff1661270d565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361123c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161123390614b41565b60405180910390fd5b60008360405160240161124f9190614bb6565b6040516020818303038152906040527f439fab91000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050905060008273ffffffffffffffffffffffffffffffffffffffff16826040516112f59190614c14565b6000604051808303816000865af19150503d8060008114611332576040519150601f19603f3d011682016040523d82523d6000602084013e611337565b606091505b505090508061137b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161137290614c77565b60405180910390fd5b82600a600089815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555085877fac00a50a9bc0f28664b8669296466c465a838cb4e57c7b96e6eeb87fa59e6ad3876040516113fe9190614bb6565b60405180910390a350505050505050565b6114176127be565b73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614158015611460575061145e836114596127be565b611c6a565b155b156114ab5761146d6127be565b836040517fe237d9220000000000000000000000000000000000000000000000000000000081526004016114a2929190614c97565b60405180910390fd5b6114b68383836127c6565b505050565b6000600454905090565b6000600a600085815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361156c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611563906146d9565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1663a02ff685878787876040518563ffffffff1660e01b81526004016115ab94939291906146f9565b602060405180830381865afa1580156115c8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115ec9190614753565b61162b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611622906147cc565b60405180910390fd5b611638868686868661223b565b505050505050565b600b6020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60076020528060005260406000206000915090505481565b6000806116be848461070c565b14806116e75750600d600083815260200190815260200160002060009054906101000a900460ff165b156116f55760009050611726565b6001600d600084815260200190815260200160002060006101000a81548160ff021916908315150217905550600190505b92915050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146117bc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117b39061463e565b60405180910390fd5b60008251905060008167ffffffffffffffff8111156117de576117dd61386a565b5b60405190808252806020026020018201604052801561180c5781602001602082028036833780820191505090505b50905060008267ffffffffffffffff81111561182b5761182a61386a565b5b6040519080825280602002602001820160405280156118595781602001602082028036833780820191505090505b50905060008367ffffffffffffffff8111156118785761187761386a565b5b6040519080825280602002602001820160405280156118ab57816020015b60608152602001906001900390816118965790505b50905060005b848110156119085760018482815181106118ce576118cd61465e565b5b60200260200101818152505060018382815181106118ef576118ee61465e565b5b60200260200101818152505080806001019150506118b1565b50611917878785888686611cfe565b50505050505050565b61193261192b6127be565b838361285a565b5050565b60086020528060005260406000206000915090505481565b6000600d600083815260200190815260200160002060009054906101000a900460ff169050919050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611a08576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119ff9061463e565b60405180910390fd5b6000600167ffffffffffffffff811115611a2557611a2461386a565b5b604051908082528060200260200182016040528015611a535781602001602082028036833780820191505090505b509050600181600081518110611a6c57611a6b61465e565b5b6020026020010181815250506000600167ffffffffffffffff811115611a9557611a9461386a565b5b604051908082528060200260200182016040528015611ac35781602001602082028036833780820191505090505b5090508381600081518110611adb57611ada61465e565b5b6020026020010181815250506000600167ffffffffffffffff811115611b0457611b0361386a565b5b604051908082528060200260200182016040528015611b3757816020015b6060815260200190600190039081611b225790505b5090508381600081518110611b4f57611b4e61465e565b5b60200260200101819052506000600167ffffffffffffffff811115611b7757611b7661386a565b5b604051908082528060200260200182016040528015611ba55781602001602082028036833780820191505090505b509050600181600081518110611bbe57611bbd61465e565b5b6020026020010181815250506000600167ffffffffffffffff811115611be757611be661386a565b5b604051908082528060200260200182016040528015611c1a57816020015b6060815260200190600190039081611c055790505b5090506040518060200160405280600081525081600081518110611c4157611c4061465e565b5b6020026020010181905250611c5a888587868686611cfe565b5050505050505050565b60045481565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611d8e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611d859061463e565b60405180910390fd5b83518551148015611da0575082518451145b8015611dad575081518351145b8015611dba575080518251145b611df9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611df090614d0c565b60405180910390fd5b60055485511115611e3f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611e3690614d78565b60405180910390fd5b6000855167ffffffffffffffff811115611e5c57611e5b61386a565b5b604051908082528060200260200182016040528015611e8a5781602001602082028036833780820191505090505b5090506000865167ffffffffffffffff811115611eaa57611ea961386a565b5b604051908082528060200260200182016040528015611ed85781602001602082028036833780820191505090505b50905060005b87518110156121fb5760076000898381518110611efe57611efd61465e565b5b6020026020010151815260200190815260200160002054878281518110611f2857611f2761465e565b5b6020026020010151600860008b8581518110611f4757611f4661465e565b5b6020026020010151815260200190815260200160002054611f689190614dc7565b1115611fa9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611fa090614e47565b60405180910390fd5b6000600660008a8481518110611fc257611fc161465e565b5b602002602001015181526020019081526020016000208054611fe39061459b565b905011612025576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161201c90614eb3565b60405180910390fd5b6000816004546120359190614dc7565b90508084838151811061204b5761204a61465e565b5b60200260200101818152505087828151811061206a5761206961465e565b5b60200260200101518383815181106120855761208461465e565b5b6020026020010181815250506120b5818884815181106120a8576120a761465e565b5b60200260200101516129ca565b8882815181106120c8576120c761465e565b5b60200260200101516009600083815260200190815260200160002081905550612126818784815181106120fe576120fd61465e565b5b60200260200101518785815181106121195761211861465e565b5b6020026020010151611073565b8782815181106121395761213861465e565b5b6020026020010151600860008b85815181106121585761215761465e565b5b60200260200101518152602001908152602001600020600082825461217d9190614dc7565b925050819055508973ffffffffffffffffffffffffffffffffffffffff16817f2d03118aa776f7008445f6ca8490a6782ede2db364d741513555ba656ab1879f8b85815181106121d0576121cf61465e565b5b60200260200101516040516121e591906136b0565b60405180910390a3508080600101915050611ede565b50612217888383604051806020016040528060008152506129ef565b86516004600082825461222a9190614dc7565b925050819055505050505050505050565b6000600a600085815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036122e2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016122d9906146d9565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1663a02ff685878787876040518563ffffffff1660e01b815260040161232194939291906146f9565b602060405180830381865afa15801561233e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906123629190614753565b6123a1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612398906147cc565b60405180910390fd5b6123ae8686868686612a75565b505050505050565b600d6020528060005260406000206000915054906101000a900460ff1681565b600a6020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6124116127be565b73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415801561245a5750612458836124536127be565b611c6a565b155b156124a5576124676127be565b836040517fe237d92200000000000000000000000000000000000000000000000000000000815260040161249c929190614c97565b60405180910390fd5b6124b0838383612b1d565b505050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603612525576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161251c90614f1f565b60405180910390fd5b6000600c600081548092919061253a90614f3f565b91905055905082600b600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550807fa681544f91d5d9e3c40b0939a43ef1ca39f3eeeab6438e5e2b7ae27d1b395992846040516125c29190613fd6565b60405180910390a280915050919050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b60006126476127be565b90508073ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff161415801561268c575061268a8682611c6a565b155b156126d05780866040517fe237d9220000000000000000000000000000000000000000000000000000000081526004016126c7929190614c97565b60405180910390fd5b6126dd8686868686612bc4565b505050505050565b600060208202602084010151905092915050565b600060208202602084010151905092915050565b6000763d602d80600a3d3981f3363d3d373d3d3d363d730000008260601b60e81c176000526e5af43d82803e903d91602b57fd5bf38260781b17602052603760096000f09050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036127b9576040517fc2f868f400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b919050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036128385760006040517f01a8351400000000000000000000000000000000000000000000000000000000815260040161282f9190613fd6565b60405180910390fd5b612855836000848460405180602001604052806000815250612cbc565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036128cc5760006040517fced3e1000000000000000000000000000000000000000000000000000000000081526004016128c39190613fd6565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31836040516129bd919061376b565b60405180910390a3505050565b80600e600084815260200190815260200160002090816129ea91906149b7565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603612a615760006040517f57f447ce000000000000000000000000000000000000000000000000000000008152600401612a589190613fd6565b60405180910390fd5b612a6f600085858585612cbc565b50505050565b6000612a7f6127be565b90508073ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff1614158015612ac45750612ac28682611c6a565b155b15612b085780866040517fe237d922000000000000000000000000000000000000000000000000000000008152600401612aff929190614c97565b60405180910390fd5b612b158686868686612d6e565b505050505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603612b8f5760006040517f01a83514000000000000000000000000000000000000000000000000000000008152600401612b869190613fd6565b60405180910390fd5b600080612b9c8484612e79565b91509150612bbd856000848460405180602001604052806000815250612cbc565b5050505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603612c365760006040517f57f447ce000000000000000000000000000000000000000000000000000000008152600401612c2d9190613fd6565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1603612ca85760006040517f01a83514000000000000000000000000000000000000000000000000000000008152600401612c9f9190613fd6565b60405180910390fd5b612cb58585858585612cbc565b5050505050565b612cc885858585612ea9565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614612d67576000612d066127be565b90506001845103612d56576000612d276000866126f990919063ffffffff16565b90506000612d3f6000866126f990919063ffffffff16565b9050612d4f838989858589613251565b5050612d65565b612d64818787878787613405565b5b505b5050505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603612de05760006040517f57f447ce000000000000000000000000000000000000000000000000000000008152600401612dd79190613fd6565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1603612e525760006040517f01a83514000000000000000000000000000000000000000000000000000000008152600401612e499190613fd6565b60405180910390fd5b600080612e5f8585612e79565b91509150612e708787848487612cbc565b50505050505050565b60608060405191506001825283602083015260408201905060018152826020820152604081016040529250929050565b8051825114612ef357815181516040517f5b059991000000000000000000000000000000000000000000000000000000008152600401612eea9291906147ec565b60405180910390fd5b6000612efd6127be565b905060005b835181101561310c576000612f2082866126f990919063ffffffff16565b90506000612f3783866126f990919063ffffffff16565b9050600073ffffffffffffffffffffffffffffffffffffffff168873ffffffffffffffffffffffffffffffffffffffff161461306457600080600084815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508181101561300c57888183856040517f03dee4c50000000000000000000000000000000000000000000000000000000081526004016130039493929190614f87565b60405180910390fd5b81810360008085815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff16146130ff578060008084815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546130f79190614dc7565b925050819055505b5050806001019050612f02565b5060018351036131cb57600061312c6000856126f990919063ffffffff16565b905060006131446000856126f990919063ffffffff16565b90508573ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6285856040516131bc9291906147ec565b60405180910390a4505061324a565b8373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8686604051613241929190614fcc565b60405180910390a45b5050505050565b60008473ffffffffffffffffffffffffffffffffffffffff163b11156133fd578373ffffffffffffffffffffffffffffffffffffffff1663f23a6e6187878686866040518663ffffffff1660e01b81526004016132b2959493929190615003565b6020604051808303816000875af19250505080156132ee57506040513d601f19601f820116820180604052508101906132eb9190615072565b60015b613372573d806000811461331e576040519150601f19603f3d011682016040523d82523d6000602084013e613323565b606091505b50600081510361336a57846040517f57f447ce0000000000000000000000000000000000000000000000000000000081526004016133619190613fd6565b60405180910390fd5b805181602001fd5b63f23a6e6160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916146133fb57846040517f57f447ce0000000000000000000000000000000000000000000000000000000081526004016133f29190613fd6565b60405180910390fd5b505b505050505050565b60008473ffffffffffffffffffffffffffffffffffffffff163b11156135b1578373ffffffffffffffffffffffffffffffffffffffff1663bc197c8187878686866040518663ffffffff1660e01b815260040161346695949392919061509f565b6020604051808303816000875af19250505080156134a257506040513d601f19601f8201168201806040525081019061349f9190615072565b60015b613526573d80600081146134d2576040519150601f19603f3d011682016040523d82523d6000602084013e6134d7565b606091505b50600081510361351e57846040517f57f447ce0000000000000000000000000000000000000000000000000000000081526004016135159190613fd6565b60405180910390fd5b805181602001fd5b63bc197c8160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916146135af57846040517f57f447ce0000000000000000000000000000000000000000000000000000000081526004016135a69190613fd6565b60405180910390fd5b505b505050505050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006135f8826135cd565b9050919050565b613608816135ed565b811461361357600080fd5b50565b600081359050613625816135ff565b92915050565b6000819050919050565b61363e8161362b565b811461364957600080fd5b50565b60008135905061365b81613635565b92915050565b60008060408385031215613678576136776135c3565b5b600061368685828601613616565b92505060206136978582860161364c565b9150509250929050565b6136aa8161362b565b82525050565b60006020820190506136c560008301846136a1565b92915050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b613700816136cb565b811461370b57600080fd5b50565b60008135905061371d816136f7565b92915050565b600060208284031215613739576137386135c3565b5b60006137478482850161370e565b91505092915050565b60008115159050919050565b61376581613750565b82525050565b6000602082019050613780600083018461375c565b92915050565b60006020828403121561379c5761379b6135c3565b5b60006137aa8482850161364c565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156137ed5780820151818401526020810190506137d2565b60008484015250505050565b6000601f19601f8301169050919050565b6000613815826137b3565b61381f81856137be565b935061382f8185602086016137cf565b613838816137f9565b840191505092915050565b6000602082019050818103600083015261385d818461380a565b905092915050565b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6138a2826137f9565b810181811067ffffffffffffffff821117156138c1576138c061386a565b5b80604052505050565b60006138d46135b9565b90506138e08282613899565b919050565b600067ffffffffffffffff821115613900576138ff61386a565b5b602082029050602081019050919050565b600080fd5b6000613929613924846138e5565b6138ca565b9050808382526020820190506020840283018581111561394c5761394b613911565b5b835b818110156139755780613961888261364c565b84526020840193505060208101905061394e565b5050509392505050565b600082601f83011261399457613993613865565b5b81356139a4848260208601613916565b91505092915050565b600080fd5b600067ffffffffffffffff8211156139cd576139cc61386a565b5b6139d6826137f9565b9050602081019050919050565b82818337600083830152505050565b6000613a05613a00846139b2565b6138ca565b905082815260208101848484011115613a2157613a206139ad565b5b613a2c8482856139e3565b509392505050565b600082601f830112613a4957613a48613865565b5b8135613a598482602086016139f2565b91505092915050565b600080600080600060a08688031215613a7e57613a7d6135c3565b5b6000613a8c88828901613616565b9550506020613a9d88828901613616565b945050604086013567ffffffffffffffff811115613abe57613abd6135c8565b5b613aca8882890161397f565b935050606086013567ffffffffffffffff811115613aeb57613aea6135c8565b5b613af78882890161397f565b925050608086013567ffffffffffffffff811115613b1857613b176135c8565b5b613b2488828901613a34565b9150509295509295909350565b600067ffffffffffffffff821115613b4c57613b4b61386a565b5b602082029050602081019050919050565b6000613b70613b6b84613b31565b6138ca565b90508083825260208201905060208402830185811115613b9357613b92613911565b5b835b81811015613bbc5780613ba88882613616565b845260208401935050602081019050613b95565b5050509392505050565b600082601f830112613bdb57613bda613865565b5b8135613beb848260208601613b5d565b91505092915050565b60008060408385031215613c0b57613c0a6135c3565b5b600083013567ffffffffffffffff811115613c2957613c286135c8565b5b613c3585828601613bc6565b925050602083013567ffffffffffffffff811115613c5657613c556135c8565b5b613c628582860161397f565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b613ca18161362b565b82525050565b6000613cb38383613c98565b60208301905092915050565b6000602082019050919050565b6000613cd782613c6c565b613ce18185613c77565b9350613cec83613c88565b8060005b83811015613d1d578151613d048882613ca7565b9750613d0f83613cbf565b925050600181019050613cf0565b5085935050505092915050565b60006020820190508181036000830152613d448184613ccc565b905092915050565b600067ffffffffffffffff821115613d6757613d6661386a565b5b613d70826137f9565b9050602081019050919050565b6000613d90613d8b84613d4c565b6138ca565b905082815260208101848484011115613dac57613dab6139ad565b5b613db78482856139e3565b509392505050565b600082601f830112613dd457613dd3613865565b5b8135613de4848260208601613d7d565b91505092915050565b600060208284031215613e0357613e026135c3565b5b600082013567ffffffffffffffff811115613e2157613e206135c8565b5b613e2d84828501613dbf565b91505092915050565b600080600060608486031215613e4f57613e4e6135c3565b5b6000613e5d8682870161364c565b9350506020613e6e8682870161364c565b925050604084013567ffffffffffffffff811115613e8f57613e8e6135c8565b5b613e9b86828701613a34565b9150509250925092565b600080600060608486031215613ebe57613ebd6135c3565b5b6000613ecc86828701613616565b935050602084013567ffffffffffffffff811115613eed57613eec6135c8565b5b613ef98682870161397f565b925050604084013567ffffffffffffffff811115613f1a57613f196135c8565b5b613f268682870161397f565b9150509250925092565b600080600080600060a08688031215613f4c57613f4b6135c3565b5b6000613f5a88828901613616565b9550506020613f6b88828901613616565b9450506040613f7c8882890161364c565b9350506060613f8d8882890161364c565b925050608086013567ffffffffffffffff811115613fae57613fad6135c8565b5b613fba88828901613a34565b9150509295509295909350565b613fd0816135ed565b82525050565b6000602082019050613feb6000830184613fc7565b92915050565b600067ffffffffffffffff82111561400c5761400b61386a565b5b602082029050602081019050919050565b600061403061402b84613ff1565b6138ca565b9050808382526020820190506020840283018581111561405357614052613911565b5b835b8181101561409a57803567ffffffffffffffff81111561407857614077613865565b5b8086016140858982613dbf565b85526020850194505050602081019050614055565b5050509392505050565b600082601f8301126140b9576140b8613865565b5b81356140c984826020860161401d565b91505092915050565b6000806000606084860312156140eb576140ea6135c3565b5b60006140f986828701613616565b935050602084013567ffffffffffffffff81111561411a576141196135c8565b5b6141268682870161397f565b925050604084013567ffffffffffffffff811115614147576141466135c8565b5b614153868287016140a4565b9150509250925092565b61416681613750565b811461417157600080fd5b50565b6000813590506141838161415d565b92915050565b600080604083850312156141a05761419f6135c3565b5b60006141ae85828601613616565b92505060206141bf85828601614174565b9150509250929050565b6000806000606084860312156141e2576141e16135c3565b5b60006141f086828701613616565b93505060206142018682870161364c565b925050604084013567ffffffffffffffff811115614222576142216135c8565b5b61422e86828701613dbf565b9150509250925092565b6000806040838503121561424f5761424e6135c3565b5b600061425d85828601613616565b925050602061426e85828601613616565b9150509250929050565b600067ffffffffffffffff8211156142935761429261386a565b5b602082029050602081019050919050565b60006142b76142b284614278565b6138ca565b905080838252602082019050602084028301858111156142da576142d9613911565b5b835b8181101561432157803567ffffffffffffffff8111156142ff576142fe613865565b5b80860161430c8982613a34565b855260208501945050506020810190506142dc565b5050509392505050565b600082601f8301126143405761433f613865565b5b81356143508482602086016142a4565b91505092915050565b60008060008060008060c08789031215614376576143756135c3565b5b600061438489828a01613616565b965050602087013567ffffffffffffffff8111156143a5576143a46135c8565b5b6143b189828a0161397f565b955050604087013567ffffffffffffffff8111156143d2576143d16135c8565b5b6143de89828a0161397f565b945050606087013567ffffffffffffffff8111156143ff576143fe6135c8565b5b61440b89828a016140a4565b935050608087013567ffffffffffffffff81111561442c5761442b6135c8565b5b61443889828a0161397f565b92505060a087013567ffffffffffffffff811115614459576144586135c8565b5b61446589828a0161432b565b9150509295509295509295565b6000819050919050565b600061449761449261448d846135cd565b614472565b6135cd565b9050919050565b60006144a98261447c565b9050919050565b60006144bb8261449e565b9050919050565b6144cb816144b0565b82525050565b60006020820190506144e660008301846144c2565b92915050565b600080600060608486031215614505576145046135c3565b5b600061451386828701613616565b93505060206145248682870161364c565b92505060406145358682870161364c565b9150509250925092565b600060208284031215614555576145546135c3565b5b600061456384828501613616565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806145b357607f821691505b6020821081036145c6576145c561456c565b5b50919050565b7f4f6e6c79206f776e65722063616e2063616c6c20746869732066756e6374696f60008201527f6e00000000000000000000000000000000000000000000000000000000000000602082015250565b60006146286021836137be565b9150614633826145cc565b604082019050919050565b600060208201905081810360008301526146578161461b565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f537472617465677920636f6e7472616374206e6f742073657400000000000000600082015250565b60006146c36019836137be565b91506146ce8261468d565b602082019050919050565b600060208201905081810360008301526146f2816146b6565b9050919050565b600060808201905061470e6000830187613fc7565b61471b6020830186613fc7565b61472860408301856136a1565b61473560608301846136a1565b95945050505050565b60008151905061474d8161415d565b92915050565b600060208284031215614769576147686135c3565b5b60006147778482850161473e565b91505092915050565b7f5472616e73666572206e6f7420616c6c6f776564206279207374726174656779600082015250565b60006147b66020836137be565b91506147c182614780565b602082019050919050565b600060208201905081810360008301526147e5816147a9565b9050919050565b600060408201905061480160008301856136a1565b61480e60208301846136a1565b9392505050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026148777fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8261483a565b614881868361483a565b95508019841693508086168417925050509392505050565b60006148b46148af6148aa8461362b565b614472565b61362b565b9050919050565b6000819050919050565b6148ce83614899565b6148e26148da826148bb565b848454614847565b825550505050565b600090565b6148f76148ea565b6149028184846148c5565b505050565b5b818110156149265761491b6000826148ef565b600181019050614908565b5050565b601f82111561496b5761493c81614815565b6149458461482a565b81016020851015614954578190505b6149686149608561482a565b830182614907565b50505b505050565b600082821c905092915050565b600061498e60001984600802614970565b1980831691505092915050565b60006149a7838361497d565b9150826002028217905092915050565b6149c0826137b3565b67ffffffffffffffff8111156149d9576149d861386a565b5b6149e3825461459b565b6149ee82828561492a565b600060209050601f831160018114614a215760008415614a0f578287015190505b614a19858261499b565b865550614a81565b601f198416614a2f86614815565b60005b82811015614a5757848901518255600182019150602085019450602081019050614a32565b86831015614a745784890151614a70601f89168261497d565b8355505b6001600288020188555050505b505050505050565b7f5374726174656779206e6f742072656769737465726564000000000000000000600082015250565b6000614abf6017836137be565b9150614aca82614a89565b602082019050919050565b60006020820190508181036000830152614aee81614ab2565b9050919050565b7f5374726174656779206372656174696f6e206661696c65640000000000000000600082015250565b6000614b2b6018836137be565b9150614b3682614af5565b602082019050919050565b60006020820190508181036000830152614b5a81614b1e565b9050919050565b600081519050919050565b600082825260208201905092915050565b6000614b8882614b61565b614b928185614b6c565b9350614ba28185602086016137cf565b614bab816137f9565b840191505092915050565b60006020820190508181036000830152614bd08184614b7d565b905092915050565b600081905092915050565b6000614bee82614b61565b614bf88185614bd8565b9350614c088185602086016137cf565b80840191505092915050565b6000614c208284614be3565b915081905092915050565b7f537472617465677920696e697469616c697a6174696f6e206661696c65640000600082015250565b6000614c61601e836137be565b9150614c6c82614c2b565b602082019050919050565b60006020820190508181036000830152614c9081614c54565b9050919050565b6000604082019050614cac6000830185613fc7565b614cb96020830184613fc7565b9392505050565b7f417272617973206c656e677468206d69736d6174636800000000000000000000600082015250565b6000614cf66016836137be565b9150614d0182614cc0565b602082019050919050565b60006020820190508181036000830152614d2581614ce9565b9050919050565b7f45786365656473206d6178206d696e7420706572207472616e73616374696f6e600082015250565b6000614d626020836137be565b9150614d6d82614d2c565b602082019050919050565b60006020820190508181036000830152614d9181614d55565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000614dd28261362b565b9150614ddd8361362b565b9250828201905080821115614df557614df4614d98565b5b92915050565b7f4578636565647320736563746f72206361706163697479000000000000000000600082015250565b6000614e316017836137be565b9150614e3c82614dfb565b602082019050919050565b60006020820190508181036000830152614e6081614e24565b9050919050565b7f536563746f7220646f6573206e6f742065786973740000000000000000000000600082015250565b6000614e9d6015836137be565b9150614ea882614e67565b602082019050919050565b60006020820190508181036000830152614ecc81614e90565b9050919050565b7f496e76616c696420696d706c656d656e746174696f6e00000000000000000000600082015250565b6000614f096016836137be565b9150614f1482614ed3565b602082019050919050565b60006020820190508181036000830152614f3881614efc565b9050919050565b6000614f4a8261362b565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203614f7c57614f7b614d98565b5b600182019050919050565b6000608082019050614f9c6000830187613fc7565b614fa960208301866136a1565b614fb660408301856136a1565b614fc360608301846136a1565b95945050505050565b60006040820190508181036000830152614fe68185613ccc565b90508181036020830152614ffa8184613ccc565b90509392505050565b600060a0820190506150186000830188613fc7565b6150256020830187613fc7565b61503260408301866136a1565b61503f60608301856136a1565b81810360808301526150518184614b7d565b90509695505050505050565b60008151905061506c816136f7565b92915050565b600060208284031215615088576150876135c3565b5b60006150968482850161505d565b91505092915050565b600060a0820190506150b46000830188613fc7565b6150c16020830187613fc7565b81810360408301526150d38186613ccc565b905081810360608301526150e78185613ccc565b905081810360808301526150fb8184614b7d565b9050969550505050505056fea26469706673582212204eda732810cbaf84bbf8a98b5ddf5c10777c9f84ef105e018afa6258b4a9674564736f6c63430008180033',
  linkReferences: {},
  deployedLinkReferences: {},
};
export const LockArtifact = {
  _format: 'hh-sol-artifact-1',
  contractName: 'Lock',
  sourceName: 'contracts/Lock.sol',
  abi: [
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_unlockTime',
          type: 'uint256',
        },
      ],
      stateMutability: 'payable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'when',
          type: 'uint256',
        },
      ],
      name: 'Withdrawal',
      type: 'event',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [
        {
          internalType: 'address payable',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'unlockTime',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'withdraw',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
  bytecode:
    '0x60806040526040516105d83803806105d8833981810160405281019061002591906100f0565b804210610067576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161005e906101a0565b60405180910390fd5b8060008190555033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506101c0565b600080fd5b6000819050919050565b6100cd816100ba565b81146100d857600080fd5b50565b6000815190506100ea816100c4565b92915050565b600060208284031215610106576101056100b5565b5b6000610114848285016100db565b91505092915050565b600082825260208201905092915050565b7f556e6c6f636b2074696d652073686f756c6420626520696e207468652066757460008201527f7572650000000000000000000000000000000000000000000000000000000000602082015250565b600061018a60238361011d565b91506101958261012e565b604082019050919050565b600060208201905081810360008301526101b98161017d565b9050919050565b610409806101cf6000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063251c1aa3146100465780633ccfd60b146100645780638da5cb5b1461006e575b600080fd5b61004e61008c565b60405161005b919061024a565b60405180910390f35b61006c610092565b005b61007661020b565b60405161008391906102a6565b60405180910390f35b60005481565b6000544210156100d7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100ce9061031e565b60405180910390fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610167576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161015e9061038a565b60405180910390fd5b7fbf2ed60bd5b5965d685680c01195c9514e4382e28e3a5a2d2d5244bf59411b9347426040516101989291906103aa565b60405180910390a1600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc479081150290604051600060405180830381858888f19350505050158015610208573d6000803e3d6000fd5b50565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000819050919050565b61024481610231565b82525050565b600060208201905061025f600083018461023b565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061029082610265565b9050919050565b6102a081610285565b82525050565b60006020820190506102bb6000830184610297565b92915050565b600082825260208201905092915050565b7f596f752063616e27742077697468647261772079657400000000000000000000600082015250565b60006103086016836102c1565b9150610313826102d2565b602082019050919050565b60006020820190508181036000830152610337816102fb565b9050919050565b7f596f75206172656e277420746865206f776e6572000000000000000000000000600082015250565b60006103746014836102c1565b915061037f8261033e565b602082019050919050565b600060208201905081810360008301526103a381610367565b9050919050565b60006040820190506103bf600083018561023b565b6103cc602083018461023b565b939250505056fea264697066735822122022a2b65355af697b0725f7bcddf1c94be908ee67893e84bd3442d61fdc82585064736f6c63430008180033',
  deployedBytecode:
    '0x608060405234801561001057600080fd5b50600436106100415760003560e01c8063251c1aa3146100465780633ccfd60b146100645780638da5cb5b1461006e575b600080fd5b61004e61008c565b60405161005b919061024a565b60405180910390f35b61006c610092565b005b61007661020b565b60405161008391906102a6565b60405180910390f35b60005481565b6000544210156100d7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100ce9061031e565b60405180910390fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610167576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161015e9061038a565b60405180910390fd5b7fbf2ed60bd5b5965d685680c01195c9514e4382e28e3a5a2d2d5244bf59411b9347426040516101989291906103aa565b60405180910390a1600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc479081150290604051600060405180830381858888f19350505050158015610208573d6000803e3d6000fd5b50565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000819050919050565b61024481610231565b82525050565b600060208201905061025f600083018461023b565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061029082610265565b9050919050565b6102a081610285565b82525050565b60006020820190506102bb6000830184610297565b92915050565b600082825260208201905092915050565b7f596f752063616e27742077697468647261772079657400000000000000000000600082015250565b60006103086016836102c1565b9150610313826102d2565b602082019050919050565b60006020820190508181036000830152610337816102fb565b9050919050565b7f596f75206172656e277420746865206f776e6572000000000000000000000000600082015250565b60006103746014836102c1565b915061037f8261033e565b602082019050919050565b600060208201905081810360008301526103a381610367565b9050919050565b60006040820190506103bf600083018561023b565b6103cc602083018461023b565b939250505056fea264697066735822122022a2b65355af697b0725f7bcddf1c94be908ee67893e84bd3442d61fdc82585064736f6c63430008180033',
  linkReferences: {},
  deployedLinkReferences: {},
};

export const MyNFTArtifact = {
  _format: 'hh-sol-artifact-1',
  contractName: 'MyNFT',
  sourceName: 'contracts/MyNFT.sol',
  abi: [
    {
      inputs: [
        {
          internalType: 'string',
          name: 'uri',
          type: 'string',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
      ],
      name: 'ERC721IncorrectOwner',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'ERC721InsufficientApproval',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'approver',
          type: 'address',
        },
      ],
      name: 'ERC721InvalidApprover',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
      ],
      name: 'ERC721InvalidOperator',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
      ],
      name: 'ERC721InvalidOwner',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'receiver',
          type: 'address',
        },
      ],
      name: 'ERC721InvalidReceiver',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
      ],
      name: 'ERC721InvalidSender',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'ERC721NonexistentToken',
      type: 'error',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'approved',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'Approval',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'bool',
          name: 'approved',
          type: 'bool',
        },
      ],
      name: 'ApprovalForAll',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: '_fromTokenId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: '_toTokenId',
          type: 'uint256',
        },
      ],
      name: 'BatchMetadataUpdate',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: '_tokenId',
          type: 'uint256',
        },
      ],
      name: 'MetadataUpdate',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'Transfer',
      type: 'event',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'approve',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
      ],
      name: 'balanceOf',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'getApproved',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
      ],
      name: 'isApprovedForAll',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'name',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'ownerOf',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'safeTransferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
      ],
      name: 'safeTransferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          internalType: 'bool',
          name: 'approved',
          type: 'bool',
        },
      ],
      name: 'setApprovalForAll',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'string',
          name: '_tokenURI',
          type: 'string',
        },
      ],
      name: 'setTokenURI',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes4',
          name: 'interfaceId',
          type: 'bytes4',
        },
      ],
      name: 'supportsInterface',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'symbol',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'tokenURI',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'transferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
  bytecode:
    '0x60806040523480156200001157600080fd5b506040516200335338038062003353833981810160405281019062000037919062000bac565b6040518060400160405280600581526020017f53616e74690000000000000000000000000000000000000000000000000000008152506040518060400160405280600581526020017f53414e54490000000000000000000000000000000000000000000000000000008152508160009081620000b4919062000e48565b508060019081620000c6919062000e48565b50505033600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506200013f600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660016200015960201b60201c565b620001526001826200026060201b60201c565b5062000fec565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603620001ce5760006040517f64a0ae92000000000000000000000000000000000000000000000000000000008152600401620001c5919062000f74565b60405180910390fd5b6000620001e483836000620002c060201b60201c565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146200025b5760006040517f73c6ac6e00000000000000000000000000000000000000000000000000000000815260040162000252919062000f74565b60405180910390fd5b505050565b8060066000848152602001908152602001600020908162000282919062000e48565b507ff8e1a15aba9398e019f0b49df1a4fde98ee17ae345cb5f6b5e2c27f5033e8ce782604051620002b4919062000fa2565b60405180910390a15050565b600080620002d484620004f560201b60201c565b9050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16146200031f576200031e8184866200053260201b60201c565b5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614620003b9576200036a6000856000806200060460201b60201c565b6001600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16146200043d576001600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b846002600086815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4809150509392505050565b60006002600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b62000545838383620007e160201b60201c565b620005ff57600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603620005be57806040517f7e273289000000000000000000000000000000000000000000000000000000008152600401620005b5919062000fa2565b60405180910390fd5b81816040517f177e802f000000000000000000000000000000000000000000000000000000008152600401620005f692919062000fbf565b60405180910390fd5b505050565b80806200063e5750600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614155b15620007895760006200065784620008b560201b60201c565b9050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614158015620006c357508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614155b8015620006df5750620006dd81846200094860201b60201c565b155b156200072457826040517fa9fbf51f0000000000000000000000000000000000000000000000000000000081526004016200071b919062000f74565b60405180910390fd5b81156200078757838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b836004600085815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614158015620008ac57508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614806200086457506200086384846200094860201b60201c565b5b80620008ab57508273ffffffffffffffffffffffffffffffffffffffff166200089383620009dc60201b60201c565b73ffffffffffffffffffffffffffffffffffffffff16145b5b90509392505050565b600080620008c983620004f560201b60201c565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036200093f57826040517f7e27328900000000000000000000000000000000000000000000000000000000815260040162000936919062000fa2565b60405180910390fd5b80915050919050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60006004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b62000a828262000a37565b810181811067ffffffffffffffff8211171562000aa45762000aa362000a48565b5b80604052505050565b600062000ab962000a19565b905062000ac7828262000a77565b919050565b600067ffffffffffffffff82111562000aea5762000ae962000a48565b5b62000af58262000a37565b9050602081019050919050565b60005b8381101562000b2257808201518184015260208101905062000b05565b60008484015250505050565b600062000b4562000b3f8462000acc565b62000aad565b90508281526020810184848401111562000b645762000b6362000a32565b5b62000b7184828562000b02565b509392505050565b600082601f83011262000b915762000b9062000a2d565b5b815162000ba384826020860162000b2e565b91505092915050565b60006020828403121562000bc55762000bc462000a23565b5b600082015167ffffffffffffffff81111562000be65762000be562000a28565b5b62000bf48482850162000b79565b91505092915050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168062000c5057607f821691505b60208210810362000c665762000c6562000c08565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b60006008830262000cd07fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000c91565b62000cdc868362000c91565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b600062000d2962000d2362000d1d8462000cf4565b62000cfe565b62000cf4565b9050919050565b6000819050919050565b62000d458362000d08565b62000d5d62000d548262000d30565b84845462000c9e565b825550505050565b600090565b62000d7462000d65565b62000d8181848462000d3a565b505050565b5b8181101562000da95762000d9d60008262000d6a565b60018101905062000d87565b5050565b601f82111562000df85762000dc28162000c6c565b62000dcd8462000c81565b8101602085101562000ddd578190505b62000df562000dec8562000c81565b83018262000d86565b50505b505050565b600082821c905092915050565b600062000e1d6000198460080262000dfd565b1980831691505092915050565b600062000e38838362000e0a565b9150826002028217905092915050565b62000e538262000bfd565b67ffffffffffffffff81111562000e6f5762000e6e62000a48565b5b62000e7b825462000c37565b62000e8882828562000dad565b600060209050601f83116001811462000ec0576000841562000eab578287015190505b62000eb7858262000e2a565b86555062000f27565b601f19841662000ed08662000c6c565b60005b8281101562000efa5784890151825560018201915060208501945060208101905062000ed3565b8683101562000f1a578489015162000f16601f89168262000e0a565b8355505b6001600288020188555050505b505050505050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600062000f5c8262000f2f565b9050919050565b62000f6e8162000f4f565b82525050565b600060208201905062000f8b600083018462000f63565b92915050565b62000f9c8162000cf4565b82525050565b600060208201905062000fb9600083018462000f91565b92915050565b600060408201905062000fd6600083018562000f63565b62000fe5602083018462000f91565b9392505050565b6123578062000ffc6000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c80636352211e11610097578063a22cb46511610066578063a22cb46514610284578063b88d4fde146102a0578063c87b56dd146102bc578063e985e9c5146102ec576100f5565b80636352211e146101e857806370a08231146102185780638da5cb5b1461024857806395d89b4114610266576100f5565b8063095ea7b3116100d3578063095ea7b314610178578063162094c41461019457806323b872dd146101b057806342842e0e146101cc576100f5565b806301ffc9a7146100fa57806306fdde031461012a578063081812fc14610148575b600080fd5b610114600480360381019061010f91906117ba565b61031c565b6040516101219190611802565b60405180910390f35b61013261037d565b60405161013f91906118ad565b60405180910390f35b610162600480360381019061015d9190611905565b61040f565b60405161016f9190611973565b60405180910390f35b610192600480360381019061018d91906119ba565b61042b565b005b6101ae60048036038101906101a99190611b2f565b610441565b005b6101ca60048036038101906101c59190611b8b565b6104df565b005b6101e660048036038101906101e19190611b8b565b6105e1565b005b61020260048036038101906101fd9190611905565b610601565b60405161020f9190611973565b60405180910390f35b610232600480360381019061022d9190611bde565b610613565b60405161023f9190611c1a565b60405180910390f35b6102506106cd565b60405161025d9190611973565b60405180910390f35b61026e6106f3565b60405161027b91906118ad565b60405180910390f35b61029e60048036038101906102999190611c61565b610785565b005b6102ba60048036038101906102b59190611d42565b61079b565b005b6102d660048036038101906102d19190611905565b6107b8565b6040516102e391906118ad565b60405180910390f35b61030660048036038101906103019190611dc5565b6108cb565b6040516103139190611802565b60405180910390f35b6000634906490660e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061037657506103758261095f565b5b9050919050565b60606000805461038c90611e34565b80601f01602080910402602001604051908101604052809291908181526020018280546103b890611e34565b80156104055780601f106103da57610100808354040283529160200191610405565b820191906000526020600020905b8154815290600101906020018083116103e857829003601f168201915b5050505050905090565b600061041a82610a41565b5061042482610ac9565b9050919050565b61043d8282610438610b06565b610b0e565b5050565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146104d1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104c890611eb1565b60405180910390fd5b6104db8282610b20565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036105515760006040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016105489190611973565b60405180910390fd5b60006105658383610560610b06565b610b7c565b90508373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146105db578382826040517f64283d7b0000000000000000000000000000000000000000000000000000000081526004016105d293929190611ed1565b60405180910390fd5b50505050565b6105fc8383836040518060200160405280600081525061079b565b505050565b600061060c82610a41565b9050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036106865760006040517f89c62b6400000000000000000000000000000000000000000000000000000000815260040161067d9190611973565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60606001805461070290611e34565b80601f016020809104026020016040519081016040528092919081815260200182805461072e90611e34565b801561077b5780601f106107505761010080835404028352916020019161077b565b820191906000526020600020905b81548152906001019060200180831161075e57829003601f168201915b5050505050905090565b610797610790610b06565b8383610d96565b5050565b6107a68484846104df565b6107b284848484610f05565b50505050565b60606107c382610a41565b5060006006600084815260200190815260200160002080546107e490611e34565b80601f016020809104026020016040519081016040528092919081815260200182805461081090611e34565b801561085d5780601f106108325761010080835404028352916020019161085d565b820191906000526020600020905b81548152906001019060200180831161084057829003601f168201915b50505050509050600061086e6110bc565b905060008151036108835781925050506108c6565b6000825111156108b85780826040516020016108a0929190611f44565b604051602081830303815290604052925050506108c6565b6108c1846110d3565b925050505b919050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480610a2a57507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80610a3a5750610a398261113c565b5b9050919050565b600080610a4d836111a6565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610ac057826040517f7e273289000000000000000000000000000000000000000000000000000000008152600401610ab79190611c1a565b60405180910390fd5b80915050919050565b60006004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b600033905090565b610b1b83838360016111e3565b505050565b80600660008481526020019081526020016000209081610b409190612114565b507ff8e1a15aba9398e019f0b49df1a4fde98ee17ae345cb5f6b5e2c27f5033e8ce782604051610b709190611c1a565b60405180910390a15050565b600080610b88846111a6565b9050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614610bca57610bc98184866113a8565b5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610c5b57610c0c6000856000806111e3565b6001600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614610cde576001600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b846002600086815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4809150509392505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610e0757816040517f5b08ba18000000000000000000000000000000000000000000000000000000008152600401610dfe9190611973565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051610ef89190611802565b60405180910390a3505050565b60008373ffffffffffffffffffffffffffffffffffffffff163b11156110b6578273ffffffffffffffffffffffffffffffffffffffff1663150b7a02610f49610b06565b8685856040518563ffffffff1660e01b8152600401610f6b949392919061223b565b6020604051808303816000875af1925050508015610fa757506040513d601f19601f82011682018060405250810190610fa4919061229c565b60015b61102b573d8060008114610fd7576040519150601f19603f3d011682016040523d82523d6000602084013e610fdc565b606091505b50600081510361102357836040517f64a0ae9200000000000000000000000000000000000000000000000000000000815260040161101a9190611973565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916146110b457836040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016110ab9190611973565b60405180910390fd5b505b50505050565b606060405180602001604052806000815250905090565b60606110de82610a41565b5060006110e96110bc565b905060008151116111095760405180602001604052806000815250611134565b806111138461146c565b604051602001611124929190611f44565b6040516020818303038152906040525b915050919050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b60006002600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b808061121c5750600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614155b1561135057600061122c84610a41565b9050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415801561129757508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614155b80156112aa57506112a881846108cb565b155b156112ec57826040517fa9fbf51f0000000000000000000000000000000000000000000000000000000081526004016112e39190611973565b60405180910390fd5b811561134e57838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b836004600085815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050565b6113b383838361153a565b61146757600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361142857806040517f7e27328900000000000000000000000000000000000000000000000000000000815260040161141f9190611c1a565b60405180910390fd5b81816040517f177e802f00000000000000000000000000000000000000000000000000000000815260040161145e9291906122c9565b60405180910390fd5b505050565b60606000600161147b846115fb565b01905060008167ffffffffffffffff81111561149a57611499611a04565b5b6040519080825280601f01601f1916602001820160405280156114cc5781602001600182028036833780820191505090505b509050600082602001820190505b60011561152f578080600190039150507f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a8581611523576115226122f2565b5b049450600085036114da575b819350505050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141580156115f257508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614806115b357506115b284846108cb565b5b806115f157508273ffffffffffffffffffffffffffffffffffffffff166115d983610ac9565b73ffffffffffffffffffffffffffffffffffffffff16145b5b90509392505050565b600080600090507a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008310611659577a184f03e93ff9f4daa797ed6e38ed64bf6a1f010000000000000000838161164f5761164e6122f2565b5b0492506040810190505b6d04ee2d6d415b85acef81000000008310611696576d04ee2d6d415b85acef8100000000838161168c5761168b6122f2565b5b0492506020810190505b662386f26fc1000083106116c557662386f26fc1000083816116bb576116ba6122f2565b5b0492506010810190505b6305f5e10083106116ee576305f5e10083816116e4576116e36122f2565b5b0492506008810190505b6127108310611713576127108381611709576117086122f2565b5b0492506004810190505b60648310611736576064838161172c5761172b6122f2565b5b0492506002810190505b600a8310611745576001810190505b80915050919050565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b61179781611762565b81146117a257600080fd5b50565b6000813590506117b48161178e565b92915050565b6000602082840312156117d0576117cf611758565b5b60006117de848285016117a5565b91505092915050565b60008115159050919050565b6117fc816117e7565b82525050565b600060208201905061181760008301846117f3565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561185757808201518184015260208101905061183c565b60008484015250505050565b6000601f19601f8301169050919050565b600061187f8261181d565b6118898185611828565b9350611899818560208601611839565b6118a281611863565b840191505092915050565b600060208201905081810360008301526118c78184611874565b905092915050565b6000819050919050565b6118e2816118cf565b81146118ed57600080fd5b50565b6000813590506118ff816118d9565b92915050565b60006020828403121561191b5761191a611758565b5b6000611929848285016118f0565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061195d82611932565b9050919050565b61196d81611952565b82525050565b60006020820190506119886000830184611964565b92915050565b61199781611952565b81146119a257600080fd5b50565b6000813590506119b48161198e565b92915050565b600080604083850312156119d1576119d0611758565b5b60006119df858286016119a5565b92505060206119f0858286016118f0565b9150509250929050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611a3c82611863565b810181811067ffffffffffffffff82111715611a5b57611a5a611a04565b5b80604052505050565b6000611a6e61174e565b9050611a7a8282611a33565b919050565b600067ffffffffffffffff821115611a9a57611a99611a04565b5b611aa382611863565b9050602081019050919050565b82818337600083830152505050565b6000611ad2611acd84611a7f565b611a64565b905082815260208101848484011115611aee57611aed6119ff565b5b611af9848285611ab0565b509392505050565b600082601f830112611b1657611b156119fa565b5b8135611b26848260208601611abf565b91505092915050565b60008060408385031215611b4657611b45611758565b5b6000611b54858286016118f0565b925050602083013567ffffffffffffffff811115611b7557611b7461175d565b5b611b8185828601611b01565b9150509250929050565b600080600060608486031215611ba457611ba3611758565b5b6000611bb2868287016119a5565b9350506020611bc3868287016119a5565b9250506040611bd4868287016118f0565b9150509250925092565b600060208284031215611bf457611bf3611758565b5b6000611c02848285016119a5565b91505092915050565b611c14816118cf565b82525050565b6000602082019050611c2f6000830184611c0b565b92915050565b611c3e816117e7565b8114611c4957600080fd5b50565b600081359050611c5b81611c35565b92915050565b60008060408385031215611c7857611c77611758565b5b6000611c86858286016119a5565b9250506020611c9785828601611c4c565b9150509250929050565b600067ffffffffffffffff821115611cbc57611cbb611a04565b5b611cc582611863565b9050602081019050919050565b6000611ce5611ce084611ca1565b611a64565b905082815260208101848484011115611d0157611d006119ff565b5b611d0c848285611ab0565b509392505050565b600082601f830112611d2957611d286119fa565b5b8135611d39848260208601611cd2565b91505092915050565b60008060008060808587031215611d5c57611d5b611758565b5b6000611d6a878288016119a5565b9450506020611d7b878288016119a5565b9350506040611d8c878288016118f0565b925050606085013567ffffffffffffffff811115611dad57611dac61175d565b5b611db987828801611d14565b91505092959194509250565b60008060408385031215611ddc57611ddb611758565b5b6000611dea858286016119a5565b9250506020611dfb858286016119a5565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680611e4c57607f821691505b602082108103611e5f57611e5e611e05565b5b50919050565b7f4f6e6c79206f776e65722063616e2073657420746f6b656e2055524900000000600082015250565b6000611e9b601c83611828565b9150611ea682611e65565b602082019050919050565b60006020820190508181036000830152611eca81611e8e565b9050919050565b6000606082019050611ee66000830186611964565b611ef36020830185611c0b565b611f006040830184611964565b949350505050565b600081905092915050565b6000611f1e8261181d565b611f288185611f08565b9350611f38818560208601611839565b80840191505092915050565b6000611f508285611f13565b9150611f5c8284611f13565b91508190509392505050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302611fca7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82611f8d565b611fd48683611f8d565b95508019841693508086168417925050509392505050565b6000819050919050565b600061201161200c612007846118cf565b611fec565b6118cf565b9050919050565b6000819050919050565b61202b83611ff6565b61203f61203782612018565b848454611f9a565b825550505050565b600090565b612054612047565b61205f818484612022565b505050565b5b818110156120835761207860008261204c565b600181019050612065565b5050565b601f8211156120c85761209981611f68565b6120a284611f7d565b810160208510156120b1578190505b6120c56120bd85611f7d565b830182612064565b50505b505050565b600082821c905092915050565b60006120eb600019846008026120cd565b1980831691505092915050565b600061210483836120da565b9150826002028217905092915050565b61211d8261181d565b67ffffffffffffffff81111561213657612135611a04565b5b6121408254611e34565b61214b828285612087565b600060209050601f83116001811461217e576000841561216c578287015190505b61217685826120f8565b8655506121de565b601f19841661218c86611f68565b60005b828110156121b45784890151825560018201915060208501945060208101905061218f565b868310156121d157848901516121cd601f8916826120da565b8355505b6001600288020188555050505b505050505050565b600081519050919050565b600082825260208201905092915050565b600061220d826121e6565b61221781856121f1565b9350612227818560208601611839565b61223081611863565b840191505092915050565b60006080820190506122506000830187611964565b61225d6020830186611964565b61226a6040830185611c0b565b818103606083015261227c8184612202565b905095945050505050565b6000815190506122968161178e565b92915050565b6000602082840312156122b2576122b1611758565b5b60006122c084828501612287565b91505092915050565b60006040820190506122de6000830185611964565b6122eb6020830184611c0b565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fdfea2646970667358221220e9ffba266d583f103a2bc0b41b142a6c79b0cd5212f362ff6c8b4bb33dbd6fa564736f6c63430008180033',
  deployedBytecode:
    '0x608060405234801561001057600080fd5b50600436106100f55760003560e01c80636352211e11610097578063a22cb46511610066578063a22cb46514610284578063b88d4fde146102a0578063c87b56dd146102bc578063e985e9c5146102ec576100f5565b80636352211e146101e857806370a08231146102185780638da5cb5b1461024857806395d89b4114610266576100f5565b8063095ea7b3116100d3578063095ea7b314610178578063162094c41461019457806323b872dd146101b057806342842e0e146101cc576100f5565b806301ffc9a7146100fa57806306fdde031461012a578063081812fc14610148575b600080fd5b610114600480360381019061010f91906117ba565b61031c565b6040516101219190611802565b60405180910390f35b61013261037d565b60405161013f91906118ad565b60405180910390f35b610162600480360381019061015d9190611905565b61040f565b60405161016f9190611973565b60405180910390f35b610192600480360381019061018d91906119ba565b61042b565b005b6101ae60048036038101906101a99190611b2f565b610441565b005b6101ca60048036038101906101c59190611b8b565b6104df565b005b6101e660048036038101906101e19190611b8b565b6105e1565b005b61020260048036038101906101fd9190611905565b610601565b60405161020f9190611973565b60405180910390f35b610232600480360381019061022d9190611bde565b610613565b60405161023f9190611c1a565b60405180910390f35b6102506106cd565b60405161025d9190611973565b60405180910390f35b61026e6106f3565b60405161027b91906118ad565b60405180910390f35b61029e60048036038101906102999190611c61565b610785565b005b6102ba60048036038101906102b59190611d42565b61079b565b005b6102d660048036038101906102d19190611905565b6107b8565b6040516102e391906118ad565b60405180910390f35b61030660048036038101906103019190611dc5565b6108cb565b6040516103139190611802565b60405180910390f35b6000634906490660e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061037657506103758261095f565b5b9050919050565b60606000805461038c90611e34565b80601f01602080910402602001604051908101604052809291908181526020018280546103b890611e34565b80156104055780601f106103da57610100808354040283529160200191610405565b820191906000526020600020905b8154815290600101906020018083116103e857829003601f168201915b5050505050905090565b600061041a82610a41565b5061042482610ac9565b9050919050565b61043d8282610438610b06565b610b0e565b5050565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146104d1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104c890611eb1565b60405180910390fd5b6104db8282610b20565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036105515760006040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016105489190611973565b60405180910390fd5b60006105658383610560610b06565b610b7c565b90508373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146105db578382826040517f64283d7b0000000000000000000000000000000000000000000000000000000081526004016105d293929190611ed1565b60405180910390fd5b50505050565b6105fc8383836040518060200160405280600081525061079b565b505050565b600061060c82610a41565b9050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036106865760006040517f89c62b6400000000000000000000000000000000000000000000000000000000815260040161067d9190611973565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60606001805461070290611e34565b80601f016020809104026020016040519081016040528092919081815260200182805461072e90611e34565b801561077b5780601f106107505761010080835404028352916020019161077b565b820191906000526020600020905b81548152906001019060200180831161075e57829003601f168201915b5050505050905090565b610797610790610b06565b8383610d96565b5050565b6107a68484846104df565b6107b284848484610f05565b50505050565b60606107c382610a41565b5060006006600084815260200190815260200160002080546107e490611e34565b80601f016020809104026020016040519081016040528092919081815260200182805461081090611e34565b801561085d5780601f106108325761010080835404028352916020019161085d565b820191906000526020600020905b81548152906001019060200180831161084057829003601f168201915b50505050509050600061086e6110bc565b905060008151036108835781925050506108c6565b6000825111156108b85780826040516020016108a0929190611f44565b604051602081830303815290604052925050506108c6565b6108c1846110d3565b925050505b919050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480610a2a57507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80610a3a5750610a398261113c565b5b9050919050565b600080610a4d836111a6565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610ac057826040517f7e273289000000000000000000000000000000000000000000000000000000008152600401610ab79190611c1a565b60405180910390fd5b80915050919050565b60006004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b600033905090565b610b1b83838360016111e3565b505050565b80600660008481526020019081526020016000209081610b409190612114565b507ff8e1a15aba9398e019f0b49df1a4fde98ee17ae345cb5f6b5e2c27f5033e8ce782604051610b709190611c1a565b60405180910390a15050565b600080610b88846111a6565b9050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614610bca57610bc98184866113a8565b5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610c5b57610c0c6000856000806111e3565b6001600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614610cde576001600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b846002600086815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4809150509392505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610e0757816040517f5b08ba18000000000000000000000000000000000000000000000000000000008152600401610dfe9190611973565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051610ef89190611802565b60405180910390a3505050565b60008373ffffffffffffffffffffffffffffffffffffffff163b11156110b6578273ffffffffffffffffffffffffffffffffffffffff1663150b7a02610f49610b06565b8685856040518563ffffffff1660e01b8152600401610f6b949392919061223b565b6020604051808303816000875af1925050508015610fa757506040513d601f19601f82011682018060405250810190610fa4919061229c565b60015b61102b573d8060008114610fd7576040519150601f19603f3d011682016040523d82523d6000602084013e610fdc565b606091505b50600081510361102357836040517f64a0ae9200000000000000000000000000000000000000000000000000000000815260040161101a9190611973565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916146110b457836040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016110ab9190611973565b60405180910390fd5b505b50505050565b606060405180602001604052806000815250905090565b60606110de82610a41565b5060006110e96110bc565b905060008151116111095760405180602001604052806000815250611134565b806111138461146c565b604051602001611124929190611f44565b6040516020818303038152906040525b915050919050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b60006002600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b808061121c5750600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614155b1561135057600061122c84610a41565b9050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415801561129757508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614155b80156112aa57506112a881846108cb565b155b156112ec57826040517fa9fbf51f0000000000000000000000000000000000000000000000000000000081526004016112e39190611973565b60405180910390fd5b811561134e57838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b836004600085815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050565b6113b383838361153a565b61146757600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361142857806040517f7e27328900000000000000000000000000000000000000000000000000000000815260040161141f9190611c1a565b60405180910390fd5b81816040517f177e802f00000000000000000000000000000000000000000000000000000000815260040161145e9291906122c9565b60405180910390fd5b505050565b60606000600161147b846115fb565b01905060008167ffffffffffffffff81111561149a57611499611a04565b5b6040519080825280601f01601f1916602001820160405280156114cc5781602001600182028036833780820191505090505b509050600082602001820190505b60011561152f578080600190039150507f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a8581611523576115226122f2565b5b049450600085036114da575b819350505050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141580156115f257508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614806115b357506115b284846108cb565b5b806115f157508273ffffffffffffffffffffffffffffffffffffffff166115d983610ac9565b73ffffffffffffffffffffffffffffffffffffffff16145b5b90509392505050565b600080600090507a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008310611659577a184f03e93ff9f4daa797ed6e38ed64bf6a1f010000000000000000838161164f5761164e6122f2565b5b0492506040810190505b6d04ee2d6d415b85acef81000000008310611696576d04ee2d6d415b85acef8100000000838161168c5761168b6122f2565b5b0492506020810190505b662386f26fc1000083106116c557662386f26fc1000083816116bb576116ba6122f2565b5b0492506010810190505b6305f5e10083106116ee576305f5e10083816116e4576116e36122f2565b5b0492506008810190505b6127108310611713576127108381611709576117086122f2565b5b0492506004810190505b60648310611736576064838161172c5761172b6122f2565b5b0492506002810190505b600a8310611745576001810190505b80915050919050565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b61179781611762565b81146117a257600080fd5b50565b6000813590506117b48161178e565b92915050565b6000602082840312156117d0576117cf611758565b5b60006117de848285016117a5565b91505092915050565b60008115159050919050565b6117fc816117e7565b82525050565b600060208201905061181760008301846117f3565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561185757808201518184015260208101905061183c565b60008484015250505050565b6000601f19601f8301169050919050565b600061187f8261181d565b6118898185611828565b9350611899818560208601611839565b6118a281611863565b840191505092915050565b600060208201905081810360008301526118c78184611874565b905092915050565b6000819050919050565b6118e2816118cf565b81146118ed57600080fd5b50565b6000813590506118ff816118d9565b92915050565b60006020828403121561191b5761191a611758565b5b6000611929848285016118f0565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061195d82611932565b9050919050565b61196d81611952565b82525050565b60006020820190506119886000830184611964565b92915050565b61199781611952565b81146119a257600080fd5b50565b6000813590506119b48161198e565b92915050565b600080604083850312156119d1576119d0611758565b5b60006119df858286016119a5565b92505060206119f0858286016118f0565b9150509250929050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611a3c82611863565b810181811067ffffffffffffffff82111715611a5b57611a5a611a04565b5b80604052505050565b6000611a6e61174e565b9050611a7a8282611a33565b919050565b600067ffffffffffffffff821115611a9a57611a99611a04565b5b611aa382611863565b9050602081019050919050565b82818337600083830152505050565b6000611ad2611acd84611a7f565b611a64565b905082815260208101848484011115611aee57611aed6119ff565b5b611af9848285611ab0565b509392505050565b600082601f830112611b1657611b156119fa565b5b8135611b26848260208601611abf565b91505092915050565b60008060408385031215611b4657611b45611758565b5b6000611b54858286016118f0565b925050602083013567ffffffffffffffff811115611b7557611b7461175d565b5b611b8185828601611b01565b9150509250929050565b600080600060608486031215611ba457611ba3611758565b5b6000611bb2868287016119a5565b9350506020611bc3868287016119a5565b9250506040611bd4868287016118f0565b9150509250925092565b600060208284031215611bf457611bf3611758565b5b6000611c02848285016119a5565b91505092915050565b611c14816118cf565b82525050565b6000602082019050611c2f6000830184611c0b565b92915050565b611c3e816117e7565b8114611c4957600080fd5b50565b600081359050611c5b81611c35565b92915050565b60008060408385031215611c7857611c77611758565b5b6000611c86858286016119a5565b9250506020611c9785828601611c4c565b9150509250929050565b600067ffffffffffffffff821115611cbc57611cbb611a04565b5b611cc582611863565b9050602081019050919050565b6000611ce5611ce084611ca1565b611a64565b905082815260208101848484011115611d0157611d006119ff565b5b611d0c848285611ab0565b509392505050565b600082601f830112611d2957611d286119fa565b5b8135611d39848260208601611cd2565b91505092915050565b60008060008060808587031215611d5c57611d5b611758565b5b6000611d6a878288016119a5565b9450506020611d7b878288016119a5565b9350506040611d8c878288016118f0565b925050606085013567ffffffffffffffff811115611dad57611dac61175d565b5b611db987828801611d14565b91505092959194509250565b60008060408385031215611ddc57611ddb611758565b5b6000611dea858286016119a5565b9250506020611dfb858286016119a5565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680611e4c57607f821691505b602082108103611e5f57611e5e611e05565b5b50919050565b7f4f6e6c79206f776e65722063616e2073657420746f6b656e2055524900000000600082015250565b6000611e9b601c83611828565b9150611ea682611e65565b602082019050919050565b60006020820190508181036000830152611eca81611e8e565b9050919050565b6000606082019050611ee66000830186611964565b611ef36020830185611c0b565b611f006040830184611964565b949350505050565b600081905092915050565b6000611f1e8261181d565b611f288185611f08565b9350611f38818560208601611839565b80840191505092915050565b6000611f508285611f13565b9150611f5c8284611f13565b91508190509392505050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302611fca7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82611f8d565b611fd48683611f8d565b95508019841693508086168417925050509392505050565b6000819050919050565b600061201161200c612007846118cf565b611fec565b6118cf565b9050919050565b6000819050919050565b61202b83611ff6565b61203f61203782612018565b848454611f9a565b825550505050565b600090565b612054612047565b61205f818484612022565b505050565b5b818110156120835761207860008261204c565b600181019050612065565b5050565b601f8211156120c85761209981611f68565b6120a284611f7d565b810160208510156120b1578190505b6120c56120bd85611f7d565b830182612064565b50505b505050565b600082821c905092915050565b60006120eb600019846008026120cd565b1980831691505092915050565b600061210483836120da565b9150826002028217905092915050565b61211d8261181d565b67ffffffffffffffff81111561213657612135611a04565b5b6121408254611e34565b61214b828285612087565b600060209050601f83116001811461217e576000841561216c578287015190505b61217685826120f8565b8655506121de565b601f19841661218c86611f68565b60005b828110156121b45784890151825560018201915060208501945060208101905061218f565b868310156121d157848901516121cd601f8916826120da565b8355505b6001600288020188555050505b505050505050565b600081519050919050565b600082825260208201905092915050565b600061220d826121e6565b61221781856121f1565b9350612227818560208601611839565b61223081611863565b840191505092915050565b60006080820190506122506000830187611964565b61225d6020830186611964565b61226a6040830185611c0b565b818103606083015261227c8184612202565b905095945050505050565b6000815190506122968161178e565b92915050565b6000602082840312156122b2576122b1611758565b5b60006122c084828501612287565b91505092915050565b60006040820190506122de6000830185611964565b6122eb6020830184611c0b565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fdfea2646970667358221220e9ffba266d583f103a2bc0b41b142a6c79b0cd5212f362ff6c8b4bb33dbd6fa564736f6c63430008180033',
  linkReferences: {},
  deployedLinkReferences: {},
};

export const NFTicket721Artifact = {
  _format: 'hh-sol-artifact-1',
  contractName: 'NFTicket721',
  sourceName: 'contracts/NFTicket721.sol',
  abi: [
    {
      inputs: [
        {
          internalType: 'string',
          name: 'name',
          type: 'string',
        },
        {
          internalType: 'string',
          name: 'symbol',
          type: 'string',
        },
        {
          internalType: 'string[]',
          name: '_sectors',
          type: 'string[]',
        },
        {
          internalType: 'uint256[]',
          name: '_capacity',
          type: 'uint256[]',
        },
        {
          internalType: 'uint256',
          name: '_maxMintPerTransaction',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      inputs: [],
      name: 'ERC1167FailedCreateClone',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
      ],
      name: 'ERC721IncorrectOwner',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'ERC721InsufficientApproval',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'approver',
          type: 'address',
        },
      ],
      name: 'ERC721InvalidApprover',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
      ],
      name: 'ERC721InvalidOperator',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
      ],
      name: 'ERC721InvalidOwner',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'receiver',
          type: 'address',
        },
      ],
      name: 'ERC721InvalidReceiver',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
      ],
      name: 'ERC721InvalidSender',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'ERC721NonexistentToken',
      type: 'error',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'approved',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'Approval',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'bool',
          name: 'approved',
          type: 'bool',
        },
      ],
      name: 'ApprovalForAll',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: '_fromTokenId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: '_toTokenId',
          type: 'uint256',
        },
      ],
      name: 'BatchMetadataUpdate',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: '_tokenId',
          type: 'uint256',
        },
      ],
      name: 'MetadataUpdate',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'strategyId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'implementation',
          type: 'address',
        },
      ],
      name: 'StrategyRegistered',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'id',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'sectorId',
          type: 'uint256',
        },
      ],
      name: 'TokenMinted',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'strategyId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'bytes',
          name: 'initData',
          type: 'bytes',
        },
      ],
      name: 'TokenStrategySet',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'Transfer',
      type: 'event',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'approve',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'authenticate',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'sectorId',
          type: 'uint256',
        },
      ],
      name: 'authenticateBySector',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
      ],
      name: 'balanceOf',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          internalType: 'uint256[]',
          name: 'sectorIds',
          type: 'uint256[]',
        },
        {
          internalType: 'string[]',
          name: 'metadataURIs',
          type: 'string[]',
        },
      ],
      name: 'batchMint',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          internalType: 'uint256[]',
          name: 'sectorIds',
          type: 'uint256[]',
        },
        {
          internalType: 'string[]',
          name: 'metadataURIs',
          type: 'string[]',
        },
        {
          internalType: 'uint256[]',
          name: 'strategyIds',
          type: 'uint256[]',
        },
        {
          internalType: 'bytes[]',
          name: 'initDatas',
          type: 'bytes[]',
        },
      ],
      name: 'batchMint',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256[]',
          name: 'tokenIds',
          type: 'uint256[]',
        },
      ],
      name: 'batchTransferWithStrategy',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'capacities',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'currentId',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'getApproved',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getCurrentId',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'getSectorByToken',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'getTokenURI',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'tokenOwner',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'sectorId',
          type: 'uint256',
        },
      ],
      name: 'getTokensBySector',
      outputs: [
        {
          internalType: 'uint256[]',
          name: '',
          type: 'uint256[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
      ],
      name: 'isApprovedForAll',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'isAuthenticated',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'isTokenUsed',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'maxMintPerTransaction',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'sector',
          type: 'uint256',
        },
        {
          internalType: 'string',
          name: 'metadataURI',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: 'strategyId',
          type: 'uint256',
        },
        {
          internalType: 'bytes',
          name: 'initData',
          type: 'bytes',
        },
      ],
      name: 'mint',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'sector',
          type: 'uint256',
        },
        {
          internalType: 'string',
          name: 'metadataURI',
          type: 'string',
        },
      ],
      name: 'mint',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'name',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'nextStrategyId',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'ownerOf',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'ownerSectorTokens',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'implementation',
          type: 'address',
        },
      ],
      name: 'registerStrategy',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'safeTransferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
      ],
      name: 'safeTransferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'sectors',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          internalType: 'bool',
          name: 'approved',
          type: 'bool',
        },
      ],
      name: 'setApprovalForAll',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_maxMintPerTransaction',
          type: 'uint256',
        },
      ],
      name: 'setMaxMintPerTransaction',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'strategyId',
          type: 'uint256',
        },
        {
          internalType: 'bytes',
          name: 'initData',
          type: 'bytes',
        },
      ],
      name: 'setTokenTransferStrategy',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'strategyImplementations',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes4',
          name: 'interfaceId',
          type: 'bytes4',
        },
      ],
      name: 'supportsInterface',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'symbol',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'ticketsIssuedBySector',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'tokenIdToSectorId',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'tokenStrategyContracts',
      outputs: [
        {
          internalType: 'contract ITransferStrategy',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'tokenURI',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'transferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'transferWithStrategy',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
  bytecode:
    '0x60806040523480156200001157600080fd5b50604051620066f2380380620066f28339818101604052810190620000379190620006da565b848481600090816200004a919062000a1f565b5080600190816200005c919062000a1f565b5050508151835114620000a6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200009d9062000b8d565b60405180910390fd5b33600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060098190555060008351905060005b81811015620001835784818151811062000116576200011562000baf565b5b6020026020010151600a600083815260200190815260200160002090816200013f919062000a1f565b5083818151811062000156576200015562000baf565b5b6020026020010151600b6000838152602001908152602001600020819055508080600101915050620000f7565b50600160118190555060006040516200019c906200031e565b604051809103906000f080158015620001b9573d6000803e3d6000fd5b50905080601060006001815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060017fa681544f91d5d9e3c40b0939a43ef1ca39f3eeeab6438e5e2b7ae27d1b3959928260405162000242919062000c23565b60405180910390a26002601181905550600060405162000262906200032c565b604051809103906000f0801580156200027f573d6000803e3d6000fd5b50905080601060006002815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060027fa681544f91d5d9e3c40b0939a43ef1ca39f3eeeab6438e5e2b7ae27d1b3959928260405162000308919062000c23565b60405180910390a2505050505050505062000c40565b6103c28062005f7283390190565b6103be806200633483390190565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620003a38262000358565b810181811067ffffffffffffffff82111715620003c557620003c462000369565b5b80604052505050565b6000620003da6200033a565b9050620003e8828262000398565b919050565b600067ffffffffffffffff8211156200040b576200040a62000369565b5b620004168262000358565b9050602081019050919050565b60005b838110156200044357808201518184015260208101905062000426565b60008484015250505050565b6000620004666200046084620003ed565b620003ce565b90508281526020810184848401111562000485576200048462000353565b5b6200049284828562000423565b509392505050565b600082601f830112620004b257620004b16200034e565b5b8151620004c48482602086016200044f565b91505092915050565b600067ffffffffffffffff821115620004eb57620004ea62000369565b5b602082029050602081019050919050565b600080fd5b6000620005186200051284620004cd565b620003ce565b905080838252602082019050602084028301858111156200053e576200053d620004fc565b5b835b818110156200058c57805167ffffffffffffffff8111156200056757620005666200034e565b5b8086016200057689826200049a565b8552602085019450505060208101905062000540565b5050509392505050565b600082601f830112620005ae57620005ad6200034e565b5b8151620005c084826020860162000501565b91505092915050565b600067ffffffffffffffff821115620005e757620005e662000369565b5b602082029050602081019050919050565b6000819050919050565b6200060d81620005f8565b81146200061957600080fd5b50565b6000815190506200062d8162000602565b92915050565b60006200064a6200064484620005c9565b620003ce565b9050808382526020820190506020840283018581111562000670576200066f620004fc565b5b835b818110156200069d57806200068888826200061c565b84526020840193505060208101905062000672565b5050509392505050565b600082601f830112620006bf57620006be6200034e565b5b8151620006d184826020860162000633565b91505092915050565b600080600080600060a08688031215620006f957620006f862000344565b5b600086015167ffffffffffffffff8111156200071a576200071962000349565b5b62000728888289016200049a565b955050602086015167ffffffffffffffff8111156200074c576200074b62000349565b5b6200075a888289016200049a565b945050604086015167ffffffffffffffff8111156200077e576200077d62000349565b5b6200078c8882890162000596565b935050606086015167ffffffffffffffff811115620007b057620007af62000349565b5b620007be88828901620006a7565b9250506080620007d1888289016200061c565b9150509295509295909350565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200083157607f821691505b602082108103620008475762000846620007e9565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620008b17fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000872565b620008bd868362000872565b95508019841693508086168417925050509392505050565b6000819050919050565b600062000900620008fa620008f484620005f8565b620008d5565b620005f8565b9050919050565b6000819050919050565b6200091c83620008df565b620009346200092b8262000907565b8484546200087f565b825550505050565b600090565b6200094b6200093c565b6200095881848462000911565b505050565b5b8181101562000980576200097460008262000941565b6001810190506200095e565b5050565b601f821115620009cf5762000999816200084d565b620009a48462000862565b81016020851015620009b4578190505b620009cc620009c38562000862565b8301826200095d565b50505b505050565b600082821c905092915050565b6000620009f460001984600802620009d4565b1980831691505092915050565b600062000a0f8383620009e1565b9150826002028217905092915050565b62000a2a82620007de565b67ffffffffffffffff81111562000a465762000a4562000369565b5b62000a52825462000818565b62000a5f82828562000984565b600060209050601f83116001811462000a97576000841562000a82578287015190505b62000a8e858262000a01565b86555062000afe565b601f19841662000aa7866200084d565b60005b8281101562000ad15784890151825560018201915060208501945060208101905062000aaa565b8683101562000af1578489015162000aed601f891682620009e1565b8355505b6001600288020188555050505b505050505050565b600082825260208201905092915050565b7f536563746f727320616e642063617061636974696573206c656e677468206d6960008201527f736d617463680000000000000000000000000000000000000000000000000000602082015250565b600062000b7560268362000b06565b915062000b828262000b17565b604082019050919050565b6000602082019050818103600083015262000ba88162000b66565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600062000c0b8262000bde565b9050919050565b62000c1d8162000bfe565b82525050565b600060208201905062000c3a600083018462000c12565b92915050565b6153228062000c506000396000f3fe608060405234801561001057600080fd5b50600436106102535760003560e01c80638da5cb5b11610146578063b88d4fde116100c3578063d686f8a911610087578063d686f8a91461078c578063e00dd161146107a8578063e985e9c5146107c6578063f2439f0c146107f6578063f4c37b9b14610826578063f5c2c4301461085657610253565b8063b88d4fde146106d8578063c5cfef48146106f4578063c87b56dd14610724578063cf237fc014610754578063d3fc98641461077057610253565b8063a22cb4651161010a578063a22cb46514610610578063ab1577e81461062c578063accf25c11461065c578063ae1890781461068c578063b4e6657f146106bc57610253565b80638da5cb5b146105585780639006b7a61461057657806395cdca12146105a657806395d89b41146105d65780639caea80a146105f457610253565b806339664000116101d45780636352211e116101985780636352211e1461048e5780636590770f146104be5780636c143862146104da57806370a08231146104f8578063893b45e91461052857610253565b806339664000146103c6578063398abe5b146103f65780633bb3a24d146104125780633ff364931461044257806342842e0e1461047257610253565b806312e621f21161021b57806312e621f214610310578063185f84471461034057806323b872dd1461035e578063267a89981461037a5780632e6cebe5146103aa57610253565b806301f569971461025857806301ffc9a71461027657806306fdde03146102a6578063081812fc146102c4578063095ea7b3146102f4575b600080fd5b610260610886565b60405161026d91906138a4565b60405180910390f35b610290600480360381019061028b919061392b565b61088c565b60405161029d9190613973565b60405180910390f35b6102ae6108ed565b6040516102bb9190613a1e565b60405180910390f35b6102de60048036038101906102d99190613a6c565b61097f565b6040516102eb9190613ada565b60405180910390f35b61030e60048036038101906103099190613b21565b61099b565b005b61032a60048036038101906103259190613b61565b6109b1565b60405161033791906138a4565b60405180910390f35b6103486109ef565b60405161035591906138a4565b60405180910390f35b61037860048036038101906103739190613bb4565b6109f5565b005b610394600480360381019061038f9190613a6c565b610b6d565b6040516103a191906138a4565b60405180910390f35b6103c460048036038101906103bf9190613a6c565b610b85565b005b6103e060048036038101906103db9190613b21565b610c1f565b6040516103ed9190613973565b60405180910390f35b610410600480360381019061040b9190613bb4565b610c7f565b005b61042c60048036038101906104279190613a6c565b610df7565b6040516104399190613a1e565b60405180910390f35b61045c60048036038101906104579190613a6c565b610e09565b6040516104699190613a1e565b60405180910390f35b61048c60048036038101906104879190613bb4565b610ea9565b005b6104a860048036038101906104a39190613a6c565b610ec9565b6040516104b59190613ada565b60405180910390f35b6104d860048036038101906104d39190613d3c565b610edb565b005b6104e2611277565b6040516104ef91906138a4565b60405180910390f35b610512600480360381019061050d9190613dab565b611281565b60405161051f91906138a4565b60405180910390f35b610542600480360381019061053d9190613a6c565b61133b565b60405161054f9190613ada565b60405180910390f35b61056061136e565b60405161056d9190613ada565b60405180910390f35b610590600480360381019061058b9190613a6c565b611394565b60405161059d91906138a4565b60405180910390f35b6105c060048036038101906105bb9190613b21565b6113ac565b6040516105cd9190613973565b60405180910390f35b6105de611453565b6040516105eb9190613a1e565b60405180910390f35b61060e60048036038101906106099190614022565b6114e5565b005b61062a600480360381019061062591906140d9565b611669565b005b61064660048036038101906106419190613b21565b61167f565b60405161065391906141d7565b60405180910390f35b61067660048036038101906106719190613a6c565b611728565b60405161068391906138a4565b60405180910390f35b6106a660048036038101906106a19190613a6c565b611740565b6040516106b39190613973565b60405180910390f35b6106d660048036038101906106d191906141f9565b61176a565b005b6106f260048036038101906106ed9190614268565b611964565b005b61070e60048036038101906107099190613a6c565b611ade565b60405161071b91906138a4565b60405180910390f35b61073e60048036038101906107399190613a6c565b611b5c565b60405161074b9190613a1e565b60405180910390f35b61076e600480360381019061076991906142eb565b611c6f565b005b61078a6004803603810190610785919061439e565b611f16565b005b6107a660048036038101906107a191906144ee565b611fc8565b005b6107b061245b565b6040516107bd91906138a4565b60405180910390f35b6107e060048036038101906107db91906145d9565b612461565b6040516107ed9190613973565b60405180910390f35b610810600480360381019061080b9190613a6c565b6124f5565b60405161081d9190613973565b60405180910390f35b610840600480360381019061083b9190613a6c565b612515565b60405161084d9190614678565b60405180910390f35b610870600480360381019061086b9190613dab565b612548565b60405161087d91906138a4565b60405180910390f35b60095481565b6000634906490660e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806108e657506108e582612666565b5b9050919050565b6060600080546108fc906146c2565b80601f0160208091040260200160405190810160405280929190818152602001828054610928906146c2565b80156109755780601f1061094a57610100808354040283529160200191610975565b820191906000526020600020905b81548152906001019060200180831161095857829003601f168201915b5050505050905090565b600061098a82612748565b50610994826127d0565b9050919050565b6109ad82826109a861280d565b612815565b5050565b600e60205282600052604060002060205281600052604060002081815481106109d957600080fd5b9060005260206000200160009250925050505481565b60115481565b6000600f600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610a9c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a939061473f565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1663a02ff68585858560016040518563ffffffff1660e01b8152600401610adc949392919061479a565b602060405180830381865afa158015610af9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b1d91906147f4565b610b5c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b539061486d565b60405180910390fd5b610b67848484612827565b50505050565b600d6020528060005260406000206000915090505481565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610c15576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c0c906148ff565b60405180910390fd5b8060098190555050565b600080600e60008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008481526020019081526020016000208054905011905092915050565b6000600f600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610d26576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d1d9061473f565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1663a02ff68585858560016040518563ffffffff1660e01b8152600401610d66949392919061479a565b602060405180830381865afa158015610d83573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610da791906147f4565b610de6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ddd9061486d565b60405180910390fd5b610df1848484612929565b50505050565b6060610e0282611b5c565b9050919050565b600a6020528060005260406000206000915090508054610e28906146c2565b80601f0160208091040260200160405190810160405280929190818152602001828054610e54906146c2565b8015610ea15780601f10610e7657610100808354040283529160200191610ea1565b820191906000526020600020905b815481529060010190602001808311610e8457829003601f168201915b505050505081565b610ec483838360405180602001604052806000815250611964565b505050565b6000610ed482612748565b9050919050565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610f6b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f62906148ff565b60405180910390fd5b60006010600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603611012576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110099061496b565b60405180910390fd5b60006110338273ffffffffffffffffffffffffffffffffffffffff16612a96565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036110a4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161109b906149d7565b60405180910390fd5b6000836040516024016110b79190614a4c565b6040516020818303038152906040527f439fab91000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050905060008273ffffffffffffffffffffffffffffffffffffffff168260405161115d9190614aaa565b6000604051808303816000865af19150503d806000811461119a576040519150601f19603f3d011682016040523d82523d6000602084013e61119f565b606091505b50509050806111e3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111da90614b0d565b60405180910390fd5b82600f600089815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555085877fac00a50a9bc0f28664b8669296466c465a838cb4e57c7b96e6eeb87fa59e6ad3876040516112669190614a4c565b60405180910390a350505050505050565b6000600854905090565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036112f45760006040517f89c62b640000000000000000000000000000000000000000000000000000000081526004016112eb9190613ada565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60106020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600b6020528060005260406000206000915090505481565b60008273ffffffffffffffffffffffffffffffffffffffff166113ce83610ec9565b73ffffffffffffffffffffffffffffffffffffffff1614158061140e57506012600083815260200190815260200160002060009054906101000a900460ff165b1561141c576000905061144d565b60016012600084815260200190815260200160002060006101000a81548160ff021916908315150217905550600190505b92915050565b606060018054611462906146c2565b80601f016020809104026020016040519081016040528092919081815260200182805461148e906146c2565b80156114db5780601f106114b0576101008083540402835291602001916114db565b820191906000526020600020905b8154815290600101906020018083116114be57829003601f168201915b5050505050905090565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611575576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161156c906148ff565b60405180910390fd5b60008251905060008167ffffffffffffffff81111561159757611596613c11565b5b6040519080825280602002602001820160405280156115c55781602001602082028036833780820191505090505b50905060008267ffffffffffffffff8111156115e4576115e3613c11565b5b60405190808252806020026020018201604052801561161757816020015b60608152602001906001900390816116025790505b50905060005b8381101561165357600183828151811061163a57611639614b2d565b5b602002602001018181525050808060010191505061161d565b506116618686868585611fc8565b505050505050565b61167b61167461280d565b8383612b47565b5050565b6060600e60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002080548060200260200160405190810160405280929190818152602001828054801561171b57602002820191906000526020600020905b815481526020019060010190808311611707575b5050505050905092915050565b600c6020528060005260406000206000915090505481565b60006012600083815260200190815260200160002060009054906101000a900460ff169050919050565b60005b815181101561191f576000600f600084848151811061178f5761178e614b2d565b5b6020026020010151815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603611837576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161182e9061473f565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1663a02ff685868686868151811061186857611867614b2d565b5b602002602001015160016040518563ffffffff1660e01b8152600401611891949392919061479a565b602060405180830381865afa1580156118ae573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118d291906147f4565b611911576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119089061486d565b60405180910390fd5b50808060010191505061176d565b5060005b815181101561195e57611951848484848151811061194457611943614b2d565b5b6020026020010151612929565b8080600101915050611923565b50505050565b6000600f600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603611a0b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a029061473f565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1663a02ff68586868660016040518563ffffffff1660e01b8152600401611a4b949392919061479a565b602060405180830381865afa158015611a68573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a8c91906147f4565b611acb576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ac29061486d565b60405180910390fd5b611ad785858585612cb6565b5050505050565b600080600d600084815260200190815260200160002054141580611b025750600082145b611b41576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611b3890614ba8565b60405180910390fd5b600d6000838152602001908152602001600020549050919050565b6060611b6782612748565b506000600660008481526020019081526020016000208054611b88906146c2565b80601f0160208091040260200160405190810160405280929190818152602001828054611bb4906146c2565b8015611c015780601f10611bd657610100808354040283529160200191611c01565b820191906000526020600020905b815481529060010190602001808311611be457829003601f168201915b505050505090506000611c12612cd3565b90506000815103611c27578192505050611c6a565b600082511115611c5c578082604051602001611c44929190614c04565b60405160208183030381529060405292505050611c6a565b611c6584612cea565b925050505b919050565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611cff576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611cf6906148ff565b60405180910390fd5b600b600085815260200190815260200160002054600c60008681526020019081526020016000205410611d67576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611d5e90614c74565b60405180910390fd5b6000600a60008681526020019081526020016000208054611d87906146c2565b905011611dc9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611dc090614ce0565b60405180910390fd5b60006008549050611dda8682612d53565b611de48185612e4c565b84600d600083815260200190815260200160002081905550600e60008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000868152602001908152602001600020819080600181540180825580915050600190039060005260206000200160009091909190915055611e7e818484610edb565b600c60008681526020019081526020016000206000815480929190611ea290614d2f565b91905055508573ffffffffffffffffffffffffffffffffffffffff16817f2d03118aa776f7008445f6ca8490a6782ede2db364d741513555ba656ab1879f87604051611eee91906138a4565b60405180910390a360086000815480929190611f0990614d2f565b9190505550505050505050565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611fa6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611f9d906148ff565b60405180910390fd5b611fc3838383600160405180602001604052806000815250611c6f565b505050565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614612058576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161204f906148ff565b60405180910390fd5b8251845114801561206a575081518351145b8015612077575080518251145b6120b6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016120ad90614dc3565b60405180910390fd5b600954845111156120fc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016120f390614e2f565b60405180910390fd5b6000845190506000600854905060005b8281101561227c57600b600088838151811061212b5761212a614b2d565b5b6020026020010151815260200190815260200160002054600c600089848151811061215957612158614b2d565b5b6020026020010151815260200190815260200160002054106121b0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016121a790614e9b565b60405180910390fd5b6000600a60008984815181106121c9576121c8614b2d565b5b6020026020010151815260200190815260200160002080546121ea906146c2565b90501161222c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161222390614ce0565b60405180910390fd5b600c600088838151811061224357612242614b2d565b5b60200260200101518152602001908152602001600020600081548092919061226a90614d2f565b9190505550808060010191505061210c565b5060005b8281101561243f57600081836122969190614ebb565b90506122a28982612d53565b6122c6818884815181106122b9576122b8614b2d565b5b6020026020010151612e4c565b8782815181106122d9576122d8614b2d565b5b6020026020010151600d600083815260200190815260200160002081905550600e60008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600089848151811061234c5761234b614b2d565b5b602002602001015181526020019081526020016000208190806001815401808255809150506001900390600052602060002001600090919091909150556123c8818784815181106123a05761239f614b2d565b5b60200260200101518785815181106123bb576123ba614b2d565b5b6020026020010151610edb565b8873ffffffffffffffffffffffffffffffffffffffff16817f2d03118aa776f7008445f6ca8490a6782ede2db364d741513555ba656ab1879f8a858151811061241457612413614b2d565b5b602002602001015160405161242991906138a4565b60405180910390a3508080600101915050612280565b50818161244c9190614ebb565b60088190555050505050505050565b60085481565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60126020528060005260406000206000915054906101000a900460ff1681565b600f6020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036125b8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016125af90614f3b565b60405180910390fd5b6000601160008154809291906125cd90614d2f565b919050559050826010600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550807fa681544f91d5d9e3c40b0939a43ef1ca39f3eeeab6438e5e2b7ae27d1b395992846040516126559190613ada565b60405180910390a280915050919050565b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061273157507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80612741575061274082612ea8565b5b9050919050565b60008061275483612f12565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036127c757826040517f7e2732890000000000000000000000000000000000000000000000000000000081526004016127be91906138a4565b60405180910390fd5b80915050919050565b60006004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b600033905090565b6128228383836001612f4f565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036128995760006040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016128909190613ada565b60405180910390fd5b60006128ad83836128a861280d565b613114565b90508373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614612923578382826040517f64283d7b00000000000000000000000000000000000000000000000000000000815260040161291a93929190614f5b565b60405180910390fd5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361299b5760006040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016129929190613ada565b60405180910390fd5b60006129a983836000613114565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603612a1c57816040517f7e273289000000000000000000000000000000000000000000000000000000008152600401612a1391906138a4565b60405180910390fd5b8373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614612a90578382826040517f64283d7b000000000000000000000000000000000000000000000000000000008152600401612a8793929190614f5b565b60405180910390fd5b50505050565b6000763d602d80600a3d3981f3363d3d373d3d3d363d730000008260601b60e81c176000526e5af43d82803e903d91602b57fd5bf38260781b17602052603760096000f09050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603612b42576040517fc2f868f400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603612bb857816040517f5b08ba18000000000000000000000000000000000000000000000000000000008152600401612baf9190613ada565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051612ca99190613973565b60405180910390a3505050565b612cc18484846109f5565b612ccd8484848461332e565b50505050565b606060405180602001604052806000815250905090565b6060612cf582612748565b506000612d00612cd3565b90506000815111612d205760405180602001604052806000815250612d4b565b80612d2a846134e5565b604051602001612d3b929190614c04565b6040516020818303038152906040525b915050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603612dc55760006040517f64a0ae92000000000000000000000000000000000000000000000000000000008152600401612dbc9190613ada565b60405180910390fd5b6000612dd383836000613114565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614612e475760006040517f73c6ac6e000000000000000000000000000000000000000000000000000000008152600401612e3e9190613ada565b60405180910390fd5b505050565b80600660008481526020019081526020016000209081612e6c9190615134565b507ff8e1a15aba9398e019f0b49df1a4fde98ee17ae345cb5f6b5e2c27f5033e8ce782604051612e9c91906138a4565b60405180910390a15050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b60006002600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b8080612f885750600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614155b156130bc576000612f9884612748565b9050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415801561300357508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614155b801561301657506130148184612461565b155b1561305857826040517fa9fbf51f00000000000000000000000000000000000000000000000000000000815260040161304f9190613ada565b60405180910390fd5b81156130ba57838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b836004600085815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050565b60008061312084612f12565b9050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614613162576131618184866135b3565b5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146131f3576131a4600085600080612f4f565b6001600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614613276576001600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b846002600086815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4809150509392505050565b60008373ffffffffffffffffffffffffffffffffffffffff163b11156134df578273ffffffffffffffffffffffffffffffffffffffff1663150b7a0261337261280d565b8685856040518563ffffffff1660e01b81526004016133949493929190615206565b6020604051808303816000875af19250505080156133d057506040513d601f19601f820116820180604052508101906133cd9190615267565b60015b613454573d8060008114613400576040519150601f19603f3d011682016040523d82523d6000602084013e613405565b606091505b50600081510361344c57836040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016134439190613ada565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916146134dd57836040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016134d49190613ada565b60405180910390fd5b505b50505050565b6060600060016134f484613677565b01905060008167ffffffffffffffff81111561351357613512613c11565b5b6040519080825280601f01601f1916602001820160405280156135455781602001600182028036833780820191505090505b509050600082602001820190505b6001156135a8578080600190039150507f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a858161359c5761359b615294565b5b04945060008503613553575b819350505050919050565b6135be8383836137ca565b61367257600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361363357806040517f7e27328900000000000000000000000000000000000000000000000000000000815260040161362a91906138a4565b60405180910390fd5b81816040517f177e802f0000000000000000000000000000000000000000000000000000000081526004016136699291906152c3565b60405180910390fd5b505050565b600080600090507a184f03e93ff9f4daa797ed6e38ed64bf6a1f01000000000000000083106136d5577a184f03e93ff9f4daa797ed6e38ed64bf6a1f01000000000000000083816136cb576136ca615294565b5b0492506040810190505b6d04ee2d6d415b85acef81000000008310613712576d04ee2d6d415b85acef8100000000838161370857613707615294565b5b0492506020810190505b662386f26fc10000831061374157662386f26fc10000838161373757613736615294565b5b0492506010810190505b6305f5e100831061376a576305f5e10083816137605761375f615294565b5b0492506008810190505b612710831061378f57612710838161378557613784615294565b5b0492506004810190505b606483106137b257606483816137a8576137a7615294565b5b0492506002810190505b600a83106137c1576001810190505b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415801561388257508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16148061384357506138428484612461565b5b8061388157508273ffffffffffffffffffffffffffffffffffffffff16613869836127d0565b73ffffffffffffffffffffffffffffffffffffffff16145b5b90509392505050565b6000819050919050565b61389e8161388b565b82525050565b60006020820190506138b96000830184613895565b92915050565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b613908816138d3565b811461391357600080fd5b50565b600081359050613925816138ff565b92915050565b600060208284031215613941576139406138c9565b5b600061394f84828501613916565b91505092915050565b60008115159050919050565b61396d81613958565b82525050565b60006020820190506139886000830184613964565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156139c85780820151818401526020810190506139ad565b60008484015250505050565b6000601f19601f8301169050919050565b60006139f08261398e565b6139fa8185613999565b9350613a0a8185602086016139aa565b613a13816139d4565b840191505092915050565b60006020820190508181036000830152613a3881846139e5565b905092915050565b613a498161388b565b8114613a5457600080fd5b50565b600081359050613a6681613a40565b92915050565b600060208284031215613a8257613a816138c9565b5b6000613a9084828501613a57565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000613ac482613a99565b9050919050565b613ad481613ab9565b82525050565b6000602082019050613aef6000830184613acb565b92915050565b613afe81613ab9565b8114613b0957600080fd5b50565b600081359050613b1b81613af5565b92915050565b60008060408385031215613b3857613b376138c9565b5b6000613b4685828601613b0c565b9250506020613b5785828601613a57565b9150509250929050565b600080600060608486031215613b7a57613b796138c9565b5b6000613b8886828701613b0c565b9350506020613b9986828701613a57565b9250506040613baa86828701613a57565b9150509250925092565b600080600060608486031215613bcd57613bcc6138c9565b5b6000613bdb86828701613b0c565b9350506020613bec86828701613b0c565b9250506040613bfd86828701613a57565b9150509250925092565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b613c49826139d4565b810181811067ffffffffffffffff82111715613c6857613c67613c11565b5b80604052505050565b6000613c7b6138bf565b9050613c878282613c40565b919050565b600067ffffffffffffffff821115613ca757613ca6613c11565b5b613cb0826139d4565b9050602081019050919050565b82818337600083830152505050565b6000613cdf613cda84613c8c565b613c71565b905082815260208101848484011115613cfb57613cfa613c0c565b5b613d06848285613cbd565b509392505050565b600082601f830112613d2357613d22613c07565b5b8135613d33848260208601613ccc565b91505092915050565b600080600060608486031215613d5557613d546138c9565b5b6000613d6386828701613a57565b9350506020613d7486828701613a57565b925050604084013567ffffffffffffffff811115613d9557613d946138ce565b5b613da186828701613d0e565b9150509250925092565b600060208284031215613dc157613dc06138c9565b5b6000613dcf84828501613b0c565b91505092915050565b600067ffffffffffffffff821115613df357613df2613c11565b5b602082029050602081019050919050565b600080fd5b6000613e1c613e1784613dd8565b613c71565b90508083825260208201905060208402830185811115613e3f57613e3e613e04565b5b835b81811015613e685780613e548882613a57565b845260208401935050602081019050613e41565b5050509392505050565b600082601f830112613e8757613e86613c07565b5b8135613e97848260208601613e09565b91505092915050565b600067ffffffffffffffff821115613ebb57613eba613c11565b5b602082029050602081019050919050565b600067ffffffffffffffff821115613ee757613ee6613c11565b5b613ef0826139d4565b9050602081019050919050565b6000613f10613f0b84613ecc565b613c71565b905082815260208101848484011115613f2c57613f2b613c0c565b5b613f37848285613cbd565b509392505050565b600082601f830112613f5457613f53613c07565b5b8135613f64848260208601613efd565b91505092915050565b6000613f80613f7b84613ea0565b613c71565b90508083825260208201905060208402830185811115613fa357613fa2613e04565b5b835b81811015613fea57803567ffffffffffffffff811115613fc857613fc7613c07565b5b808601613fd58982613f3f565b85526020850194505050602081019050613fa5565b5050509392505050565b600082601f83011261400957614008613c07565b5b8135614019848260208601613f6d565b91505092915050565b60008060006060848603121561403b5761403a6138c9565b5b600061404986828701613b0c565b935050602084013567ffffffffffffffff81111561406a576140696138ce565b5b61407686828701613e72565b925050604084013567ffffffffffffffff811115614097576140966138ce565b5b6140a386828701613ff4565b9150509250925092565b6140b681613958565b81146140c157600080fd5b50565b6000813590506140d3816140ad565b92915050565b600080604083850312156140f0576140ef6138c9565b5b60006140fe85828601613b0c565b925050602061410f858286016140c4565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b61414e8161388b565b82525050565b60006141608383614145565b60208301905092915050565b6000602082019050919050565b600061418482614119565b61418e8185614124565b935061419983614135565b8060005b838110156141ca5781516141b18882614154565b97506141bc8361416c565b92505060018101905061419d565b5085935050505092915050565b600060208201905081810360008301526141f18184614179565b905092915050565b600080600060608486031215614212576142116138c9565b5b600061422086828701613b0c565b935050602061423186828701613b0c565b925050604084013567ffffffffffffffff811115614252576142516138ce565b5b61425e86828701613e72565b9150509250925092565b60008060008060808587031215614282576142816138c9565b5b600061429087828801613b0c565b94505060206142a187828801613b0c565b93505060406142b287828801613a57565b925050606085013567ffffffffffffffff8111156142d3576142d26138ce565b5b6142df87828801613d0e565b91505092959194509250565b600080600080600060a08688031215614307576143066138c9565b5b600061431588828901613b0c565b955050602061432688828901613a57565b945050604086013567ffffffffffffffff811115614347576143466138ce565b5b61435388828901613f3f565b935050606061436488828901613a57565b925050608086013567ffffffffffffffff811115614385576143846138ce565b5b61439188828901613d0e565b9150509295509295909350565b6000806000606084860312156143b7576143b66138c9565b5b60006143c586828701613b0c565b93505060206143d686828701613a57565b925050604084013567ffffffffffffffff8111156143f7576143f66138ce565b5b61440386828701613f3f565b9150509250925092565b600067ffffffffffffffff82111561442857614427613c11565b5b602082029050602081019050919050565b600061444c6144478461440d565b613c71565b9050808382526020820190506020840283018581111561446f5761446e613e04565b5b835b818110156144b657803567ffffffffffffffff81111561449457614493613c07565b5b8086016144a18982613d0e565b85526020850194505050602081019050614471565b5050509392505050565b600082601f8301126144d5576144d4613c07565b5b81356144e5848260208601614439565b91505092915050565b600080600080600060a0868803121561450a576145096138c9565b5b600061451888828901613b0c565b955050602086013567ffffffffffffffff811115614539576145386138ce565b5b61454588828901613e72565b945050604086013567ffffffffffffffff811115614566576145656138ce565b5b61457288828901613ff4565b935050606086013567ffffffffffffffff811115614593576145926138ce565b5b61459f88828901613e72565b925050608086013567ffffffffffffffff8111156145c0576145bf6138ce565b5b6145cc888289016144c0565b9150509295509295909350565b600080604083850312156145f0576145ef6138c9565b5b60006145fe85828601613b0c565b925050602061460f85828601613b0c565b9150509250929050565b6000819050919050565b600061463e61463961463484613a99565b614619565b613a99565b9050919050565b600061465082614623565b9050919050565b600061466282614645565b9050919050565b61467281614657565b82525050565b600060208201905061468d6000830184614669565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806146da57607f821691505b6020821081036146ed576146ec614693565b5b50919050565b7f537472617465677920636f6e7472616374206e6f742073657400000000000000600082015250565b6000614729601983613999565b9150614734826146f3565b602082019050919050565b600060208201905081810360008301526147588161471c565b9050919050565b6000819050919050565b600061478461477f61477a8461475f565b614619565b61388b565b9050919050565b61479481614769565b82525050565b60006080820190506147af6000830187613acb565b6147bc6020830186613acb565b6147c96040830185613895565b6147d6606083018461478b565b95945050505050565b6000815190506147ee816140ad565b92915050565b60006020828403121561480a576148096138c9565b5b6000614818848285016147df565b91505092915050565b7f5472616e73666572206e6f7420616c6c6f776564206279207374726174656779600082015250565b6000614857602083613999565b915061486282614821565b602082019050919050565b600060208201905081810360008301526148868161484a565b9050919050565b7f4f6e6c79206f776e65722063616e2063616c6c20746869732066756e6374696f60008201527f6e00000000000000000000000000000000000000000000000000000000000000602082015250565b60006148e9602183613999565b91506148f48261488d565b604082019050919050565b60006020820190508181036000830152614918816148dc565b9050919050565b7f5374726174656779206e6f742072656769737465726564000000000000000000600082015250565b6000614955601783613999565b91506149608261491f565b602082019050919050565b6000602082019050818103600083015261498481614948565b9050919050565b7f5374726174656779206372656174696f6e206661696c65640000000000000000600082015250565b60006149c1601883613999565b91506149cc8261498b565b602082019050919050565b600060208201905081810360008301526149f0816149b4565b9050919050565b600081519050919050565b600082825260208201905092915050565b6000614a1e826149f7565b614a288185614a02565b9350614a388185602086016139aa565b614a41816139d4565b840191505092915050565b60006020820190508181036000830152614a668184614a13565b905092915050565b600081905092915050565b6000614a84826149f7565b614a8e8185614a6e565b9350614a9e8185602086016139aa565b80840191505092915050565b6000614ab68284614a79565b915081905092915050565b7f537472617465677920696e697469616c697a6174696f6e206661696c65640000600082015250565b6000614af7601e83613999565b9150614b0282614ac1565b602082019050919050565b60006020820190508181036000830152614b2681614aea565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f546f6b656e20646f6573206e6f74206578697374000000000000000000000000600082015250565b6000614b92601483613999565b9150614b9d82614b5c565b602082019050919050565b60006020820190508181036000830152614bc181614b85565b9050919050565b600081905092915050565b6000614bde8261398e565b614be88185614bc8565b9350614bf88185602086016139aa565b80840191505092915050565b6000614c108285614bd3565b9150614c1c8284614bd3565b91508190509392505050565b7f4578636565647320636170616369747900000000000000000000000000000000600082015250565b6000614c5e601083613999565b9150614c6982614c28565b602082019050919050565b60006020820190508181036000830152614c8d81614c51565b9050919050565b7f536563746f7220646f6573206e6f742065786973740000000000000000000000600082015250565b6000614cca601583613999565b9150614cd582614c94565b602082019050919050565b60006020820190508181036000830152614cf981614cbd565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000614d3a8261388b565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203614d6c57614d6b614d00565b5b600182019050919050565b7f417272617973206c656e677468206d69736d6174636800000000000000000000600082015250565b6000614dad601683613999565b9150614db882614d77565b602082019050919050565b60006020820190508181036000830152614ddc81614da0565b9050919050565b7f45786365656473206d6178206d696e7420706572207472616e73616374696f6e600082015250565b6000614e19602083613999565b9150614e2482614de3565b602082019050919050565b60006020820190508181036000830152614e4881614e0c565b9050919050565b7f4578636565647320736563746f72206361706163697479000000000000000000600082015250565b6000614e85601783613999565b9150614e9082614e4f565b602082019050919050565b60006020820190508181036000830152614eb481614e78565b9050919050565b6000614ec68261388b565b9150614ed18361388b565b9250828201905080821115614ee957614ee8614d00565b5b92915050565b7f496e76616c696420696d706c656d656e746174696f6e00000000000000000000600082015250565b6000614f25601683613999565b9150614f3082614eef565b602082019050919050565b60006020820190508181036000830152614f5481614f18565b9050919050565b6000606082019050614f706000830186613acb565b614f7d6020830185613895565b614f8a6040830184613acb565b949350505050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302614ff47fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82614fb7565b614ffe8683614fb7565b95508019841693508086168417925050509392505050565b600061503161502c6150278461388b565b614619565b61388b565b9050919050565b6000819050919050565b61504b83615016565b61505f61505782615038565b848454614fc4565b825550505050565b600090565b615074615067565b61507f818484615042565b505050565b5b818110156150a35761509860008261506c565b600181019050615085565b5050565b601f8211156150e8576150b981614f92565b6150c284614fa7565b810160208510156150d1578190505b6150e56150dd85614fa7565b830182615084565b50505b505050565b600082821c905092915050565b600061510b600019846008026150ed565b1980831691505092915050565b600061512483836150fa565b9150826002028217905092915050565b61513d8261398e565b67ffffffffffffffff81111561515657615155613c11565b5b61516082546146c2565b61516b8282856150a7565b600060209050601f83116001811461519e576000841561518c578287015190505b6151968582615118565b8655506151fe565b601f1984166151ac86614f92565b60005b828110156151d4578489015182556001820191506020850194506020810190506151af565b868310156151f157848901516151ed601f8916826150fa565b8355505b6001600288020188555050505b505050505050565b600060808201905061521b6000830187613acb565b6152286020830186613acb565b6152356040830185613895565b81810360608301526152478184614a13565b905095945050505050565b600081519050615261816138ff565b92915050565b60006020828403121561527d5761527c6138c9565b5b600061528b84828501615252565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006040820190506152d86000830185613acb565b6152e56020830184613895565b939250505056fea264697066735822122056d9407702dcfedd75ea3eacd0bff6ae93914b905470c82a740351d7b2015a5264736f6c63430008180033608060405234801561001057600080fd5b506103a2806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063439fab911461003b578063a02ff68514610057575b600080fd5b610055600480360381019061005091906101f2565b610087565b005b610071600480360381019061006c91906102cf565b61008a565b60405161007e9190610351565b60405180910390f35b50565b600060019050949350505050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6100ff826100b6565b810181811067ffffffffffffffff8211171561011e5761011d6100c7565b5b80604052505050565b6000610131610098565b905061013d82826100f6565b919050565b600067ffffffffffffffff82111561015d5761015c6100c7565b5b610166826100b6565b9050602081019050919050565b82818337600083830152505050565b600061019561019084610142565b610127565b9050828152602081018484840111156101b1576101b06100b1565b5b6101bc848285610173565b509392505050565b600082601f8301126101d9576101d86100ac565b5b81356101e9848260208601610182565b91505092915050565b600060208284031215610208576102076100a2565b5b600082013567ffffffffffffffff811115610226576102256100a7565b5b610232848285016101c4565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006102668261023b565b9050919050565b6102768161025b565b811461028157600080fd5b50565b6000813590506102938161026d565b92915050565b6000819050919050565b6102ac81610299565b81146102b757600080fd5b50565b6000813590506102c9816102a3565b92915050565b600080600080608085870312156102e9576102e86100a2565b5b60006102f787828801610284565b945050602061030887828801610284565b9350506040610319878288016102ba565b925050606061032a878288016102ba565b91505092959194509250565b60008115159050919050565b61034b81610336565b82525050565b60006020820190506103666000830184610342565b9291505056fea2646970667358221220772a36e511ab92abd4b9f6ebe6546624da01579cab6a7bb19bbe3f9fa6ee818f64736f6c63430008180033608060405234801561001057600080fd5b5061039e806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063439fab911461003b578063a02ff68514610057575b600080fd5b610055600480360381019061005091906101ee565b610087565b005b610071600480360381019061006c91906102cb565b61008a565b60405161007e919061034d565b60405180910390f35b50565b6000949350505050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6100fb826100b2565b810181811067ffffffffffffffff8211171561011a576101196100c3565b5b80604052505050565b600061012d610094565b905061013982826100f2565b919050565b600067ffffffffffffffff821115610159576101586100c3565b5b610162826100b2565b9050602081019050919050565b82818337600083830152505050565b600061019161018c8461013e565b610123565b9050828152602081018484840111156101ad576101ac6100ad565b5b6101b884828561016f565b509392505050565b600082601f8301126101d5576101d46100a8565b5b81356101e584826020860161017e565b91505092915050565b6000602082840312156102045761020361009e565b5b600082013567ffffffffffffffff811115610222576102216100a3565b5b61022e848285016101c0565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061026282610237565b9050919050565b61027281610257565b811461027d57600080fd5b50565b60008135905061028f81610269565b92915050565b6000819050919050565b6102a881610295565b81146102b357600080fd5b50565b6000813590506102c58161029f565b92915050565b600080600080608085870312156102e5576102e461009e565b5b60006102f387828801610280565b945050602061030487828801610280565b9350506040610315878288016102b6565b9250506060610326878288016102b6565b91505092959194509250565b60008115159050919050565b61034781610332565b82525050565b6000602082019050610362600083018461033e565b9291505056fea264697066735822122097465617b0787402e12afe3687d92a78752072fc69fa7994cc8d31ec5798f2c364736f6c63430008180033',
  deployedBytecode:
    '0x608060405234801561001057600080fd5b50600436106102535760003560e01c80638da5cb5b11610146578063b88d4fde116100c3578063d686f8a911610087578063d686f8a91461078c578063e00dd161146107a8578063e985e9c5146107c6578063f2439f0c146107f6578063f4c37b9b14610826578063f5c2c4301461085657610253565b8063b88d4fde146106d8578063c5cfef48146106f4578063c87b56dd14610724578063cf237fc014610754578063d3fc98641461077057610253565b8063a22cb4651161010a578063a22cb46514610610578063ab1577e81461062c578063accf25c11461065c578063ae1890781461068c578063b4e6657f146106bc57610253565b80638da5cb5b146105585780639006b7a61461057657806395cdca12146105a657806395d89b41146105d65780639caea80a146105f457610253565b806339664000116101d45780636352211e116101985780636352211e1461048e5780636590770f146104be5780636c143862146104da57806370a08231146104f8578063893b45e91461052857610253565b806339664000146103c6578063398abe5b146103f65780633bb3a24d146104125780633ff364931461044257806342842e0e1461047257610253565b806312e621f21161021b57806312e621f214610310578063185f84471461034057806323b872dd1461035e578063267a89981461037a5780632e6cebe5146103aa57610253565b806301f569971461025857806301ffc9a71461027657806306fdde03146102a6578063081812fc146102c4578063095ea7b3146102f4575b600080fd5b610260610886565b60405161026d91906138a4565b60405180910390f35b610290600480360381019061028b919061392b565b61088c565b60405161029d9190613973565b60405180910390f35b6102ae6108ed565b6040516102bb9190613a1e565b60405180910390f35b6102de60048036038101906102d99190613a6c565b61097f565b6040516102eb9190613ada565b60405180910390f35b61030e60048036038101906103099190613b21565b61099b565b005b61032a60048036038101906103259190613b61565b6109b1565b60405161033791906138a4565b60405180910390f35b6103486109ef565b60405161035591906138a4565b60405180910390f35b61037860048036038101906103739190613bb4565b6109f5565b005b610394600480360381019061038f9190613a6c565b610b6d565b6040516103a191906138a4565b60405180910390f35b6103c460048036038101906103bf9190613a6c565b610b85565b005b6103e060048036038101906103db9190613b21565b610c1f565b6040516103ed9190613973565b60405180910390f35b610410600480360381019061040b9190613bb4565b610c7f565b005b61042c60048036038101906104279190613a6c565b610df7565b6040516104399190613a1e565b60405180910390f35b61045c60048036038101906104579190613a6c565b610e09565b6040516104699190613a1e565b60405180910390f35b61048c60048036038101906104879190613bb4565b610ea9565b005b6104a860048036038101906104a39190613a6c565b610ec9565b6040516104b59190613ada565b60405180910390f35b6104d860048036038101906104d39190613d3c565b610edb565b005b6104e2611277565b6040516104ef91906138a4565b60405180910390f35b610512600480360381019061050d9190613dab565b611281565b60405161051f91906138a4565b60405180910390f35b610542600480360381019061053d9190613a6c565b61133b565b60405161054f9190613ada565b60405180910390f35b61056061136e565b60405161056d9190613ada565b60405180910390f35b610590600480360381019061058b9190613a6c565b611394565b60405161059d91906138a4565b60405180910390f35b6105c060048036038101906105bb9190613b21565b6113ac565b6040516105cd9190613973565b60405180910390f35b6105de611453565b6040516105eb9190613a1e565b60405180910390f35b61060e60048036038101906106099190614022565b6114e5565b005b61062a600480360381019061062591906140d9565b611669565b005b61064660048036038101906106419190613b21565b61167f565b60405161065391906141d7565b60405180910390f35b61067660048036038101906106719190613a6c565b611728565b60405161068391906138a4565b60405180910390f35b6106a660048036038101906106a19190613a6c565b611740565b6040516106b39190613973565b60405180910390f35b6106d660048036038101906106d191906141f9565b61176a565b005b6106f260048036038101906106ed9190614268565b611964565b005b61070e60048036038101906107099190613a6c565b611ade565b60405161071b91906138a4565b60405180910390f35b61073e60048036038101906107399190613a6c565b611b5c565b60405161074b9190613a1e565b60405180910390f35b61076e600480360381019061076991906142eb565b611c6f565b005b61078a6004803603810190610785919061439e565b611f16565b005b6107a660048036038101906107a191906144ee565b611fc8565b005b6107b061245b565b6040516107bd91906138a4565b60405180910390f35b6107e060048036038101906107db91906145d9565b612461565b6040516107ed9190613973565b60405180910390f35b610810600480360381019061080b9190613a6c565b6124f5565b60405161081d9190613973565b60405180910390f35b610840600480360381019061083b9190613a6c565b612515565b60405161084d9190614678565b60405180910390f35b610870600480360381019061086b9190613dab565b612548565b60405161087d91906138a4565b60405180910390f35b60095481565b6000634906490660e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806108e657506108e582612666565b5b9050919050565b6060600080546108fc906146c2565b80601f0160208091040260200160405190810160405280929190818152602001828054610928906146c2565b80156109755780601f1061094a57610100808354040283529160200191610975565b820191906000526020600020905b81548152906001019060200180831161095857829003601f168201915b5050505050905090565b600061098a82612748565b50610994826127d0565b9050919050565b6109ad82826109a861280d565b612815565b5050565b600e60205282600052604060002060205281600052604060002081815481106109d957600080fd5b9060005260206000200160009250925050505481565b60115481565b6000600f600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610a9c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a939061473f565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1663a02ff68585858560016040518563ffffffff1660e01b8152600401610adc949392919061479a565b602060405180830381865afa158015610af9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b1d91906147f4565b610b5c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b539061486d565b60405180910390fd5b610b67848484612827565b50505050565b600d6020528060005260406000206000915090505481565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610c15576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c0c906148ff565b60405180910390fd5b8060098190555050565b600080600e60008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008481526020019081526020016000208054905011905092915050565b6000600f600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610d26576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d1d9061473f565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1663a02ff68585858560016040518563ffffffff1660e01b8152600401610d66949392919061479a565b602060405180830381865afa158015610d83573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610da791906147f4565b610de6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ddd9061486d565b60405180910390fd5b610df1848484612929565b50505050565b6060610e0282611b5c565b9050919050565b600a6020528060005260406000206000915090508054610e28906146c2565b80601f0160208091040260200160405190810160405280929190818152602001828054610e54906146c2565b8015610ea15780601f10610e7657610100808354040283529160200191610ea1565b820191906000526020600020905b815481529060010190602001808311610e8457829003601f168201915b505050505081565b610ec483838360405180602001604052806000815250611964565b505050565b6000610ed482612748565b9050919050565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610f6b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f62906148ff565b60405180910390fd5b60006010600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603611012576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110099061496b565b60405180910390fd5b60006110338273ffffffffffffffffffffffffffffffffffffffff16612a96565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036110a4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161109b906149d7565b60405180910390fd5b6000836040516024016110b79190614a4c565b6040516020818303038152906040527f439fab91000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050905060008273ffffffffffffffffffffffffffffffffffffffff168260405161115d9190614aaa565b6000604051808303816000865af19150503d806000811461119a576040519150601f19603f3d011682016040523d82523d6000602084013e61119f565b606091505b50509050806111e3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111da90614b0d565b60405180910390fd5b82600f600089815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555085877fac00a50a9bc0f28664b8669296466c465a838cb4e57c7b96e6eeb87fa59e6ad3876040516112669190614a4c565b60405180910390a350505050505050565b6000600854905090565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036112f45760006040517f89c62b640000000000000000000000000000000000000000000000000000000081526004016112eb9190613ada565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60106020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600b6020528060005260406000206000915090505481565b60008273ffffffffffffffffffffffffffffffffffffffff166113ce83610ec9565b73ffffffffffffffffffffffffffffffffffffffff1614158061140e57506012600083815260200190815260200160002060009054906101000a900460ff165b1561141c576000905061144d565b60016012600084815260200190815260200160002060006101000a81548160ff021916908315150217905550600190505b92915050565b606060018054611462906146c2565b80601f016020809104026020016040519081016040528092919081815260200182805461148e906146c2565b80156114db5780601f106114b0576101008083540402835291602001916114db565b820191906000526020600020905b8154815290600101906020018083116114be57829003601f168201915b5050505050905090565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611575576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161156c906148ff565b60405180910390fd5b60008251905060008167ffffffffffffffff81111561159757611596613c11565b5b6040519080825280602002602001820160405280156115c55781602001602082028036833780820191505090505b50905060008267ffffffffffffffff8111156115e4576115e3613c11565b5b60405190808252806020026020018201604052801561161757816020015b60608152602001906001900390816116025790505b50905060005b8381101561165357600183828151811061163a57611639614b2d565b5b602002602001018181525050808060010191505061161d565b506116618686868585611fc8565b505050505050565b61167b61167461280d565b8383612b47565b5050565b6060600e60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002080548060200260200160405190810160405280929190818152602001828054801561171b57602002820191906000526020600020905b815481526020019060010190808311611707575b5050505050905092915050565b600c6020528060005260406000206000915090505481565b60006012600083815260200190815260200160002060009054906101000a900460ff169050919050565b60005b815181101561191f576000600f600084848151811061178f5761178e614b2d565b5b6020026020010151815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603611837576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161182e9061473f565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1663a02ff685868686868151811061186857611867614b2d565b5b602002602001015160016040518563ffffffff1660e01b8152600401611891949392919061479a565b602060405180830381865afa1580156118ae573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118d291906147f4565b611911576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119089061486d565b60405180910390fd5b50808060010191505061176d565b5060005b815181101561195e57611951848484848151811061194457611943614b2d565b5b6020026020010151612929565b8080600101915050611923565b50505050565b6000600f600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603611a0b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a029061473f565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1663a02ff68586868660016040518563ffffffff1660e01b8152600401611a4b949392919061479a565b602060405180830381865afa158015611a68573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a8c91906147f4565b611acb576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ac29061486d565b60405180910390fd5b611ad785858585612cb6565b5050505050565b600080600d600084815260200190815260200160002054141580611b025750600082145b611b41576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611b3890614ba8565b60405180910390fd5b600d6000838152602001908152602001600020549050919050565b6060611b6782612748565b506000600660008481526020019081526020016000208054611b88906146c2565b80601f0160208091040260200160405190810160405280929190818152602001828054611bb4906146c2565b8015611c015780601f10611bd657610100808354040283529160200191611c01565b820191906000526020600020905b815481529060010190602001808311611be457829003601f168201915b505050505090506000611c12612cd3565b90506000815103611c27578192505050611c6a565b600082511115611c5c578082604051602001611c44929190614c04565b60405160208183030381529060405292505050611c6a565b611c6584612cea565b925050505b919050565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611cff576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611cf6906148ff565b60405180910390fd5b600b600085815260200190815260200160002054600c60008681526020019081526020016000205410611d67576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611d5e90614c74565b60405180910390fd5b6000600a60008681526020019081526020016000208054611d87906146c2565b905011611dc9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611dc090614ce0565b60405180910390fd5b60006008549050611dda8682612d53565b611de48185612e4c565b84600d600083815260200190815260200160002081905550600e60008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000868152602001908152602001600020819080600181540180825580915050600190039060005260206000200160009091909190915055611e7e818484610edb565b600c60008681526020019081526020016000206000815480929190611ea290614d2f565b91905055508573ffffffffffffffffffffffffffffffffffffffff16817f2d03118aa776f7008445f6ca8490a6782ede2db364d741513555ba656ab1879f87604051611eee91906138a4565b60405180910390a360086000815480929190611f0990614d2f565b9190505550505050505050565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611fa6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611f9d906148ff565b60405180910390fd5b611fc3838383600160405180602001604052806000815250611c6f565b505050565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614612058576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161204f906148ff565b60405180910390fd5b8251845114801561206a575081518351145b8015612077575080518251145b6120b6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016120ad90614dc3565b60405180910390fd5b600954845111156120fc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016120f390614e2f565b60405180910390fd5b6000845190506000600854905060005b8281101561227c57600b600088838151811061212b5761212a614b2d565b5b6020026020010151815260200190815260200160002054600c600089848151811061215957612158614b2d565b5b6020026020010151815260200190815260200160002054106121b0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016121a790614e9b565b60405180910390fd5b6000600a60008984815181106121c9576121c8614b2d565b5b6020026020010151815260200190815260200160002080546121ea906146c2565b90501161222c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161222390614ce0565b60405180910390fd5b600c600088838151811061224357612242614b2d565b5b60200260200101518152602001908152602001600020600081548092919061226a90614d2f565b9190505550808060010191505061210c565b5060005b8281101561243f57600081836122969190614ebb565b90506122a28982612d53565b6122c6818884815181106122b9576122b8614b2d565b5b6020026020010151612e4c565b8782815181106122d9576122d8614b2d565b5b6020026020010151600d600083815260200190815260200160002081905550600e60008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600089848151811061234c5761234b614b2d565b5b602002602001015181526020019081526020016000208190806001815401808255809150506001900390600052602060002001600090919091909150556123c8818784815181106123a05761239f614b2d565b5b60200260200101518785815181106123bb576123ba614b2d565b5b6020026020010151610edb565b8873ffffffffffffffffffffffffffffffffffffffff16817f2d03118aa776f7008445f6ca8490a6782ede2db364d741513555ba656ab1879f8a858151811061241457612413614b2d565b5b602002602001015160405161242991906138a4565b60405180910390a3508080600101915050612280565b50818161244c9190614ebb565b60088190555050505050505050565b60085481565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60126020528060005260406000206000915054906101000a900460ff1681565b600f6020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036125b8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016125af90614f3b565b60405180910390fd5b6000601160008154809291906125cd90614d2f565b919050559050826010600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550807fa681544f91d5d9e3c40b0939a43ef1ca39f3eeeab6438e5e2b7ae27d1b395992846040516126559190613ada565b60405180910390a280915050919050565b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061273157507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80612741575061274082612ea8565b5b9050919050565b60008061275483612f12565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036127c757826040517f7e2732890000000000000000000000000000000000000000000000000000000081526004016127be91906138a4565b60405180910390fd5b80915050919050565b60006004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b600033905090565b6128228383836001612f4f565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036128995760006040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016128909190613ada565b60405180910390fd5b60006128ad83836128a861280d565b613114565b90508373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614612923578382826040517f64283d7b00000000000000000000000000000000000000000000000000000000815260040161291a93929190614f5b565b60405180910390fd5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361299b5760006040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016129929190613ada565b60405180910390fd5b60006129a983836000613114565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603612a1c57816040517f7e273289000000000000000000000000000000000000000000000000000000008152600401612a1391906138a4565b60405180910390fd5b8373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614612a90578382826040517f64283d7b000000000000000000000000000000000000000000000000000000008152600401612a8793929190614f5b565b60405180910390fd5b50505050565b6000763d602d80600a3d3981f3363d3d373d3d3d363d730000008260601b60e81c176000526e5af43d82803e903d91602b57fd5bf38260781b17602052603760096000f09050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603612b42576040517fc2f868f400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603612bb857816040517f5b08ba18000000000000000000000000000000000000000000000000000000008152600401612baf9190613ada565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051612ca99190613973565b60405180910390a3505050565b612cc18484846109f5565b612ccd8484848461332e565b50505050565b606060405180602001604052806000815250905090565b6060612cf582612748565b506000612d00612cd3565b90506000815111612d205760405180602001604052806000815250612d4b565b80612d2a846134e5565b604051602001612d3b929190614c04565b6040516020818303038152906040525b915050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603612dc55760006040517f64a0ae92000000000000000000000000000000000000000000000000000000008152600401612dbc9190613ada565b60405180910390fd5b6000612dd383836000613114565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614612e475760006040517f73c6ac6e000000000000000000000000000000000000000000000000000000008152600401612e3e9190613ada565b60405180910390fd5b505050565b80600660008481526020019081526020016000209081612e6c9190615134565b507ff8e1a15aba9398e019f0b49df1a4fde98ee17ae345cb5f6b5e2c27f5033e8ce782604051612e9c91906138a4565b60405180910390a15050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b60006002600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b8080612f885750600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614155b156130bc576000612f9884612748565b9050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415801561300357508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614155b801561301657506130148184612461565b155b1561305857826040517fa9fbf51f00000000000000000000000000000000000000000000000000000000815260040161304f9190613ada565b60405180910390fd5b81156130ba57838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b836004600085815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050565b60008061312084612f12565b9050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614613162576131618184866135b3565b5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146131f3576131a4600085600080612f4f565b6001600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614613276576001600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b846002600086815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4809150509392505050565b60008373ffffffffffffffffffffffffffffffffffffffff163b11156134df578273ffffffffffffffffffffffffffffffffffffffff1663150b7a0261337261280d565b8685856040518563ffffffff1660e01b81526004016133949493929190615206565b6020604051808303816000875af19250505080156133d057506040513d601f19601f820116820180604052508101906133cd9190615267565b60015b613454573d8060008114613400576040519150601f19603f3d011682016040523d82523d6000602084013e613405565b606091505b50600081510361344c57836040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016134439190613ada565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916146134dd57836040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016134d49190613ada565b60405180910390fd5b505b50505050565b6060600060016134f484613677565b01905060008167ffffffffffffffff81111561351357613512613c11565b5b6040519080825280601f01601f1916602001820160405280156135455781602001600182028036833780820191505090505b509050600082602001820190505b6001156135a8578080600190039150507f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a858161359c5761359b615294565b5b04945060008503613553575b819350505050919050565b6135be8383836137ca565b61367257600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361363357806040517f7e27328900000000000000000000000000000000000000000000000000000000815260040161362a91906138a4565b60405180910390fd5b81816040517f177e802f0000000000000000000000000000000000000000000000000000000081526004016136699291906152c3565b60405180910390fd5b505050565b600080600090507a184f03e93ff9f4daa797ed6e38ed64bf6a1f01000000000000000083106136d5577a184f03e93ff9f4daa797ed6e38ed64bf6a1f01000000000000000083816136cb576136ca615294565b5b0492506040810190505b6d04ee2d6d415b85acef81000000008310613712576d04ee2d6d415b85acef8100000000838161370857613707615294565b5b0492506020810190505b662386f26fc10000831061374157662386f26fc10000838161373757613736615294565b5b0492506010810190505b6305f5e100831061376a576305f5e10083816137605761375f615294565b5b0492506008810190505b612710831061378f57612710838161378557613784615294565b5b0492506004810190505b606483106137b257606483816137a8576137a7615294565b5b0492506002810190505b600a83106137c1576001810190505b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415801561388257508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16148061384357506138428484612461565b5b8061388157508273ffffffffffffffffffffffffffffffffffffffff16613869836127d0565b73ffffffffffffffffffffffffffffffffffffffff16145b5b90509392505050565b6000819050919050565b61389e8161388b565b82525050565b60006020820190506138b96000830184613895565b92915050565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b613908816138d3565b811461391357600080fd5b50565b600081359050613925816138ff565b92915050565b600060208284031215613941576139406138c9565b5b600061394f84828501613916565b91505092915050565b60008115159050919050565b61396d81613958565b82525050565b60006020820190506139886000830184613964565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156139c85780820151818401526020810190506139ad565b60008484015250505050565b6000601f19601f8301169050919050565b60006139f08261398e565b6139fa8185613999565b9350613a0a8185602086016139aa565b613a13816139d4565b840191505092915050565b60006020820190508181036000830152613a3881846139e5565b905092915050565b613a498161388b565b8114613a5457600080fd5b50565b600081359050613a6681613a40565b92915050565b600060208284031215613a8257613a816138c9565b5b6000613a9084828501613a57565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000613ac482613a99565b9050919050565b613ad481613ab9565b82525050565b6000602082019050613aef6000830184613acb565b92915050565b613afe81613ab9565b8114613b0957600080fd5b50565b600081359050613b1b81613af5565b92915050565b60008060408385031215613b3857613b376138c9565b5b6000613b4685828601613b0c565b9250506020613b5785828601613a57565b9150509250929050565b600080600060608486031215613b7a57613b796138c9565b5b6000613b8886828701613b0c565b9350506020613b9986828701613a57565b9250506040613baa86828701613a57565b9150509250925092565b600080600060608486031215613bcd57613bcc6138c9565b5b6000613bdb86828701613b0c565b9350506020613bec86828701613b0c565b9250506040613bfd86828701613a57565b9150509250925092565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b613c49826139d4565b810181811067ffffffffffffffff82111715613c6857613c67613c11565b5b80604052505050565b6000613c7b6138bf565b9050613c878282613c40565b919050565b600067ffffffffffffffff821115613ca757613ca6613c11565b5b613cb0826139d4565b9050602081019050919050565b82818337600083830152505050565b6000613cdf613cda84613c8c565b613c71565b905082815260208101848484011115613cfb57613cfa613c0c565b5b613d06848285613cbd565b509392505050565b600082601f830112613d2357613d22613c07565b5b8135613d33848260208601613ccc565b91505092915050565b600080600060608486031215613d5557613d546138c9565b5b6000613d6386828701613a57565b9350506020613d7486828701613a57565b925050604084013567ffffffffffffffff811115613d9557613d946138ce565b5b613da186828701613d0e565b9150509250925092565b600060208284031215613dc157613dc06138c9565b5b6000613dcf84828501613b0c565b91505092915050565b600067ffffffffffffffff821115613df357613df2613c11565b5b602082029050602081019050919050565b600080fd5b6000613e1c613e1784613dd8565b613c71565b90508083825260208201905060208402830185811115613e3f57613e3e613e04565b5b835b81811015613e685780613e548882613a57565b845260208401935050602081019050613e41565b5050509392505050565b600082601f830112613e8757613e86613c07565b5b8135613e97848260208601613e09565b91505092915050565b600067ffffffffffffffff821115613ebb57613eba613c11565b5b602082029050602081019050919050565b600067ffffffffffffffff821115613ee757613ee6613c11565b5b613ef0826139d4565b9050602081019050919050565b6000613f10613f0b84613ecc565b613c71565b905082815260208101848484011115613f2c57613f2b613c0c565b5b613f37848285613cbd565b509392505050565b600082601f830112613f5457613f53613c07565b5b8135613f64848260208601613efd565b91505092915050565b6000613f80613f7b84613ea0565b613c71565b90508083825260208201905060208402830185811115613fa357613fa2613e04565b5b835b81811015613fea57803567ffffffffffffffff811115613fc857613fc7613c07565b5b808601613fd58982613f3f565b85526020850194505050602081019050613fa5565b5050509392505050565b600082601f83011261400957614008613c07565b5b8135614019848260208601613f6d565b91505092915050565b60008060006060848603121561403b5761403a6138c9565b5b600061404986828701613b0c565b935050602084013567ffffffffffffffff81111561406a576140696138ce565b5b61407686828701613e72565b925050604084013567ffffffffffffffff811115614097576140966138ce565b5b6140a386828701613ff4565b9150509250925092565b6140b681613958565b81146140c157600080fd5b50565b6000813590506140d3816140ad565b92915050565b600080604083850312156140f0576140ef6138c9565b5b60006140fe85828601613b0c565b925050602061410f858286016140c4565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b61414e8161388b565b82525050565b60006141608383614145565b60208301905092915050565b6000602082019050919050565b600061418482614119565b61418e8185614124565b935061419983614135565b8060005b838110156141ca5781516141b18882614154565b97506141bc8361416c565b92505060018101905061419d565b5085935050505092915050565b600060208201905081810360008301526141f18184614179565b905092915050565b600080600060608486031215614212576142116138c9565b5b600061422086828701613b0c565b935050602061423186828701613b0c565b925050604084013567ffffffffffffffff811115614252576142516138ce565b5b61425e86828701613e72565b9150509250925092565b60008060008060808587031215614282576142816138c9565b5b600061429087828801613b0c565b94505060206142a187828801613b0c565b93505060406142b287828801613a57565b925050606085013567ffffffffffffffff8111156142d3576142d26138ce565b5b6142df87828801613d0e565b91505092959194509250565b600080600080600060a08688031215614307576143066138c9565b5b600061431588828901613b0c565b955050602061432688828901613a57565b945050604086013567ffffffffffffffff811115614347576143466138ce565b5b61435388828901613f3f565b935050606061436488828901613a57565b925050608086013567ffffffffffffffff811115614385576143846138ce565b5b61439188828901613d0e565b9150509295509295909350565b6000806000606084860312156143b7576143b66138c9565b5b60006143c586828701613b0c565b93505060206143d686828701613a57565b925050604084013567ffffffffffffffff8111156143f7576143f66138ce565b5b61440386828701613f3f565b9150509250925092565b600067ffffffffffffffff82111561442857614427613c11565b5b602082029050602081019050919050565b600061444c6144478461440d565b613c71565b9050808382526020820190506020840283018581111561446f5761446e613e04565b5b835b818110156144b657803567ffffffffffffffff81111561449457614493613c07565b5b8086016144a18982613d0e565b85526020850194505050602081019050614471565b5050509392505050565b600082601f8301126144d5576144d4613c07565b5b81356144e5848260208601614439565b91505092915050565b600080600080600060a0868803121561450a576145096138c9565b5b600061451888828901613b0c565b955050602086013567ffffffffffffffff811115614539576145386138ce565b5b61454588828901613e72565b945050604086013567ffffffffffffffff811115614566576145656138ce565b5b61457288828901613ff4565b935050606086013567ffffffffffffffff811115614593576145926138ce565b5b61459f88828901613e72565b925050608086013567ffffffffffffffff8111156145c0576145bf6138ce565b5b6145cc888289016144c0565b9150509295509295909350565b600080604083850312156145f0576145ef6138c9565b5b60006145fe85828601613b0c565b925050602061460f85828601613b0c565b9150509250929050565b6000819050919050565b600061463e61463961463484613a99565b614619565b613a99565b9050919050565b600061465082614623565b9050919050565b600061466282614645565b9050919050565b61467281614657565b82525050565b600060208201905061468d6000830184614669565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806146da57607f821691505b6020821081036146ed576146ec614693565b5b50919050565b7f537472617465677920636f6e7472616374206e6f742073657400000000000000600082015250565b6000614729601983613999565b9150614734826146f3565b602082019050919050565b600060208201905081810360008301526147588161471c565b9050919050565b6000819050919050565b600061478461477f61477a8461475f565b614619565b61388b565b9050919050565b61479481614769565b82525050565b60006080820190506147af6000830187613acb565b6147bc6020830186613acb565b6147c96040830185613895565b6147d6606083018461478b565b95945050505050565b6000815190506147ee816140ad565b92915050565b60006020828403121561480a576148096138c9565b5b6000614818848285016147df565b91505092915050565b7f5472616e73666572206e6f7420616c6c6f776564206279207374726174656779600082015250565b6000614857602083613999565b915061486282614821565b602082019050919050565b600060208201905081810360008301526148868161484a565b9050919050565b7f4f6e6c79206f776e65722063616e2063616c6c20746869732066756e6374696f60008201527f6e00000000000000000000000000000000000000000000000000000000000000602082015250565b60006148e9602183613999565b91506148f48261488d565b604082019050919050565b60006020820190508181036000830152614918816148dc565b9050919050565b7f5374726174656779206e6f742072656769737465726564000000000000000000600082015250565b6000614955601783613999565b91506149608261491f565b602082019050919050565b6000602082019050818103600083015261498481614948565b9050919050565b7f5374726174656779206372656174696f6e206661696c65640000000000000000600082015250565b60006149c1601883613999565b91506149cc8261498b565b602082019050919050565b600060208201905081810360008301526149f0816149b4565b9050919050565b600081519050919050565b600082825260208201905092915050565b6000614a1e826149f7565b614a288185614a02565b9350614a388185602086016139aa565b614a41816139d4565b840191505092915050565b60006020820190508181036000830152614a668184614a13565b905092915050565b600081905092915050565b6000614a84826149f7565b614a8e8185614a6e565b9350614a9e8185602086016139aa565b80840191505092915050565b6000614ab68284614a79565b915081905092915050565b7f537472617465677920696e697469616c697a6174696f6e206661696c65640000600082015250565b6000614af7601e83613999565b9150614b0282614ac1565b602082019050919050565b60006020820190508181036000830152614b2681614aea565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f546f6b656e20646f6573206e6f74206578697374000000000000000000000000600082015250565b6000614b92601483613999565b9150614b9d82614b5c565b602082019050919050565b60006020820190508181036000830152614bc181614b85565b9050919050565b600081905092915050565b6000614bde8261398e565b614be88185614bc8565b9350614bf88185602086016139aa565b80840191505092915050565b6000614c108285614bd3565b9150614c1c8284614bd3565b91508190509392505050565b7f4578636565647320636170616369747900000000000000000000000000000000600082015250565b6000614c5e601083613999565b9150614c6982614c28565b602082019050919050565b60006020820190508181036000830152614c8d81614c51565b9050919050565b7f536563746f7220646f6573206e6f742065786973740000000000000000000000600082015250565b6000614cca601583613999565b9150614cd582614c94565b602082019050919050565b60006020820190508181036000830152614cf981614cbd565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000614d3a8261388b565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203614d6c57614d6b614d00565b5b600182019050919050565b7f417272617973206c656e677468206d69736d6174636800000000000000000000600082015250565b6000614dad601683613999565b9150614db882614d77565b602082019050919050565b60006020820190508181036000830152614ddc81614da0565b9050919050565b7f45786365656473206d6178206d696e7420706572207472616e73616374696f6e600082015250565b6000614e19602083613999565b9150614e2482614de3565b602082019050919050565b60006020820190508181036000830152614e4881614e0c565b9050919050565b7f4578636565647320736563746f72206361706163697479000000000000000000600082015250565b6000614e85601783613999565b9150614e9082614e4f565b602082019050919050565b60006020820190508181036000830152614eb481614e78565b9050919050565b6000614ec68261388b565b9150614ed18361388b565b9250828201905080821115614ee957614ee8614d00565b5b92915050565b7f496e76616c696420696d706c656d656e746174696f6e00000000000000000000600082015250565b6000614f25601683613999565b9150614f3082614eef565b602082019050919050565b60006020820190508181036000830152614f5481614f18565b9050919050565b6000606082019050614f706000830186613acb565b614f7d6020830185613895565b614f8a6040830184613acb565b949350505050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302614ff47fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82614fb7565b614ffe8683614fb7565b95508019841693508086168417925050509392505050565b600061503161502c6150278461388b565b614619565b61388b565b9050919050565b6000819050919050565b61504b83615016565b61505f61505782615038565b848454614fc4565b825550505050565b600090565b615074615067565b61507f818484615042565b505050565b5b818110156150a35761509860008261506c565b600181019050615085565b5050565b601f8211156150e8576150b981614f92565b6150c284614fa7565b810160208510156150d1578190505b6150e56150dd85614fa7565b830182615084565b50505b505050565b600082821c905092915050565b600061510b600019846008026150ed565b1980831691505092915050565b600061512483836150fa565b9150826002028217905092915050565b61513d8261398e565b67ffffffffffffffff81111561515657615155613c11565b5b61516082546146c2565b61516b8282856150a7565b600060209050601f83116001811461519e576000841561518c578287015190505b6151968582615118565b8655506151fe565b601f1984166151ac86614f92565b60005b828110156151d4578489015182556001820191506020850194506020810190506151af565b868310156151f157848901516151ed601f8916826150fa565b8355505b6001600288020188555050505b505050505050565b600060808201905061521b6000830187613acb565b6152286020830186613acb565b6152356040830185613895565b81810360608301526152478184614a13565b905095945050505050565b600081519050615261816138ff565b92915050565b60006020828403121561527d5761527c6138c9565b5b600061528b84828501615252565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006040820190506152d86000830185613acb565b6152e56020830184613895565b939250505056fea264697066735822122056d9407702dcfedd75ea3eacd0bff6ae93914b905470c82a740351d7b2015a5264736f6c63430008180033',
  linkReferences: {},
  deployedLinkReferences: {},
};
export const INFTicketArtifact = {
  _format: 'hh-sol-artifact-1',
  contractName: 'NFTicket',
  sourceName: 'contracts/INFTicket.sol',
  abi: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'strategyId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'implementation',
          type: 'address',
        },
      ],
      name: 'StrategyRegistered',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'id',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'sectorId',
          type: 'uint256',
        },
      ],
      name: 'TokenMinted',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'strategyId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'bytes',
          name: 'initData',
          type: 'bytes',
        },
      ],
      name: 'TokenStrategySet',
      type: 'event',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'authenticate',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          internalType: 'uint256[]',
          name: 'sectorIds',
          type: 'uint256[]',
        },
        {
          internalType: 'string[]',
          name: 'metadataURIs',
          type: 'string[]',
        },
      ],
      name: 'batchMint',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getCurrentId',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'getTokenURI',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'sector',
          type: 'uint256',
        },
        {
          internalType: 'string',
          name: 'metadataURI',
          type: 'string',
        },
      ],
      name: 'mint',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'implementation',
          type: 'address',
        },
      ],
      name: 'registerStrategy',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'strategyId',
          type: 'uint256',
        },
        {
          internalType: 'bytes',
          name: 'initData',
          type: 'bytes',
        },
      ],
      name: 'setTokenTransferStrategy',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'sector',
          type: 'uint256',
        },
      ],
      name: 'ticketsIssuedBySector',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ],
  bytecode: '0x',
  deployedBytecode: '0x',
  linkReferences: {},
  deployedLinkReferences: {},
};
export const TransferStrategyArtifact = {
  _format: 'hh-sol-artifact-1',
  contractName: 'FallbackTransferStrategy',
  sourceName: 'contracts/TransferStrategy.sol',
  abi: [
    {
      inputs: [
        {
          internalType: 'address[]',
          name: '_fallbackAddresses',
          type: 'address[]',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'canTransfer',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
      ],
      name: 'initialize',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
  bytecode:
    '0x60a06040523480156200001157600080fd5b5060405162000b0638038062000b06833981810160405281019062000037919062000327565b3373ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff16815250508060009080519060200190620000839291906200008b565b505062000378565b82805482825590600052602060002090810192821562000107579160200282015b82811115620001065782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555091602001919060010190620000ac565b5b5090506200011691906200011a565b5090565b5b80821115620001355760008160009055506001016200011b565b5090565b6000604051905090565b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6200019d8262000152565b810181811067ffffffffffffffff82111715620001bf57620001be62000163565b5b80604052505050565b6000620001d462000139565b9050620001e2828262000192565b919050565b600067ffffffffffffffff82111562000205576200020462000163565b5b602082029050602081019050919050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600062000248826200021b565b9050919050565b6200025a816200023b565b81146200026657600080fd5b50565b6000815190506200027a816200024f565b92915050565b6000620002976200029184620001e7565b620001c8565b90508083825260208201905060208402830185811115620002bd57620002bc62000216565b5b835b81811015620002ea5780620002d5888262000269565b845260208401935050602081019050620002bf565b5050509392505050565b600082601f8301126200030c576200030b6200014d565b5b81516200031e84826020860162000280565b91505092915050565b60006020828403121562000340576200033f62000143565b5b600082015167ffffffffffffffff81111562000361576200036062000148565b5b6200036f84828501620002f4565b91505092915050565b608051610773620003936000396000608901526107736000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063439fab911461003b578063a02ff68514610057575b600080fd5b610055600480360381019061005091906103f1565b610087565b005b610071600480360381019061006c91906104ce565b610142565b60405161007e9190610550565b60405180910390f35b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610115576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161010c906105c8565b60405180910390fd5b8080602001905181019061012991906106c5565b6000908051906020019061013e9291906101f0565b5050565b600080600080549050905060005b818110156101e1578573ffffffffffffffffffffffffffffffffffffffff16600082815481106101835761018261070e565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16036101d4576001925050506101e8565b8080600101915050610150565b5060009150505b949350505050565b828054828255906000526020600020908101928215610269579160200282015b828111156102685782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555091602001919060010190610210565b5b509050610276919061027a565b5090565b5b8082111561029357600081600090555060010161027b565b5090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6102fe826102b5565b810181811067ffffffffffffffff8211171561031d5761031c6102c6565b5b80604052505050565b6000610330610297565b905061033c82826102f5565b919050565b600067ffffffffffffffff82111561035c5761035b6102c6565b5b610365826102b5565b9050602081019050919050565b82818337600083830152505050565b600061039461038f84610341565b610326565b9050828152602081018484840111156103b0576103af6102b0565b5b6103bb848285610372565b509392505050565b600082601f8301126103d8576103d76102ab565b5b81356103e8848260208601610381565b91505092915050565b600060208284031215610407576104066102a1565b5b600082013567ffffffffffffffff811115610425576104246102a6565b5b610431848285016103c3565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006104658261043a565b9050919050565b6104758161045a565b811461048057600080fd5b50565b6000813590506104928161046c565b92915050565b6000819050919050565b6104ab81610498565b81146104b657600080fd5b50565b6000813590506104c8816104a2565b92915050565b600080600080608085870312156104e8576104e76102a1565b5b60006104f687828801610483565b945050602061050787828801610483565b9350506040610518878288016104b9565b9250506060610529878288016104b9565b91505092959194509250565b60008115159050919050565b61054a81610535565b82525050565b60006020820190506105656000830184610541565b92915050565b600082825260208201905092915050565b7f4f6e6c79206f776e657200000000000000000000000000000000000000000000600082015250565b60006105b2600a8361056b565b91506105bd8261057c565b602082019050919050565b600060208201905081810360008301526105e1816105a5565b9050919050565b600067ffffffffffffffff821115610603576106026102c6565b5b602082029050602081019050919050565b600080fd5b6000815190506106288161046c565b92915050565b600061064161063c846105e8565b610326565b9050808382526020820190506020840283018581111561066457610663610614565b5b835b8181101561068d57806106798882610619565b845260208401935050602081019050610666565b5050509392505050565b600082601f8301126106ac576106ab6102ab565b5b81516106bc84826020860161062e565b91505092915050565b6000602082840312156106db576106da6102a1565b5b600082015167ffffffffffffffff8111156106f9576106f86102a6565b5b61070584828501610697565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fdfea2646970667358221220182a88f40119a15a80a48be90ec8e7bb504c61c944407a6eb7a8fce983c5bc9664736f6c63430008180033',
  deployedBytecode:
    '0x608060405234801561001057600080fd5b50600436106100365760003560e01c8063439fab911461003b578063a02ff68514610057575b600080fd5b610055600480360381019061005091906103f1565b610087565b005b610071600480360381019061006c91906104ce565b610142565b60405161007e9190610550565b60405180910390f35b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610115576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161010c906105c8565b60405180910390fd5b8080602001905181019061012991906106c5565b6000908051906020019061013e9291906101f0565b5050565b600080600080549050905060005b818110156101e1578573ffffffffffffffffffffffffffffffffffffffff16600082815481106101835761018261070e565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16036101d4576001925050506101e8565b8080600101915050610150565b5060009150505b949350505050565b828054828255906000526020600020908101928215610269579160200282015b828111156102685782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555091602001919060010190610210565b5b509050610276919061027a565b5090565b5b8082111561029357600081600090555060010161027b565b5090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6102fe826102b5565b810181811067ffffffffffffffff8211171561031d5761031c6102c6565b5b80604052505050565b6000610330610297565b905061033c82826102f5565b919050565b600067ffffffffffffffff82111561035c5761035b6102c6565b5b610365826102b5565b9050602081019050919050565b82818337600083830152505050565b600061039461038f84610341565b610326565b9050828152602081018484840111156103b0576103af6102b0565b5b6103bb848285610372565b509392505050565b600082601f8301126103d8576103d76102ab565b5b81356103e8848260208601610381565b91505092915050565b600060208284031215610407576104066102a1565b5b600082013567ffffffffffffffff811115610425576104246102a6565b5b610431848285016103c3565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006104658261043a565b9050919050565b6104758161045a565b811461048057600080fd5b50565b6000813590506104928161046c565b92915050565b6000819050919050565b6104ab81610498565b81146104b657600080fd5b50565b6000813590506104c8816104a2565b92915050565b600080600080608085870312156104e8576104e76102a1565b5b60006104f687828801610483565b945050602061050787828801610483565b9350506040610518878288016104b9565b9250506060610529878288016104b9565b91505092959194509250565b60008115159050919050565b61054a81610535565b82525050565b60006020820190506105656000830184610541565b92915050565b600082825260208201905092915050565b7f4f6e6c79206f776e657200000000000000000000000000000000000000000000600082015250565b60006105b2600a8361056b565b91506105bd8261057c565b602082019050919050565b600060208201905081810360008301526105e1816105a5565b9050919050565b600067ffffffffffffffff821115610603576106026102c6565b5b602082029050602081019050919050565b600080fd5b6000815190506106288161046c565b92915050565b600061064161063c846105e8565b610326565b9050808382526020820190506020840283018581111561066457610663610614565b5b835b8181101561068d57806106798882610619565b845260208401935050602081019050610666565b5050509392505050565b600082601f8301126106ac576106ab6102ab565b5b81516106bc84826020860161062e565b91505092915050565b6000602082840312156106db576106da6102a1565b5b600082015167ffffffffffffffff8111156106f9576106f86102a6565b5b61070584828501610697565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fdfea2646970667358221220182a88f40119a15a80a48be90ec8e7bb504c61c944407a6eb7a8fce983c5bc9664736f6c63430008180033',
  linkReferences: {},
  deployedLinkReferences: {},
};
