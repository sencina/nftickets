// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";

contract NFTicket1155 is ERC1155URIStorage {
    address public owner;
    uint256 public currentId;
    mapping(uint256 => string) sectors;
    mapping(uint256 => uint256) capacities;
    mapping(uint256 => uint256) public ticketsIssuedBySector;

    event TokenMinted(uint256 indexed id, address indexed account, uint256 amount);

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

    // This function mints tokens and sets the token metadata URI
    function mint(
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
        
        ticketsIssuedBySector[sector] += amount;
        emit TokenMinted(tokenId, account, amount);
        currentId++;
    }

    function authenticate(address sender, uint256 sector) public view returns (bool) {
        return balanceOf(sender, sector) > 0;
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
