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
    address private immutable owner;

    constructor(address[] memory _fallbackAddresses) {
        owner = msg.sender;
        fallbackAddresses = _fallbackAddresses;
    }

    function initialize(bytes memory data) external {
        require(msg.sender == owner, "Only owner");
        fallbackAddresses = abi.decode(data, (address[]));
    }

    function canTransfer(
        address,
        address to,
        uint256,
        uint256
    ) external view override returns (bool) {
        uint256 len = fallbackAddresses.length;
        for (uint256 i = 0; i < len; i++) {
            if (fallbackAddresses[i] == to) return true;
        }
        return false;
    }
} 