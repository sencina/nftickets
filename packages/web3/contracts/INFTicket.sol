// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title NFTicket
 * @dev Interface for NFTicket smart contracts
 */
interface NFTicket {
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
     * @dev Authenticates if an address owns a specific ticket
     * @param sender The address to check
     * @param tokenId The token ID to authenticate
     * @return True if the address owns the token
     */
    function authenticate(address sender, uint256 tokenId) external view returns (bool);
    
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
} 