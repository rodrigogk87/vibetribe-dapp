import { Box, Text } from '@chakra-ui/react';
import { CollectionInfoBox } from './CollectionInfoBox';
import { chainType, networkConfig } from '../config/network';
import { shortenHash } from '../utils/shortenHash';
import { useElvenScQuery } from '../hooks/interaction/elvenScHooks/useElvenScQuery';
import { SCQueryType } from '../hooks/interaction/useScQuery';

const smartContractAddress = process.env.NEXT_PUBLIC_NFT_SMART_CONTRACT;

export const Hero = () => {
  const { data: collectionSize, isLoading: collectionSizeLoading } =
    useElvenScQuery({ funcName: 'getTotalSupply', type: SCQueryType.INT });
  const { data: collectionTicker, isLoading: collectionTickerLoading } =
    useElvenScQuery({ funcName: 'getNftTokenId', type: SCQueryType.STRING });

  return (
    <Box width="100%">
      <Text
        as="h1"
        fontSize={{ base: '2xl', md: '3xl', lg: '5xl' }}
        textAlign={{ base: 'center', md: 'left' }}
        fontWeight="black"
        lineHeight="shorter"
        mb={5}
      >
        Open source Dapp template for the{' '}
        <Text
          as="a"
          color="elvenTools.color3.base"
          href="https://www.elven.tools"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          Elven Tools
        </Text>{' '}
        and{' '}
        <Text
          as="a"
          color="elvenTools.color2.base"
          href="https://www.elrond.com"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          Elrond
        </Text>{' '}
        blockchain.
      </Text>
      <Text
        as="h2"
        fontSize="lg"
        fontWeight="thin"
        textAlign={{ base: 'center', md: 'left' }}
      >
        The actual working example is connected to the Elven Tools smart
        contract deployed on the Elrond blockchain{' '}
        <Text as="span" fontWeight="medium">
          devnet
        </Text>
        ! You can play with it. I will redeploy it from time to time to keep the
        minting active. You can also use the template on the mainnet with a
        couple of config changes. Check the Elven Tools website for docs.
      </Text>
      <Box
        display="flex"
        justifyContent={{ base: 'center', md: 'flex-start' }}
        mt={10}
        gap={3}
        sx={{
          '@media screen and (max-width: 650px)': {
            flexDirection: 'column',
          },
        }}
      >
        <CollectionInfoBox
          content={collectionTicker || ''}
          label="Collection ticker. Click for details."
          isLoading={collectionTickerLoading}
          href={`${networkConfig[chainType].explorerAddress}/collections/${collectionTicker}`}
        />
        <CollectionInfoBox
          content={
            smartContractAddress
              ? shortenHash(smartContractAddress || '', 12)
              : 'No minter smart contract provided!'
          }
          label={`Minter smart contract. Click for details.`}
          href={
            smartContractAddress
              ? `${networkConfig[chainType].explorerAddress}/accounts/${smartContractAddress}`
              : undefined
          }
        />
        <CollectionInfoBox
          content={collectionSize || ''}
          isLoading={collectionSizeLoading}
          label="Collection amount"
        />
      </Box>
    </Box>
  );
};
