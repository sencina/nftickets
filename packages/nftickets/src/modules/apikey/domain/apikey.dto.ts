import { IsString, IsNotEmpty, IsEthereumAddress, Length } from 'class-validator';

/**
 * DTO for generating an API key
 */
export class GenerateApiKeyDto {
  @IsNotEmpty({ message: 'Wallet address is required' })
  @IsEthereumAddress({ message: 'Invalid Ethereum wallet address' })
  walletAddress!: string;

  @IsNotEmpty({ message: 'Signature is required' })
  @IsString({ message: 'Signature must be a string' })
  signature!: string;

  @IsNotEmpty({ message: 'Message is required' })
  @IsString({ message: 'Message must be a string' })
  message!: string;
}

/**
 * DTO for validating an API key
 */
export class ValidateApiKeyDto {
  @IsNotEmpty({ message: 'API key is required' })
  @IsString({ message: 'API key must be a string' })
  apiKey!: string;
}

/**
 * DTO for revoking an API key
 */
export class RevokeApiKeyDto {
  @IsNotEmpty({ message: 'API key is required' })
  @IsString({ message: 'API key must be a string' })
  apiKey!: string;

  @IsNotEmpty({ message: 'Wallet address is required' })
  @IsEthereumAddress({ message: 'Invalid Ethereum wallet address' })
  walletAddress!: string;

  @IsNotEmpty({ message: 'Signature is required' })
  @IsString({ message: 'Signature must be a string' })
  signature!: string;

  @IsNotEmpty({ message: 'Message is required' })
  @IsString({ message: 'Message must be a string' })
  message!: string;
}

/**
 * DTO for listing API keys for a wallet
 */
export class ListApiKeysDto {
  @IsNotEmpty({ message: 'Wallet address is required' })
  @IsEthereumAddress({ message: 'Invalid Ethereum wallet address' })
  walletAddress!: string;

  @IsNotEmpty({ message: 'Signature is required' })
  @IsString({ message: 'Signature must be a string' })
  signature!: string;

  @IsNotEmpty({ message: 'Message is required' })
  @IsString({ message: 'Message must be a string' })
  message!: string;
}
