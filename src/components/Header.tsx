import { Flex, Button, Heading } from '@chakra-ui/react'

export const Header = () => {
  return (
    <Flex
      bg="background.darkBlue"
      align="center"
      justify="space-between"
      padding={6}
    >
      <Heading color="base.gray100" as="h1">Movie Catalog</Heading>
      <Button bg="base.gray100" color="base.gray600">
        Entrar
      </Button>
    </Flex>
  )
}