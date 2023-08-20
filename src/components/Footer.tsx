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
        color: 'yellow',
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
        bg="background.red"
        align="center"
        justify="space-between"
        padding={6}
      >
        <MyBox
          myHref="https://github.com/malanski"
          myTitle="Ulisses Malanski no Github"
        >
          <AiFillGithub />
        </MyBox>

        <MyBox
          myHref="https://www.linkedin.com/in/ulisses-malanski/"
          myTitle="Ulisses Malanski no Linkedin"
        >
          <AiFillLinkedin />
        </MyBox>

        <MyBox
          myHref="https://www.facebook.com/ulisses.malanski"
          myTitle="Ulisses Malanski no Facebook"
        >
          <AiFillFacebook />
        </MyBox>

        <MyBox
          myHref="https://www.instagram.com/malanskiart/"
          myTitle="Ulisses Malanski no Instagram"
        >
          <AiFillInstagram />
        </MyBox>
      </Flex>
      <Text bgColor="black" color="base.gray100" textAlign="center">
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
