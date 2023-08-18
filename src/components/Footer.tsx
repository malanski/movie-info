import { Flex, Box, Text } from '@chakra-ui/react'
import {
  AiFillFacebook,
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
} from 'react-icons/ai'
interface MyBoxProps {
  myHref: string
  myTitle: string
  children: React.ReactNode
}
const MyBox = ({ myHref, myTitle, children }: MyBoxProps) => {
  return (
    <Box
      as="a"
      href={myHref}
      title={myTitle}
      color={'background.blue500'}
      target="_blank"
      rel="noopener noreferrer"
      transition={'all ease-in-out 600ms'}
      _hover={{
        color: 'white',
        transition: 'all ease-in-out 600ms',
      }}
    >
      {children}
    </Box>
  )
}

export const Footer = () => {
  return (
    <Box fontSize={25}>
      <Flex
        bg="background.darkBlue"
        align="center"
        justify="space-between"
        padding={6}
      >
        <MyBox myHref="https://github.com/malanski" myTitle="Github Profile">
          <AiFillGithub />
        </MyBox>

        <MyBox
          myHref="https://www.linkedin.com/in/ulisses-malanski/"
          myTitle="Linkedin Profile"
        >
          <AiFillLinkedin />
        </MyBox>

        <MyBox
          myHref="https://www.facebook.com/ulisses.malanski"
          myTitle="Facebook Profile"
        >
          <AiFillFacebook />
        </MyBox>

        <MyBox
          myHref="https://www.instagram.com/malanskiart/"
          myTitle="Instagram"
        >
          <AiFillInstagram />
        </MyBox>
      </Flex>
      <Text bgColor="black" color="white" textAlign="center">
        <small>Desenvolvido por</small>
        <br />
        <MyBox
          myHref="https://malanski.github.io/portfolio/#/projects"
          myTitle="Meu Portfólio"
        >
          Ulisses Malanski
        </MyBox>
      </Text>
    </Box>
  )
}
