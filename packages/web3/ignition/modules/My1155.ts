import { ethers } from 'hardhat';

const main = async () => {
  // Deploy the NFTicket1155 contract
  const NFTicket1155 = await ethers.getContractFactory('NFTicket1155');
  
  // Contract deployment parameters
  const baseURI = 'ipfs://bafkreict6kqmy5jlhg6zekrwfpweore44k2qhvxtdvo7nlhpiqccbimaba/';
  const sectors = ['VIP', 'General', 'Backstage'];
  const capacities = [100, 500, 50];
  
  console.log('Deploying NFTicket1155 contract...');
  const nfTicketContract = await NFTicket1155.deploy(baseURI, sectors, capacities);
  await nfTicketContract.waitForDeployment();
  
  const address = await nfTicketContract.getAddress();
  console.log('NFTicket1155 deployed to:', address);
  
  // Mint some tokens
  console.log('Minting tokens...');
  
  // Get deployer address (owner)
  const [owner] = await ethers.getSigners();
  
  // Mint 5 VIP tickets (sector 0) to the owner
  const vipSectorId = 0; // VIP sector
  const vipAmount = 5;
  const vipMetadataURI = `ipfs://bafkreict6kqmy5jlhg6zekrwfpweore44k2qhvxtdvo7nlhpiqccbimaba`; // Individual token metadata
  const data = ethers.toUtf8Bytes(''); // Empty data
  
  const vipMintTx = await nfTicketContract.mint(
    owner.address,
    vipSectorId,
    vipAmount,
    vipMetadataURI,
    data
  );
  
  await vipMintTx.wait();
  console.log(`Minted ${vipAmount} tokens in sector ${sectors[vipSectorId]} to ${owner.address}`);
  
  // Mint 10 General tickets (sector 1) to the owner
  const generalSectorId = 1; // General sector
  const generalAmount = 10;
  const generalMetadataURI = `ipfs://bafkreiccparztqw5li6osq6ikcvllijutaoaiih6lmthiabnwnkgy66mnq`; // Using another metadata URI for simplicity
  
  const generalMintTx = await nfTicketContract.mint(
    owner.address,
    generalSectorId,
    generalAmount,
    generalMetadataURI,
    data
  );
  
  await generalMintTx.wait();
  console.log(`Minted ${generalAmount} tokens in sector ${sectors[generalSectorId]} to ${owner.address}`);
  
  // Check balances after minting
  const vipBalance = await nfTicketContract.balanceOf(owner.address, vipSectorId);
  console.log(`Balance of ${owner.address} for sector ${sectors[vipSectorId]}: ${vipBalance}`);
  
  const generalBalance = await nfTicketContract.balanceOf(owner.address, generalSectorId);
  console.log(`Balance of ${owner.address} for sector ${sectors[generalSectorId]}: ${generalBalance}`);
  
  // Verify authentication for both sectors
  const isAuthenticatedVip = await nfTicketContract.authenticate(owner.address, vipSectorId);
  console.log(`Is authenticated for sector ${sectors[vipSectorId]}: ${isAuthenticatedVip}`);
  
  const isAuthenticatedGeneral = await nfTicketContract.authenticate(owner.address, generalSectorId);
  console.log(`Is authenticated for sector ${sectors[generalSectorId]}: ${isAuthenticatedGeneral}`);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
