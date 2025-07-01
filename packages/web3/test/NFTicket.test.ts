import { expect } from "chai";
import { ethers } from "hardhat";
import { NFTicket721, NFTicket1155, FallbackTransferStrategy } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("NFTicket Transfer Strategies", function () {
  let nft721: NFTicket721;
  let nft1155: NFTicket1155;
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  let fallbackAddress1: SignerWithAddress;
  let fallbackAddress2: SignerWithAddress;

  const sectors = ["VIP", "General"];
  const capacities = [100n, 1000n];
  const maxMintPerTx = 50;
  const emptyInitData = "0x";

  beforeEach(async function () {
    [owner, user1, user2, fallbackAddress1, fallbackAddress2] = await ethers.getSigners();

    // Deploy NFT contracts
    const NFTicket721Factory = await ethers.getContractFactory("NFTicket721");
    nft721 = await NFTicket721Factory.deploy(
      "Event Tickets",
      "TCKT",
      sectors,
      capacities,
      maxMintPerTx
    ) as unknown as NFTicket721;

    const NFTicket1155Factory = await ethers.getContractFactory("NFTicket1155");
    nft1155 = await NFTicket1155Factory.deploy(
      "ipfs://baseuri/",
      sectors,
      capacities,
      maxMintPerTx
    ) as unknown as NFTicket1155;

    await nft721.waitForDeployment();
    await nft1155.waitForDeployment();
  });

  describe("NormalTransferStrategy", function () {
    const NORMAL_STRATEGY_ID = 1n; // Default strategy ID from constructor

    describe("ERC721 with NormalTransferStrategy", function () {
      it("should allow transfers between any addresses", async function () {
        // Mint token with normal strategy
        await nft721["mint(address,uint256,string,uint256,bytes)"](
          user1.address,
          0, // VIP sector
          "ipfs://metadata/1",
          NORMAL_STRATEGY_ID,
          emptyInitData
        );

        // Transfer from user1 to user2 (should succeed)
        await nft721.connect(user1).transferWithStrategy(
          user1.address,
          user2.address,
          0
        );
        expect(await nft721.ownerOf(0)).to.equal(user2.address);

        // Transfer back to user1 (should also succeed)
        await nft721.connect(user2).transferWithStrategy(
          user2.address,
          user1.address,
          0
        );
        expect(await nft721.ownerOf(0)).to.equal(user1.address);
      });

      it("should work with batch transfers", async function () {
        // Mint multiple tokens
        await nft721["mint(address,uint256,string,uint256,bytes)"](
          user1.address,
          0, // VIP sector
          "ipfs://metadata/1",
          NORMAL_STRATEGY_ID,
          emptyInitData
        );

        await nft721["mint(address,uint256,string,uint256,bytes)"](
          user1.address,
          0, // VIP sector
          "ipfs://metadata/2",
          NORMAL_STRATEGY_ID,
          emptyInitData
        );

        // Batch transfer from user1 to user2
        await nft721.connect(user1).batchTransferWithStrategy(
          user1.address,
          user2.address,
          [0, 1]
        );

        expect(await nft721.ownerOf(0)).to.equal(user2.address);
        expect(await nft721.ownerOf(1)).to.equal(user2.address);
      });
    });

    describe("ERC1155 with NormalTransferStrategy", function () {
      it("should allow transfers between any addresses", async function () {
        const amount = 5;
        // Mint tokens with normal strategy
        await nft1155["batchMint(address,uint256[],uint256[],string[],uint256[],bytes[])"](
          user1.address,
          [0], // VIP sector
          [amount],
          ["ipfs://metadata/1"],
          [NORMAL_STRATEGY_ID],
          [emptyInitData]
        );

        // Transfer from user1 to user2
        await nft1155.connect(user1).transferWithStrategy(
          user1.address,
          user2.address,
          0,
          2, // transfer 2 tokens
          "0x"
        );

        expect(await nft1155.balanceOf(user2.address, 0)).to.equal(2n);
        expect(await nft1155.balanceOf(user1.address, 0)).to.equal(3n);
      });
    });
  });

  describe("NonTransferableStrategy", function () {
    const NON_TRANSFERABLE_STRATEGY_ID = 2n; // Second default strategy from constructor

    describe("ERC721 with NonTransferableStrategy", function () {
      it("should not allow any transfers", async function () {
        // Mint token with non-transferable strategy
        await nft721["mint(address,uint256,string,uint256,bytes)"](
          user1.address,
          0, // VIP sector
          "ipfs://metadata/1",
          NON_TRANSFERABLE_STRATEGY_ID,
          emptyInitData
        );

        // Try transferring from user1 to user2 (should fail)
        await expect(
          nft721.connect(user1).transferWithStrategy(
            user1.address,
            user2.address,
            0
          )
        ).to.be.revertedWith("Transfer not allowed by strategy");

        // Verify token is still owned by user1
        expect(await nft721.ownerOf(0)).to.equal(user1.address);
      });

      it("should not allow batch transfers", async function () {
        // Mint multiple tokens with non-transferable strategy
        await nft721["mint(address,uint256,string,uint256,bytes)"](
          user1.address,
          0, // VIP sector
          "ipfs://metadata/1",
          NON_TRANSFERABLE_STRATEGY_ID,
          emptyInitData
        );

        await nft721["mint(address,uint256,string,uint256,bytes)"](
          user1.address,
          0, // VIP sector
          "ipfs://metadata/2",
          NON_TRANSFERABLE_STRATEGY_ID,
          emptyInitData
        );

        // Try batch transfer (should fail)
        await expect(
          nft721.connect(user1).batchTransferWithStrategy(
            user1.address,
            user2.address,
            [0, 1]
          )
        ).to.be.revertedWith("Transfer not allowed by strategy");

        // Verify tokens are still owned by user1
        expect(await nft721.ownerOf(0)).to.equal(user1.address);
        expect(await nft721.ownerOf(1)).to.equal(user1.address);
      });

      it("should not allow standard ERC721 transfers", async function () {
        // Mint token with non-transferable strategy
        await nft721["mint(address,uint256,string,uint256,bytes)"](
          user1.address,
          0,
          "ipfs://metadata/1",
          NON_TRANSFERABLE_STRATEGY_ID,
          emptyInitData
        );

        // Try using standard transferFrom (should fail)
        await expect(
          nft721.connect(user1).transferFrom(
            user1.address,
            user2.address,
            0
          )
        ).to.be.revertedWith("Transfer not allowed by strategy");

        // Try using standard safeTransferFrom (should fail)
        await expect(
          nft721.connect(user1)["safeTransferFrom(address,address,uint256)"](
            user1.address,
            user2.address,
            0
          )
        ).to.be.revertedWith("Transfer not allowed by strategy");
      });
    });

    describe("ERC1155 with NonTransferableStrategy", function () {
      it("should not allow any transfers", async function () {
        // Mint tokens with non-transferable strategy
        await nft1155["batchMint(address,uint256[],uint256[],string[],uint256[],bytes[])"](
          user1.address,
          [0], // VIP sector
          [5], // amount
          ["ipfs://metadata/1"],
          [NON_TRANSFERABLE_STRATEGY_ID],
          [emptyInitData]
        );

        // Try transferring (should fail)
        await expect(
          nft1155.connect(user1).transferWithStrategy(
            user1.address,
            user2.address,
            0,
            2,
            "0x"
          )
        ).to.be.revertedWith("Transfer not allowed by strategy");

        // Verify balances haven't changed
        expect(await nft1155.balanceOf(user1.address, 0)).to.equal(5n);
        expect(await nft1155.balanceOf(user2.address, 0)).to.equal(0n);
      });

      it("should not allow batch transfers", async function () {
        // Mint multiple tokens with non-transferable strategy
        await nft1155["batchMint(address,uint256[],uint256[],string[],uint256[],bytes[])"](
          user1.address,
          [0, 0], // VIP sector
          [5, 3], // amounts
          ["ipfs://metadata/1", "ipfs://metadata/2"],
          [NON_TRANSFERABLE_STRATEGY_ID, NON_TRANSFERABLE_STRATEGY_ID],
          [emptyInitData, emptyInitData]
        );

        // Try batch transfer (should fail)
        await expect(
          nft1155.connect(user1).batchTransferWithStrategy(
            user1.address,
            user2.address,
            [0, 1],
            [2, 1],
            "0x"
          )
        ).to.be.revertedWith("Transfer not allowed by strategy");

        // Verify balances haven't changed
        expect(await nft1155.balanceOf(user1.address, 0)).to.equal(5n);
        expect(await nft1155.balanceOf(user1.address, 1)).to.equal(3n);
        expect(await nft1155.balanceOf(user2.address, 0)).to.equal(0n);
        expect(await nft1155.balanceOf(user2.address, 1)).to.equal(0n);
      });
    });
  });

  describe("FallbackTransferStrategy", function () {
    let fallbackStrategy: FallbackTransferStrategy;
    let fallbackStrategyId: bigint;
    let fallbackAddresses: string[];

    beforeEach(async function () {
      // Deploy FallbackTransferStrategy
      const FallbackTransferStrategyFactory = await ethers.getContractFactory("FallbackTransferStrategy");
      fallbackStrategy = await FallbackTransferStrategyFactory.deploy() as unknown as FallbackTransferStrategy;
      await fallbackStrategy.waitForDeployment();

      fallbackAddresses = [fallbackAddress1.address, fallbackAddress2.address];
      
      // Register strategy with both contracts
      await nft721.registerStrategy(await fallbackStrategy.getAddress());
      await nft1155.registerStrategy(await fallbackStrategy.getAddress());
      
      // Strategy ID should be 3 since we already have 2 default strategies
      fallbackStrategyId = 3n;
    });

    describe("ERC721 with FallbackTransferStrategy", function () {
      beforeEach(async function () {
        // Mint token with strategy
        const initData = ethers.AbiCoder.defaultAbiCoder().encode(
          ["address[]"],
          [fallbackAddresses]
        );

        await nft721["mint(address,uint256,string,uint256,bytes)"](
          user1.address,
          0,
          "ipfs://metadata/",
          fallbackStrategyId,
          initData
        );
      });

      it("should only allow transfers to fallback addresses", async function () {
        // Transfer to first fallback address should succeed
        await nft721.connect(user1).transferWithStrategy(
          user1.address,
          fallbackAddresses[0],
          0
        );

        // Transfer from fallback address to another address should fail
        await nft721.connect(fallbackAddress1).approve(user2.address, 0);
        await expect(
          nft721.connect(user2).transferWithStrategy(
            fallbackAddresses[0],
            user2.address,
            0
          )
        ).to.be.revertedWith("Transfer not allowed by strategy");
      });

      it("should handle batch transfers correctly", async function () {
        // Mint multiple tokens
        const initData = ethers.AbiCoder.defaultAbiCoder().encode(
          ["address[]"],
          [fallbackAddresses]
        );

        await nft721["batchMint(address,uint256[],string[],uint256[],bytes[])"](
          user1.address,
          [0, 0],
          ["ipfs://metadata/1", "ipfs://metadata/2"],
          [fallbackStrategyId, fallbackStrategyId],
          [initData, initData]
        );

        // Transfer tokens one by one to fallback address
        await nft721.connect(user1).transferWithStrategy(
          user1.address,
          fallbackAddresses[0],
          1
        );
        await nft721.connect(user1).transferWithStrategy(
          user1.address,
          fallbackAddresses[0],
          2
        );

        // Verify ownership
        expect(await nft721.ownerOf(1)).to.equal(fallbackAddresses[0]);
        expect(await nft721.ownerOf(2)).to.equal(fallbackAddresses[0]);

        // Transfer from fallback address should fail
        await nft721.connect(fallbackAddress1).approve(user2.address, 1);
        await expect(
          nft721.connect(user2).transferWithStrategy(
            fallbackAddresses[0],
            user2.address,
            1
          )
        ).to.be.revertedWith("Transfer not allowed by strategy");
      });
    });

    describe("ERC1155 with FallbackTransferStrategy", function () {
      beforeEach(async function () {
        // Mint tokens with strategy
        const initData = ethers.AbiCoder.defaultAbiCoder().encode(
          ["address[]"],
          [fallbackAddresses]
        );

        await nft1155["batchMint(address,uint256[],uint256[],string[],uint256[],bytes[])"](
          user1.address,
          [0],
          [5], // mint 5 tokens
          ["ipfs://metadata/"],
          [fallbackStrategyId],
          [initData]
        );
      });

      it("should handle batch transfers correctly", async function () {
        // Mint additional tokens with strategy
        const initData = ethers.AbiCoder.defaultAbiCoder().encode(
          ["address[]"],
          [fallbackAddresses]
        );

        // Mint tokens in different sectors to avoid capacity issues
        await nft1155["batchMint(address,uint256[],uint256[],string[],uint256[],bytes[])"](
          user1.address,
          [1], // Use General sector
          [2], // mint 2 tokens
          ["ipfs://metadata/1"],
          [fallbackStrategyId],
          [initData]
        );

        // Batch transfer to fallback address should succeed
        await nft1155.connect(user1).batchTransferWithStrategy(
          user1.address,
          fallbackAddresses[0],
          [0, 1], // Transfer from both sectors
          [1, 1], // Transfer 1 token from each
          "0x"
        );

        // Verify balances
        expect(await nft1155.balanceOf(fallbackAddresses[0], 0)).to.equal(1);
        expect(await nft1155.balanceOf(fallbackAddresses[0], 1)).to.equal(1);
        expect(await nft1155.balanceOf(user1.address, 0)).to.equal(4); // Should have 4 tokens left
        expect(await nft1155.balanceOf(user1.address, 1)).to.equal(1); // Should have 1 token left

        // Batch transfer from fallback address should fail
        await nft1155.connect(fallbackAddress1).setApprovalForAll(user2.address, true);
        await expect(
          nft1155.connect(user2).batchTransferWithStrategy(
            fallbackAddresses[0],
            user2.address,
            [0, 1],
            [1, 1],
            "0x"
          )
        ).to.be.revertedWith("Transfer not allowed by strategy");
      });
    });
  });

  describe("NFTicket Performance Tests", function () {
    // ... existing code ...
  });
}); 