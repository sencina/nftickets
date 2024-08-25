// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721 {
    address public owner;
    constructor() ERC721("Santi", "SANTI") {
        owner = msg.sender;
    }
}
