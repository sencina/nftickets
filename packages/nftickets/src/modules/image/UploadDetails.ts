import { TatumSDK, Network, Polygon } from '@tatumio/tatum';
import { TATUM_API_KEY } from '../../env';

export const uplaodMetadata = async (metadata: Record<string, string>, imageBuffer: Buffer) => {
  const tatumClient = await TatumSDK.init<Polygon>({
    network: Network.POLYGON,
    verbose: true,
    apiKey: {
      v4: TATUM_API_KEY,
    },
  });

  const imageHash = await uploadFile(imageBuffer, tatumClient);

  const metadataToUpload = { ...metadata, image: `ipfs://${imageHash}` };

  const nftBuffer = Buffer.from(JSON.stringify(metadataToUpload), 'utf-8');

  const metadataHash = await uploadFile(nftBuffer, tatumClient);

  await tatumClient.destroy();

  return { metadataHash };
};

const uploadFile = async (buffer: Buffer, tatumClient: Polygon) => {
  const result = await tatumClient.ipfs.uploadFile({ file: buffer });
  const fileHash = result.data.ipfsHash;
  return fileHash;
};
