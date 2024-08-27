// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";

contract My1155 is ERC1155URIStorage {
    address public owner;

    constructor(string memory uri) ERC1155("") {
        owner = msg.sender;
        _mint(owner, 1, 1, ""); // Minting 1 token of ID 1 to the owner
        _setURI(1, uri);
    }
}
