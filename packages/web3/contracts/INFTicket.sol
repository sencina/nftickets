// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title NFTicket
 * @dev Interface for NFTicket smart contracts
 */
interface NFTicket {
    /**
     * @dev Registers a new transfer strategy implementation
     * @param implementation The address of the strategy contract implementation
     * @return strategyId The ID of the registered strategy
     */
    function registerStrategy(address implementation) external returns (uint256);

    /**
     * @dev Sets the transfer strategy for a specific token
     * @param tokenId The token ID to set the strategy for
     * @param strategyId The ID of the registered strategy to use
     * @param initData The initialization data for the strategy
     */
    function setTokenTransferStrategy(
        uint256 tokenId,
        uint256 strategyId,
        bytes memory initData
    ) external;

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
    ) external;
    
    /**
     * @dev Batch mints multiple tickets
     * @param account The account address to receive the tickets
     * @param sectorIds Array of sector IDs for the tickets
     * @param metadataURIs Array of URIs for the ticket metadata
     */
    function batchMint(
        address account,
        uint256[] memory sectorIds,
        string[] memory metadataURIs
    ) external;
    
    /**
     * @dev Authenticates if an address owns a specific ticket
     * @param sender The address to check
     * @param tokenId The token ID to authenticate
     * @return True if the address owns the token and it hasn't been authenticated before
     */
    function authenticate(address sender, uint256 tokenId) external returns (bool);
    
    /**
     * @dev Returns the URI for a token's metadata
     * @param tokenId The token ID to get URI for
     * @return The URI string
     */
    function getTokenURI(uint256 tokenId) external view returns (string memory);
    
    /**
     * @dev Returns the current token ID (next to be minted)
     * @return Current token ID
     */
    function getCurrentId() external view returns (uint256);
    
    /**
     * @dev Returns the contract owner address
     * @return The owner address
     */
    function owner() external view returns (address);
    
    /**
     * @dev Returns number of tickets issued for a sector
     * @param sector The sector ID
     * @return Number of tickets issued
     */
    function ticketsIssuedBySector(uint256 sector) external view returns (uint256);
    
    /**
     * @dev Emitted when a token is minted
     * @param id The token ID that was minted
     * @param account The address that received the token
     */
    event TokenMinted(uint256 indexed id, address indexed account, uint256 sectorId);

    /**
     * @dev Emitted when a new strategy is registered
     * @param strategyId The ID assigned to the strategy
     * @param implementation The address of the strategy implementation
     */
    event StrategyRegistered(uint256 indexed strategyId, address implementation);

    /**
     * @dev Emitted when a token's strategy is set
     * @param tokenId The token ID
     * @param strategyId The ID of the strategy
     * @param initData The initialization data used
     */
    event TokenStrategySet(uint256 indexed tokenId, uint256 indexed strategyId, bytes initData);
} 