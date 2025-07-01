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

# NFTickets Smart Contract Performance Testing

This directory contains the smart contracts and testing infrastructure for the NFTickets system, which implements both ERC-721 and ERC-1155 standards for event ticketing.

## Performance Testing Suite

The testing suite is designed to evaluate and compare the performance, efficiency, and reliability of both NFT standards in the context of event ticketing. It provides comprehensive metrics for making informed decisions about which standard to use for different types of events.

### Test Categories

1. **Gas Cost Analysis**
   - Deployment costs
   - Minting costs (single and batch operations)
   - Transfer costs
   - Strategy implementation costs

2. **Load Testing**
   - Concurrent minting operations
   - Authentication performance
   - System behavior under high load

3. **Reliability Metrics**
   - Transaction success rates
   - Error handling robustness
   - Edge case management

### Running the Tests

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the performance test suite:
   ```bash
   npx ts-node scripts/run-performance-tests.ts
   ```

The script will:
- Execute all performance tests
- Collect and analyze results
- Generate a comprehensive report in the `reports` directory

### Understanding the Results

The generated report includes:

1. **Executive Summary**
   - Overview of test results
   - Key findings and recommendations

2. **Detailed Metrics**
   - Gas costs for various operations
   - Performance under load
   - Success rates and error handling statistics

3. **Comparative Analysis**
   - ERC-721 vs ERC-1155 comparison
   - Recommendations for different use cases

### Test Configuration

You can modify test parameters in `test/NFTicketPerformance.test.ts`:

- `BATCH_SIZES`: Array of batch sizes to test
- `NUM_ITERATIONS`: Number of times to repeat each test
- `LOAD_TEST_USERS`: Number of concurrent users for load testing

### Report Location

Performance test reports are generated in the `reports` directory with the filename format:
```
performance_report_YYYY-MM-DD.md
```

### Interpreting Results

1. **Gas Costs**
   - Lower is better
   - Compare relative costs between standards
   - Consider the impact of batch operations

2. **Load Testing**
   - Look for consistent performance under load
   - Check for any failures or timeouts
   - Compare response times between standards

3. **Reliability**
   - Success rates should be close to 100%
   - Error handling should be consistent
   - Edge cases should be properly managed

## Contributing

When adding new tests or modifying existing ones:

1. Follow the existing test structure
2. Update the README if adding new test categories
3. Ensure backward compatibility with existing reports
4. Add appropriate documentation for new metrics

## License

This project is licensed under the MIT License - see the LICENSE file for details.
