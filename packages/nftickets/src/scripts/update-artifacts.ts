import * as fs from 'fs';
import * as path from 'path';

// Paths
const artifactsDir = path.resolve(__dirname, '../../../../packages/web3/artifacts/contracts');
const constantsPath = path.resolve(__dirname, '../modules/nft/utils/constants.ts');

try {
  // Get all contract directories
  const contractDirs = fs.readdirSync(artifactsDir);
  let allArtifactsCode = '';
  const processedContracts = new Map(); // Map of contractName -> artifactCode

  // Process each contract
  for (const contractDir of contractDirs) {
    const contractDirPath = path.join(artifactsDir, contractDir);

    // Skip if not a directory
    if (!fs.statSync(contractDirPath).isDirectory()) continue;

    // Get JSON artifact file
    const files = fs.readdirSync(contractDirPath);
    const jsonFile = files.find((file) => file.endsWith('.json') && !file.endsWith('.dbg.json'));

    if (!jsonFile) continue;

    const artifactPath = path.join(contractDirPath, jsonFile);
    console.log(`Reading artifact from: ${artifactPath}`);

    // Extract contract name from directory name (remove .sol extension)
    const contractName = contractDir.replace('.sol', '');

    // Skip if already processed (to avoid duplicates)
    if (processedContracts.has(contractName)) continue;

    // Read and parse the artifact
    const artifactContent = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));

    // Format the artifact for the constants file
    const artifactCode = `export const ${contractName}Artifact = ${JSON.stringify(artifactContent, null, 2)};\n\n`;

    // Save to the map
    processedContracts.set(contractName, artifactCode);

    // Add to the combined code
    allArtifactsCode += artifactCode;
  }

  let finalContent = '';

  // Check if constants.ts exists
  if (fs.existsSync(constantsPath)) {
    // Read existing content
    const constantsContent = fs.readFileSync(constantsPath, 'utf8');
    let updatedContent = constantsContent;

    // Replace existing artifacts
    for (const [contractName, artifactCode] of processedContracts.entries()) {
      const regex = new RegExp(`export const ${contractName}Artifact = \\{[\\s\\S]*?\\};`, 'g');

      if (constantsContent.includes(`export const ${contractName}Artifact =`)) {
        // Replace the existing artifact with the new one
        updatedContent = updatedContent.replace(regex, artifactCode.trim());
        console.log(`Updated ${contractName}Artifact in constants.ts`);
      } else {
        // This is a new artifact to append
        updatedContent += artifactCode;
        console.log(`Appended ${contractName}Artifact to constants.ts`);
      }
    }

    finalContent = updatedContent;
  } else {
    // Create a new constants.ts file with all artifacts
    finalContent = allArtifactsCode;
    console.log(`Created constants.ts with ${processedContracts.size} artifacts`);
  }

  // Create the directory if it doesn't exist
  fs.mkdirSync(path.dirname(constantsPath), { recursive: true });

  // Write the updated content to constants.ts
  fs.writeFileSync(constantsPath, finalContent);
  console.log(`Successfully processed ${processedContracts.size} contracts`);
} catch (error) {
  console.error('Error updating artifacts:', error);
}
