import { Flex, Box, Text } from '@chakra-ui/react'
import {
  AiFillFacebook,
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
} from 'react-icons/ai'

export const Footer = () => {
  return (
    <Box>
      <Flex
        bg="background.darkBlue"
        align="center"
        justify="space-between"
        padding={6}
      >
        <Box as="a" href="https://github.com/malanski" title="Github Profile">
          <AiFillGithub />
        </Box>
        <Box
          as="a"
          href="https://www.linkedin.com/in/ulisses-malanski/"
          title="Linkedin Profile"
        >
          <AiFillLinkedin />
        </Box>
        <Box
          as="a"
          href="https://www.facebook.com/ulisses.malanski"
          title="FaceBook Profile"
        >
          <AiFillFacebook />
        </Box>
        <Box
          as="a"
          href="https://www.instagram.com/malanskiart/"
          title="Instagram"
        >
          <AiFillInstagram />
        </Box>
      </Flex>
      <Text bgColor="black" color="white" textAlign="center">
        Desenvolvido por Ulisses Malanski
      </Text>
    </Box>
  )
}
