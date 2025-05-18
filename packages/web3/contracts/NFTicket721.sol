// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./INFTicket.sol";

contract NFTicket721 is ERC721URIStorage, NFTicket {
    address public owner;
    uint256 public currentId;
    
    // Sector management
    mapping(uint256 => string) public sectors;
    mapping(uint256 => uint256) public capacities;
    mapping(uint256 => uint256) public ticketsIssuedBySector;
    
    // Ticket ownership and organization
    mapping(uint256 => uint256) public tokenIdToSectorId;
    mapping(address => mapping(uint256 => uint256[])) public ownerSectorTokens; // Maps owner -> sectorId -> tokenIds

    constructor(string memory name, string memory symbol, string[] memory _sectors, uint256[] memory _capacity) 
        ERC721(name, symbol) 
    {
        owner = msg.sender;
        currentId = 0;
        require(_sectors.length == _capacity.length, "Sectors and capacities length mismatch");
        
        for (uint256 i = 0; i < _sectors.length; i++) {
            sectors[i] = _sectors[i];
            capacities[i] = _capacity[i];
        }
    }

    /**
     * Mint a new ticket NFT
     * @param account The account address to receive the ticket
     * @param sector The sector ID for this ticket
     * @param metadataURI The IPFS URI for the ticket metadata
     */
    function mint(
        address account,
        uint256 sector,
        string memory metadataURI
    ) public {
        require(msg.sender == owner, "Only owner can mint");
        require(ticketsIssuedBySector[sector] < capacities[sector], "Exceeds capacity");
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
        
        // Increment counters
        ticketsIssuedBySector[sector]++;
        emit TokenMinted(tokenId, account, sector);
        currentId++;
    }

    /**
     * Authenticate if an address owns a ticket for the given token ID
     * @param sender The address to check
     * @param tokenId The token ID to authenticate
     * @return True if the address owns the token
     */
    function authenticate(address sender, uint256 tokenId) public view returns (bool) {
        return ownerOf(tokenId) == sender;
    }
    
    /**
     * Check if an address owns any ticket for a specific sector
     * @param sender The address to check
     * @param sectorId The sector ID to check
     * @return True if the address owns any ticket for the sector
     */
    function authenticateBySector(address sender, uint256 sectorId) public view returns (bool) {
        return ownerSectorTokens[sender][sectorId].length > 0;
    }
    
    /**
     * Get the sector ID for a specific token
     * @param tokenId The token ID to check
     * @return The sector ID this token belongs to
     */
    function getSectorByToken(uint256 tokenId) public view returns (uint256) {
        require(tokenIdToSectorId[tokenId] != 0 || tokenId == 0, "Token does not exist");
        return tokenIdToSectorId[tokenId];
    }
    
    /**
     * Get the token URI
     * @param tokenId The token ID to get URI for
     * @return URI string
     */
    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId);
    }
    
    /**
     * Get the current token ID (next to be minted)
     * @return Current token ID
     */
    function getCurrentId() public view returns (uint256) {
        return currentId;
    }
    
    /**
     * Get all tokens owned by an address for a specific sector
     * @param owner The address to check
     * @param sectorId The sector ID to filter by
     * @return Array of token IDs
     */
    function getTokensBySector(address owner, uint256 sectorId) public view returns (uint256[] memory) {
        return ownerSectorTokens[owner][sectorId];
    }
} 