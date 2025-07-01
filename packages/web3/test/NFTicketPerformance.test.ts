import { expect } from "chai";
import { ethers } from "hardhat";
import { NFTicket721, NFTicket1155 } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("NFTicket Performance Tests", function () {
  let nft721: NFTicket721;
  let nft1155: NFTicket1155;
  let owner: SignerWithAddress;
  let users: SignerWithAddress[];
  
  // Increased capacity for performance tests
  const sectors = ["VIP", "General"];
  const capacities = [5000n, 10000n]; // Increased capacities
  const maxMintPerTx = 50;
  const emptyInitData = "0x";

  // Test configuration
  const BATCH_SIZES = [1, 10, 25, 50];
  const NUM_ITERATIONS = 5;
  const LOAD_TEST_USERS = 100;

  beforeEach(async function () {
    [owner, ...users] = await ethers.getSigners();

    // Ensure we have enough users for testing
    if (users.length < LOAD_TEST_USERS) {
      throw new Error(`Not enough signers. Need ${LOAD_TEST_USERS + 1}, have ${users.length + 1}`);
    }

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

  describe("Gas Cost Analysis", function () {
    it("Should measure deployment costs", async function () {
      const NFTicket721Factory = await ethers.getContractFactory("NFTicket721");
      const NFTicket1155Factory = await ethers.getContractFactory("NFTicket1155");

      const tx721 = await NFTicket721Factory.getDeployTransaction(
        "Event Tickets",
        "TCKT",
        sectors,
        capacities,
        maxMintPerTx
      );
      const tx1155 = await NFTicket1155Factory.getDeployTransaction(
        "ipfs://baseuri/",
        sectors,
        capacities,
        maxMintPerTx
      );

      const gas721 = await ethers.provider.estimateGas(tx721);
      const gas1155 = await ethers.provider.estimateGas(tx1155);

      console.log("\nDeployment Gas Costs:");
      console.log("ERC721:", gas721.toString());
      console.log("ERC1155:", gas1155.toString());
    });

    it("Should measure minting costs for different batch sizes", async function () {
      console.log("\nMinting Gas Costs:");
      
      for (const batchSize of BATCH_SIZES) {
        // Deploy fresh contracts for each batch size to avoid capacity issues
        const NFTicket721Factory = await ethers.getContractFactory("NFTicket721");
        const nft721Test = await NFTicket721Factory.deploy(
          "Event Tickets",
          "TCKT",
          sectors,
          capacities,
          maxMintPerTx
        ) as unknown as NFTicket721;

        const NFTicket1155Factory = await ethers.getContractFactory("NFTicket1155");
        const nft1155Test = await NFTicket1155Factory.deploy(
          "ipfs://baseuri/",
          sectors,
          capacities,
          maxMintPerTx
        ) as unknown as NFTicket1155;

        await nft721Test.waitForDeployment();
        await nft1155Test.waitForDeployment();

        const sectorIds = Array(batchSize).fill(0);
        const metadataURIs = Array(batchSize).fill("ipfs://metadata/");
        let totalGas721 = 0n;
        let totalGas1155 = 0n;

        for (let i = 0; i < NUM_ITERATIONS; i++) {
          // ERC721 batch mint
          const tx721 = await nft721Test.batchMint(users[0].address, sectorIds, metadataURIs);
          const receipt721 = await tx721.wait();
          totalGas721 += receipt721!.gasUsed;

          // ERC1155 batch mint
          const amounts = Array(batchSize).fill(1);
          const tx1155 = await nft1155Test["batchMint(address,uint256[],uint256[],string[],uint256[],bytes[])"](
            users[0].address,
            sectorIds,
            amounts,
            metadataURIs,
            Array(batchSize).fill(1), // Use default strategy
            Array(batchSize).fill(emptyInitData)
          );
          const receipt1155 = await tx1155.wait();
          totalGas1155 += receipt1155!.gasUsed;
        }

        console.log(`\nBatch Size: ${batchSize}`);
        console.log("ERC721 Average:", (totalGas721 / BigInt(NUM_ITERATIONS)).toString());
        console.log("ERC1155 Average:", (totalGas1155 / BigInt(NUM_ITERATIONS)).toString());
      }
    });

    it("Should measure transfer costs", async function () {
      console.log("\nTransfer Gas Costs:");
      
      // Mint tokens with default strategy (ID: 1)
      await nft721["mint(address,uint256,string,uint256,bytes)"](
        users[0].address,
        0,
        "ipfs://metadata/",
        1,
        emptyInitData
      );

      await nft1155["batchMint(address,uint256[],uint256[],string[],uint256[],bytes[])"](
        users[0].address,
        [0],
        [5], // mint 5 tokens
        ["ipfs://metadata/"],
        [1], // Use default strategy
        [emptyInitData]
      );

      let totalGas721 = 0n;
      let totalGas1155 = 0n;

      for (let i = 0; i < NUM_ITERATIONS; i++) {
        // ERC721 transfer
        const tx721 = await nft721.connect(users[0]).transferWithStrategy(
          users[0].address,
          users[1].address,
          0
        );
        const receipt721 = await tx721.wait();
        totalGas721 += receipt721!.gasUsed;

        // Transfer back to user[0] for next iteration
        await nft721.connect(users[1]).transferWithStrategy(
          users[1].address,
          users[0].address,
          0
        );

        // ERC1155 transfer
        const tx1155 = await nft1155.connect(users[0]).transferWithStrategy(
          users[0].address,
          users[1].address,
          0,
          1,
          emptyInitData
        );
        const receipt1155 = await tx1155.wait();
        totalGas1155 += receipt1155!.gasUsed;

        // Transfer back to user[0] for next iteration
        await nft1155.connect(users[1]).transferWithStrategy(
          users[1].address,
          users[0].address,
          0,
          1,
          emptyInitData
        );
      }

      console.log("ERC721 Average:", (totalGas721 / BigInt(NUM_ITERATIONS)).toString());
      console.log("ERC1155 Average:", (totalGas1155 / BigInt(NUM_ITERATIONS)).toString());
    });
  });

  describe("Load Testing", function () {
    it("Should handle concurrent minting operations", async function () {
      console.log("\nConcurrent Minting Performance:");
      
      const startTime = Date.now();
      
      // Create concurrent mint operations with default strategy
      const mintPromises721 = users.slice(0, LOAD_TEST_USERS).map((user, index) => 
        nft721["mint(address,uint256,string,uint256,bytes)"](
          user.address,
          0,
          `ipfs://metadata/${index}`,
          1,
          emptyInitData
        )
      );

      const mintPromises1155 = users.slice(0, LOAD_TEST_USERS).map((user, index) => 
        nft1155["batchMint(address,uint256[],uint256[],string[],uint256[],bytes[])"](
          user.address,
          [0],
          [1],
          [`ipfs://metadata/${index}`],
          [1],
          [emptyInitData]
        )
      );

      // Execute all mints
      await Promise.all([...mintPromises721, ...mintPromises1155]);
      
      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000;
      
      console.log(`Total time for ${LOAD_TEST_USERS * 2} concurrent mints: ${duration}s`);
      console.log(`Average time per mint: ${duration / (LOAD_TEST_USERS * 2)}s`);
    });

    it("Should measure authentication performance", async function () {
      console.log("\nAuthentication Performance:");
      
      // Mint tokens with default strategy
      for (let i = 0; i < LOAD_TEST_USERS; i++) {
        await nft721["mint(address,uint256,string,uint256,bytes)"](
          users[i].address,
          0,
          `ipfs://metadata/${i}`,
          1,
          emptyInitData
        );

        await nft1155["batchMint(address,uint256[],uint256[],string[],uint256[],bytes[])"](
          users[i].address,
          [0],
          [1],
          [`ipfs://metadata/${i}`],
          [1],
          [emptyInitData]
        );
      }

      const startTime = Date.now();
      
      // Create concurrent authentication operations
      const authPromises721 = users.slice(0, LOAD_TEST_USERS).map((user, index) => 
        nft721.authenticate(user.address, BigInt(index))
      );

      const authPromises1155 = users.slice(0, LOAD_TEST_USERS).map((user, index) => 
        nft1155.authenticate(user.address, BigInt(index))
      );

      // Execute all authentications
      await Promise.all([...authPromises721, ...authPromises1155]);
      
      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000;
      
      console.log(`Total time for ${LOAD_TEST_USERS * 2} concurrent authentications: ${duration}s`);
      console.log(`Average time per authentication: ${duration / (LOAD_TEST_USERS * 2)}s`);
    });
  });

  describe("Usability Metrics", function () {
    it("Should evaluate transaction success rates", async function () {
      console.log("\nTransaction Success Rates:");
      
      let success721 = 0;
      let success1155 = 0;
      const totalAttempts = LOAD_TEST_USERS;

      for (let i = 0; i < totalAttempts; i++) {
        try {
          await nft721["mint(address,uint256,string,uint256,bytes)"](
            users[i].address,
            0,
            `ipfs://metadata/${i}`,
            1,
            emptyInitData
          );
          success721++;
        } catch {}

        try {
          await nft1155["batchMint(address,uint256[],uint256[],string[],uint256[],bytes[])"](
            users[i].address,
            [0],
            [1],
            [`ipfs://metadata/${i}`],
            [1],
            [emptyInitData]
          );
          success1155++;
        } catch {}
      }

      console.log("ERC721 Success Rate:", (success721 / totalAttempts * 100).toFixed(2) + "%");
      console.log("ERC1155 Success Rate:", (success1155 / totalAttempts * 100).toFixed(2) + "%");
    });

    it("Should measure error handling robustness", async function () {
      console.log("\nError Handling Tests:");
      
      // Test invalid operations
      const invalidTests = [
        {
          name: "Mint to zero address",
          test: async () => {
            await nft721["mint(address,uint256,string,uint256,bytes)"](
              ethers.ZeroAddress,
              0,
              "ipfs://metadata/",
              1,
              emptyInitData
            );
            await nft1155["batchMint(address,uint256[],uint256[],string[],uint256[],bytes[])"](
              ethers.ZeroAddress,
              [0],
              [1],
              ["ipfs://metadata/"],
              [1],
              [emptyInitData]
            );
          }
        },
        {
          name: "Mint with invalid sector",
          test: async () => {
            await nft721["mint(address,uint256,string,uint256,bytes)"](
              users[0].address,
              999,
              "ipfs://metadata/",
              1,
              emptyInitData
            );
            await nft1155["batchMint(address,uint256[],uint256[],string[],uint256[],bytes[])"](
              users[0].address,
              [999],
              [1],
              ["ipfs://metadata/"],
              [1],
              [emptyInitData]
            );
          }
        },
        {
          name: "Transfer non-existent token",
          test: async () => {
            await nft721.transferWithStrategy(users[0].address, users[1].address, 9999);
            await nft1155.transferWithStrategy(users[0].address, users[1].address, 9999, 1, emptyInitData);
          }
        }
      ];

      for (const test of invalidTests) {
        try {
          await test.test();
          console.log(`${test.name}: Failed (Did not throw error)`);
        } catch (error) {
          console.log(`${test.name}: Passed (Error caught successfully)`);
        }
      }
    });
  });
}); 