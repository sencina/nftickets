// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface ITransferStrategy {
    function canTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 amount
    ) external view returns (bool);

    function initialize(bytes memory data) external;
}

contract NormalTransferStrategy is ITransferStrategy {
    function initialize(bytes memory) external pure {
        return; // No initialization needed
    }

    function canTransfer(
        address,
        address,
        uint256,
        uint256
    ) external pure override returns (bool) {
        return true;
    }
}

contract NonTransferableStrategy is ITransferStrategy {
    function initialize(bytes memory) external pure {
        return; // No initialization needed
    }

    function canTransfer(
        address,
        address,
        uint256,
        uint256
    ) external pure override returns (bool) {
        return false;
    }
}

contract FallbackTransferStrategy is ITransferStrategy {
    address[] private fallbackAddresses;

    constructor() {
        // Empty constructor
    }

    function initialize(bytes memory data) external override {
        require(data.length > 0, "Invalid initialization data");
        fallbackAddresses = abi.decode(data, (address[]));
        require(fallbackAddresses.length > 0, "No fallback addresses provided");
        
        // Validate addresses
        for(uint i = 0; i < fallbackAddresses.length; i++) {
            require(fallbackAddresses[i] != address(0), "Invalid fallback address");
        }
    }

    function canTransfer(
        address from,
        address to,
        uint256,
        uint256
    ) external view override returns (bool) {
        require(fallbackAddresses.length > 0, "Strategy not initialized");
        
        // If transferring from a non-fallback address, only allow transfer to fallback addresses
        bool fromIsFallback = false;
        bool toIsFallback = false;
        
        for (uint256 i = 0; i < fallbackAddresses.length; i++) {
            if (fallbackAddresses[i] == from) fromIsFallback = true;
            if (fallbackAddresses[i] == to) toIsFallback = true;
        }
        
        // Only allow transfers TO fallback addresses if coming from a non-fallback address
        // Disallow transfers FROM fallback addresses completely
        return !fromIsFallback && toIsFallback;
    }
} 