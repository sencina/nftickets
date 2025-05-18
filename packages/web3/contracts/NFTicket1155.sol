// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "./INFTicket.sol";

contract NFTicket1155 is ERC1155URIStorage, NFTicket {
    address public owner;
    uint256 public currentId;
    mapping(uint256 => string) sectors;
    mapping(uint256 => uint256) capacities;
    mapping(uint256 => uint256) public ticketsIssuedBySector;
    mapping(uint256 => uint256) public tokenIdToSectorId; 

    constructor(string memory _uri, string[] memory _sectors, uint256[] memory _capacity) ERC1155(_uri) {
        owner = msg.sender;
        currentId = 0;
        for (uint256 i = 0; i < _sectors.length; i++) {
            sectors[i] = _sectors[i];
            capacities[i] = _capacity[i];
        }
    }

    // The base URI should point to where your metadata is hosted (e.g., IPFS, your server)
    function setBaseURI(string memory newuri) public {
        require(msg.sender == owner, "Only owner can set base URI");
        _setBaseURI(newuri);
    }

    /**
     * @dev Implements the NFTicket interface mint function
     */
    function mint(
        address account,
        uint256 sector,
        string memory metadataURI
    ) public {
        // Default to minting 1 token with empty bytes as data
        mintWithAmount(account, sector, 1, metadataURI, "");
    }

    // This is the original mint function, renamed to mintWithAmount
    function mintWithAmount(
        address account, 
        uint256 sector, 
        uint256 amount, 
        string memory metadataURI, // Complete metadata URI (contains image and QR code)
        bytes memory data
    ) public {
        require(msg.sender == owner, "Only owner can mint");
        require(ticketsIssuedBySector[sector] + amount <= capacities[sector], "Exceeds capacity");
        require(bytes(sectors[sector]).length > 0, "Sector does not exist");
        
        uint256 tokenId = currentId;
        _mint(account, sector, amount, data);
        
        // Set the token metadata URI directly
        _setURI(tokenId, metadataURI);
        
        // Store the mapping from tokenId to sectorId
        tokenIdToSectorId[tokenId] = sector;
        
        ticketsIssuedBySector[sector] += amount;
        emit TokenMinted(tokenId, account, sector);
        currentId++;
    }

    function authenticate(address sender, uint256 tokenId) public view returns (bool) {
        // Get the sector ID associated with this token ID
        uint256 sectorId = tokenIdToSectorId[tokenId];
        
        // Check if the sender owns tokens for this sector
        return balanceOf(sender, sectorId) > 0;
    }
    
    // Returns the URI pointing to the token's metadata JSON
    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return uri(tokenId);
    }
    
    // Returns the current token ID
    function getCurrentId() public view returns (uint256) {
        return currentId;
    }
}
