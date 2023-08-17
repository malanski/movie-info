import { Flex, Box, Text } from '@chakra-ui/react'
import {
  AiFillFacebook,
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
} from 'react-icons/ai'

export const Footer = () => {
  return (
    <Box fontSize={25}>
      <Flex
        bg="background.darkBlue"
        align="center"
        justify="space-between"
        padding={6}
      >
        <Box
          as="a"
          href="https://github.com/malanski"
          title="Github Profile"
          color={'background.blue500'}
          target="_blank"
          rel="noopener noreferrer"
          transition={'all ease-in-out 600ms'}
          _hover={{
            color: 'white',
            transition: 'all ease-in-out 600ms',
          }}
        >
          <AiFillGithub />
        </Box>
        <Box
          as="a"
          href="https://www.linkedin.com/in/ulisses-malanski/"
          title="Linkedin Profile"
          color={'background.blue500'}
          target="_blank"
          rel="noopener noreferrer"
          transition={'all ease-in-out 600ms'}
          _hover={{
            color: 'white',
            transition: 'all ease-in-out 600ms',
          }}
        >
          <AiFillLinkedin />
        </Box>
        <Box
          as="a"
          href="https://www.facebook.com/ulisses.malanski"
          title="FaceBook Profile"
          transition={'all ease-in-out 600ms'}
          target="_blank"
          rel="noopener noreferrer"
          color={'background.blue500'}
          _hover={{
            color: 'white',
            transition: 'all ease-in-out 600ms',
          }}
        >
          <AiFillFacebook />
        </Box>
        <Box
          as="a"
          href="https://www.instagram.com/malanskiart/"
          title="Instagram"
          transition={'all ease-in-out 600ms'}
          color={'background.blue500'}
          target="_blank"
          rel="noopener noreferrer"
          _hover={{
            color: 'white',
            transition: 'all ease-in-out 600ms',
          }}
        >
          <AiFillInstagram />
        </Box>
      </Flex>
      <Text bgColor="black" color="white" textAlign="center">
        <small>Desenvolvido por</small>
        <br></br>
        <Box
          as="a"
          href="https://malanski.github.io/portfolio/#/projects"
          title="Meu Portfólio"
          color={'background.blue500'}
          target="_blank"
          rel="noopener noreferrer"
          transition={'all ease-in-out 600ms'}
          _hover={{
            color: '#0b5fe6',
            transition: 'all ease-in-out 600ms',
          }}
        >
          Ulisses Malanski
        </Box>
      </Text>
    </Box>
  )
}
