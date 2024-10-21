// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";

contract NFTicket1155 is ERC1155URIStorage {
    address public owner;
    uint256 public currentId;
    mapping (uint256 => string) sectors;
    mapping (uint256 => uint256) capacities;

    constructor(string memory _uri, string[] memory _sectors, uint256[] memory _capacity) ERC1155(_uri) {
        owner = msg.sender;
        currentId = 0;
        for (uint256 i = 0; i < _sectors.length; i++) {
            sectors[i] = _sectors[i];
            capacities[i] = _capacity[i];
        }
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data) public {
        require(msg.sender == owner, "Only owner can mint");
        _mint(account, id, amount, data);
    }

    function authenticate(address sender, uint256 sector) public view returns (bool) {
        return balanceOf(sender, sector) > 0;
    }
}
