import { Box, Flex, keyframes, Tooltip } from '@chakra-ui/react';
import React from 'react';

export default function Status({status}) {
  const activeColor = 'green.500';
  const inactiveColor = 'red.500';
  const ringScaleMin = 0.33;
  const ringScaleMax = 0.66;

  const pulseRing = keyframes`
	0% {
    transform: scale(${ringScaleMin});
  }
	30% {
		transform: scale(${ringScaleMax});
	},
  40%,
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
	`;

  const pulseDot = keyframes`
	0% {
    transform: scale(0.9);
  }
  25% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(0.9);
  }
	`;

  if(status) {
    return (
      <Flex justifyContent={'center'} alignItems={'center'}>
        {/* Ideally, only the box should be used. The <Flex /> is used to style the preview. */}
        <Tooltip label={`Status: Active`} textTransform="capitalize">
          <Box
            as="div"
            h="24px"
            w="24px"
            mb="1.99em"
            position="relative"
            bgColor={activeColor}
            borderRadius="50%"
            _before={{
              content: "''",
              position: 'relative',
              display: 'block',
              width: '300%',
              height: '300%',
              boxSizing: 'border-box',
              marginLeft: '-100%',
              marginTop: '-100%',
              borderRadius: '50%',
              bgColor: activeColor,
              animation: `2.25s ${pulseRing} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`,
            }}
            _after={{
              animation: `2.25s ${pulseDot} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`,
            }}
          />
        </Tooltip>
      </Flex>
    );
  } else {
    return (
      <Flex justifyContent={'center'} my={5}>
        {/* Ideally, only the box should be used. The <Flex /> is used to style the preview. */}
        <Tooltip label={`Status: Inativo`} textTransform="capitalize">
          <Box
            as="div"
            h="24px"
            w="24px"
            position="relative"
            bgColor={inactiveColor}
            borderRadius="50%"
            _before={{
              content: "''",
              position: 'relative',
              display: 'block',
              width: '300%',
              height: '300%',
              boxSizing: 'border-box',
              marginLeft: '-100%',
              marginTop: '-100%',
              borderRadius: '50%',
              bgColor: inactiveColor,
              animation: `2.25s ${pulseRing} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`,
            }}
            _after={{
              animation: `2.25s ${pulseDot} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`,
            }}
          />
        </Tooltip>
      </Flex>
    );
  }

}
