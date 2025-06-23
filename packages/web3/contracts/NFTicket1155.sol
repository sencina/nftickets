// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "./INFTicket.sol";
import "./TransferStrategy.sol";

contract NFTicket1155 is ERC1155Burnable, NFTicket {
    using Clones for address;

    address public owner;
    uint256 public currentId;
    uint256 public maxMintPerTransaction;

    // Sector management
    mapping(uint256 => string) public sectors;
    mapping(uint256 => uint256) public capacities;
    mapping(uint256 => uint256) public ticketsIssuedBySector;
    mapping(uint256 => uint256) public tokenIdToSectorId;
    
    // Transfer strategy management
    mapping(uint256 => ITransferStrategy) public tokenStrategyContracts;
    mapping(uint256 => address) public strategyImplementations;
    uint256 public nextStrategyId;

    // Authentication tracking
    mapping(uint256 => bool) public isAuthenticated;

    // Token URI storage
    mapping(uint256 => string) private _tokenURIs;
    string private _baseURI;

    constructor(
        string memory uri_,
        string[] memory _sectors,
        uint256[] memory _capacity,
        uint256 _maxMintPerTransaction
    ) ERC1155(uri_) {
        _baseURI = uri_;
        owner = msg.sender;
        currentId = 0;
        nextStrategyId = 1;
        maxMintPerTransaction = _maxMintPerTransaction;
        for (uint256 i = 0; i < _sectors.length; i++) {
            sectors[i] = _sectors[i];
            capacities[i] = _capacity[i];
        }

        // Register default strategies
        registerStrategy(address(new NormalTransferStrategy()));
        registerStrategy(address(new NonTransferableStrategy()));
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
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
     * @dev Sets a specific token's URI
     * @param tokenId uint256 ID of the token to set its URI
     * @param tokenURI string URI to assign
     */
    function _setTokenURI(uint256 tokenId, string memory tokenURI) internal virtual {
        _tokenURIs[tokenId] = tokenURI;
    }

    /**
     * @dev Returns the URI for a given token ID.
     * If the token has a specific URI set, it returns that.
     * Otherwise, returns the base URI.
     */
    function uri(uint256 tokenId) public view virtual override returns (string memory) {
        string memory tokenURI = _tokenURIs[tokenId];
        
        // If token has specific URI, return it
        if (bytes(tokenURI).length > 0) {
            return tokenURI;
        }
        
        // Otherwise return base URI
        return _baseURI;
    }

    /**
     * @dev Sets the base URI for all tokens
     */
    function setBaseURI(string memory newuri) public onlyOwner {
        _baseURI = newuri;
    }

    /**
     * @dev Sets the maximum amount of tokens that can be minted in a single transaction
     * @param _maxMintPerTransaction The new maximum amount
     */
    function setMaxMintPerTransaction(uint256 _maxMintPerTransaction) external onlyOwner {
        maxMintPerTransaction = _maxMintPerTransaction;
    }

    /**
     * @dev Batch mint tokens for multiple sectors
     * @param account The account to mint tokens for
     * @param sectorIds Array of sector IDs to mint from
     * @param amounts Array of amounts to mint for each sector
     * @param metadataURIs Array of metadata URIs for each token
     * @param strategyIds Array of strategy IDs for each token
     * @param initDatas Array of initialization data for each strategy
     */
    function batchMint(
        address account,
        uint256[] memory sectorIds,
        uint256[] memory amounts,
        string[] memory metadataURIs,
        uint256[] memory strategyIds,
        bytes[] memory initDatas
    ) public onlyOwner {
        require(sectorIds.length == amounts.length && 
                amounts.length == metadataURIs.length && 
                metadataURIs.length == strategyIds.length &&
                strategyIds.length == initDatas.length, 
            "Arrays length mismatch");
        require(sectorIds.length <= maxMintPerTransaction, 
            "Exceeds max mint per transaction");

        uint256[] memory tokenIds = new uint256[](sectorIds.length);
        uint256[] memory mintAmounts = new uint256[](sectorIds.length);

        for (uint256 i = 0; i < sectorIds.length; i++) {
            require(ticketsIssuedBySector[sectorIds[i]] + amounts[i] <= capacities[sectorIds[i]], 
                "Exceeds sector capacity");
            require(bytes(sectors[sectorIds[i]]).length > 0, "Sector does not exist");

            uint256 tokenId = currentId + i;
            tokenIds[i] = tokenId;
            mintAmounts[i] = amounts[i];
            
            // Set token URI
            _setTokenURI(tokenId, metadataURIs[i]);
            
            // Store the mapping from tokenId to sectorId
            tokenIdToSectorId[tokenId] = sectorIds[i];
            
            // Set transfer strategy
            setTokenTransferStrategy(tokenId, strategyIds[i], initDatas[i]);
            
            // Update sector counters
            ticketsIssuedBySector[sectorIds[i]] += amounts[i];
            
            emit TokenMinted(tokenId, account, sectorIds[i]);
        }

        // Mint all tokens in a single batch
        _mintBatch(account, tokenIds, mintAmounts, "");
        
        // Update currentId
        currentId += sectorIds.length;
    }

    /**
     * @dev Custom transfer function that implements transfer strategies
     */
    function transferWithStrategy(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public {
        ITransferStrategy strategy = tokenStrategyContracts[id];
        require(address(strategy) != address(0), "Strategy contract not set");
        require(strategy.canTransfer(from, to, id, amount), "Transfer not allowed by strategy");
        
        // If we get here, the transfer is allowed
        safeTransferFrom(from, to, id, amount, data);
    }

    /**
     * @dev Custom batch transfer function that implements transfer strategies
     */
    function batchTransferWithStrategy(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public {
        for (uint256 i = 0; i < ids.length; i++) {
            ITransferStrategy strategy = tokenStrategyContracts[ids[i]];
            require(address(strategy) != address(0), "Strategy contract not set");
            require(strategy.canTransfer(from, to, ids[i], amounts[i]), "Transfer not allowed by strategy");
        }
        
        // If we get here, all transfers are allowed
        safeBatchTransferFrom(from, to, ids, amounts, data);
    }

    /**
     * @dev Mints a new ticket
     * @param account The account address to receive the ticket
     * @param sector The sector ID for this ticket
     * @param metadataURI The URI for the ticket metadata
     */
    function mint(
        address account,
        uint256 sector,
        string memory metadataURI
    ) external override onlyOwner {
        // Use default strategy (normal transfer, ID 1)
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = 1;
        
        uint256[] memory sectorIds = new uint256[](1);
        sectorIds[0] = sector;
        
        string[] memory metadataURIs = new string[](1);
        metadataURIs[0] = metadataURI;
        
        uint256[] memory strategyIds = new uint256[](1);
        strategyIds[0] = 1;
        
        bytes[] memory initDatas = new bytes[](1);
        initDatas[0] = "";
        
        batchMint(account, sectorIds, amounts, metadataURIs, strategyIds, initDatas);
    }

    /**
     * @dev Batch mint tokens for multiple sectors
     * @param account The account address to receive the tickets
     * @param sectorIds Array of sector IDs for the tickets
     * @param metadataURIs Array of URIs for the ticket metadata
     */
    function batchMint(
        address account,
        uint256[] memory sectorIds,
        string[] memory metadataURIs
    ) external override onlyOwner {
        uint256 len = sectorIds.length;
        
        uint256[] memory amounts = new uint256[](len);
        uint256[] memory strategyIds = new uint256[](len);
        bytes[] memory initDatas = new bytes[](len);
        
        // Use default strategy (normal transfer, ID 1) for all tokens
        // and mint 1 token per sector
        for (uint256 i = 0; i < len; i++) {
            amounts[i] = 1;
            strategyIds[i] = 1;
        }
        
        batchMint(account, sectorIds, amounts, metadataURIs, strategyIds, initDatas);
    }

    /**
     * @dev Authenticates if an address owns a specific ticket
     * @param sender The address to check
     * @param tokenId The token ID to authenticate
     * @return True if the address owns the token and it hasn't been used yet
     */
    function authenticate(address sender, uint256 tokenId) external override returns (bool) {
        require(balanceOf(sender, tokenId) > 0, "Ticket not owned by sender");
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
     * @dev Returns the URI for a token's metadata
     * @param tokenId The token ID to get URI for
     * @return The URI string
     */
    function getTokenURI(uint256 tokenId) external view override returns (string memory) {
        return uri(tokenId);
    }

    /**
     * @dev Returns the current token ID (next to be minted)
     * @return Current token ID
     */
    function getCurrentId() external view override returns (uint256) {
        return currentId;
    }

    /**
     * @dev Override the transfer function to enforce transfer strategies
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public virtual override {
        ITransferStrategy strategy = tokenStrategyContracts[id];
        require(address(strategy) != address(0), "Strategy contract not set");
        require(
            strategy.canTransfer(from, to, id, amount),
            "Transfer not allowed by strategy"
        );
        super.safeTransferFrom(from, to, id, amount, data);
    }

    /**
     * @dev Override the batch transfer function to enforce transfer strategies
     */
    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public virtual override {
        for (uint256 i = 0; i < ids.length; i++) {
            ITransferStrategy strategy = tokenStrategyContracts[ids[i]];
            require(address(strategy) != address(0), "Strategy contract not set");
            require(
                strategy.canTransfer(from, to, ids[i], amounts[i]),
                "Transfer not allowed by strategy"
            );
        }
        super.safeBatchTransferFrom(from, to, ids, amounts, data);
    }
}
