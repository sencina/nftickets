# NFTicket Performance Test Report

    Gas Cost Analysis
Deployment Gas Costs:
ERC721: 3184408
ERC1155: 3340409
      ✔ Should measure deployment costs
Minting Gas Costs:
Batch Size: 1
ERC721 Average: 212242
ERC1155 Average: 214003
Batch Size: 10
ERC721 Average: 1527908
ERC1155 Average: 1516167
Batch Size: 25
ERC721 Average: 3720733
ERC1155 Average: 3684192
Batch Size: 50
ERC721 Average: 7375328
ERC1155 Average: 7297732
      ✔ Should measure minting costs for different batch sizes (422ms)
Transfer Gas Costs:
ERC721 Average: 65466
ERC1155 Average: 67417
      ✔ Should measure transfer costs
    Load Testing
Concurrent Minting Performance:
Total time for 200 concurrent mints: 0.311s
Average time per mint: 0.001555s
      ✔ Should handle concurrent minting operations (311ms)
Authentication Performance:
Total time for 200 concurrent authentications: 0.167s
Average time per authentication: 0.000835s
      ✔ Should measure authentication performance (506ms)
    Usability Metrics
Transaction Success Rates:
ERC721 Success Rate: 100.00%
ERC1155 Success Rate: 100.00%
      ✔ Should evaluate transaction success rates (312ms)
Error Handling Tests:
Mint to zero address: Passed (Error caught successfully)
Mint with invalid sector: Passed (Error caught successfully)
Transfer non-existent token: Passed (Error caught successfully)
      ✔ Should measure error handling robustness
  7 passing (4s)