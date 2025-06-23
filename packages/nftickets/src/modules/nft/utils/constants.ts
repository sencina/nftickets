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
    '0x60806040523480156200001157600080fd5b5060405162006654380380620066548339818101604052810190620000379190620006bf565b836200004981620001c960201b60201c565b5083600f90816200005b9190620009cf565b5033600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060006004819055506001600c819055508060058190555060005b83518110156200014457838181518110620000d757620000d662000ab6565b5b6020026020010151600660008381526020019081526020016000209081620001009190620009cf565b5082818151811062000117576200011662000ab6565b5b602002602001015160076000838152602001908152602001600020819055508080600101915050620000b7565b5062000181604051620001579062000303565b604051809103906000f08015801562000174573d6000803e3d6000fd5b50620001de60201b60201c565b50620001be604051620001949062000311565b604051809103906000f080158015620001b1573d6000803e3d6000fd5b50620001de60201b60201c565b505050505062000c46565b8060029081620001da9190620009cf565b5050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160362000251576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620002489062000b46565b60405180910390fd5b6000600c6000815480929190620002689062000b97565b91905055905082600b600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550807fa681544f91d5d9e3c40b0939a43ef1ca39f3eeeab6438e5e2b7ae27d1b39599284604051620002f2919062000c29565b60405180910390a280915050919050565b6103c28062005ed483390190565b6103be806200629683390190565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b62000388826200033d565b810181811067ffffffffffffffff82111715620003aa57620003a96200034e565b5b80604052505050565b6000620003bf6200031f565b9050620003cd82826200037d565b919050565b600067ffffffffffffffff821115620003f057620003ef6200034e565b5b620003fb826200033d565b9050602081019050919050565b60005b83811015620004285780820151818401526020810190506200040b565b60008484015250505050565b60006200044b6200044584620003d2565b620003b3565b9050828152602081018484840111156200046a576200046962000338565b5b6200047784828562000408565b509392505050565b600082601f83011262000497576200049662000333565b5b8151620004a984826020860162000434565b91505092915050565b600067ffffffffffffffff821115620004d057620004cf6200034e565b5b602082029050602081019050919050565b600080fd5b6000620004fd620004f784620004b2565b620003b3565b90508083825260208201905060208402830185811115620005235762000522620004e1565b5b835b818110156200057157805167ffffffffffffffff8111156200054c576200054b62000333565b5b8086016200055b89826200047f565b8552602085019450505060208101905062000525565b5050509392505050565b600082601f83011262000593576200059262000333565b5b8151620005a5848260208601620004e6565b91505092915050565b600067ffffffffffffffff821115620005cc57620005cb6200034e565b5b602082029050602081019050919050565b6000819050919050565b620005f281620005dd565b8114620005fe57600080fd5b50565b6000815190506200061281620005e7565b92915050565b60006200062f6200062984620005ae565b620003b3565b90508083825260208201905060208402830185811115620006555762000654620004e1565b5b835b818110156200068257806200066d888262000601565b84526020840193505060208101905062000657565b5050509392505050565b600082601f830112620006a457620006a362000333565b5b8151620006b684826020860162000618565b91505092915050565b60008060008060808587031215620006dc57620006db62000329565b5b600085015167ffffffffffffffff811115620006fd57620006fc6200032e565b5b6200070b878288016200047f565b945050602085015167ffffffffffffffff8111156200072f576200072e6200032e565b5b6200073d878288016200057b565b935050604085015167ffffffffffffffff8111156200076157620007606200032e565b5b6200076f878288016200068c565b9250506060620007828782880162000601565b91505092959194509250565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620007e157607f821691505b602082108103620007f757620007f662000799565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620008617fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000822565b6200086d868362000822565b95508019841693508086168417925050509392505050565b6000819050919050565b6000620008b0620008aa620008a484620005dd565b62000885565b620005dd565b9050919050565b6000819050919050565b620008cc836200088f565b620008e4620008db82620008b7565b8484546200082f565b825550505050565b600090565b620008fb620008ec565b62000908818484620008c1565b505050565b5b81811015620009305762000924600082620008f1565b6001810190506200090e565b5050565b601f8211156200097f576200094981620007fd565b620009548462000812565b8101602085101562000964578190505b6200097c620009738562000812565b8301826200090d565b50505b505050565b600082821c905092915050565b6000620009a46000198460080262000984565b1980831691505092915050565b6000620009bf838362000991565b9150826002028217905092915050565b620009da826200078e565b67ffffffffffffffff811115620009f657620009f56200034e565b5b62000a028254620007c8565b62000a0f82828562000934565b600060209050601f83116001811462000a47576000841562000a32578287015190505b62000a3e8582620009b1565b86555062000aae565b601f19841662000a5786620007fd565b60005b8281101562000a815784890151825560018201915060208501945060208101905062000a5a565b8683101562000aa1578489015162000a9d601f89168262000991565b8355505b6001600288020188555050505b505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600082825260208201905092915050565b7f496e76616c696420696d706c656d656e746174696f6e00000000000000000000600082015250565b600062000b2e60168362000ae5565b915062000b3b8262000af6565b602082019050919050565b6000602082019050818103600083015262000b618162000b1f565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600062000ba482620005dd565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820362000bd95762000bd862000b68565b5b600182019050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600062000c118262000be4565b9050919050565b62000c238162000c04565b82525050565b600060208201905062000c40600083018462000c18565b92915050565b61527e8062000c566000396000f3fe608060405234801561001057600080fd5b50600436106102055760003560e01c8063893b45e91161011a578063d3fc9864116100ad578063f242432a1161007c578063f242432a14610644578063f2439f0c14610660578063f4c37b9b14610690578063f5298aca146106c0578063f5c2c430146106dc57610205565b8063d3fc9864146105be578063e00dd161146105da578063e985e9c5146105f8578063eb602a0d1461062857610205565b80639caea80a116100e95780639caea80a14610526578063a22cb46514610542578063accf25c11461055e578063ae1890781461058e57610205565b8063893b45e9146104785780638da5cb5b146104a85780639006b7a6146104c657806395cdca12146104f657610205565b80633bb3a24d1161019d578063646a2bb61161016c578063646a2bb6146103ea5780636590770f146104065780636b20c454146104225780636c1438621461043e5780637d28934a1461045c57610205565b80633bb3a24d1461033e5780633ff364931461036e5780634e1273f41461039e57806355f804b3146103ce57610205565b8063185f8447116101d9578063185f8447146102b8578063267a8998146102d65780632e6cebe5146103065780632eb2c2d61461032257610205565b8062fdd58e1461020a57806301f569971461023a57806301ffc9a7146102585780630e89341c14610288575b600080fd5b610224600480360381019061021f91906136ca565b61070c565b6040516102319190613719565b60405180910390f35b610242610766565b60405161024f9190613719565b60405180910390f35b610272600480360381019061026d919061378c565b61076c565b60405161027f91906137d4565b60405180910390f35b6102a2600480360381019061029d91906137ef565b61084e565b6040516102af91906138ac565b60405180910390f35b6102c0610997565b6040516102cd9190613719565b60405180910390f35b6102f060048036038101906102eb91906137ef565b61099d565b6040516102fd9190613719565b60405180910390f35b610320600480360381019061031b91906137ef565b6109b5565b005b61033c60048036038101906103379190613acb565b610a4f565b005b610358600480360381019061035391906137ef565b610c32565b60405161036591906138ac565b60405180910390f35b610388600480360381019061038391906137ef565b610c44565b60405161039591906138ac565b60405180910390f35b6103b860048036038101906103b39190613c5d565b610ce4565b6040516103c59190613d93565b60405180910390f35b6103e860048036038101906103e39190613e56565b610ded565b005b61040460048036038101906103ff9190613acb565b610e90565b005b610420600480360381019061041b9190613e9f565b611073565b005b61043c60048036038101906104379190613f0e565b61140f565b005b6104466114bb565b6040516104539190613719565b60405180910390f35b61047660048036038101906104719190613f99565b6114c5565b005b610492600480360381019061048d91906137ef565b611640565b60405161049f919061403f565b60405180910390f35b6104b0611673565b6040516104bd919061403f565b60405180910390f35b6104e060048036038101906104db91906137ef565b611699565b6040516104ed9190613719565b60405180910390f35b610510600480360381019061050b91906136ca565b6116b1565b60405161051d91906137d4565b60405180910390f35b610540600480360381019061053b919061413b565b611795565b005b61055c600480360381019061055791906141f2565b611989565b005b610578600480360381019061057391906137ef565b61199f565b6040516105859190613719565b60405180910390f35b6105a860048036038101906105a391906137ef565b6119b7565b6040516105b591906137d4565b60405180910390f35b6105d860048036038101906105d39190614232565b6119e1565b005b6105e2611ccd565b6040516105ef9190613719565b60405180910390f35b610612600480360381019061060d91906142a1565b611cd3565b60405161061f91906137d4565b60405180910390f35b610642600480360381019061063d91906143c2565b611d67565b005b61065e60048036038101906106599190613f99565b6122a4565b005b61067a600480360381019061067591906137ef565b61241f565b60405161068791906137d4565b60405180910390f35b6106aa60048036038101906106a591906137ef565b61243f565b6040516106b7919061453a565b60405180910390f35b6106da60048036038101906106d59190614555565b612472565b005b6106f660048036038101906106f191906145a8565b61251e565b6040516107039190613719565b60405180910390f35b600080600083815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60055481565b60007fd9b67a26000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061083757507f0e89341c000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b8061084757506108468261263c565b5b9050919050565b60606000600e6000848152602001908152602001600020805461087090614604565b80601f016020809104026020016040519081016040528092919081815260200182805461089c90614604565b80156108e95780601f106108be576101008083540402835291602001916108e9565b820191906000526020600020905b8154815290600101906020018083116108cc57829003601f168201915b505050505090506000815111156109035780915050610992565b600f805461091090614604565b80601f016020809104026020016040519081016040528092919081815260200182805461093c90614604565b80156109895780601f1061095e57610100808354040283529160200191610989565b820191906000526020600020905b81548152906001019060200180831161096c57829003601f168201915b50505050509150505b919050565b600c5481565b60096020528060005260406000206000915090505481565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610a45576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a3c906146a7565b60405180910390fd5b8060058190555050565b60005b8351811015610c1d576000600a6000868481518110610a7457610a736146c7565b5b6020026020010151815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610b1c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b1390614742565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1663a02ff6858888888681518110610b4d57610b4c6146c7565b5b6020026020010151888781518110610b6857610b676146c7565b5b60200260200101516040518563ffffffff1660e01b8152600401610b8f9493929190614762565b602060405180830381865afa158015610bac573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bd091906147bc565b610c0f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c0690614835565b60405180910390fd5b508080600101915050610a52565b50610c2b85858585856126a6565b5050505050565b6060610c3d8261084e565b9050919050565b60066020528060005260406000206000915090508054610c6390614604565b80601f0160208091040260200160405190810160405280929190818152602001828054610c8f90614604565b8015610cdc5780601f10610cb157610100808354040283529160200191610cdc565b820191906000526020600020905b815481529060010190602001808311610cbf57829003601f168201915b505050505081565b60608151835114610d3057815183516040517f5b059991000000000000000000000000000000000000000000000000000000008152600401610d27929190614855565b60405180910390fd5b6000835167ffffffffffffffff811115610d4d57610d4c6138d3565b5b604051908082528060200260200182016040528015610d7b5781602001602082028036833780820191505090505b50905060005b8451811015610de257610db8610da0828761274e90919063ffffffff16565b610db3838761276290919063ffffffff16565b61070c565b828281518110610dcb57610dca6146c7565b5b602002602001018181525050806001019050610d81565b508091505092915050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610e7d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e74906146a7565b60405180910390fd5b80600f9081610e8c9190614a20565b5050565b60005b835181101561105e576000600a6000868481518110610eb557610eb46146c7565b5b6020026020010151815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610f5d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f5490614742565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1663a02ff6858888888681518110610f8e57610f8d6146c7565b5b6020026020010151888781518110610fa957610fa86146c7565b5b60200260200101516040518563ffffffff1660e01b8152600401610fd09493929190614762565b602060405180830381865afa158015610fed573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061101191906147bc565b611050576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161104790614835565b60405180910390fd5b508080600101915050610e93565b5061106c8585858585610a4f565b5050505050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611103576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110fa906146a7565b60405180910390fd5b6000600b600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036111aa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111a190614b3e565b60405180910390fd5b60006111cb8273ffffffffffffffffffffffffffffffffffffffff16612776565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361123c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161123390614baa565b60405180910390fd5b60008360405160240161124f9190614c1f565b6040516020818303038152906040527f439fab91000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050905060008273ffffffffffffffffffffffffffffffffffffffff16826040516112f59190614c7d565b6000604051808303816000865af19150503d8060008114611332576040519150601f19603f3d011682016040523d82523d6000602084013e611337565b606091505b505090508061137b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161137290614ce0565b60405180910390fd5b82600a600089815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555085877fac00a50a9bc0f28664b8669296466c465a838cb4e57c7b96e6eeb87fa59e6ad3876040516113fe9190614c1f565b60405180910390a350505050505050565b611417612827565b73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614158015611460575061145e83611459612827565b611cd3565b155b156114ab5761146d612827565b836040517fe237d9220000000000000000000000000000000000000000000000000000000081526004016114a2929190614d00565b60405180910390fd5b6114b683838361282f565b505050565b6000600454905090565b6000600a600085815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361156c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161156390614742565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1663a02ff685878787876040518563ffffffff1660e01b81526004016115ab9493929190614762565b602060405180830381865afa1580156115c8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115ec91906147bc565b61162b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161162290614835565b60405180910390fd5b61163886868686866122a4565b505050505050565b600b6020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60076020528060005260406000206000915090505481565b6000806116be848461070c565b116116fe576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116f590614d75565b60405180910390fd5b600d600083815260200190815260200160002060009054906101000a900460ff161561175f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161175690614de1565b60405180910390fd5b6001600d600084815260200190815260200160002060006101000a81548160ff0219169083151502179055506001905092915050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611825576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161181c906146a7565b60405180910390fd5b60008251905060008167ffffffffffffffff811115611847576118466138d3565b5b6040519080825280602002602001820160405280156118755781602001602082028036833780820191505090505b50905060008267ffffffffffffffff811115611894576118936138d3565b5b6040519080825280602002602001820160405280156118c25781602001602082028036833780820191505090505b50905060008367ffffffffffffffff8111156118e1576118e06138d3565b5b60405190808252806020026020018201604052801561191457816020015b60608152602001906001900390816118ff5790505b50905060005b84811015611971576001848281518110611937576119366146c7565b5b6020026020010181815250506001838281518110611958576119576146c7565b5b602002602001018181525050808060010191505061191a565b50611980878785888686611d67565b50505050505050565b61199b611994612827565b83836128c3565b5050565b60086020528060005260406000206000915090505481565b6000600d600083815260200190815260200160002060009054906101000a900460ff169050919050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611a71576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a68906146a7565b60405180910390fd5b6000600167ffffffffffffffff811115611a8e57611a8d6138d3565b5b604051908082528060200260200182016040528015611abc5781602001602082028036833780820191505090505b509050600181600081518110611ad557611ad46146c7565b5b6020026020010181815250506000600167ffffffffffffffff811115611afe57611afd6138d3565b5b604051908082528060200260200182016040528015611b2c5781602001602082028036833780820191505090505b5090508381600081518110611b4457611b436146c7565b5b6020026020010181815250506000600167ffffffffffffffff811115611b6d57611b6c6138d3565b5b604051908082528060200260200182016040528015611ba057816020015b6060815260200190600190039081611b8b5790505b5090508381600081518110611bb857611bb76146c7565b5b60200260200101819052506000600167ffffffffffffffff811115611be057611bdf6138d3565b5b604051908082528060200260200182016040528015611c0e5781602001602082028036833780820191505090505b509050600181600081518110611c2757611c266146c7565b5b6020026020010181815250506000600167ffffffffffffffff811115611c5057611c4f6138d3565b5b604051908082528060200260200182016040528015611c8357816020015b6060815260200190600190039081611c6e5790505b5090506040518060200160405280600081525081600081518110611caa57611ca96146c7565b5b6020026020010181905250611cc3888587868686611d67565b5050505050505050565b60045481565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611df7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611dee906146a7565b60405180910390fd5b83518551148015611e09575082518451145b8015611e16575081518351145b8015611e23575080518251145b611e62576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611e5990614e4d565b60405180910390fd5b60055485511115611ea8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611e9f90614eb9565b60405180910390fd5b6000855167ffffffffffffffff811115611ec557611ec46138d3565b5b604051908082528060200260200182016040528015611ef35781602001602082028036833780820191505090505b5090506000865167ffffffffffffffff811115611f1357611f126138d3565b5b604051908082528060200260200182016040528015611f415781602001602082028036833780820191505090505b50905060005b87518110156122645760076000898381518110611f6757611f666146c7565b5b6020026020010151815260200190815260200160002054878281518110611f9157611f906146c7565b5b6020026020010151600860008b8581518110611fb057611faf6146c7565b5b6020026020010151815260200190815260200160002054611fd19190614f08565b1115612012576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161200990614f88565b60405180910390fd5b6000600660008a848151811061202b5761202a6146c7565b5b60200260200101518152602001908152602001600020805461204c90614604565b90501161208e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161208590614ff4565b60405180910390fd5b60008160045461209e9190614f08565b9050808483815181106120b4576120b36146c7565b5b6020026020010181815250508782815181106120d3576120d26146c7565b5b60200260200101518383815181106120ee576120ed6146c7565b5b60200260200101818152505061211e81888481518110612111576121106146c7565b5b6020026020010151612a33565b888281518110612131576121306146c7565b5b6020026020010151600960008381526020019081526020016000208190555061218f81878481518110612167576121666146c7565b5b6020026020010151878581518110612182576121816146c7565b5b6020026020010151611073565b8782815181106121a2576121a16146c7565b5b6020026020010151600860008b85815181106121c1576121c06146c7565b5b6020026020010151815260200190815260200160002060008282546121e69190614f08565b925050819055508973ffffffffffffffffffffffffffffffffffffffff16817f2d03118aa776f7008445f6ca8490a6782ede2db364d741513555ba656ab1879f8b8581518110612239576122386146c7565b5b602002602001015160405161224e9190613719565b60405180910390a3508080600101915050611f47565b5061228088838360405180602001604052806000815250612a58565b8651600460008282546122939190614f08565b925050819055505050505050505050565b6000600a600085815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361234b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161234290614742565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1663a02ff685878787876040518563ffffffff1660e01b815260040161238a9493929190614762565b602060405180830381865afa1580156123a7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906123cb91906147bc565b61240a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161240190614835565b60405180910390fd5b6124178686868686612ade565b505050505050565b600d6020528060005260406000206000915054906101000a900460ff1681565b600a6020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61247a612827565b73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141580156124c357506124c1836124bc612827565b611cd3565b155b1561250e576124d0612827565b836040517fe237d922000000000000000000000000000000000000000000000000000000008152600401612505929190614d00565b60405180910390fd5b612519838383612b86565b505050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361258e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161258590615060565b60405180910390fd5b6000600c60008154809291906125a390615080565b91905055905082600b600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550807fa681544f91d5d9e3c40b0939a43ef1ca39f3eeeab6438e5e2b7ae27d1b3959928460405161262b919061403f565b60405180910390a280915050919050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b60006126b0612827565b90508073ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff16141580156126f557506126f38682611cd3565b155b156127395780866040517fe237d922000000000000000000000000000000000000000000000000000000008152600401612730929190614d00565b60405180910390fd5b6127468686868686612c2d565b505050505050565b600060208202602084010151905092915050565b600060208202602084010151905092915050565b6000763d602d80600a3d3981f3363d3d373d3d3d363d730000008260601b60e81c176000526e5af43d82803e903d91602b57fd5bf38260781b17602052603760096000f09050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603612822576040517fc2f868f400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b919050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036128a15760006040517f01a83514000000000000000000000000000000000000000000000000000000008152600401612898919061403f565b60405180910390fd5b6128be836000848460405180602001604052806000815250612d25565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036129355760006040517fced3e10000000000000000000000000000000000000000000000000000000000815260040161292c919061403f565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051612a2691906137d4565b60405180910390a3505050565b80600e60008481526020019081526020016000209081612a539190614a20565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603612aca5760006040517f57f447ce000000000000000000000000000000000000000000000000000000008152600401612ac1919061403f565b60405180910390fd5b612ad8600085858585612d25565b50505050565b6000612ae8612827565b90508073ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff1614158015612b2d5750612b2b8682611cd3565b155b15612b715780866040517fe237d922000000000000000000000000000000000000000000000000000000008152600401612b68929190614d00565b60405180910390fd5b612b7e8686868686612dd7565b505050505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603612bf85760006040517f01a83514000000000000000000000000000000000000000000000000000000008152600401612bef919061403f565b60405180910390fd5b600080612c058484612ee2565b91509150612c26856000848460405180602001604052806000815250612d25565b5050505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603612c9f5760006040517f57f447ce000000000000000000000000000000000000000000000000000000008152600401612c96919061403f565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1603612d115760006040517f01a83514000000000000000000000000000000000000000000000000000000008152600401612d08919061403f565b60405180910390fd5b612d1e8585858585612d25565b5050505050565b612d3185858585612f12565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614612dd0576000612d6f612827565b90506001845103612dbf576000612d9060008661276290919063ffffffff16565b90506000612da860008661276290919063ffffffff16565b9050612db88389898585896132ba565b5050612dce565b612dcd81878787878761346e565b5b505b5050505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603612e495760006040517f57f447ce000000000000000000000000000000000000000000000000000000008152600401612e40919061403f565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1603612ebb5760006040517f01a83514000000000000000000000000000000000000000000000000000000008152600401612eb2919061403f565b60405180910390fd5b600080612ec88585612ee2565b91509150612ed98787848487612d25565b50505050505050565b60608060405191506001825283602083015260408201905060018152826020820152604081016040529250929050565b8051825114612f5c57815181516040517f5b059991000000000000000000000000000000000000000000000000000000008152600401612f53929190614855565b60405180910390fd5b6000612f66612827565b905060005b8351811015613175576000612f89828661276290919063ffffffff16565b90506000612fa0838661276290919063ffffffff16565b9050600073ffffffffffffffffffffffffffffffffffffffff168873ffffffffffffffffffffffffffffffffffffffff16146130cd57600080600084815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508181101561307557888183856040517f03dee4c500000000000000000000000000000000000000000000000000000000815260040161306c94939291906150c8565b60405180910390fd5b81810360008085815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff1614613168578060008084815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546131609190614f08565b925050819055505b5050806001019050612f6b565b50600183510361323457600061319560008561276290919063ffffffff16565b905060006131ad60008561276290919063ffffffff16565b90508573ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628585604051613225929190614855565b60405180910390a450506132b3565b8373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb86866040516132aa92919061510d565b60405180910390a45b5050505050565b60008473ffffffffffffffffffffffffffffffffffffffff163b1115613466578373ffffffffffffffffffffffffffffffffffffffff1663f23a6e6187878686866040518663ffffffff1660e01b815260040161331b959493929190615144565b6020604051808303816000875af192505050801561335757506040513d601f19601f8201168201806040525081019061335491906151b3565b60015b6133db573d8060008114613387576040519150601f19603f3d011682016040523d82523d6000602084013e61338c565b606091505b5060008151036133d357846040517f57f447ce0000000000000000000000000000000000000000000000000000000081526004016133ca919061403f565b60405180910390fd5b805181602001fd5b63f23a6e6160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161461346457846040517f57f447ce00000000000000000000000000000000000000000000000000000000815260040161345b919061403f565b60405180910390fd5b505b505050505050565b60008473ffffffffffffffffffffffffffffffffffffffff163b111561361a578373ffffffffffffffffffffffffffffffffffffffff1663bc197c8187878686866040518663ffffffff1660e01b81526004016134cf9594939291906151e0565b6020604051808303816000875af192505050801561350b57506040513d601f19601f8201168201806040525081019061350891906151b3565b60015b61358f573d806000811461353b576040519150601f19603f3d011682016040523d82523d6000602084013e613540565b606091505b50600081510361358757846040517f57f447ce00000000000000000000000000000000000000000000000000000000815260040161357e919061403f565b60405180910390fd5b805181602001fd5b63bc197c8160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161461361857846040517f57f447ce00000000000000000000000000000000000000000000000000000000815260040161360f919061403f565b60405180910390fd5b505b505050505050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061366182613636565b9050919050565b61367181613656565b811461367c57600080fd5b50565b60008135905061368e81613668565b92915050565b6000819050919050565b6136a781613694565b81146136b257600080fd5b50565b6000813590506136c48161369e565b92915050565b600080604083850312156136e1576136e061362c565b5b60006136ef8582860161367f565b9250506020613700858286016136b5565b9150509250929050565b61371381613694565b82525050565b600060208201905061372e600083018461370a565b92915050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b61376981613734565b811461377457600080fd5b50565b60008135905061378681613760565b92915050565b6000602082840312156137a2576137a161362c565b5b60006137b084828501613777565b91505092915050565b60008115159050919050565b6137ce816137b9565b82525050565b60006020820190506137e960008301846137c5565b92915050565b6000602082840312156138055761380461362c565b5b6000613813848285016136b5565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561385657808201518184015260208101905061383b565b60008484015250505050565b6000601f19601f8301169050919050565b600061387e8261381c565b6138888185613827565b9350613898818560208601613838565b6138a181613862565b840191505092915050565b600060208201905081810360008301526138c68184613873565b905092915050565b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61390b82613862565b810181811067ffffffffffffffff8211171561392a576139296138d3565b5b80604052505050565b600061393d613622565b90506139498282613902565b919050565b600067ffffffffffffffff821115613969576139686138d3565b5b602082029050602081019050919050565b600080fd5b600061399261398d8461394e565b613933565b905080838252602082019050602084028301858111156139b5576139b461397a565b5b835b818110156139de57806139ca88826136b5565b8452602084019350506020810190506139b7565b5050509392505050565b600082601f8301126139fd576139fc6138ce565b5b8135613a0d84826020860161397f565b91505092915050565b600080fd5b600067ffffffffffffffff821115613a3657613a356138d3565b5b613a3f82613862565b9050602081019050919050565b82818337600083830152505050565b6000613a6e613a6984613a1b565b613933565b905082815260208101848484011115613a8a57613a89613a16565b5b613a95848285613a4c565b509392505050565b600082601f830112613ab257613ab16138ce565b5b8135613ac2848260208601613a5b565b91505092915050565b600080600080600060a08688031215613ae757613ae661362c565b5b6000613af58882890161367f565b9550506020613b068882890161367f565b945050604086013567ffffffffffffffff811115613b2757613b26613631565b5b613b33888289016139e8565b935050606086013567ffffffffffffffff811115613b5457613b53613631565b5b613b60888289016139e8565b925050608086013567ffffffffffffffff811115613b8157613b80613631565b5b613b8d88828901613a9d565b9150509295509295909350565b600067ffffffffffffffff821115613bb557613bb46138d3565b5b602082029050602081019050919050565b6000613bd9613bd484613b9a565b613933565b90508083825260208201905060208402830185811115613bfc57613bfb61397a565b5b835b81811015613c255780613c11888261367f565b845260208401935050602081019050613bfe565b5050509392505050565b600082601f830112613c4457613c436138ce565b5b8135613c54848260208601613bc6565b91505092915050565b60008060408385031215613c7457613c7361362c565b5b600083013567ffffffffffffffff811115613c9257613c91613631565b5b613c9e85828601613c2f565b925050602083013567ffffffffffffffff811115613cbf57613cbe613631565b5b613ccb858286016139e8565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b613d0a81613694565b82525050565b6000613d1c8383613d01565b60208301905092915050565b6000602082019050919050565b6000613d4082613cd5565b613d4a8185613ce0565b9350613d5583613cf1565b8060005b83811015613d86578151613d6d8882613d10565b9750613d7883613d28565b925050600181019050613d59565b5085935050505092915050565b60006020820190508181036000830152613dad8184613d35565b905092915050565b600067ffffffffffffffff821115613dd057613dcf6138d3565b5b613dd982613862565b9050602081019050919050565b6000613df9613df484613db5565b613933565b905082815260208101848484011115613e1557613e14613a16565b5b613e20848285613a4c565b509392505050565b600082601f830112613e3d57613e3c6138ce565b5b8135613e4d848260208601613de6565b91505092915050565b600060208284031215613e6c57613e6b61362c565b5b600082013567ffffffffffffffff811115613e8a57613e89613631565b5b613e9684828501613e28565b91505092915050565b600080600060608486031215613eb857613eb761362c565b5b6000613ec6868287016136b5565b9350506020613ed7868287016136b5565b925050604084013567ffffffffffffffff811115613ef857613ef7613631565b5b613f0486828701613a9d565b9150509250925092565b600080600060608486031215613f2757613f2661362c565b5b6000613f358682870161367f565b935050602084013567ffffffffffffffff811115613f5657613f55613631565b5b613f62868287016139e8565b925050604084013567ffffffffffffffff811115613f8357613f82613631565b5b613f8f868287016139e8565b9150509250925092565b600080600080600060a08688031215613fb557613fb461362c565b5b6000613fc38882890161367f565b9550506020613fd48882890161367f565b9450506040613fe5888289016136b5565b9350506060613ff6888289016136b5565b925050608086013567ffffffffffffffff81111561401757614016613631565b5b61402388828901613a9d565b9150509295509295909350565b61403981613656565b82525050565b60006020820190506140546000830184614030565b92915050565b600067ffffffffffffffff821115614075576140746138d3565b5b602082029050602081019050919050565b60006140996140948461405a565b613933565b905080838252602082019050602084028301858111156140bc576140bb61397a565b5b835b8181101561410357803567ffffffffffffffff8111156140e1576140e06138ce565b5b8086016140ee8982613e28565b855260208501945050506020810190506140be565b5050509392505050565b600082601f830112614122576141216138ce565b5b8135614132848260208601614086565b91505092915050565b6000806000606084860312156141545761415361362c565b5b60006141628682870161367f565b935050602084013567ffffffffffffffff81111561418357614182613631565b5b61418f868287016139e8565b925050604084013567ffffffffffffffff8111156141b0576141af613631565b5b6141bc8682870161410d565b9150509250925092565b6141cf816137b9565b81146141da57600080fd5b50565b6000813590506141ec816141c6565b92915050565b600080604083850312156142095761420861362c565b5b60006142178582860161367f565b9250506020614228858286016141dd565b9150509250929050565b60008060006060848603121561424b5761424a61362c565b5b60006142598682870161367f565b935050602061426a868287016136b5565b925050604084013567ffffffffffffffff81111561428b5761428a613631565b5b61429786828701613e28565b9150509250925092565b600080604083850312156142b8576142b761362c565b5b60006142c68582860161367f565b92505060206142d78582860161367f565b9150509250929050565b600067ffffffffffffffff8211156142fc576142fb6138d3565b5b602082029050602081019050919050565b600061432061431b846142e1565b613933565b905080838252602082019050602084028301858111156143435761434261397a565b5b835b8181101561438a57803567ffffffffffffffff811115614368576143676138ce565b5b8086016143758982613a9d565b85526020850194505050602081019050614345565b5050509392505050565b600082601f8301126143a9576143a86138ce565b5b81356143b984826020860161430d565b91505092915050565b60008060008060008060c087890312156143df576143de61362c565b5b60006143ed89828a0161367f565b965050602087013567ffffffffffffffff81111561440e5761440d613631565b5b61441a89828a016139e8565b955050604087013567ffffffffffffffff81111561443b5761443a613631565b5b61444789828a016139e8565b945050606087013567ffffffffffffffff81111561446857614467613631565b5b61447489828a0161410d565b935050608087013567ffffffffffffffff81111561449557614494613631565b5b6144a189828a016139e8565b92505060a087013567ffffffffffffffff8111156144c2576144c1613631565b5b6144ce89828a01614394565b9150509295509295509295565b6000819050919050565b60006145006144fb6144f684613636565b6144db565b613636565b9050919050565b6000614512826144e5565b9050919050565b600061452482614507565b9050919050565b61453481614519565b82525050565b600060208201905061454f600083018461452b565b92915050565b60008060006060848603121561456e5761456d61362c565b5b600061457c8682870161367f565b935050602061458d868287016136b5565b925050604061459e868287016136b5565b9150509250925092565b6000602082840312156145be576145bd61362c565b5b60006145cc8482850161367f565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061461c57607f821691505b60208210810361462f5761462e6145d5565b5b50919050565b7f4f6e6c79206f776e65722063616e2063616c6c20746869732066756e6374696f60008201527f6e00000000000000000000000000000000000000000000000000000000000000602082015250565b6000614691602183613827565b915061469c82614635565b604082019050919050565b600060208201905081810360008301526146c081614684565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f537472617465677920636f6e7472616374206e6f742073657400000000000000600082015250565b600061472c601983613827565b9150614737826146f6565b602082019050919050565b6000602082019050818103600083015261475b8161471f565b9050919050565b60006080820190506147776000830187614030565b6147846020830186614030565b614791604083018561370a565b61479e606083018461370a565b95945050505050565b6000815190506147b6816141c6565b92915050565b6000602082840312156147d2576147d161362c565b5b60006147e0848285016147a7565b91505092915050565b7f5472616e73666572206e6f7420616c6c6f776564206279207374726174656779600082015250565b600061481f602083613827565b915061482a826147e9565b602082019050919050565b6000602082019050818103600083015261484e81614812565b9050919050565b600060408201905061486a600083018561370a565b614877602083018461370a565b9392505050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026148e07fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826148a3565b6148ea86836148a3565b95508019841693508086168417925050509392505050565b600061491d61491861491384613694565b6144db565b613694565b9050919050565b6000819050919050565b61493783614902565b61494b61494382614924565b8484546148b0565b825550505050565b600090565b614960614953565b61496b81848461492e565b505050565b5b8181101561498f57614984600082614958565b600181019050614971565b5050565b601f8211156149d4576149a58161487e565b6149ae84614893565b810160208510156149bd578190505b6149d16149c985614893565b830182614970565b50505b505050565b600082821c905092915050565b60006149f7600019846008026149d9565b1980831691505092915050565b6000614a1083836149e6565b9150826002028217905092915050565b614a298261381c565b67ffffffffffffffff811115614a4257614a416138d3565b5b614a4c8254614604565b614a57828285614993565b600060209050601f831160018114614a8a5760008415614a78578287015190505b614a828582614a04565b865550614aea565b601f198416614a988661487e565b60005b82811015614ac057848901518255600182019150602085019450602081019050614a9b565b86831015614add5784890151614ad9601f8916826149e6565b8355505b6001600288020188555050505b505050505050565b7f5374726174656779206e6f742072656769737465726564000000000000000000600082015250565b6000614b28601783613827565b9150614b3382614af2565b602082019050919050565b60006020820190508181036000830152614b5781614b1b565b9050919050565b7f5374726174656779206372656174696f6e206661696c65640000000000000000600082015250565b6000614b94601883613827565b9150614b9f82614b5e565b602082019050919050565b60006020820190508181036000830152614bc381614b87565b9050919050565b600081519050919050565b600082825260208201905092915050565b6000614bf182614bca565b614bfb8185614bd5565b9350614c0b818560208601613838565b614c1481613862565b840191505092915050565b60006020820190508181036000830152614c398184614be6565b905092915050565b600081905092915050565b6000614c5782614bca565b614c618185614c41565b9350614c71818560208601613838565b80840191505092915050565b6000614c898284614c4c565b915081905092915050565b7f537472617465677920696e697469616c697a6174696f6e206661696c65640000600082015250565b6000614cca601e83613827565b9150614cd582614c94565b602082019050919050565b60006020820190508181036000830152614cf981614cbd565b9050919050565b6000604082019050614d156000830185614030565b614d226020830184614030565b9392505050565b7f5469636b6574206e6f74206f776e65642062792073656e646572000000000000600082015250565b6000614d5f601a83613827565b9150614d6a82614d29565b602082019050919050565b60006020820190508181036000830152614d8e81614d52565b9050919050565b7f5469636b657420616c7265616479207573656400000000000000000000000000600082015250565b6000614dcb601383613827565b9150614dd682614d95565b602082019050919050565b60006020820190508181036000830152614dfa81614dbe565b9050919050565b7f417272617973206c656e677468206d69736d6174636800000000000000000000600082015250565b6000614e37601683613827565b9150614e4282614e01565b602082019050919050565b60006020820190508181036000830152614e6681614e2a565b9050919050565b7f45786365656473206d6178206d696e7420706572207472616e73616374696f6e600082015250565b6000614ea3602083613827565b9150614eae82614e6d565b602082019050919050565b60006020820190508181036000830152614ed281614e96565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000614f1382613694565b9150614f1e83613694565b9250828201905080821115614f3657614f35614ed9565b5b92915050565b7f4578636565647320736563746f72206361706163697479000000000000000000600082015250565b6000614f72601783613827565b9150614f7d82614f3c565b602082019050919050565b60006020820190508181036000830152614fa181614f65565b9050919050565b7f536563746f7220646f6573206e6f742065786973740000000000000000000000600082015250565b6000614fde601583613827565b9150614fe982614fa8565b602082019050919050565b6000602082019050818103600083015261500d81614fd1565b9050919050565b7f496e76616c696420696d706c656d656e746174696f6e00000000000000000000600082015250565b600061504a601683613827565b915061505582615014565b602082019050919050565b600060208201905081810360008301526150798161503d565b9050919050565b600061508b82613694565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036150bd576150bc614ed9565b5b600182019050919050565b60006080820190506150dd6000830187614030565b6150ea602083018661370a565b6150f7604083018561370a565b615104606083018461370a565b95945050505050565b600060408201905081810360008301526151278185613d35565b9050818103602083015261513b8184613d35565b90509392505050565b600060a0820190506151596000830188614030565b6151666020830187614030565b615173604083018661370a565b615180606083018561370a565b81810360808301526151928184614be6565b90509695505050505050565b6000815190506151ad81613760565b92915050565b6000602082840312156151c9576151c861362c565b5b60006151d78482850161519e565b91505092915050565b600060a0820190506151f56000830188614030565b6152026020830187614030565b81810360408301526152148186613d35565b905081810360608301526152288185613d35565b9050818103608083015261523c8184614be6565b9050969550505050505056fea26469706673582212202ed3cf988c2b65d9574c39fb0d8c5e16c5fdd280aee96d35220aacc234e55ca264736f6c63430008180033608060405234801561001057600080fd5b506103a2806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063439fab911461003b578063a02ff68514610057575b600080fd5b610055600480360381019061005091906101f2565b610087565b005b610071600480360381019061006c91906102cf565b61008a565b60405161007e9190610351565b60405180910390f35b50565b600060019050949350505050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6100ff826100b6565b810181811067ffffffffffffffff8211171561011e5761011d6100c7565b5b80604052505050565b6000610131610098565b905061013d82826100f6565b919050565b600067ffffffffffffffff82111561015d5761015c6100c7565b5b610166826100b6565b9050602081019050919050565b82818337600083830152505050565b600061019561019084610142565b610127565b9050828152602081018484840111156101b1576101b06100b1565b5b6101bc848285610173565b509392505050565b600082601f8301126101d9576101d86100ac565b5b81356101e9848260208601610182565b91505092915050565b600060208284031215610208576102076100a2565b5b600082013567ffffffffffffffff811115610226576102256100a7565b5b610232848285016101c4565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006102668261023b565b9050919050565b6102768161025b565b811461028157600080fd5b50565b6000813590506102938161026d565b92915050565b6000819050919050565b6102ac81610299565b81146102b757600080fd5b50565b6000813590506102c9816102a3565b92915050565b600080600080608085870312156102e9576102e86100a2565b5b60006102f787828801610284565b945050602061030887828801610284565b9350506040610319878288016102ba565b925050606061032a878288016102ba565b91505092959194509250565b60008115159050919050565b61034b81610336565b82525050565b60006020820190506103666000830184610342565b9291505056fea2646970667358221220772a36e511ab92abd4b9f6ebe6546624da01579cab6a7bb19bbe3f9fa6ee818f64736f6c63430008180033608060405234801561001057600080fd5b5061039e806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063439fab911461003b578063a02ff68514610057575b600080fd5b610055600480360381019061005091906101ee565b610087565b005b610071600480360381019061006c91906102cb565b61008a565b60405161007e919061034d565b60405180910390f35b50565b6000949350505050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6100fb826100b2565b810181811067ffffffffffffffff8211171561011a576101196100c3565b5b80604052505050565b600061012d610094565b905061013982826100f2565b919050565b600067ffffffffffffffff821115610159576101586100c3565b5b610162826100b2565b9050602081019050919050565b82818337600083830152505050565b600061019161018c8461013e565b610123565b9050828152602081018484840111156101ad576101ac6100ad565b5b6101b884828561016f565b509392505050565b600082601f8301126101d5576101d46100a8565b5b81356101e584826020860161017e565b91505092915050565b6000602082840312156102045761020361009e565b5b600082013567ffffffffffffffff811115610222576102216100a3565b5b61022e848285016101c0565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061026282610237565b9050919050565b61027281610257565b811461027d57600080fd5b50565b60008135905061028f81610269565b92915050565b6000819050919050565b6102a881610295565b81146102b357600080fd5b50565b6000813590506102c58161029f565b92915050565b600080600080608085870312156102e5576102e461009e565b5b60006102f387828801610280565b945050602061030487828801610280565b9350506040610315878288016102b6565b9250506060610326878288016102b6565b91505092959194509250565b60008115159050919050565b61034781610332565b82525050565b6000602082019050610362600083018461033e565b9291505056fea264697066735822122097465617b0787402e12afe3687d92a78752072fc69fa7994cc8d31ec5798f2c364736f6c63430008180033',
  deployedBytecode:
    '0x608060405234801561001057600080fd5b50600436106102055760003560e01c8063893b45e91161011a578063d3fc9864116100ad578063f242432a1161007c578063f242432a14610644578063f2439f0c14610660578063f4c37b9b14610690578063f5298aca146106c0578063f5c2c430146106dc57610205565b8063d3fc9864146105be578063e00dd161146105da578063e985e9c5146105f8578063eb602a0d1461062857610205565b80639caea80a116100e95780639caea80a14610526578063a22cb46514610542578063accf25c11461055e578063ae1890781461058e57610205565b8063893b45e9146104785780638da5cb5b146104a85780639006b7a6146104c657806395cdca12146104f657610205565b80633bb3a24d1161019d578063646a2bb61161016c578063646a2bb6146103ea5780636590770f146104065780636b20c454146104225780636c1438621461043e5780637d28934a1461045c57610205565b80633bb3a24d1461033e5780633ff364931461036e5780634e1273f41461039e57806355f804b3146103ce57610205565b8063185f8447116101d9578063185f8447146102b8578063267a8998146102d65780632e6cebe5146103065780632eb2c2d61461032257610205565b8062fdd58e1461020a57806301f569971461023a57806301ffc9a7146102585780630e89341c14610288575b600080fd5b610224600480360381019061021f91906136ca565b61070c565b6040516102319190613719565b60405180910390f35b610242610766565b60405161024f9190613719565b60405180910390f35b610272600480360381019061026d919061378c565b61076c565b60405161027f91906137d4565b60405180910390f35b6102a2600480360381019061029d91906137ef565b61084e565b6040516102af91906138ac565b60405180910390f35b6102c0610997565b6040516102cd9190613719565b60405180910390f35b6102f060048036038101906102eb91906137ef565b61099d565b6040516102fd9190613719565b60405180910390f35b610320600480360381019061031b91906137ef565b6109b5565b005b61033c60048036038101906103379190613acb565b610a4f565b005b610358600480360381019061035391906137ef565b610c32565b60405161036591906138ac565b60405180910390f35b610388600480360381019061038391906137ef565b610c44565b60405161039591906138ac565b60405180910390f35b6103b860048036038101906103b39190613c5d565b610ce4565b6040516103c59190613d93565b60405180910390f35b6103e860048036038101906103e39190613e56565b610ded565b005b61040460048036038101906103ff9190613acb565b610e90565b005b610420600480360381019061041b9190613e9f565b611073565b005b61043c60048036038101906104379190613f0e565b61140f565b005b6104466114bb565b6040516104539190613719565b60405180910390f35b61047660048036038101906104719190613f99565b6114c5565b005b610492600480360381019061048d91906137ef565b611640565b60405161049f919061403f565b60405180910390f35b6104b0611673565b6040516104bd919061403f565b60405180910390f35b6104e060048036038101906104db91906137ef565b611699565b6040516104ed9190613719565b60405180910390f35b610510600480360381019061050b91906136ca565b6116b1565b60405161051d91906137d4565b60405180910390f35b610540600480360381019061053b919061413b565b611795565b005b61055c600480360381019061055791906141f2565b611989565b005b610578600480360381019061057391906137ef565b61199f565b6040516105859190613719565b60405180910390f35b6105a860048036038101906105a391906137ef565b6119b7565b6040516105b591906137d4565b60405180910390f35b6105d860048036038101906105d39190614232565b6119e1565b005b6105e2611ccd565b6040516105ef9190613719565b60405180910390f35b610612600480360381019061060d91906142a1565b611cd3565b60405161061f91906137d4565b60405180910390f35b610642600480360381019061063d91906143c2565b611d67565b005b61065e60048036038101906106599190613f99565b6122a4565b005b61067a600480360381019061067591906137ef565b61241f565b60405161068791906137d4565b60405180910390f35b6106aa60048036038101906106a591906137ef565b61243f565b6040516106b7919061453a565b60405180910390f35b6106da60048036038101906106d59190614555565b612472565b005b6106f660048036038101906106f191906145a8565b61251e565b6040516107039190613719565b60405180910390f35b600080600083815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60055481565b60007fd9b67a26000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061083757507f0e89341c000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b8061084757506108468261263c565b5b9050919050565b60606000600e6000848152602001908152602001600020805461087090614604565b80601f016020809104026020016040519081016040528092919081815260200182805461089c90614604565b80156108e95780601f106108be576101008083540402835291602001916108e9565b820191906000526020600020905b8154815290600101906020018083116108cc57829003601f168201915b505050505090506000815111156109035780915050610992565b600f805461091090614604565b80601f016020809104026020016040519081016040528092919081815260200182805461093c90614604565b80156109895780601f1061095e57610100808354040283529160200191610989565b820191906000526020600020905b81548152906001019060200180831161096c57829003601f168201915b50505050509150505b919050565b600c5481565b60096020528060005260406000206000915090505481565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610a45576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a3c906146a7565b60405180910390fd5b8060058190555050565b60005b8351811015610c1d576000600a6000868481518110610a7457610a736146c7565b5b6020026020010151815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610b1c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b1390614742565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1663a02ff6858888888681518110610b4d57610b4c6146c7565b5b6020026020010151888781518110610b6857610b676146c7565b5b60200260200101516040518563ffffffff1660e01b8152600401610b8f9493929190614762565b602060405180830381865afa158015610bac573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bd091906147bc565b610c0f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c0690614835565b60405180910390fd5b508080600101915050610a52565b50610c2b85858585856126a6565b5050505050565b6060610c3d8261084e565b9050919050565b60066020528060005260406000206000915090508054610c6390614604565b80601f0160208091040260200160405190810160405280929190818152602001828054610c8f90614604565b8015610cdc5780601f10610cb157610100808354040283529160200191610cdc565b820191906000526020600020905b815481529060010190602001808311610cbf57829003601f168201915b505050505081565b60608151835114610d3057815183516040517f5b059991000000000000000000000000000000000000000000000000000000008152600401610d27929190614855565b60405180910390fd5b6000835167ffffffffffffffff811115610d4d57610d4c6138d3565b5b604051908082528060200260200182016040528015610d7b5781602001602082028036833780820191505090505b50905060005b8451811015610de257610db8610da0828761274e90919063ffffffff16565b610db3838761276290919063ffffffff16565b61070c565b828281518110610dcb57610dca6146c7565b5b602002602001018181525050806001019050610d81565b508091505092915050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610e7d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e74906146a7565b60405180910390fd5b80600f9081610e8c9190614a20565b5050565b60005b835181101561105e576000600a6000868481518110610eb557610eb46146c7565b5b6020026020010151815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610f5d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f5490614742565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1663a02ff6858888888681518110610f8e57610f8d6146c7565b5b6020026020010151888781518110610fa957610fa86146c7565b5b60200260200101516040518563ffffffff1660e01b8152600401610fd09493929190614762565b602060405180830381865afa158015610fed573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061101191906147bc565b611050576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161104790614835565b60405180910390fd5b508080600101915050610e93565b5061106c8585858585610a4f565b5050505050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611103576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110fa906146a7565b60405180910390fd5b6000600b600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036111aa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111a190614b3e565b60405180910390fd5b60006111cb8273ffffffffffffffffffffffffffffffffffffffff16612776565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361123c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161123390614baa565b60405180910390fd5b60008360405160240161124f9190614c1f565b6040516020818303038152906040527f439fab91000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050905060008273ffffffffffffffffffffffffffffffffffffffff16826040516112f59190614c7d565b6000604051808303816000865af19150503d8060008114611332576040519150601f19603f3d011682016040523d82523d6000602084013e611337565b606091505b505090508061137b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161137290614ce0565b60405180910390fd5b82600a600089815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555085877fac00a50a9bc0f28664b8669296466c465a838cb4e57c7b96e6eeb87fa59e6ad3876040516113fe9190614c1f565b60405180910390a350505050505050565b611417612827565b73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614158015611460575061145e83611459612827565b611cd3565b155b156114ab5761146d612827565b836040517fe237d9220000000000000000000000000000000000000000000000000000000081526004016114a2929190614d00565b60405180910390fd5b6114b683838361282f565b505050565b6000600454905090565b6000600a600085815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361156c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161156390614742565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1663a02ff685878787876040518563ffffffff1660e01b81526004016115ab9493929190614762565b602060405180830381865afa1580156115c8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115ec91906147bc565b61162b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161162290614835565b60405180910390fd5b61163886868686866122a4565b505050505050565b600b6020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60076020528060005260406000206000915090505481565b6000806116be848461070c565b116116fe576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116f590614d75565b60405180910390fd5b600d600083815260200190815260200160002060009054906101000a900460ff161561175f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161175690614de1565b60405180910390fd5b6001600d600084815260200190815260200160002060006101000a81548160ff0219169083151502179055506001905092915050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611825576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161181c906146a7565b60405180910390fd5b60008251905060008167ffffffffffffffff811115611847576118466138d3565b5b6040519080825280602002602001820160405280156118755781602001602082028036833780820191505090505b50905060008267ffffffffffffffff811115611894576118936138d3565b5b6040519080825280602002602001820160405280156118c25781602001602082028036833780820191505090505b50905060008367ffffffffffffffff8111156118e1576118e06138d3565b5b60405190808252806020026020018201604052801561191457816020015b60608152602001906001900390816118ff5790505b50905060005b84811015611971576001848281518110611937576119366146c7565b5b6020026020010181815250506001838281518110611958576119576146c7565b5b602002602001018181525050808060010191505061191a565b50611980878785888686611d67565b50505050505050565b61199b611994612827565b83836128c3565b5050565b60086020528060005260406000206000915090505481565b6000600d600083815260200190815260200160002060009054906101000a900460ff169050919050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611a71576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a68906146a7565b60405180910390fd5b6000600167ffffffffffffffff811115611a8e57611a8d6138d3565b5b604051908082528060200260200182016040528015611abc5781602001602082028036833780820191505090505b509050600181600081518110611ad557611ad46146c7565b5b6020026020010181815250506000600167ffffffffffffffff811115611afe57611afd6138d3565b5b604051908082528060200260200182016040528015611b2c5781602001602082028036833780820191505090505b5090508381600081518110611b4457611b436146c7565b5b6020026020010181815250506000600167ffffffffffffffff811115611b6d57611b6c6138d3565b5b604051908082528060200260200182016040528015611ba057816020015b6060815260200190600190039081611b8b5790505b5090508381600081518110611bb857611bb76146c7565b5b60200260200101819052506000600167ffffffffffffffff811115611be057611bdf6138d3565b5b604051908082528060200260200182016040528015611c0e5781602001602082028036833780820191505090505b509050600181600081518110611c2757611c266146c7565b5b6020026020010181815250506000600167ffffffffffffffff811115611c5057611c4f6138d3565b5b604051908082528060200260200182016040528015611c8357816020015b6060815260200190600190039081611c6e5790505b5090506040518060200160405280600081525081600081518110611caa57611ca96146c7565b5b6020026020010181905250611cc3888587868686611d67565b5050505050505050565b60045481565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611df7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611dee906146a7565b60405180910390fd5b83518551148015611e09575082518451145b8015611e16575081518351145b8015611e23575080518251145b611e62576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611e5990614e4d565b60405180910390fd5b60055485511115611ea8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611e9f90614eb9565b60405180910390fd5b6000855167ffffffffffffffff811115611ec557611ec46138d3565b5b604051908082528060200260200182016040528015611ef35781602001602082028036833780820191505090505b5090506000865167ffffffffffffffff811115611f1357611f126138d3565b5b604051908082528060200260200182016040528015611f415781602001602082028036833780820191505090505b50905060005b87518110156122645760076000898381518110611f6757611f666146c7565b5b6020026020010151815260200190815260200160002054878281518110611f9157611f906146c7565b5b6020026020010151600860008b8581518110611fb057611faf6146c7565b5b6020026020010151815260200190815260200160002054611fd19190614f08565b1115612012576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161200990614f88565b60405180910390fd5b6000600660008a848151811061202b5761202a6146c7565b5b60200260200101518152602001908152602001600020805461204c90614604565b90501161208e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161208590614ff4565b60405180910390fd5b60008160045461209e9190614f08565b9050808483815181106120b4576120b36146c7565b5b6020026020010181815250508782815181106120d3576120d26146c7565b5b60200260200101518383815181106120ee576120ed6146c7565b5b60200260200101818152505061211e81888481518110612111576121106146c7565b5b6020026020010151612a33565b888281518110612131576121306146c7565b5b6020026020010151600960008381526020019081526020016000208190555061218f81878481518110612167576121666146c7565b5b6020026020010151878581518110612182576121816146c7565b5b6020026020010151611073565b8782815181106121a2576121a16146c7565b5b6020026020010151600860008b85815181106121c1576121c06146c7565b5b6020026020010151815260200190815260200160002060008282546121e69190614f08565b925050819055508973ffffffffffffffffffffffffffffffffffffffff16817f2d03118aa776f7008445f6ca8490a6782ede2db364d741513555ba656ab1879f8b8581518110612239576122386146c7565b5b602002602001015160405161224e9190613719565b60405180910390a3508080600101915050611f47565b5061228088838360405180602001604052806000815250612a58565b8651600460008282546122939190614f08565b925050819055505050505050505050565b6000600a600085815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361234b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161234290614742565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1663a02ff685878787876040518563ffffffff1660e01b815260040161238a9493929190614762565b602060405180830381865afa1580156123a7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906123cb91906147bc565b61240a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161240190614835565b60405180910390fd5b6124178686868686612ade565b505050505050565b600d6020528060005260406000206000915054906101000a900460ff1681565b600a6020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61247a612827565b73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141580156124c357506124c1836124bc612827565b611cd3565b155b1561250e576124d0612827565b836040517fe237d922000000000000000000000000000000000000000000000000000000008152600401612505929190614d00565b60405180910390fd5b612519838383612b86565b505050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361258e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161258590615060565b60405180910390fd5b6000600c60008154809291906125a390615080565b91905055905082600b600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550807fa681544f91d5d9e3c40b0939a43ef1ca39f3eeeab6438e5e2b7ae27d1b3959928460405161262b919061403f565b60405180910390a280915050919050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b60006126b0612827565b90508073ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff16141580156126f557506126f38682611cd3565b155b156127395780866040517fe237d922000000000000000000000000000000000000000000000000000000008152600401612730929190614d00565b60405180910390fd5b6127468686868686612c2d565b505050505050565b600060208202602084010151905092915050565b600060208202602084010151905092915050565b6000763d602d80600a3d3981f3363d3d373d3d3d363d730000008260601b60e81c176000526e5af43d82803e903d91602b57fd5bf38260781b17602052603760096000f09050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603612822576040517fc2f868f400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b919050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036128a15760006040517f01a83514000000000000000000000000000000000000000000000000000000008152600401612898919061403f565b60405180910390fd5b6128be836000848460405180602001604052806000815250612d25565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036129355760006040517fced3e10000000000000000000000000000000000000000000000000000000000815260040161292c919061403f565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051612a2691906137d4565b60405180910390a3505050565b80600e60008481526020019081526020016000209081612a539190614a20565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603612aca5760006040517f57f447ce000000000000000000000000000000000000000000000000000000008152600401612ac1919061403f565b60405180910390fd5b612ad8600085858585612d25565b50505050565b6000612ae8612827565b90508073ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff1614158015612b2d5750612b2b8682611cd3565b155b15612b715780866040517fe237d922000000000000000000000000000000000000000000000000000000008152600401612b68929190614d00565b60405180910390fd5b612b7e8686868686612dd7565b505050505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603612bf85760006040517f01a83514000000000000000000000000000000000000000000000000000000008152600401612bef919061403f565b60405180910390fd5b600080612c058484612ee2565b91509150612c26856000848460405180602001604052806000815250612d25565b5050505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603612c9f5760006040517f57f447ce000000000000000000000000000000000000000000000000000000008152600401612c96919061403f565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1603612d115760006040517f01a83514000000000000000000000000000000000000000000000000000000008152600401612d08919061403f565b60405180910390fd5b612d1e8585858585612d25565b5050505050565b612d3185858585612f12565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614612dd0576000612d6f612827565b90506001845103612dbf576000612d9060008661276290919063ffffffff16565b90506000612da860008661276290919063ffffffff16565b9050612db88389898585896132ba565b5050612dce565b612dcd81878787878761346e565b5b505b5050505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603612e495760006040517f57f447ce000000000000000000000000000000000000000000000000000000008152600401612e40919061403f565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1603612ebb5760006040517f01a83514000000000000000000000000000000000000000000000000000000008152600401612eb2919061403f565b60405180910390fd5b600080612ec88585612ee2565b91509150612ed98787848487612d25565b50505050505050565b60608060405191506001825283602083015260408201905060018152826020820152604081016040529250929050565b8051825114612f5c57815181516040517f5b059991000000000000000000000000000000000000000000000000000000008152600401612f53929190614855565b60405180910390fd5b6000612f66612827565b905060005b8351811015613175576000612f89828661276290919063ffffffff16565b90506000612fa0838661276290919063ffffffff16565b9050600073ffffffffffffffffffffffffffffffffffffffff168873ffffffffffffffffffffffffffffffffffffffff16146130cd57600080600084815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508181101561307557888183856040517f03dee4c500000000000000000000000000000000000000000000000000000000815260040161306c94939291906150c8565b60405180910390fd5b81810360008085815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff1614613168578060008084815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546131609190614f08565b925050819055505b5050806001019050612f6b565b50600183510361323457600061319560008561276290919063ffffffff16565b905060006131ad60008561276290919063ffffffff16565b90508573ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628585604051613225929190614855565b60405180910390a450506132b3565b8373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb86866040516132aa92919061510d565b60405180910390a45b5050505050565b60008473ffffffffffffffffffffffffffffffffffffffff163b1115613466578373ffffffffffffffffffffffffffffffffffffffff1663f23a6e6187878686866040518663ffffffff1660e01b815260040161331b959493929190615144565b6020604051808303816000875af192505050801561335757506040513d601f19601f8201168201806040525081019061335491906151b3565b60015b6133db573d8060008114613387576040519150601f19603f3d011682016040523d82523d6000602084013e61338c565b606091505b5060008151036133d357846040517f57f447ce0000000000000000000000000000000000000000000000000000000081526004016133ca919061403f565b60405180910390fd5b805181602001fd5b63f23a6e6160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161461346457846040517f57f447ce00000000000000000000000000000000000000000000000000000000815260040161345b919061403f565b60405180910390fd5b505b505050505050565b60008473ffffffffffffffffffffffffffffffffffffffff163b111561361a578373ffffffffffffffffffffffffffffffffffffffff1663bc197c8187878686866040518663ffffffff1660e01b81526004016134cf9594939291906151e0565b6020604051808303816000875af192505050801561350b57506040513d601f19601f8201168201806040525081019061350891906151b3565b60015b61358f573d806000811461353b576040519150601f19603f3d011682016040523d82523d6000602084013e613540565b606091505b50600081510361358757846040517f57f447ce00000000000000000000000000000000000000000000000000000000815260040161357e919061403f565b60405180910390fd5b805181602001fd5b63bc197c8160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161461361857846040517f57f447ce00000000000000000000000000000000000000000000000000000000815260040161360f919061403f565b60405180910390fd5b505b505050505050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061366182613636565b9050919050565b61367181613656565b811461367c57600080fd5b50565b60008135905061368e81613668565b92915050565b6000819050919050565b6136a781613694565b81146136b257600080fd5b50565b6000813590506136c48161369e565b92915050565b600080604083850312156136e1576136e061362c565b5b60006136ef8582860161367f565b9250506020613700858286016136b5565b9150509250929050565b61371381613694565b82525050565b600060208201905061372e600083018461370a565b92915050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b61376981613734565b811461377457600080fd5b50565b60008135905061378681613760565b92915050565b6000602082840312156137a2576137a161362c565b5b60006137b084828501613777565b91505092915050565b60008115159050919050565b6137ce816137b9565b82525050565b60006020820190506137e960008301846137c5565b92915050565b6000602082840312156138055761380461362c565b5b6000613813848285016136b5565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561385657808201518184015260208101905061383b565b60008484015250505050565b6000601f19601f8301169050919050565b600061387e8261381c565b6138888185613827565b9350613898818560208601613838565b6138a181613862565b840191505092915050565b600060208201905081810360008301526138c68184613873565b905092915050565b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61390b82613862565b810181811067ffffffffffffffff8211171561392a576139296138d3565b5b80604052505050565b600061393d613622565b90506139498282613902565b919050565b600067ffffffffffffffff821115613969576139686138d3565b5b602082029050602081019050919050565b600080fd5b600061399261398d8461394e565b613933565b905080838252602082019050602084028301858111156139b5576139b461397a565b5b835b818110156139de57806139ca88826136b5565b8452602084019350506020810190506139b7565b5050509392505050565b600082601f8301126139fd576139fc6138ce565b5b8135613a0d84826020860161397f565b91505092915050565b600080fd5b600067ffffffffffffffff821115613a3657613a356138d3565b5b613a3f82613862565b9050602081019050919050565b82818337600083830152505050565b6000613a6e613a6984613a1b565b613933565b905082815260208101848484011115613a8a57613a89613a16565b5b613a95848285613a4c565b509392505050565b600082601f830112613ab257613ab16138ce565b5b8135613ac2848260208601613a5b565b91505092915050565b600080600080600060a08688031215613ae757613ae661362c565b5b6000613af58882890161367f565b9550506020613b068882890161367f565b945050604086013567ffffffffffffffff811115613b2757613b26613631565b5b613b33888289016139e8565b935050606086013567ffffffffffffffff811115613b5457613b53613631565b5b613b60888289016139e8565b925050608086013567ffffffffffffffff811115613b8157613b80613631565b5b613b8d88828901613a9d565b9150509295509295909350565b600067ffffffffffffffff821115613bb557613bb46138d3565b5b602082029050602081019050919050565b6000613bd9613bd484613b9a565b613933565b90508083825260208201905060208402830185811115613bfc57613bfb61397a565b5b835b81811015613c255780613c11888261367f565b845260208401935050602081019050613bfe565b5050509392505050565b600082601f830112613c4457613c436138ce565b5b8135613c54848260208601613bc6565b91505092915050565b60008060408385031215613c7457613c7361362c565b5b600083013567ffffffffffffffff811115613c9257613c91613631565b5b613c9e85828601613c2f565b925050602083013567ffffffffffffffff811115613cbf57613cbe613631565b5b613ccb858286016139e8565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b613d0a81613694565b82525050565b6000613d1c8383613d01565b60208301905092915050565b6000602082019050919050565b6000613d4082613cd5565b613d4a8185613ce0565b9350613d5583613cf1565b8060005b83811015613d86578151613d6d8882613d10565b9750613d7883613d28565b925050600181019050613d59565b5085935050505092915050565b60006020820190508181036000830152613dad8184613d35565b905092915050565b600067ffffffffffffffff821115613dd057613dcf6138d3565b5b613dd982613862565b9050602081019050919050565b6000613df9613df484613db5565b613933565b905082815260208101848484011115613e1557613e14613a16565b5b613e20848285613a4c565b509392505050565b600082601f830112613e3d57613e3c6138ce565b5b8135613e4d848260208601613de6565b91505092915050565b600060208284031215613e6c57613e6b61362c565b5b600082013567ffffffffffffffff811115613e8a57613e89613631565b5b613e9684828501613e28565b91505092915050565b600080600060608486031215613eb857613eb761362c565b5b6000613ec6868287016136b5565b9350506020613ed7868287016136b5565b925050604084013567ffffffffffffffff811115613ef857613ef7613631565b5b613f0486828701613a9d565b9150509250925092565b600080600060608486031215613f2757613f2661362c565b5b6000613f358682870161367f565b935050602084013567ffffffffffffffff811115613f5657613f55613631565b5b613f62868287016139e8565b925050604084013567ffffffffffffffff811115613f8357613f82613631565b5b613f8f868287016139e8565b9150509250925092565b600080600080600060a08688031215613fb557613fb461362c565b5b6000613fc38882890161367f565b9550506020613fd48882890161367f565b9450506040613fe5888289016136b5565b9350506060613ff6888289016136b5565b925050608086013567ffffffffffffffff81111561401757614016613631565b5b61402388828901613a9d565b9150509295509295909350565b61403981613656565b82525050565b60006020820190506140546000830184614030565b92915050565b600067ffffffffffffffff821115614075576140746138d3565b5b602082029050602081019050919050565b60006140996140948461405a565b613933565b905080838252602082019050602084028301858111156140bc576140bb61397a565b5b835b8181101561410357803567ffffffffffffffff8111156140e1576140e06138ce565b5b8086016140ee8982613e28565b855260208501945050506020810190506140be565b5050509392505050565b600082601f830112614122576141216138ce565b5b8135614132848260208601614086565b91505092915050565b6000806000606084860312156141545761415361362c565b5b60006141628682870161367f565b935050602084013567ffffffffffffffff81111561418357614182613631565b5b61418f868287016139e8565b925050604084013567ffffffffffffffff8111156141b0576141af613631565b5b6141bc8682870161410d565b9150509250925092565b6141cf816137b9565b81146141da57600080fd5b50565b6000813590506141ec816141c6565b92915050565b600080604083850312156142095761420861362c565b5b60006142178582860161367f565b9250506020614228858286016141dd565b9150509250929050565b60008060006060848603121561424b5761424a61362c565b5b60006142598682870161367f565b935050602061426a868287016136b5565b925050604084013567ffffffffffffffff81111561428b5761428a613631565b5b61429786828701613e28565b9150509250925092565b600080604083850312156142b8576142b761362c565b5b60006142c68582860161367f565b92505060206142d78582860161367f565b9150509250929050565b600067ffffffffffffffff8211156142fc576142fb6138d3565b5b602082029050602081019050919050565b600061432061431b846142e1565b613933565b905080838252602082019050602084028301858111156143435761434261397a565b5b835b8181101561438a57803567ffffffffffffffff811115614368576143676138ce565b5b8086016143758982613a9d565b85526020850194505050602081019050614345565b5050509392505050565b600082601f8301126143a9576143a86138ce565b5b81356143b984826020860161430d565b91505092915050565b60008060008060008060c087890312156143df576143de61362c565b5b60006143ed89828a0161367f565b965050602087013567ffffffffffffffff81111561440e5761440d613631565b5b61441a89828a016139e8565b955050604087013567ffffffffffffffff81111561443b5761443a613631565b5b61444789828a016139e8565b945050606087013567ffffffffffffffff81111561446857614467613631565b5b61447489828a0161410d565b935050608087013567ffffffffffffffff81111561449557614494613631565b5b6144a189828a016139e8565b92505060a087013567ffffffffffffffff8111156144c2576144c1613631565b5b6144ce89828a01614394565b9150509295509295509295565b6000819050919050565b60006145006144fb6144f684613636565b6144db565b613636565b9050919050565b6000614512826144e5565b9050919050565b600061452482614507565b9050919050565b61453481614519565b82525050565b600060208201905061454f600083018461452b565b92915050565b60008060006060848603121561456e5761456d61362c565b5b600061457c8682870161367f565b935050602061458d868287016136b5565b925050604061459e868287016136b5565b9150509250925092565b6000602082840312156145be576145bd61362c565b5b60006145cc8482850161367f565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061461c57607f821691505b60208210810361462f5761462e6145d5565b5b50919050565b7f4f6e6c79206f776e65722063616e2063616c6c20746869732066756e6374696f60008201527f6e00000000000000000000000000000000000000000000000000000000000000602082015250565b6000614691602183613827565b915061469c82614635565b604082019050919050565b600060208201905081810360008301526146c081614684565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f537472617465677920636f6e7472616374206e6f742073657400000000000000600082015250565b600061472c601983613827565b9150614737826146f6565b602082019050919050565b6000602082019050818103600083015261475b8161471f565b9050919050565b60006080820190506147776000830187614030565b6147846020830186614030565b614791604083018561370a565b61479e606083018461370a565b95945050505050565b6000815190506147b6816141c6565b92915050565b6000602082840312156147d2576147d161362c565b5b60006147e0848285016147a7565b91505092915050565b7f5472616e73666572206e6f7420616c6c6f776564206279207374726174656779600082015250565b600061481f602083613827565b915061482a826147e9565b602082019050919050565b6000602082019050818103600083015261484e81614812565b9050919050565b600060408201905061486a600083018561370a565b614877602083018461370a565b9392505050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026148e07fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826148a3565b6148ea86836148a3565b95508019841693508086168417925050509392505050565b600061491d61491861491384613694565b6144db565b613694565b9050919050565b6000819050919050565b61493783614902565b61494b61494382614924565b8484546148b0565b825550505050565b600090565b614960614953565b61496b81848461492e565b505050565b5b8181101561498f57614984600082614958565b600181019050614971565b5050565b601f8211156149d4576149a58161487e565b6149ae84614893565b810160208510156149bd578190505b6149d16149c985614893565b830182614970565b50505b505050565b600082821c905092915050565b60006149f7600019846008026149d9565b1980831691505092915050565b6000614a1083836149e6565b9150826002028217905092915050565b614a298261381c565b67ffffffffffffffff811115614a4257614a416138d3565b5b614a4c8254614604565b614a57828285614993565b600060209050601f831160018114614a8a5760008415614a78578287015190505b614a828582614a04565b865550614aea565b601f198416614a988661487e565b60005b82811015614ac057848901518255600182019150602085019450602081019050614a9b565b86831015614add5784890151614ad9601f8916826149e6565b8355505b6001600288020188555050505b505050505050565b7f5374726174656779206e6f742072656769737465726564000000000000000000600082015250565b6000614b28601783613827565b9150614b3382614af2565b602082019050919050565b60006020820190508181036000830152614b5781614b1b565b9050919050565b7f5374726174656779206372656174696f6e206661696c65640000000000000000600082015250565b6000614b94601883613827565b9150614b9f82614b5e565b602082019050919050565b60006020820190508181036000830152614bc381614b87565b9050919050565b600081519050919050565b600082825260208201905092915050565b6000614bf182614bca565b614bfb8185614bd5565b9350614c0b818560208601613838565b614c1481613862565b840191505092915050565b60006020820190508181036000830152614c398184614be6565b905092915050565b600081905092915050565b6000614c5782614bca565b614c618185614c41565b9350614c71818560208601613838565b80840191505092915050565b6000614c898284614c4c565b915081905092915050565b7f537472617465677920696e697469616c697a6174696f6e206661696c65640000600082015250565b6000614cca601e83613827565b9150614cd582614c94565b602082019050919050565b60006020820190508181036000830152614cf981614cbd565b9050919050565b6000604082019050614d156000830185614030565b614d226020830184614030565b9392505050565b7f5469636b6574206e6f74206f776e65642062792073656e646572000000000000600082015250565b6000614d5f601a83613827565b9150614d6a82614d29565b602082019050919050565b60006020820190508181036000830152614d8e81614d52565b9050919050565b7f5469636b657420616c7265616479207573656400000000000000000000000000600082015250565b6000614dcb601383613827565b9150614dd682614d95565b602082019050919050565b60006020820190508181036000830152614dfa81614dbe565b9050919050565b7f417272617973206c656e677468206d69736d6174636800000000000000000000600082015250565b6000614e37601683613827565b9150614e4282614e01565b602082019050919050565b60006020820190508181036000830152614e6681614e2a565b9050919050565b7f45786365656473206d6178206d696e7420706572207472616e73616374696f6e600082015250565b6000614ea3602083613827565b9150614eae82614e6d565b602082019050919050565b60006020820190508181036000830152614ed281614e96565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000614f1382613694565b9150614f1e83613694565b9250828201905080821115614f3657614f35614ed9565b5b92915050565b7f4578636565647320736563746f72206361706163697479000000000000000000600082015250565b6000614f72601783613827565b9150614f7d82614f3c565b602082019050919050565b60006020820190508181036000830152614fa181614f65565b9050919050565b7f536563746f7220646f6573206e6f742065786973740000000000000000000000600082015250565b6000614fde601583613827565b9150614fe982614fa8565b602082019050919050565b6000602082019050818103600083015261500d81614fd1565b9050919050565b7f496e76616c696420696d706c656d656e746174696f6e00000000000000000000600082015250565b600061504a601683613827565b915061505582615014565b602082019050919050565b600060208201905081810360008301526150798161503d565b9050919050565b600061508b82613694565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036150bd576150bc614ed9565b5b600182019050919050565b60006080820190506150dd6000830187614030565b6150ea602083018661370a565b6150f7604083018561370a565b615104606083018461370a565b95945050505050565b600060408201905081810360008301526151278185613d35565b9050818103602083015261513b8184613d35565b90509392505050565b600060a0820190506151596000830188614030565b6151666020830187614030565b615173604083018661370a565b615180606083018561370a565b81810360808301526151928184614be6565b90509695505050505050565b6000815190506151ad81613760565b92915050565b6000602082840312156151c9576151c861362c565b5b60006151d78482850161519e565b91505092915050565b600060a0820190506151f56000830188614030565b6152026020830187614030565b81810360408301526152148186613d35565b905081810360608301526152288185613d35565b9050818103608083015261523c8184614be6565b9050969550505050505056fea26469706673582212202ed3cf988c2b65d9574c39fb0d8c5e16c5fdd280aee96d35220aacc234e55ca264736f6c63430008180033',
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
    '0x60806040523480156200001157600080fd5b5060405162006832380380620068328339818101604052810190620000379190620006da565b848481600090816200004a919062000a1f565b5080600190816200005c919062000a1f565b5050508151835114620000a6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200009d9062000b8d565b60405180910390fd5b33600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060098190555060008351905060005b81811015620001835784818151811062000116576200011562000baf565b5b6020026020010151600a600083815260200190815260200160002090816200013f919062000a1f565b5083818151811062000156576200015562000baf565b5b6020026020010151600b6000838152602001908152602001600020819055508080600101915050620000f7565b50600160118190555060006040516200019c906200031e565b604051809103906000f080158015620001b9573d6000803e3d6000fd5b50905080601060006001815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060017fa681544f91d5d9e3c40b0939a43ef1ca39f3eeeab6438e5e2b7ae27d1b3959928260405162000242919062000c23565b60405180910390a26002601181905550600060405162000262906200032c565b604051809103906000f0801580156200027f573d6000803e3d6000fd5b50905080601060006002815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060027fa681544f91d5d9e3c40b0939a43ef1ca39f3eeeab6438e5e2b7ae27d1b3959928260405162000308919062000c23565b60405180910390a2505050505050505062000c40565b6103c280620060b283390190565b6103be806200647483390190565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620003a38262000358565b810181811067ffffffffffffffff82111715620003c557620003c462000369565b5b80604052505050565b6000620003da6200033a565b9050620003e8828262000398565b919050565b600067ffffffffffffffff8211156200040b576200040a62000369565b5b620004168262000358565b9050602081019050919050565b60005b838110156200044357808201518184015260208101905062000426565b60008484015250505050565b6000620004666200046084620003ed565b620003ce565b90508281526020810184848401111562000485576200048462000353565b5b6200049284828562000423565b509392505050565b600082601f830112620004b257620004b16200034e565b5b8151620004c48482602086016200044f565b91505092915050565b600067ffffffffffffffff821115620004eb57620004ea62000369565b5b602082029050602081019050919050565b600080fd5b6000620005186200051284620004cd565b620003ce565b905080838252602082019050602084028301858111156200053e576200053d620004fc565b5b835b818110156200058c57805167ffffffffffffffff8111156200056757620005666200034e565b5b8086016200057689826200049a565b8552602085019450505060208101905062000540565b5050509392505050565b600082601f830112620005ae57620005ad6200034e565b5b8151620005c084826020860162000501565b91505092915050565b600067ffffffffffffffff821115620005e757620005e662000369565b5b602082029050602081019050919050565b6000819050919050565b6200060d81620005f8565b81146200061957600080fd5b50565b6000815190506200062d8162000602565b92915050565b60006200064a6200064484620005c9565b620003ce565b9050808382526020820190506020840283018581111562000670576200066f620004fc565b5b835b818110156200069d57806200068888826200061c565b84526020840193505060208101905062000672565b5050509392505050565b600082601f830112620006bf57620006be6200034e565b5b8151620006d184826020860162000633565b91505092915050565b600080600080600060a08688031215620006f957620006f862000344565b5b600086015167ffffffffffffffff8111156200071a576200071962000349565b5b62000728888289016200049a565b955050602086015167ffffffffffffffff8111156200074c576200074b62000349565b5b6200075a888289016200049a565b945050604086015167ffffffffffffffff8111156200077e576200077d62000349565b5b6200078c8882890162000596565b935050606086015167ffffffffffffffff811115620007b057620007af62000349565b5b620007be88828901620006a7565b9250506080620007d1888289016200061c565b9150509295509295909350565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200083157607f821691505b602082108103620008475762000846620007e9565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620008b17fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000872565b620008bd868362000872565b95508019841693508086168417925050509392505050565b6000819050919050565b600062000900620008fa620008f484620005f8565b620008d5565b620005f8565b9050919050565b6000819050919050565b6200091c83620008df565b620009346200092b8262000907565b8484546200087f565b825550505050565b600090565b6200094b6200093c565b6200095881848462000911565b505050565b5b8181101562000980576200097460008262000941565b6001810190506200095e565b5050565b601f821115620009cf5762000999816200084d565b620009a48462000862565b81016020851015620009b4578190505b620009cc620009c38562000862565b8301826200095d565b50505b505050565b600082821c905092915050565b6000620009f460001984600802620009d4565b1980831691505092915050565b600062000a0f8383620009e1565b9150826002028217905092915050565b62000a2a82620007de565b67ffffffffffffffff81111562000a465762000a4562000369565b5b62000a52825462000818565b62000a5f82828562000984565b600060209050601f83116001811462000a97576000841562000a82578287015190505b62000a8e858262000a01565b86555062000afe565b601f19841662000aa7866200084d565b60005b8281101562000ad15784890151825560018201915060208501945060208101905062000aaa565b8683101562000af1578489015162000aed601f891682620009e1565b8355505b6001600288020188555050505b505050505050565b600082825260208201905092915050565b7f536563746f727320616e642063617061636974696573206c656e677468206d6960008201527f736d617463680000000000000000000000000000000000000000000000000000602082015250565b600062000b7560268362000b06565b915062000b828262000b17565b604082019050919050565b6000602082019050818103600083015262000ba88162000b66565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600062000c0b8262000bde565b9050919050565b62000c1d8162000bfe565b82525050565b600060208201905062000c3a600083018462000c12565b92915050565b6154628062000c506000396000f3fe608060405234801561001057600080fd5b50600436106102535760003560e01c80638da5cb5b11610146578063b88d4fde116100c3578063d686f8a911610087578063d686f8a91461078c578063e00dd161146107a8578063e985e9c5146107c6578063f2439f0c146107f6578063f4c37b9b14610826578063f5c2c4301461085657610253565b8063b88d4fde146106d8578063c5cfef48146106f4578063c87b56dd14610724578063cf237fc014610754578063d3fc98641461077057610253565b8063a22cb4651161010a578063a22cb46514610610578063ab1577e81461062c578063accf25c11461065c578063ae1890781461068c578063b4e6657f146106bc57610253565b80638da5cb5b146105585780639006b7a61461057657806395cdca12146105a657806395d89b41146105d65780639caea80a146105f457610253565b806339664000116101d45780636352211e116101985780636352211e1461048e5780636590770f146104be5780636c143862146104da57806370a08231146104f8578063893b45e91461052857610253565b806339664000146103c6578063398abe5b146103f65780633bb3a24d146104125780633ff364931461044257806342842e0e1461047257610253565b806312e621f21161021b57806312e621f214610310578063185f84471461034057806323b872dd1461035e578063267a89981461037a5780632e6cebe5146103aa57610253565b806301f569971461025857806301ffc9a71461027657806306fdde03146102a6578063081812fc146102c4578063095ea7b3146102f4575b600080fd5b610260610886565b60405161026d919061390c565b60405180910390f35b610290600480360381019061028b9190613993565b61088c565b60405161029d91906139db565b60405180910390f35b6102ae6108ed565b6040516102bb9190613a86565b60405180910390f35b6102de60048036038101906102d99190613ad4565b61097f565b6040516102eb9190613b42565b60405180910390f35b61030e60048036038101906103099190613b89565b61099b565b005b61032a60048036038101906103259190613bc9565b6109b1565b604051610337919061390c565b60405180910390f35b6103486109ef565b604051610355919061390c565b60405180910390f35b61037860048036038101906103739190613c1c565b6109f5565b005b610394600480360381019061038f9190613ad4565b610b6d565b6040516103a1919061390c565b60405180910390f35b6103c460048036038101906103bf9190613ad4565b610b85565b005b6103e060048036038101906103db9190613b89565b610c1f565b6040516103ed91906139db565b60405180910390f35b610410600480360381019061040b9190613c1c565b610c7f565b005b61042c60048036038101906104279190613ad4565b610df7565b6040516104399190613a86565b60405180910390f35b61045c60048036038101906104579190613ad4565b610e09565b6040516104699190613a86565b60405180910390f35b61048c60048036038101906104879190613c1c565b610ea9565b005b6104a860048036038101906104a39190613ad4565b610ec9565b6040516104b59190613b42565b60405180910390f35b6104d860048036038101906104d39190613da4565b610edb565b005b6104e2611277565b6040516104ef919061390c565b60405180910390f35b610512600480360381019061050d9190613e13565b611281565b60405161051f919061390c565b60405180910390f35b610542600480360381019061053d9190613ad4565b61133b565b60405161054f9190613b42565b60405180910390f35b61056061136e565b60405161056d9190613b42565b60405180910390f35b610590600480360381019061058b9190613ad4565b611394565b60405161059d919061390c565b60405180910390f35b6105c060048036038101906105bb9190613b89565b6113ac565b6040516105cd91906139db565b60405180910390f35b6105de6114bb565b6040516105eb9190613a86565b60405180910390f35b61060e6004803603810190610609919061408a565b61154d565b005b61062a60048036038101906106259190614141565b6116d1565b005b61064660048036038101906106419190613b89565b6116e7565b604051610653919061423f565b60405180910390f35b61067660048036038101906106719190613ad4565b611790565b604051610683919061390c565b60405180910390f35b6106a660048036038101906106a19190613ad4565b6117a8565b6040516106b391906139db565b60405180910390f35b6106d660048036038101906106d19190614261565b6117d2565b005b6106f260048036038101906106ed91906142d0565b6119cc565b005b61070e60048036038101906107099190613ad4565b611b46565b60405161071b919061390c565b60405180910390f35b61073e60048036038101906107399190613ad4565b611bc4565b60405161074b9190613a86565b60405180910390f35b61076e60048036038101906107699190614353565b611cd7565b005b61078a60048036038101906107859190614406565b611f7e565b005b6107a660048036038101906107a19190614556565b612030565b005b6107b06124c3565b6040516107bd919061390c565b60405180910390f35b6107e060048036038101906107db9190614641565b6124c9565b6040516107ed91906139db565b60405180910390f35b610810600480360381019061080b9190613ad4565b61255d565b60405161081d91906139db565b60405180910390f35b610840600480360381019061083b9190613ad4565b61257d565b60405161084d91906146e0565b60405180910390f35b610870600480360381019061086b9190613e13565b6125b0565b60405161087d919061390c565b60405180910390f35b60095481565b6000634906490660e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806108e657506108e5826126ce565b5b9050919050565b6060600080546108fc9061472a565b80601f01602080910402602001604051908101604052809291908181526020018280546109289061472a565b80156109755780601f1061094a57610100808354040283529160200191610975565b820191906000526020600020905b81548152906001019060200180831161095857829003601f168201915b5050505050905090565b600061098a826127b0565b5061099482612838565b9050919050565b6109ad82826109a8612875565b61287d565b5050565b600e60205282600052604060002060205281600052604060002081815481106109d957600080fd5b9060005260206000200160009250925050505481565b60115481565b6000600f600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610a9c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a93906147a7565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1663a02ff68585858560016040518563ffffffff1660e01b8152600401610adc9493929190614802565b602060405180830381865afa158015610af9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b1d919061485c565b610b5c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b53906148d5565b60405180910390fd5b610b6784848461288f565b50505050565b600d6020528060005260406000206000915090505481565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610c15576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c0c90614967565b60405180910390fd5b8060098190555050565b600080600e60008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008481526020019081526020016000208054905011905092915050565b6000600f600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610d26576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d1d906147a7565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1663a02ff68585858560016040518563ffffffff1660e01b8152600401610d669493929190614802565b602060405180830381865afa158015610d83573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610da7919061485c565b610de6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ddd906148d5565b60405180910390fd5b610df1848484612991565b50505050565b6060610e0282611bc4565b9050919050565b600a6020528060005260406000206000915090508054610e289061472a565b80601f0160208091040260200160405190810160405280929190818152602001828054610e549061472a565b8015610ea15780601f10610e7657610100808354040283529160200191610ea1565b820191906000526020600020905b815481529060010190602001808311610e8457829003601f168201915b505050505081565b610ec4838383604051806020016040528060008152506119cc565b505050565b6000610ed4826127b0565b9050919050565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610f6b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f6290614967565b60405180910390fd5b60006010600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603611012576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611009906149d3565b60405180910390fd5b60006110338273ffffffffffffffffffffffffffffffffffffffff16612afe565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036110a4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161109b90614a3f565b60405180910390fd5b6000836040516024016110b79190614ab4565b6040516020818303038152906040527f439fab91000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050905060008273ffffffffffffffffffffffffffffffffffffffff168260405161115d9190614b12565b6000604051808303816000865af19150503d806000811461119a576040519150601f19603f3d011682016040523d82523d6000602084013e61119f565b606091505b50509050806111e3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111da90614b75565b60405180910390fd5b82600f600089815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555085877fac00a50a9bc0f28664b8669296466c465a838cb4e57c7b96e6eeb87fa59e6ad3876040516112669190614ab4565b60405180910390a350505050505050565b6000600854905090565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036112f45760006040517f89c62b640000000000000000000000000000000000000000000000000000000081526004016112eb9190613b42565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60106020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600b6020528060005260406000206000915090505481565b60008273ffffffffffffffffffffffffffffffffffffffff166113ce83610ec9565b73ffffffffffffffffffffffffffffffffffffffff1614611424576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161141b90614be1565b60405180910390fd5b6012600083815260200190815260200160002060009054906101000a900460ff1615611485576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161147c90614c4d565b60405180910390fd5b60016012600084815260200190815260200160002060006101000a81548160ff0219169083151502179055506001905092915050565b6060600180546114ca9061472a565b80601f01602080910402602001604051908101604052809291908181526020018280546114f69061472a565b80156115435780601f1061151857610100808354040283529160200191611543565b820191906000526020600020905b81548152906001019060200180831161152657829003601f168201915b5050505050905090565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146115dd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115d490614967565b60405180910390fd5b60008251905060008167ffffffffffffffff8111156115ff576115fe613c79565b5b60405190808252806020026020018201604052801561162d5781602001602082028036833780820191505090505b50905060008267ffffffffffffffff81111561164c5761164b613c79565b5b60405190808252806020026020018201604052801561167f57816020015b606081526020019060019003908161166a5790505b50905060005b838110156116bb5760018382815181106116a2576116a1614c6d565b5b6020026020010181815250508080600101915050611685565b506116c98686868585612030565b505050505050565b6116e36116dc612875565b8383612baf565b5050565b6060600e60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002080548060200260200160405190810160405280929190818152602001828054801561178357602002820191906000526020600020905b81548152602001906001019080831161176f575b5050505050905092915050565b600c6020528060005260406000206000915090505481565b60006012600083815260200190815260200160002060009054906101000a900460ff169050919050565b60005b8151811015611987576000600f60008484815181106117f7576117f6614c6d565b5b6020026020010151815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361189f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611896906147a7565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1663a02ff68586868686815181106118d0576118cf614c6d565b5b602002602001015160016040518563ffffffff1660e01b81526004016118f99493929190614802565b602060405180830381865afa158015611916573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061193a919061485c565b611979576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611970906148d5565b60405180910390fd5b5080806001019150506117d5565b5060005b81518110156119c6576119b984848484815181106119ac576119ab614c6d565b5b6020026020010151612991565b808060010191505061198b565b50505050565b6000600f600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603611a73576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a6a906147a7565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1663a02ff68586868660016040518563ffffffff1660e01b8152600401611ab39493929190614802565b602060405180830381865afa158015611ad0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611af4919061485c565b611b33576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611b2a906148d5565b60405180910390fd5b611b3f85858585612d1e565b5050505050565b600080600d600084815260200190815260200160002054141580611b6a5750600082145b611ba9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ba090614ce8565b60405180910390fd5b600d6000838152602001908152602001600020549050919050565b6060611bcf826127b0565b506000600660008481526020019081526020016000208054611bf09061472a565b80601f0160208091040260200160405190810160405280929190818152602001828054611c1c9061472a565b8015611c695780601f10611c3e57610100808354040283529160200191611c69565b820191906000526020600020905b815481529060010190602001808311611c4c57829003601f168201915b505050505090506000611c7a612d3b565b90506000815103611c8f578192505050611cd2565b600082511115611cc4578082604051602001611cac929190614d44565b60405160208183030381529060405292505050611cd2565b611ccd84612d52565b925050505b919050565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611d67576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611d5e90614967565b60405180910390fd5b600b600085815260200190815260200160002054600c60008681526020019081526020016000205410611dcf576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611dc690614db4565b60405180910390fd5b6000600a60008681526020019081526020016000208054611def9061472a565b905011611e31576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611e2890614e20565b60405180910390fd5b60006008549050611e428682612dbb565b611e4c8185612eb4565b84600d600083815260200190815260200160002081905550600e60008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000868152602001908152602001600020819080600181540180825580915050600190039060005260206000200160009091909190915055611ee6818484610edb565b600c60008681526020019081526020016000206000815480929190611f0a90614e6f565b91905055508573ffffffffffffffffffffffffffffffffffffffff16817f2d03118aa776f7008445f6ca8490a6782ede2db364d741513555ba656ab1879f87604051611f56919061390c565b60405180910390a360086000815480929190611f7190614e6f565b9190505550505050505050565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461200e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161200590614967565b60405180910390fd5b61202b838383600160405180602001604052806000815250611cd7565b505050565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146120c0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016120b790614967565b60405180910390fd5b825184511480156120d2575081518351145b80156120df575080518251145b61211e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161211590614f03565b60405180910390fd5b60095484511115612164576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161215b90614f6f565b60405180910390fd5b6000845190506000600854905060005b828110156122e457600b600088838151811061219357612192614c6d565b5b6020026020010151815260200190815260200160002054600c60008984815181106121c1576121c0614c6d565b5b602002602001015181526020019081526020016000205410612218576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161220f90614fdb565b60405180910390fd5b6000600a600089848151811061223157612230614c6d565b5b6020026020010151815260200190815260200160002080546122529061472a565b905011612294576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161228b90614e20565b60405180910390fd5b600c60008883815181106122ab576122aa614c6d565b5b6020026020010151815260200190815260200160002060008154809291906122d290614e6f565b91905055508080600101915050612174565b5060005b828110156124a757600081836122fe9190614ffb565b905061230a8982612dbb565b61232e8188848151811061232157612320614c6d565b5b6020026020010151612eb4565b87828151811061234157612340614c6d565b5b6020026020010151600d600083815260200190815260200160002081905550600e60008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008984815181106123b4576123b3614c6d565b5b602002602001015181526020019081526020016000208190806001815401808255809150506001900390600052602060002001600090919091909150556124308187848151811061240857612407614c6d565b5b602002602001015187858151811061242357612422614c6d565b5b6020026020010151610edb565b8873ffffffffffffffffffffffffffffffffffffffff16817f2d03118aa776f7008445f6ca8490a6782ede2db364d741513555ba656ab1879f8a858151811061247c5761247b614c6d565b5b6020026020010151604051612491919061390c565b60405180910390a35080806001019150506122e8565b5081816124b49190614ffb565b60088190555050505050505050565b60085481565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60126020528060005260406000206000915054906101000a900460ff1681565b600f6020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603612620576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016126179061507b565b60405180910390fd5b60006011600081548092919061263590614e6f565b919050559050826010600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550807fa681544f91d5d9e3c40b0939a43ef1ca39f3eeeab6438e5e2b7ae27d1b395992846040516126bd9190613b42565b60405180910390a280915050919050565b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061279957507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806127a957506127a882612f10565b5b9050919050565b6000806127bc83612f7a565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361282f57826040517f7e273289000000000000000000000000000000000000000000000000000000008152600401612826919061390c565b60405180910390fd5b80915050919050565b60006004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b600033905090565b61288a8383836001612fb7565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036129015760006040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016128f89190613b42565b60405180910390fd5b60006129158383612910612875565b61317c565b90508373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461298b578382826040517f64283d7b0000000000000000000000000000000000000000000000000000000081526004016129829392919061509b565b60405180910390fd5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603612a035760006040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016129fa9190613b42565b60405180910390fd5b6000612a118383600061317c565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603612a8457816040517f7e273289000000000000000000000000000000000000000000000000000000008152600401612a7b919061390c565b60405180910390fd5b8373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614612af8578382826040517f64283d7b000000000000000000000000000000000000000000000000000000008152600401612aef9392919061509b565b60405180910390fd5b50505050565b6000763d602d80600a3d3981f3363d3d373d3d3d363d730000008260601b60e81c176000526e5af43d82803e903d91602b57fd5bf38260781b17602052603760096000f09050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603612baa576040517fc2f868f400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603612c2057816040517f5b08ba18000000000000000000000000000000000000000000000000000000008152600401612c179190613b42565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051612d1191906139db565b60405180910390a3505050565b612d298484846109f5565b612d3584848484613396565b50505050565b606060405180602001604052806000815250905090565b6060612d5d826127b0565b506000612d68612d3b565b90506000815111612d885760405180602001604052806000815250612db3565b80612d928461354d565b604051602001612da3929190614d44565b6040516020818303038152906040525b915050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603612e2d5760006040517f64a0ae92000000000000000000000000000000000000000000000000000000008152600401612e249190613b42565b60405180910390fd5b6000612e3b8383600061317c565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614612eaf5760006040517f73c6ac6e000000000000000000000000000000000000000000000000000000008152600401612ea69190613b42565b60405180910390fd5b505050565b80600660008481526020019081526020016000209081612ed49190615274565b507ff8e1a15aba9398e019f0b49df1a4fde98ee17ae345cb5f6b5e2c27f5033e8ce782604051612f04919061390c565b60405180910390a15050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b60006002600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b8080612ff05750600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614155b15613124576000613000846127b0565b9050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415801561306b57508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614155b801561307e575061307c81846124c9565b155b156130c057826040517fa9fbf51f0000000000000000000000000000000000000000000000000000000081526004016130b79190613b42565b60405180910390fd5b811561312257838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b836004600085815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050565b60008061318884612f7a565b9050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16146131ca576131c981848661361b565b5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461325b5761320c600085600080612fb7565b6001600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16146132de576001600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b846002600086815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4809150509392505050565b60008373ffffffffffffffffffffffffffffffffffffffff163b1115613547578273ffffffffffffffffffffffffffffffffffffffff1663150b7a026133da612875565b8685856040518563ffffffff1660e01b81526004016133fc9493929190615346565b6020604051808303816000875af192505050801561343857506040513d601f19601f8201168201806040525081019061343591906153a7565b60015b6134bc573d8060008114613468576040519150601f19603f3d011682016040523d82523d6000602084013e61346d565b606091505b5060008151036134b457836040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016134ab9190613b42565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161461354557836040517f64a0ae9200000000000000000000000000000000000000000000000000000000815260040161353c9190613b42565b60405180910390fd5b505b50505050565b60606000600161355c846136df565b01905060008167ffffffffffffffff81111561357b5761357a613c79565b5b6040519080825280601f01601f1916602001820160405280156135ad5781602001600182028036833780820191505090505b509050600082602001820190505b600115613610578080600190039150507f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a8581613604576136036153d4565b5b049450600085036135bb575b819350505050919050565b613626838383613832565b6136da57600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361369b57806040517f7e273289000000000000000000000000000000000000000000000000000000008152600401613692919061390c565b60405180910390fd5b81816040517f177e802f0000000000000000000000000000000000000000000000000000000081526004016136d1929190615403565b60405180910390fd5b505050565b600080600090507a184f03e93ff9f4daa797ed6e38ed64bf6a1f010000000000000000831061373d577a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008381613733576137326153d4565b5b0492506040810190505b6d04ee2d6d415b85acef8100000000831061377a576d04ee2d6d415b85acef810000000083816137705761376f6153d4565b5b0492506020810190505b662386f26fc1000083106137a957662386f26fc10000838161379f5761379e6153d4565b5b0492506010810190505b6305f5e10083106137d2576305f5e10083816137c8576137c76153d4565b5b0492506008810190505b61271083106137f75761271083816137ed576137ec6153d4565b5b0492506004810190505b6064831061381a57606483816138105761380f6153d4565b5b0492506002810190505b600a8310613829576001810190505b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141580156138ea57508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614806138ab57506138aa84846124c9565b5b806138e957508273ffffffffffffffffffffffffffffffffffffffff166138d183612838565b73ffffffffffffffffffffffffffffffffffffffff16145b5b90509392505050565b6000819050919050565b613906816138f3565b82525050565b600060208201905061392160008301846138fd565b92915050565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b6139708161393b565b811461397b57600080fd5b50565b60008135905061398d81613967565b92915050565b6000602082840312156139a9576139a8613931565b5b60006139b78482850161397e565b91505092915050565b60008115159050919050565b6139d5816139c0565b82525050565b60006020820190506139f060008301846139cc565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015613a30578082015181840152602081019050613a15565b60008484015250505050565b6000601f19601f8301169050919050565b6000613a58826139f6565b613a628185613a01565b9350613a72818560208601613a12565b613a7b81613a3c565b840191505092915050565b60006020820190508181036000830152613aa08184613a4d565b905092915050565b613ab1816138f3565b8114613abc57600080fd5b50565b600081359050613ace81613aa8565b92915050565b600060208284031215613aea57613ae9613931565b5b6000613af884828501613abf565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000613b2c82613b01565b9050919050565b613b3c81613b21565b82525050565b6000602082019050613b576000830184613b33565b92915050565b613b6681613b21565b8114613b7157600080fd5b50565b600081359050613b8381613b5d565b92915050565b60008060408385031215613ba057613b9f613931565b5b6000613bae85828601613b74565b9250506020613bbf85828601613abf565b9150509250929050565b600080600060608486031215613be257613be1613931565b5b6000613bf086828701613b74565b9350506020613c0186828701613abf565b9250506040613c1286828701613abf565b9150509250925092565b600080600060608486031215613c3557613c34613931565b5b6000613c4386828701613b74565b9350506020613c5486828701613b74565b9250506040613c6586828701613abf565b9150509250925092565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b613cb182613a3c565b810181811067ffffffffffffffff82111715613cd057613ccf613c79565b5b80604052505050565b6000613ce3613927565b9050613cef8282613ca8565b919050565b600067ffffffffffffffff821115613d0f57613d0e613c79565b5b613d1882613a3c565b9050602081019050919050565b82818337600083830152505050565b6000613d47613d4284613cf4565b613cd9565b905082815260208101848484011115613d6357613d62613c74565b5b613d6e848285613d25565b509392505050565b600082601f830112613d8b57613d8a613c6f565b5b8135613d9b848260208601613d34565b91505092915050565b600080600060608486031215613dbd57613dbc613931565b5b6000613dcb86828701613abf565b9350506020613ddc86828701613abf565b925050604084013567ffffffffffffffff811115613dfd57613dfc613936565b5b613e0986828701613d76565b9150509250925092565b600060208284031215613e2957613e28613931565b5b6000613e3784828501613b74565b91505092915050565b600067ffffffffffffffff821115613e5b57613e5a613c79565b5b602082029050602081019050919050565b600080fd5b6000613e84613e7f84613e40565b613cd9565b90508083825260208201905060208402830185811115613ea757613ea6613e6c565b5b835b81811015613ed05780613ebc8882613abf565b845260208401935050602081019050613ea9565b5050509392505050565b600082601f830112613eef57613eee613c6f565b5b8135613eff848260208601613e71565b91505092915050565b600067ffffffffffffffff821115613f2357613f22613c79565b5b602082029050602081019050919050565b600067ffffffffffffffff821115613f4f57613f4e613c79565b5b613f5882613a3c565b9050602081019050919050565b6000613f78613f7384613f34565b613cd9565b905082815260208101848484011115613f9457613f93613c74565b5b613f9f848285613d25565b509392505050565b600082601f830112613fbc57613fbb613c6f565b5b8135613fcc848260208601613f65565b91505092915050565b6000613fe8613fe384613f08565b613cd9565b9050808382526020820190506020840283018581111561400b5761400a613e6c565b5b835b8181101561405257803567ffffffffffffffff8111156140305761402f613c6f565b5b80860161403d8982613fa7565b8552602085019450505060208101905061400d565b5050509392505050565b600082601f83011261407157614070613c6f565b5b8135614081848260208601613fd5565b91505092915050565b6000806000606084860312156140a3576140a2613931565b5b60006140b186828701613b74565b935050602084013567ffffffffffffffff8111156140d2576140d1613936565b5b6140de86828701613eda565b925050604084013567ffffffffffffffff8111156140ff576140fe613936565b5b61410b8682870161405c565b9150509250925092565b61411e816139c0565b811461412957600080fd5b50565b60008135905061413b81614115565b92915050565b6000806040838503121561415857614157613931565b5b600061416685828601613b74565b92505060206141778582860161412c565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6141b6816138f3565b82525050565b60006141c883836141ad565b60208301905092915050565b6000602082019050919050565b60006141ec82614181565b6141f6818561418c565b93506142018361419d565b8060005b8381101561423257815161421988826141bc565b9750614224836141d4565b925050600181019050614205565b5085935050505092915050565b6000602082019050818103600083015261425981846141e1565b905092915050565b60008060006060848603121561427a57614279613931565b5b600061428886828701613b74565b935050602061429986828701613b74565b925050604084013567ffffffffffffffff8111156142ba576142b9613936565b5b6142c686828701613eda565b9150509250925092565b600080600080608085870312156142ea576142e9613931565b5b60006142f887828801613b74565b945050602061430987828801613b74565b935050604061431a87828801613abf565b925050606085013567ffffffffffffffff81111561433b5761433a613936565b5b61434787828801613d76565b91505092959194509250565b600080600080600060a0868803121561436f5761436e613931565b5b600061437d88828901613b74565b955050602061438e88828901613abf565b945050604086013567ffffffffffffffff8111156143af576143ae613936565b5b6143bb88828901613fa7565b93505060606143cc88828901613abf565b925050608086013567ffffffffffffffff8111156143ed576143ec613936565b5b6143f988828901613d76565b9150509295509295909350565b60008060006060848603121561441f5761441e613931565b5b600061442d86828701613b74565b935050602061443e86828701613abf565b925050604084013567ffffffffffffffff81111561445f5761445e613936565b5b61446b86828701613fa7565b9150509250925092565b600067ffffffffffffffff8211156144905761448f613c79565b5b602082029050602081019050919050565b60006144b46144af84614475565b613cd9565b905080838252602082019050602084028301858111156144d7576144d6613e6c565b5b835b8181101561451e57803567ffffffffffffffff8111156144fc576144fb613c6f565b5b8086016145098982613d76565b855260208501945050506020810190506144d9565b5050509392505050565b600082601f83011261453d5761453c613c6f565b5b813561454d8482602086016144a1565b91505092915050565b600080600080600060a0868803121561457257614571613931565b5b600061458088828901613b74565b955050602086013567ffffffffffffffff8111156145a1576145a0613936565b5b6145ad88828901613eda565b945050604086013567ffffffffffffffff8111156145ce576145cd613936565b5b6145da8882890161405c565b935050606086013567ffffffffffffffff8111156145fb576145fa613936565b5b61460788828901613eda565b925050608086013567ffffffffffffffff81111561462857614627613936565b5b61463488828901614528565b9150509295509295909350565b6000806040838503121561465857614657613931565b5b600061466685828601613b74565b925050602061467785828601613b74565b9150509250929050565b6000819050919050565b60006146a66146a161469c84613b01565b614681565b613b01565b9050919050565b60006146b88261468b565b9050919050565b60006146ca826146ad565b9050919050565b6146da816146bf565b82525050565b60006020820190506146f560008301846146d1565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061474257607f821691505b602082108103614755576147546146fb565b5b50919050565b7f537472617465677920636f6e7472616374206e6f742073657400000000000000600082015250565b6000614791601983613a01565b915061479c8261475b565b602082019050919050565b600060208201905081810360008301526147c081614784565b9050919050565b6000819050919050565b60006147ec6147e76147e2846147c7565b614681565b6138f3565b9050919050565b6147fc816147d1565b82525050565b60006080820190506148176000830187613b33565b6148246020830186613b33565b61483160408301856138fd565b61483e60608301846147f3565b95945050505050565b60008151905061485681614115565b92915050565b60006020828403121561487257614871613931565b5b600061488084828501614847565b91505092915050565b7f5472616e73666572206e6f7420616c6c6f776564206279207374726174656779600082015250565b60006148bf602083613a01565b91506148ca82614889565b602082019050919050565b600060208201905081810360008301526148ee816148b2565b9050919050565b7f4f6e6c79206f776e65722063616e2063616c6c20746869732066756e6374696f60008201527f6e00000000000000000000000000000000000000000000000000000000000000602082015250565b6000614951602183613a01565b915061495c826148f5565b604082019050919050565b6000602082019050818103600083015261498081614944565b9050919050565b7f5374726174656779206e6f742072656769737465726564000000000000000000600082015250565b60006149bd601783613a01565b91506149c882614987565b602082019050919050565b600060208201905081810360008301526149ec816149b0565b9050919050565b7f5374726174656779206372656174696f6e206661696c65640000000000000000600082015250565b6000614a29601883613a01565b9150614a34826149f3565b602082019050919050565b60006020820190508181036000830152614a5881614a1c565b9050919050565b600081519050919050565b600082825260208201905092915050565b6000614a8682614a5f565b614a908185614a6a565b9350614aa0818560208601613a12565b614aa981613a3c565b840191505092915050565b60006020820190508181036000830152614ace8184614a7b565b905092915050565b600081905092915050565b6000614aec82614a5f565b614af68185614ad6565b9350614b06818560208601613a12565b80840191505092915050565b6000614b1e8284614ae1565b915081905092915050565b7f537472617465677920696e697469616c697a6174696f6e206661696c65640000600082015250565b6000614b5f601e83613a01565b9150614b6a82614b29565b602082019050919050565b60006020820190508181036000830152614b8e81614b52565b9050919050565b7f5469636b6574206e6f74206f776e65642062792073656e646572000000000000600082015250565b6000614bcb601a83613a01565b9150614bd682614b95565b602082019050919050565b60006020820190508181036000830152614bfa81614bbe565b9050919050565b7f5469636b657420616c7265616479207573656400000000000000000000000000600082015250565b6000614c37601383613a01565b9150614c4282614c01565b602082019050919050565b60006020820190508181036000830152614c6681614c2a565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f546f6b656e20646f6573206e6f74206578697374000000000000000000000000600082015250565b6000614cd2601483613a01565b9150614cdd82614c9c565b602082019050919050565b60006020820190508181036000830152614d0181614cc5565b9050919050565b600081905092915050565b6000614d1e826139f6565b614d288185614d08565b9350614d38818560208601613a12565b80840191505092915050565b6000614d508285614d13565b9150614d5c8284614d13565b91508190509392505050565b7f4578636565647320636170616369747900000000000000000000000000000000600082015250565b6000614d9e601083613a01565b9150614da982614d68565b602082019050919050565b60006020820190508181036000830152614dcd81614d91565b9050919050565b7f536563746f7220646f6573206e6f742065786973740000000000000000000000600082015250565b6000614e0a601583613a01565b9150614e1582614dd4565b602082019050919050565b60006020820190508181036000830152614e3981614dfd565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000614e7a826138f3565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203614eac57614eab614e40565b5b600182019050919050565b7f417272617973206c656e677468206d69736d6174636800000000000000000000600082015250565b6000614eed601683613a01565b9150614ef882614eb7565b602082019050919050565b60006020820190508181036000830152614f1c81614ee0565b9050919050565b7f45786365656473206d6178206d696e7420706572207472616e73616374696f6e600082015250565b6000614f59602083613a01565b9150614f6482614f23565b602082019050919050565b60006020820190508181036000830152614f8881614f4c565b9050919050565b7f4578636565647320736563746f72206361706163697479000000000000000000600082015250565b6000614fc5601783613a01565b9150614fd082614f8f565b602082019050919050565b60006020820190508181036000830152614ff481614fb8565b9050919050565b6000615006826138f3565b9150615011836138f3565b925082820190508082111561502957615028614e40565b5b92915050565b7f496e76616c696420696d706c656d656e746174696f6e00000000000000000000600082015250565b6000615065601683613a01565b91506150708261502f565b602082019050919050565b6000602082019050818103600083015261509481615058565b9050919050565b60006060820190506150b06000830186613b33565b6150bd60208301856138fd565b6150ca6040830184613b33565b949350505050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026151347fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826150f7565b61513e86836150f7565b95508019841693508086168417925050509392505050565b600061517161516c615167846138f3565b614681565b6138f3565b9050919050565b6000819050919050565b61518b83615156565b61519f61519782615178565b848454615104565b825550505050565b600090565b6151b46151a7565b6151bf818484615182565b505050565b5b818110156151e3576151d86000826151ac565b6001810190506151c5565b5050565b601f821115615228576151f9816150d2565b615202846150e7565b81016020851015615211578190505b61522561521d856150e7565b8301826151c4565b50505b505050565b600082821c905092915050565b600061524b6000198460080261522d565b1980831691505092915050565b6000615264838361523a565b9150826002028217905092915050565b61527d826139f6565b67ffffffffffffffff81111561529657615295613c79565b5b6152a0825461472a565b6152ab8282856151e7565b600060209050601f8311600181146152de57600084156152cc578287015190505b6152d68582615258565b86555061533e565b601f1984166152ec866150d2565b60005b82811015615314578489015182556001820191506020850194506020810190506152ef565b86831015615331578489015161532d601f89168261523a565b8355505b6001600288020188555050505b505050505050565b600060808201905061535b6000830187613b33565b6153686020830186613b33565b61537560408301856138fd565b81810360608301526153878184614a7b565b905095945050505050565b6000815190506153a181613967565b92915050565b6000602082840312156153bd576153bc613931565b5b60006153cb84828501615392565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006040820190506154186000830185613b33565b61542560208301846138fd565b939250505056fea26469706673582212201e4526ebb2dc4ea83ea30490221cd17383600f7ac006c79baea546f259a03f6864736f6c63430008180033608060405234801561001057600080fd5b506103a2806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063439fab911461003b578063a02ff68514610057575b600080fd5b610055600480360381019061005091906101f2565b610087565b005b610071600480360381019061006c91906102cf565b61008a565b60405161007e9190610351565b60405180910390f35b50565b600060019050949350505050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6100ff826100b6565b810181811067ffffffffffffffff8211171561011e5761011d6100c7565b5b80604052505050565b6000610131610098565b905061013d82826100f6565b919050565b600067ffffffffffffffff82111561015d5761015c6100c7565b5b610166826100b6565b9050602081019050919050565b82818337600083830152505050565b600061019561019084610142565b610127565b9050828152602081018484840111156101b1576101b06100b1565b5b6101bc848285610173565b509392505050565b600082601f8301126101d9576101d86100ac565b5b81356101e9848260208601610182565b91505092915050565b600060208284031215610208576102076100a2565b5b600082013567ffffffffffffffff811115610226576102256100a7565b5b610232848285016101c4565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006102668261023b565b9050919050565b6102768161025b565b811461028157600080fd5b50565b6000813590506102938161026d565b92915050565b6000819050919050565b6102ac81610299565b81146102b757600080fd5b50565b6000813590506102c9816102a3565b92915050565b600080600080608085870312156102e9576102e86100a2565b5b60006102f787828801610284565b945050602061030887828801610284565b9350506040610319878288016102ba565b925050606061032a878288016102ba565b91505092959194509250565b60008115159050919050565b61034b81610336565b82525050565b60006020820190506103666000830184610342565b9291505056fea2646970667358221220772a36e511ab92abd4b9f6ebe6546624da01579cab6a7bb19bbe3f9fa6ee818f64736f6c63430008180033608060405234801561001057600080fd5b5061039e806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063439fab911461003b578063a02ff68514610057575b600080fd5b610055600480360381019061005091906101ee565b610087565b005b610071600480360381019061006c91906102cb565b61008a565b60405161007e919061034d565b60405180910390f35b50565b6000949350505050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6100fb826100b2565b810181811067ffffffffffffffff8211171561011a576101196100c3565b5b80604052505050565b600061012d610094565b905061013982826100f2565b919050565b600067ffffffffffffffff821115610159576101586100c3565b5b610162826100b2565b9050602081019050919050565b82818337600083830152505050565b600061019161018c8461013e565b610123565b9050828152602081018484840111156101ad576101ac6100ad565b5b6101b884828561016f565b509392505050565b600082601f8301126101d5576101d46100a8565b5b81356101e584826020860161017e565b91505092915050565b6000602082840312156102045761020361009e565b5b600082013567ffffffffffffffff811115610222576102216100a3565b5b61022e848285016101c0565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061026282610237565b9050919050565b61027281610257565b811461027d57600080fd5b50565b60008135905061028f81610269565b92915050565b6000819050919050565b6102a881610295565b81146102b357600080fd5b50565b6000813590506102c58161029f565b92915050565b600080600080608085870312156102e5576102e461009e565b5b60006102f387828801610280565b945050602061030487828801610280565b9350506040610315878288016102b6565b9250506060610326878288016102b6565b91505092959194509250565b60008115159050919050565b61034781610332565b82525050565b6000602082019050610362600083018461033e565b9291505056fea264697066735822122097465617b0787402e12afe3687d92a78752072fc69fa7994cc8d31ec5798f2c364736f6c63430008180033',
  deployedBytecode:
    '0x608060405234801561001057600080fd5b50600436106102535760003560e01c80638da5cb5b11610146578063b88d4fde116100c3578063d686f8a911610087578063d686f8a91461078c578063e00dd161146107a8578063e985e9c5146107c6578063f2439f0c146107f6578063f4c37b9b14610826578063f5c2c4301461085657610253565b8063b88d4fde146106d8578063c5cfef48146106f4578063c87b56dd14610724578063cf237fc014610754578063d3fc98641461077057610253565b8063a22cb4651161010a578063a22cb46514610610578063ab1577e81461062c578063accf25c11461065c578063ae1890781461068c578063b4e6657f146106bc57610253565b80638da5cb5b146105585780639006b7a61461057657806395cdca12146105a657806395d89b41146105d65780639caea80a146105f457610253565b806339664000116101d45780636352211e116101985780636352211e1461048e5780636590770f146104be5780636c143862146104da57806370a08231146104f8578063893b45e91461052857610253565b806339664000146103c6578063398abe5b146103f65780633bb3a24d146104125780633ff364931461044257806342842e0e1461047257610253565b806312e621f21161021b57806312e621f214610310578063185f84471461034057806323b872dd1461035e578063267a89981461037a5780632e6cebe5146103aa57610253565b806301f569971461025857806301ffc9a71461027657806306fdde03146102a6578063081812fc146102c4578063095ea7b3146102f4575b600080fd5b610260610886565b60405161026d919061390c565b60405180910390f35b610290600480360381019061028b9190613993565b61088c565b60405161029d91906139db565b60405180910390f35b6102ae6108ed565b6040516102bb9190613a86565b60405180910390f35b6102de60048036038101906102d99190613ad4565b61097f565b6040516102eb9190613b42565b60405180910390f35b61030e60048036038101906103099190613b89565b61099b565b005b61032a60048036038101906103259190613bc9565b6109b1565b604051610337919061390c565b60405180910390f35b6103486109ef565b604051610355919061390c565b60405180910390f35b61037860048036038101906103739190613c1c565b6109f5565b005b610394600480360381019061038f9190613ad4565b610b6d565b6040516103a1919061390c565b60405180910390f35b6103c460048036038101906103bf9190613ad4565b610b85565b005b6103e060048036038101906103db9190613b89565b610c1f565b6040516103ed91906139db565b60405180910390f35b610410600480360381019061040b9190613c1c565b610c7f565b005b61042c60048036038101906104279190613ad4565b610df7565b6040516104399190613a86565b60405180910390f35b61045c60048036038101906104579190613ad4565b610e09565b6040516104699190613a86565b60405180910390f35b61048c60048036038101906104879190613c1c565b610ea9565b005b6104a860048036038101906104a39190613ad4565b610ec9565b6040516104b59190613b42565b60405180910390f35b6104d860048036038101906104d39190613da4565b610edb565b005b6104e2611277565b6040516104ef919061390c565b60405180910390f35b610512600480360381019061050d9190613e13565b611281565b60405161051f919061390c565b60405180910390f35b610542600480360381019061053d9190613ad4565b61133b565b60405161054f9190613b42565b60405180910390f35b61056061136e565b60405161056d9190613b42565b60405180910390f35b610590600480360381019061058b9190613ad4565b611394565b60405161059d919061390c565b60405180910390f35b6105c060048036038101906105bb9190613b89565b6113ac565b6040516105cd91906139db565b60405180910390f35b6105de6114bb565b6040516105eb9190613a86565b60405180910390f35b61060e6004803603810190610609919061408a565b61154d565b005b61062a60048036038101906106259190614141565b6116d1565b005b61064660048036038101906106419190613b89565b6116e7565b604051610653919061423f565b60405180910390f35b61067660048036038101906106719190613ad4565b611790565b604051610683919061390c565b60405180910390f35b6106a660048036038101906106a19190613ad4565b6117a8565b6040516106b391906139db565b60405180910390f35b6106d660048036038101906106d19190614261565b6117d2565b005b6106f260048036038101906106ed91906142d0565b6119cc565b005b61070e60048036038101906107099190613ad4565b611b46565b60405161071b919061390c565b60405180910390f35b61073e60048036038101906107399190613ad4565b611bc4565b60405161074b9190613a86565b60405180910390f35b61076e60048036038101906107699190614353565b611cd7565b005b61078a60048036038101906107859190614406565b611f7e565b005b6107a660048036038101906107a19190614556565b612030565b005b6107b06124c3565b6040516107bd919061390c565b60405180910390f35b6107e060048036038101906107db9190614641565b6124c9565b6040516107ed91906139db565b60405180910390f35b610810600480360381019061080b9190613ad4565b61255d565b60405161081d91906139db565b60405180910390f35b610840600480360381019061083b9190613ad4565b61257d565b60405161084d91906146e0565b60405180910390f35b610870600480360381019061086b9190613e13565b6125b0565b60405161087d919061390c565b60405180910390f35b60095481565b6000634906490660e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806108e657506108e5826126ce565b5b9050919050565b6060600080546108fc9061472a565b80601f01602080910402602001604051908101604052809291908181526020018280546109289061472a565b80156109755780601f1061094a57610100808354040283529160200191610975565b820191906000526020600020905b81548152906001019060200180831161095857829003601f168201915b5050505050905090565b600061098a826127b0565b5061099482612838565b9050919050565b6109ad82826109a8612875565b61287d565b5050565b600e60205282600052604060002060205281600052604060002081815481106109d957600080fd5b9060005260206000200160009250925050505481565b60115481565b6000600f600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610a9c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a93906147a7565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1663a02ff68585858560016040518563ffffffff1660e01b8152600401610adc9493929190614802565b602060405180830381865afa158015610af9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b1d919061485c565b610b5c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b53906148d5565b60405180910390fd5b610b6784848461288f565b50505050565b600d6020528060005260406000206000915090505481565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610c15576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c0c90614967565b60405180910390fd5b8060098190555050565b600080600e60008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008481526020019081526020016000208054905011905092915050565b6000600f600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610d26576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d1d906147a7565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1663a02ff68585858560016040518563ffffffff1660e01b8152600401610d669493929190614802565b602060405180830381865afa158015610d83573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610da7919061485c565b610de6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ddd906148d5565b60405180910390fd5b610df1848484612991565b50505050565b6060610e0282611bc4565b9050919050565b600a6020528060005260406000206000915090508054610e289061472a565b80601f0160208091040260200160405190810160405280929190818152602001828054610e549061472a565b8015610ea15780601f10610e7657610100808354040283529160200191610ea1565b820191906000526020600020905b815481529060010190602001808311610e8457829003601f168201915b505050505081565b610ec4838383604051806020016040528060008152506119cc565b505050565b6000610ed4826127b0565b9050919050565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610f6b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f6290614967565b60405180910390fd5b60006010600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603611012576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611009906149d3565b60405180910390fd5b60006110338273ffffffffffffffffffffffffffffffffffffffff16612afe565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036110a4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161109b90614a3f565b60405180910390fd5b6000836040516024016110b79190614ab4565b6040516020818303038152906040527f439fab91000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050905060008273ffffffffffffffffffffffffffffffffffffffff168260405161115d9190614b12565b6000604051808303816000865af19150503d806000811461119a576040519150601f19603f3d011682016040523d82523d6000602084013e61119f565b606091505b50509050806111e3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111da90614b75565b60405180910390fd5b82600f600089815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555085877fac00a50a9bc0f28664b8669296466c465a838cb4e57c7b96e6eeb87fa59e6ad3876040516112669190614ab4565b60405180910390a350505050505050565b6000600854905090565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036112f45760006040517f89c62b640000000000000000000000000000000000000000000000000000000081526004016112eb9190613b42565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60106020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600b6020528060005260406000206000915090505481565b60008273ffffffffffffffffffffffffffffffffffffffff166113ce83610ec9565b73ffffffffffffffffffffffffffffffffffffffff1614611424576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161141b90614be1565b60405180910390fd5b6012600083815260200190815260200160002060009054906101000a900460ff1615611485576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161147c90614c4d565b60405180910390fd5b60016012600084815260200190815260200160002060006101000a81548160ff0219169083151502179055506001905092915050565b6060600180546114ca9061472a565b80601f01602080910402602001604051908101604052809291908181526020018280546114f69061472a565b80156115435780601f1061151857610100808354040283529160200191611543565b820191906000526020600020905b81548152906001019060200180831161152657829003601f168201915b5050505050905090565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146115dd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115d490614967565b60405180910390fd5b60008251905060008167ffffffffffffffff8111156115ff576115fe613c79565b5b60405190808252806020026020018201604052801561162d5781602001602082028036833780820191505090505b50905060008267ffffffffffffffff81111561164c5761164b613c79565b5b60405190808252806020026020018201604052801561167f57816020015b606081526020019060019003908161166a5790505b50905060005b838110156116bb5760018382815181106116a2576116a1614c6d565b5b6020026020010181815250508080600101915050611685565b506116c98686868585612030565b505050505050565b6116e36116dc612875565b8383612baf565b5050565b6060600e60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002080548060200260200160405190810160405280929190818152602001828054801561178357602002820191906000526020600020905b81548152602001906001019080831161176f575b5050505050905092915050565b600c6020528060005260406000206000915090505481565b60006012600083815260200190815260200160002060009054906101000a900460ff169050919050565b60005b8151811015611987576000600f60008484815181106117f7576117f6614c6d565b5b6020026020010151815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361189f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611896906147a7565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1663a02ff68586868686815181106118d0576118cf614c6d565b5b602002602001015160016040518563ffffffff1660e01b81526004016118f99493929190614802565b602060405180830381865afa158015611916573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061193a919061485c565b611979576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611970906148d5565b60405180910390fd5b5080806001019150506117d5565b5060005b81518110156119c6576119b984848484815181106119ac576119ab614c6d565b5b6020026020010151612991565b808060010191505061198b565b50505050565b6000600f600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603611a73576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a6a906147a7565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1663a02ff68586868660016040518563ffffffff1660e01b8152600401611ab39493929190614802565b602060405180830381865afa158015611ad0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611af4919061485c565b611b33576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611b2a906148d5565b60405180910390fd5b611b3f85858585612d1e565b5050505050565b600080600d600084815260200190815260200160002054141580611b6a5750600082145b611ba9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ba090614ce8565b60405180910390fd5b600d6000838152602001908152602001600020549050919050565b6060611bcf826127b0565b506000600660008481526020019081526020016000208054611bf09061472a565b80601f0160208091040260200160405190810160405280929190818152602001828054611c1c9061472a565b8015611c695780601f10611c3e57610100808354040283529160200191611c69565b820191906000526020600020905b815481529060010190602001808311611c4c57829003601f168201915b505050505090506000611c7a612d3b565b90506000815103611c8f578192505050611cd2565b600082511115611cc4578082604051602001611cac929190614d44565b60405160208183030381529060405292505050611cd2565b611ccd84612d52565b925050505b919050565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611d67576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611d5e90614967565b60405180910390fd5b600b600085815260200190815260200160002054600c60008681526020019081526020016000205410611dcf576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611dc690614db4565b60405180910390fd5b6000600a60008681526020019081526020016000208054611def9061472a565b905011611e31576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611e2890614e20565b60405180910390fd5b60006008549050611e428682612dbb565b611e4c8185612eb4565b84600d600083815260200190815260200160002081905550600e60008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000868152602001908152602001600020819080600181540180825580915050600190039060005260206000200160009091909190915055611ee6818484610edb565b600c60008681526020019081526020016000206000815480929190611f0a90614e6f565b91905055508573ffffffffffffffffffffffffffffffffffffffff16817f2d03118aa776f7008445f6ca8490a6782ede2db364d741513555ba656ab1879f87604051611f56919061390c565b60405180910390a360086000815480929190611f7190614e6f565b9190505550505050505050565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461200e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161200590614967565b60405180910390fd5b61202b838383600160405180602001604052806000815250611cd7565b505050565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146120c0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016120b790614967565b60405180910390fd5b825184511480156120d2575081518351145b80156120df575080518251145b61211e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161211590614f03565b60405180910390fd5b60095484511115612164576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161215b90614f6f565b60405180910390fd5b6000845190506000600854905060005b828110156122e457600b600088838151811061219357612192614c6d565b5b6020026020010151815260200190815260200160002054600c60008984815181106121c1576121c0614c6d565b5b602002602001015181526020019081526020016000205410612218576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161220f90614fdb565b60405180910390fd5b6000600a600089848151811061223157612230614c6d565b5b6020026020010151815260200190815260200160002080546122529061472a565b905011612294576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161228b90614e20565b60405180910390fd5b600c60008883815181106122ab576122aa614c6d565b5b6020026020010151815260200190815260200160002060008154809291906122d290614e6f565b91905055508080600101915050612174565b5060005b828110156124a757600081836122fe9190614ffb565b905061230a8982612dbb565b61232e8188848151811061232157612320614c6d565b5b6020026020010151612eb4565b87828151811061234157612340614c6d565b5b6020026020010151600d600083815260200190815260200160002081905550600e60008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008984815181106123b4576123b3614c6d565b5b602002602001015181526020019081526020016000208190806001815401808255809150506001900390600052602060002001600090919091909150556124308187848151811061240857612407614c6d565b5b602002602001015187858151811061242357612422614c6d565b5b6020026020010151610edb565b8873ffffffffffffffffffffffffffffffffffffffff16817f2d03118aa776f7008445f6ca8490a6782ede2db364d741513555ba656ab1879f8a858151811061247c5761247b614c6d565b5b6020026020010151604051612491919061390c565b60405180910390a35080806001019150506122e8565b5081816124b49190614ffb565b60088190555050505050505050565b60085481565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60126020528060005260406000206000915054906101000a900460ff1681565b600f6020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603612620576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016126179061507b565b60405180910390fd5b60006011600081548092919061263590614e6f565b919050559050826010600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550807fa681544f91d5d9e3c40b0939a43ef1ca39f3eeeab6438e5e2b7ae27d1b395992846040516126bd9190613b42565b60405180910390a280915050919050565b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061279957507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806127a957506127a882612f10565b5b9050919050565b6000806127bc83612f7a565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361282f57826040517f7e273289000000000000000000000000000000000000000000000000000000008152600401612826919061390c565b60405180910390fd5b80915050919050565b60006004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b600033905090565b61288a8383836001612fb7565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036129015760006040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016128f89190613b42565b60405180910390fd5b60006129158383612910612875565b61317c565b90508373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461298b578382826040517f64283d7b0000000000000000000000000000000000000000000000000000000081526004016129829392919061509b565b60405180910390fd5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603612a035760006040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016129fa9190613b42565b60405180910390fd5b6000612a118383600061317c565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603612a8457816040517f7e273289000000000000000000000000000000000000000000000000000000008152600401612a7b919061390c565b60405180910390fd5b8373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614612af8578382826040517f64283d7b000000000000000000000000000000000000000000000000000000008152600401612aef9392919061509b565b60405180910390fd5b50505050565b6000763d602d80600a3d3981f3363d3d373d3d3d363d730000008260601b60e81c176000526e5af43d82803e903d91602b57fd5bf38260781b17602052603760096000f09050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603612baa576040517fc2f868f400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603612c2057816040517f5b08ba18000000000000000000000000000000000000000000000000000000008152600401612c179190613b42565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051612d1191906139db565b60405180910390a3505050565b612d298484846109f5565b612d3584848484613396565b50505050565b606060405180602001604052806000815250905090565b6060612d5d826127b0565b506000612d68612d3b565b90506000815111612d885760405180602001604052806000815250612db3565b80612d928461354d565b604051602001612da3929190614d44565b6040516020818303038152906040525b915050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603612e2d5760006040517f64a0ae92000000000000000000000000000000000000000000000000000000008152600401612e249190613b42565b60405180910390fd5b6000612e3b8383600061317c565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614612eaf5760006040517f73c6ac6e000000000000000000000000000000000000000000000000000000008152600401612ea69190613b42565b60405180910390fd5b505050565b80600660008481526020019081526020016000209081612ed49190615274565b507ff8e1a15aba9398e019f0b49df1a4fde98ee17ae345cb5f6b5e2c27f5033e8ce782604051612f04919061390c565b60405180910390a15050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b60006002600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b8080612ff05750600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614155b15613124576000613000846127b0565b9050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415801561306b57508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614155b801561307e575061307c81846124c9565b155b156130c057826040517fa9fbf51f0000000000000000000000000000000000000000000000000000000081526004016130b79190613b42565b60405180910390fd5b811561312257838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b836004600085815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050565b60008061318884612f7a565b9050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16146131ca576131c981848661361b565b5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461325b5761320c600085600080612fb7565b6001600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16146132de576001600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b846002600086815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4809150509392505050565b60008373ffffffffffffffffffffffffffffffffffffffff163b1115613547578273ffffffffffffffffffffffffffffffffffffffff1663150b7a026133da612875565b8685856040518563ffffffff1660e01b81526004016133fc9493929190615346565b6020604051808303816000875af192505050801561343857506040513d601f19601f8201168201806040525081019061343591906153a7565b60015b6134bc573d8060008114613468576040519150601f19603f3d011682016040523d82523d6000602084013e61346d565b606091505b5060008151036134b457836040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016134ab9190613b42565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161461354557836040517f64a0ae9200000000000000000000000000000000000000000000000000000000815260040161353c9190613b42565b60405180910390fd5b505b50505050565b60606000600161355c846136df565b01905060008167ffffffffffffffff81111561357b5761357a613c79565b5b6040519080825280601f01601f1916602001820160405280156135ad5781602001600182028036833780820191505090505b509050600082602001820190505b600115613610578080600190039150507f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a8581613604576136036153d4565b5b049450600085036135bb575b819350505050919050565b613626838383613832565b6136da57600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361369b57806040517f7e273289000000000000000000000000000000000000000000000000000000008152600401613692919061390c565b60405180910390fd5b81816040517f177e802f0000000000000000000000000000000000000000000000000000000081526004016136d1929190615403565b60405180910390fd5b505050565b600080600090507a184f03e93ff9f4daa797ed6e38ed64bf6a1f010000000000000000831061373d577a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008381613733576137326153d4565b5b0492506040810190505b6d04ee2d6d415b85acef8100000000831061377a576d04ee2d6d415b85acef810000000083816137705761376f6153d4565b5b0492506020810190505b662386f26fc1000083106137a957662386f26fc10000838161379f5761379e6153d4565b5b0492506010810190505b6305f5e10083106137d2576305f5e10083816137c8576137c76153d4565b5b0492506008810190505b61271083106137f75761271083816137ed576137ec6153d4565b5b0492506004810190505b6064831061381a57606483816138105761380f6153d4565b5b0492506002810190505b600a8310613829576001810190505b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141580156138ea57508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614806138ab57506138aa84846124c9565b5b806138e957508273ffffffffffffffffffffffffffffffffffffffff166138d183612838565b73ffffffffffffffffffffffffffffffffffffffff16145b5b90509392505050565b6000819050919050565b613906816138f3565b82525050565b600060208201905061392160008301846138fd565b92915050565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b6139708161393b565b811461397b57600080fd5b50565b60008135905061398d81613967565b92915050565b6000602082840312156139a9576139a8613931565b5b60006139b78482850161397e565b91505092915050565b60008115159050919050565b6139d5816139c0565b82525050565b60006020820190506139f060008301846139cc565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015613a30578082015181840152602081019050613a15565b60008484015250505050565b6000601f19601f8301169050919050565b6000613a58826139f6565b613a628185613a01565b9350613a72818560208601613a12565b613a7b81613a3c565b840191505092915050565b60006020820190508181036000830152613aa08184613a4d565b905092915050565b613ab1816138f3565b8114613abc57600080fd5b50565b600081359050613ace81613aa8565b92915050565b600060208284031215613aea57613ae9613931565b5b6000613af884828501613abf565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000613b2c82613b01565b9050919050565b613b3c81613b21565b82525050565b6000602082019050613b576000830184613b33565b92915050565b613b6681613b21565b8114613b7157600080fd5b50565b600081359050613b8381613b5d565b92915050565b60008060408385031215613ba057613b9f613931565b5b6000613bae85828601613b74565b9250506020613bbf85828601613abf565b9150509250929050565b600080600060608486031215613be257613be1613931565b5b6000613bf086828701613b74565b9350506020613c0186828701613abf565b9250506040613c1286828701613abf565b9150509250925092565b600080600060608486031215613c3557613c34613931565b5b6000613c4386828701613b74565b9350506020613c5486828701613b74565b9250506040613c6586828701613abf565b9150509250925092565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b613cb182613a3c565b810181811067ffffffffffffffff82111715613cd057613ccf613c79565b5b80604052505050565b6000613ce3613927565b9050613cef8282613ca8565b919050565b600067ffffffffffffffff821115613d0f57613d0e613c79565b5b613d1882613a3c565b9050602081019050919050565b82818337600083830152505050565b6000613d47613d4284613cf4565b613cd9565b905082815260208101848484011115613d6357613d62613c74565b5b613d6e848285613d25565b509392505050565b600082601f830112613d8b57613d8a613c6f565b5b8135613d9b848260208601613d34565b91505092915050565b600080600060608486031215613dbd57613dbc613931565b5b6000613dcb86828701613abf565b9350506020613ddc86828701613abf565b925050604084013567ffffffffffffffff811115613dfd57613dfc613936565b5b613e0986828701613d76565b9150509250925092565b600060208284031215613e2957613e28613931565b5b6000613e3784828501613b74565b91505092915050565b600067ffffffffffffffff821115613e5b57613e5a613c79565b5b602082029050602081019050919050565b600080fd5b6000613e84613e7f84613e40565b613cd9565b90508083825260208201905060208402830185811115613ea757613ea6613e6c565b5b835b81811015613ed05780613ebc8882613abf565b845260208401935050602081019050613ea9565b5050509392505050565b600082601f830112613eef57613eee613c6f565b5b8135613eff848260208601613e71565b91505092915050565b600067ffffffffffffffff821115613f2357613f22613c79565b5b602082029050602081019050919050565b600067ffffffffffffffff821115613f4f57613f4e613c79565b5b613f5882613a3c565b9050602081019050919050565b6000613f78613f7384613f34565b613cd9565b905082815260208101848484011115613f9457613f93613c74565b5b613f9f848285613d25565b509392505050565b600082601f830112613fbc57613fbb613c6f565b5b8135613fcc848260208601613f65565b91505092915050565b6000613fe8613fe384613f08565b613cd9565b9050808382526020820190506020840283018581111561400b5761400a613e6c565b5b835b8181101561405257803567ffffffffffffffff8111156140305761402f613c6f565b5b80860161403d8982613fa7565b8552602085019450505060208101905061400d565b5050509392505050565b600082601f83011261407157614070613c6f565b5b8135614081848260208601613fd5565b91505092915050565b6000806000606084860312156140a3576140a2613931565b5b60006140b186828701613b74565b935050602084013567ffffffffffffffff8111156140d2576140d1613936565b5b6140de86828701613eda565b925050604084013567ffffffffffffffff8111156140ff576140fe613936565b5b61410b8682870161405c565b9150509250925092565b61411e816139c0565b811461412957600080fd5b50565b60008135905061413b81614115565b92915050565b6000806040838503121561415857614157613931565b5b600061416685828601613b74565b92505060206141778582860161412c565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6141b6816138f3565b82525050565b60006141c883836141ad565b60208301905092915050565b6000602082019050919050565b60006141ec82614181565b6141f6818561418c565b93506142018361419d565b8060005b8381101561423257815161421988826141bc565b9750614224836141d4565b925050600181019050614205565b5085935050505092915050565b6000602082019050818103600083015261425981846141e1565b905092915050565b60008060006060848603121561427a57614279613931565b5b600061428886828701613b74565b935050602061429986828701613b74565b925050604084013567ffffffffffffffff8111156142ba576142b9613936565b5b6142c686828701613eda565b9150509250925092565b600080600080608085870312156142ea576142e9613931565b5b60006142f887828801613b74565b945050602061430987828801613b74565b935050604061431a87828801613abf565b925050606085013567ffffffffffffffff81111561433b5761433a613936565b5b61434787828801613d76565b91505092959194509250565b600080600080600060a0868803121561436f5761436e613931565b5b600061437d88828901613b74565b955050602061438e88828901613abf565b945050604086013567ffffffffffffffff8111156143af576143ae613936565b5b6143bb88828901613fa7565b93505060606143cc88828901613abf565b925050608086013567ffffffffffffffff8111156143ed576143ec613936565b5b6143f988828901613d76565b9150509295509295909350565b60008060006060848603121561441f5761441e613931565b5b600061442d86828701613b74565b935050602061443e86828701613abf565b925050604084013567ffffffffffffffff81111561445f5761445e613936565b5b61446b86828701613fa7565b9150509250925092565b600067ffffffffffffffff8211156144905761448f613c79565b5b602082029050602081019050919050565b60006144b46144af84614475565b613cd9565b905080838252602082019050602084028301858111156144d7576144d6613e6c565b5b835b8181101561451e57803567ffffffffffffffff8111156144fc576144fb613c6f565b5b8086016145098982613d76565b855260208501945050506020810190506144d9565b5050509392505050565b600082601f83011261453d5761453c613c6f565b5b813561454d8482602086016144a1565b91505092915050565b600080600080600060a0868803121561457257614571613931565b5b600061458088828901613b74565b955050602086013567ffffffffffffffff8111156145a1576145a0613936565b5b6145ad88828901613eda565b945050604086013567ffffffffffffffff8111156145ce576145cd613936565b5b6145da8882890161405c565b935050606086013567ffffffffffffffff8111156145fb576145fa613936565b5b61460788828901613eda565b925050608086013567ffffffffffffffff81111561462857614627613936565b5b61463488828901614528565b9150509295509295909350565b6000806040838503121561465857614657613931565b5b600061466685828601613b74565b925050602061467785828601613b74565b9150509250929050565b6000819050919050565b60006146a66146a161469c84613b01565b614681565b613b01565b9050919050565b60006146b88261468b565b9050919050565b60006146ca826146ad565b9050919050565b6146da816146bf565b82525050565b60006020820190506146f560008301846146d1565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061474257607f821691505b602082108103614755576147546146fb565b5b50919050565b7f537472617465677920636f6e7472616374206e6f742073657400000000000000600082015250565b6000614791601983613a01565b915061479c8261475b565b602082019050919050565b600060208201905081810360008301526147c081614784565b9050919050565b6000819050919050565b60006147ec6147e76147e2846147c7565b614681565b6138f3565b9050919050565b6147fc816147d1565b82525050565b60006080820190506148176000830187613b33565b6148246020830186613b33565b61483160408301856138fd565b61483e60608301846147f3565b95945050505050565b60008151905061485681614115565b92915050565b60006020828403121561487257614871613931565b5b600061488084828501614847565b91505092915050565b7f5472616e73666572206e6f7420616c6c6f776564206279207374726174656779600082015250565b60006148bf602083613a01565b91506148ca82614889565b602082019050919050565b600060208201905081810360008301526148ee816148b2565b9050919050565b7f4f6e6c79206f776e65722063616e2063616c6c20746869732066756e6374696f60008201527f6e00000000000000000000000000000000000000000000000000000000000000602082015250565b6000614951602183613a01565b915061495c826148f5565b604082019050919050565b6000602082019050818103600083015261498081614944565b9050919050565b7f5374726174656779206e6f742072656769737465726564000000000000000000600082015250565b60006149bd601783613a01565b91506149c882614987565b602082019050919050565b600060208201905081810360008301526149ec816149b0565b9050919050565b7f5374726174656779206372656174696f6e206661696c65640000000000000000600082015250565b6000614a29601883613a01565b9150614a34826149f3565b602082019050919050565b60006020820190508181036000830152614a5881614a1c565b9050919050565b600081519050919050565b600082825260208201905092915050565b6000614a8682614a5f565b614a908185614a6a565b9350614aa0818560208601613a12565b614aa981613a3c565b840191505092915050565b60006020820190508181036000830152614ace8184614a7b565b905092915050565b600081905092915050565b6000614aec82614a5f565b614af68185614ad6565b9350614b06818560208601613a12565b80840191505092915050565b6000614b1e8284614ae1565b915081905092915050565b7f537472617465677920696e697469616c697a6174696f6e206661696c65640000600082015250565b6000614b5f601e83613a01565b9150614b6a82614b29565b602082019050919050565b60006020820190508181036000830152614b8e81614b52565b9050919050565b7f5469636b6574206e6f74206f776e65642062792073656e646572000000000000600082015250565b6000614bcb601a83613a01565b9150614bd682614b95565b602082019050919050565b60006020820190508181036000830152614bfa81614bbe565b9050919050565b7f5469636b657420616c7265616479207573656400000000000000000000000000600082015250565b6000614c37601383613a01565b9150614c4282614c01565b602082019050919050565b60006020820190508181036000830152614c6681614c2a565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f546f6b656e20646f6573206e6f74206578697374000000000000000000000000600082015250565b6000614cd2601483613a01565b9150614cdd82614c9c565b602082019050919050565b60006020820190508181036000830152614d0181614cc5565b9050919050565b600081905092915050565b6000614d1e826139f6565b614d288185614d08565b9350614d38818560208601613a12565b80840191505092915050565b6000614d508285614d13565b9150614d5c8284614d13565b91508190509392505050565b7f4578636565647320636170616369747900000000000000000000000000000000600082015250565b6000614d9e601083613a01565b9150614da982614d68565b602082019050919050565b60006020820190508181036000830152614dcd81614d91565b9050919050565b7f536563746f7220646f6573206e6f742065786973740000000000000000000000600082015250565b6000614e0a601583613a01565b9150614e1582614dd4565b602082019050919050565b60006020820190508181036000830152614e3981614dfd565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000614e7a826138f3565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203614eac57614eab614e40565b5b600182019050919050565b7f417272617973206c656e677468206d69736d6174636800000000000000000000600082015250565b6000614eed601683613a01565b9150614ef882614eb7565b602082019050919050565b60006020820190508181036000830152614f1c81614ee0565b9050919050565b7f45786365656473206d6178206d696e7420706572207472616e73616374696f6e600082015250565b6000614f59602083613a01565b9150614f6482614f23565b602082019050919050565b60006020820190508181036000830152614f8881614f4c565b9050919050565b7f4578636565647320736563746f72206361706163697479000000000000000000600082015250565b6000614fc5601783613a01565b9150614fd082614f8f565b602082019050919050565b60006020820190508181036000830152614ff481614fb8565b9050919050565b6000615006826138f3565b9150615011836138f3565b925082820190508082111561502957615028614e40565b5b92915050565b7f496e76616c696420696d706c656d656e746174696f6e00000000000000000000600082015250565b6000615065601683613a01565b91506150708261502f565b602082019050919050565b6000602082019050818103600083015261509481615058565b9050919050565b60006060820190506150b06000830186613b33565b6150bd60208301856138fd565b6150ca6040830184613b33565b949350505050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026151347fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826150f7565b61513e86836150f7565b95508019841693508086168417925050509392505050565b600061517161516c615167846138f3565b614681565b6138f3565b9050919050565b6000819050919050565b61518b83615156565b61519f61519782615178565b848454615104565b825550505050565b600090565b6151b46151a7565b6151bf818484615182565b505050565b5b818110156151e3576151d86000826151ac565b6001810190506151c5565b5050565b601f821115615228576151f9816150d2565b615202846150e7565b81016020851015615211578190505b61522561521d856150e7565b8301826151c4565b50505b505050565b600082821c905092915050565b600061524b6000198460080261522d565b1980831691505092915050565b6000615264838361523a565b9150826002028217905092915050565b61527d826139f6565b67ffffffffffffffff81111561529657615295613c79565b5b6152a0825461472a565b6152ab8282856151e7565b600060209050601f8311600181146152de57600084156152cc578287015190505b6152d68582615258565b86555061533e565b601f1984166152ec866150d2565b60005b82811015615314578489015182556001820191506020850194506020810190506152ef565b86831015615331578489015161532d601f89168261523a565b8355505b6001600288020188555050505b505050505050565b600060808201905061535b6000830187613b33565b6153686020830186613b33565b61537560408301856138fd565b81810360608301526153878184614a7b565b905095945050505050565b6000815190506153a181613967565b92915050565b6000602082840312156153bd576153bc613931565b5b60006153cb84828501615392565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006040820190506154186000830185613b33565b61542560208301846138fd565b939250505056fea26469706673582212201e4526ebb2dc4ea83ea30490221cd17383600f7ac006c79baea546f259a03f6864736f6c63430008180033',
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
