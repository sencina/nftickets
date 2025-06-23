// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "./INFTicket.sol";
import "./TransferStrategy.sol";

contract NFTicket721 is ERC721URIStorage, NFTicket {
    using Clones for address;

    address public owner;
    uint256 public currentId;
    uint256 public maxMintPerTransaction;

    // Sector management
    mapping(uint256 => string) public sectors;
    mapping(uint256 => uint256) public capacities;
    mapping(uint256 => uint256) public ticketsIssuedBySector;

    // Ticket ownership and organization
    mapping(uint256 => uint256) public tokenIdToSectorId;
    mapping(address => mapping(uint256 => uint256[])) public ownerSectorTokens; // Maps owner -> sectorId -> tokenIds

    // Transfer strategy management
    mapping(uint256 => ITransferStrategy) public tokenStrategyContracts;
    mapping(uint256 => address) public strategyImplementations;
    uint256 public nextStrategyId;

    // Authentication tracking
    mapping(uint256 => bool) public isAuthenticated;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor(
        string memory name,
        string memory symbol,
        string[] memory _sectors,
        uint256[] memory _capacity,
        uint256 _maxMintPerTransaction
    ) ERC721(name, symbol) {
        require(
            _sectors.length == _capacity.length,
            "Sectors and capacities length mismatch"
        );

        owner = msg.sender;
        maxMintPerTransaction = _maxMintPerTransaction;
        
        uint256 len = _sectors.length;
        for (uint256 i = 0; i < len; i++) {
            sectors[i] = _sectors[i];
            capacities[i] = _capacity[i];
        }

        // Register default strategies in a gas-efficient way
        nextStrategyId = 1;
        address normalStrategy = address(new NormalTransferStrategy());
        strategyImplementations[1] = normalStrategy;
        emit StrategyRegistered(1, normalStrategy);

        nextStrategyId = 2;
        address nonTransferableStrategy = address(new NonTransferableStrategy());
        strategyImplementations[2] = nonTransferableStrategy;
        emit StrategyRegistered(2, nonTransferableStrategy);
    }

    /**
     * @dev Sets the maximum amount of tokens that can be minted in a single transaction
     * @param _maxMintPerTransaction The new maximum amount
     */
    function setMaxMintPerTransaction(
        uint256 _maxMintPerTransaction
    ) external onlyOwner {
        maxMintPerTransaction = _maxMintPerTransaction;
    }

    /**
     * @dev Registers a new transfer strategy implementation
     * @param implementation The address of the strategy contract implementation
     * @return strategyId The ID of the registered strategy
     */
    function registerStrategy(address implementation) public returns (uint256) {
        require(implementation != address(0), "Invalid implementation");
        uint256 strategyId = nextStrategyId++;
        strategyImplementations[strategyId] = implementation;
        emit StrategyRegistered(strategyId, implementation);
        return strategyId;
    }

    /**
     * @dev Sets the transfer strategy for a specific token
     * @param tokenId The token ID to set the strategy for
     * @param strategyId The ID of the registered strategy to use
     * @param initData The initialization data for the strategy (e.g., fallback addresses)
     */
    function setTokenTransferStrategy(
        uint256 tokenId,
        uint256 strategyId,
        bytes memory initData
    ) public onlyOwner {
        address implementation = strategyImplementations[strategyId];
        require(implementation != address(0), "Strategy not registered");
        
        // Clone the strategy implementation
        address strategyAddress = implementation.clone();
        require(strategyAddress != address(0), "Strategy creation failed");

        // Initialize the strategy with the provided data
        bytes memory initializeCall = abi.encodeWithSignature("initialize(bytes)", initData);
        (bool success, ) = strategyAddress.call(initializeCall);
        require(success, "Strategy initialization failed");
        
        tokenStrategyContracts[tokenId] = ITransferStrategy(strategyAddress);
        emit TokenStrategySet(tokenId, strategyId, initData);
    }

    /**
     * Mint a new ticket NFT
     * @param account The account address to receive the ticket
     * @param sector The sector ID for this ticket
     * @param metadataURI The IPFS URI for the ticket metadata
     * @param strategyId The ID of the registered strategy to use
     * @param initData The initialization data for the strategy
     */
    function mint(
        address account,
        uint256 sector,
        string memory metadataURI,
        uint256 strategyId,
        bytes memory initData
    ) public onlyOwner {
        require(
            ticketsIssuedBySector[sector] < capacities[sector],
            "Exceeds capacity"
        );
        require(bytes(sectors[sector]).length > 0, "Sector does not exist");

        uint256 tokenId = currentId;

        // Mint the ERC721 token
        _mint(account, tokenId);

        // Set token URI
        _setTokenURI(tokenId, metadataURI);

        // Store the mapping from tokenId to sectorId
        tokenIdToSectorId[tokenId] = sector;

        // Track tokens by owner and sector
        ownerSectorTokens[account][sector].push(tokenId);

        // Set transfer strategy
        setTokenTransferStrategy(tokenId, strategyId, initData);

        // Increment counters
        ticketsIssuedBySector[sector]++;
        emit TokenMinted(tokenId, account, sector);
        currentId++;
    }

    /**
     * @dev Batch mint tokens for multiple sectors
     * @param account The account to mint tokens for
     * @param sectorIds Array of sector IDs to mint from
     * @param metadataURIs Array of metadata URIs for each token
     * @param strategyIds Array of strategy IDs for each token
     * @param initDatas Array of initialization data for each strategy
     */
    function batchMint(
        address account,
        uint256[] memory sectorIds,
        string[] memory metadataURIs,
        uint256[] memory strategyIds,
        bytes[] memory initDatas
    ) public onlyOwner {
        require(
            sectorIds.length == metadataURIs.length &&
                metadataURIs.length == strategyIds.length &&
                strategyIds.length == initDatas.length,
            "Arrays length mismatch"
        );
        require(
            sectorIds.length <= maxMintPerTransaction,
            "Exceeds max mint per transaction"
        );

        uint256 len = sectorIds.length;
        uint256 startId = currentId;
        
        // Pre-validate all sectors to avoid reverting mid-operation
        for (uint256 i = 0; i < len; i++) {
            require(
                ticketsIssuedBySector[sectorIds[i]] < capacities[sectorIds[i]],
                "Exceeds sector capacity"
            );
            require(
                bytes(sectors[sectorIds[i]]).length > 0,
                "Sector does not exist"
            );
            ticketsIssuedBySector[sectorIds[i]]++;
        }

        // Batch mint tokens
        for (uint256 i = 0; i < len; i++) {
            uint256 tokenId = startId + i;
            _mint(account, tokenId);
            _setTokenURI(tokenId, metadataURIs[i]);
            tokenIdToSectorId[tokenId] = sectorIds[i];
            ownerSectorTokens[account][sectorIds[i]].push(tokenId);
            setTokenTransferStrategy(tokenId, strategyIds[i], initDatas[i]);
            emit TokenMinted(tokenId, account, sectorIds[i]);
        }

        currentId = startId + len;
    }

    /**
     * @dev Custom transfer function that implements transfer strategies
     */
    function transferWithStrategy(
        address from,
        address to,
        uint256 tokenId
    ) public {
        ITransferStrategy strategy = tokenStrategyContracts[tokenId];
        require(address(strategy) != address(0), "Strategy contract not set");
        require(
            strategy.canTransfer(from, to, tokenId, 1),
            "Transfer not allowed by strategy"
        );

        // If we get here, the transfer is allowed
        _transfer(from, to, tokenId);
    }

    /**
     * @dev Custom batch transfer function that implements transfer strategies
     */
    function batchTransferWithStrategy(
        address from,
        address to,
        uint256[] memory tokenIds
    ) public {
        for (uint256 i = 0; i < tokenIds.length; i++) {
            ITransferStrategy strategy = tokenStrategyContracts[tokenIds[i]];
            require(
                address(strategy) != address(0),
                "Strategy contract not set"
            );
            require(
                strategy.canTransfer(from, to, tokenIds[i], 1),
                "Transfer not allowed by strategy"
            );
        }

        // If we get here, all transfers are allowed
        for (uint256 i = 0; i < tokenIds.length; i++) {
            _transfer(from, to, tokenIds[i]);
        }
    }

    /**
     * Authenticate if an address owns a ticket for the given token ID
     * @param sender The address to check
     * @param tokenId The token ID to authenticate
     * @return True if the address owns the token and it hasn't been used yet
     */
    function authenticate(
        address sender,
        uint256 tokenId
    ) public returns (bool) {
        require(ownerOf(tokenId) == sender, "Ticket not owned by sender");
        require(!isAuthenticated[tokenId], "Ticket already used");
        
        isAuthenticated[tokenId] = true;
        return true;
    }

    /**
     * Check if a token has been used
     * @param tokenId The token ID to check
     * @return True if the token has been used
     */
    function isTokenUsed(uint256 tokenId) public view returns (bool) {
        return isAuthenticated[tokenId];
    }

    /**
     * Check if an address owns any ticket for a specific sector
     * @param sender The address to check
     * @param sectorId The sector ID to check
     * @return True if the address owns any ticket for the sector
     */
    function authenticateBySector(
        address sender,
        uint256 sectorId
    ) public view returns (bool) {
        return ownerSectorTokens[sender][sectorId].length > 0;
    }

    /**
     * Get the sector ID for a specific token
     * @param tokenId The token ID to check
     * @return The sector ID this token belongs to
     */
    function getSectorByToken(uint256 tokenId) public view returns (uint256) {
        require(
            tokenIdToSectorId[tokenId] != 0 || tokenId == 0,
            "Token does not exist"
        );
        return tokenIdToSectorId[tokenId];
    }

    /**
     * @dev Returns the URI for a token's metadata
     * @param tokenId The token ID to get URI for
     * @return The URI string
     */
    function getTokenURI(uint256 tokenId) external view override returns (string memory) {
        return tokenURI(tokenId);
    }

    /**
     * @dev Returns the current token ID (next to be minted)
     * @return Current token ID
     */
    function getCurrentId() external view override returns (uint256) {
        return currentId;
    }

    /**
     * Get all tokens owned by an address for a specific sector
     * @param tokenOwner The address to check
     * @param sectorId The sector ID to filter by
     * @return Array of token IDs
     */
    function getTokensBySector(
        address tokenOwner,
        uint256 sectorId
    ) public view returns (uint256[] memory) {
        return ownerSectorTokens[tokenOwner][sectorId];
    }

    /**
     * @dev Overrides the mint function from the interface
     */
    function mint(
        address account,
        uint256 sector,
        string memory metadataURI
    ) external override onlyOwner {
        // Use default strategy (normal transfer, ID 1)
        mint(account, sector, metadataURI, 1, "");
    }

    /**
     * @dev Overrides the batch mint function from the interface
     */
    function batchMint(
        address account,
        uint256[] memory sectorIds,
        string[] memory metadataURIs
    ) external override onlyOwner {
        uint256 len = sectorIds.length;
        uint256[] memory strategyIds = new uint256[](len);
        bytes[] memory initDatas = new bytes[](len);
        
        // Use default strategy (normal transfer, ID 1) for all tokens
        for (uint256 i = 0; i < len; i++) {
            strategyIds[i] = 1;
        }
        
        batchMint(account, sectorIds, metadataURIs, strategyIds, initDatas);
    }

    /**
     * @dev Override the transfer function to enforce transfer strategies
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override(ERC721, IERC721) {
        ITransferStrategy strategy = tokenStrategyContracts[tokenId];
        require(address(strategy) != address(0), "Strategy contract not set");
        require(
            strategy.canTransfer(from, to, tokenId, 1),
            "Transfer not allowed by strategy"
        );
        super.transferFrom(from, to, tokenId);
    }

    /**
     * @dev Override the safe transfer function to enforce transfer strategies
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public virtual override(ERC721, IERC721) {
        ITransferStrategy strategy = tokenStrategyContracts[tokenId];
        require(address(strategy) != address(0), "Strategy contract not set");
        require(
            strategy.canTransfer(from, to, tokenId, 1),
            "Transfer not allowed by strategy"
        );
        super.safeTransferFrom(from, to, tokenId, data);
    }
} 