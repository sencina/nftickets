import { TatumSDK, Network, Polygon } from '@tatumio/tatum';
import { readFileSync } from 'fs';
import { TATUM_API_KEY } from '../../env';
import path from 'path';

const main = async () => {
  const tatumClient = await TatumSDK.init<Polygon>({
    network: Network.POLYGON,
    verbose: true,
    apiKey: {
      v4: TATUM_API_KEY,
    },
  });
  //TODO: filepath to the image generated by the library
  const filePath = path.resolve(__dirname, '../../assets/ms.jpg');

  const buffer = readFileSync(filePath);

  const result = await tatumClient.ipfs.uploadFile({ file: buffer });
  const imageHash = result.data.ipfsHash;

  const metadata = {
    name: 'Yo',
    description: 'Yo',
    image: `ipfs://${imageHash}`,
  };

  const nftBuffer = Buffer.from(JSON.stringify(metadata), 'utf-8');

  const metadataResult = await tatumClient.ipfs.uploadFile({ file: nftBuffer });
  const metadataHash = metadataResult.data.ipfsHash;

  await tatumClient.destroy();

  return { metadataHash, imageHash };
};

main()
  .then(({ metadataHash }) => {
    console.log('Metadata Hash:', metadataHash);

    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
