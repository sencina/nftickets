# NFTickets Smart Contracts

This project implements a flexible and extensible NFT ticketing system using both ERC721 and ERC1155 standards. The system features customizable transfer strategies, sector-based ticket management, and support for both single and batch operations.

## Architecture

### Core Contracts

1. **INFTicket.sol**
   - Interface defining the base functionality for NFT tickets
   - Standardizes minting operations and ticket authentication
   - Ensures compatibility between ERC721 and ERC1155 implementations

2. **NFTicket721.sol (ERC721 Implementation)**
   - Single-token standard implementation
   - Each ticket is a unique NFT
   - Ideal for high-value or unique tickets (e.g., VIP passes)

3. **NFTicket1155.sol (ERC1155 Implementation)**
   - Multi-token standard implementation
   - Supports multiple tickets of the same type
   - Efficient for bulk ticket management (e.g., general admission)

4. **TransferStrategy.sol**
   - Defines transfer behavior through the `ITransferStrategy` interface
   - Includes three built-in strategies:
     - `NormalTransferStrategy`: Standard transferable tickets
     - `NonTransferableStrategy`: Non-transferable tickets
     - `FallbackTransferStrategy`: Restricted transfers to predefined addresses

### Key Features

#### 1. Sector Management
- Tickets are organized by sectors
- Each sector has:
  - Unique identifier
  - Name/description
  - Capacity limit
  - Tracking of issued tickets

#### 2. Transfer Strategy System
- Extensible strategy pattern
- Strategies are cloneable and upgradeable
- Custom strategy support through registration system
- Token-level strategy assignment

#### 3. Batch Operations
- Support for minting multiple tickets
- Batch transfer capabilities
- Gas-efficient operations

## Usage

### 1. Deploying Contracts

```solidity
// Deploy ERC721 version
NFTicket721 ticket721 = new NFTicket721(
    "Event Tickets",
    "TCKT",
    ["VIP", "General"],  // sectors
    [100, 1000],         // capacities
    50                   // maxMintPerTransaction
);

// Deploy ERC1155 version
NFTicket1155 ticket1155 = new NFTicket1155(
    "ipfs://baseuri/",
    ["VIP", "General"],  // sectors
    [100, 1000],         // capacities
    50                   // maxMintPerTransaction
);
```

### 2. Creating Custom Transfer Strategies

```solidity
// Define custom strategy
contract TimeBasedStrategy is ITransferStrategy {
    uint256 public transferDeadline;
    
    function initialize(bytes memory data) external {
        transferDeadline = abi.decode(data, (uint256));
    }
    
    function canTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 amount
    ) external view returns (bool) {
        return block.timestamp < transferDeadline;
    }
}

// Register strategy
TimeBasedStrategy strategy = new TimeBasedStrategy();
uint256 strategyId = ticket721.registerStrategy(address(strategy));
```

### 3. Minting Tickets

```solidity
// Single mint with custom strategy
bytes memory initData = abi.encode(block.timestamp + 7 days);
ticket721.mint(
    userAddress,
    sectorId,
    "ipfs://metadata/ticket1",
    strategyId,
    initData
);

// Batch mint with mixed strategies
ticket1155.batchMint(
    userAddress,
    [0, 1],              // sectorIds
    [1, 5],              // amounts
    ["uri1", "uri2"],    // metadataURIs
    [1, 2],              // strategyIds
    [initData1, initData2] // strategy initialization data
);
```

### 4. Transfer Operations

```solidity
// Transfer with strategy check
ticket721.transferWithStrategy(from, to, tokenId);

// Batch transfer
ticket1155.batchTransferWithStrategy(
    from,
    to,
    tokenIds,
    amounts,
    ""  // data
);
```

## Security Considerations

1. **Access Control**
   - Owner-restricted administrative functions
   - Strategy registration controls
   - Capacity management

2. **Strategy Immutability**
   - Strategies are immutable once assigned to a token
   - Each token instance gets its own strategy clone
   - Initialization data is validated during setup

3. **Sector Protection**
   - Capacity limits enforced at the sector level
   - Prevents overselling tickets
   - Maintains sector integrity

## Development

### Testing

```shell
npx hardhat test
```

### Deployment

```shell
npx hardhat ignition deploy ./ignition/modules/NFTickets.ts
```

### Gas Optimization

- Uses clones for strategy deployment
- Batch operations for multiple tickets
- Efficient storage patterns

## Events

1. **TokenMinted**
   - Emitted when new tickets are created
   - Includes token ID, recipient, and sector

2. **StrategyRegistered**
   - Tracks new strategy implementations
   - Contains strategy ID and implementation address

3. **TokenStrategySet**
   - Records strategy assignments
   - Includes token ID, strategy ID, and initialization data
