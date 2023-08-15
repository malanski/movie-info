import { Flex, Input, Button } from '@chakra-ui/react'

export const SearchMovie = () => {
  return (
    <Flex align="center" justify="center" p={[2, 4, 6]}>
      <Input
        placeholder="Digite algo..."
        size="lg"
        mr={2}
        bg="background.white"
        focusBorderColor="background.darkBlue"
        color="base.gray400"
        maxW="800px"
        _placeholder={{ color: 'base.gray300' }}
      />
      <Button
        bg="background.darkBlue"
        color="base.gray200"
        size="lg"
        maxWidth="100px"
        _hover={{ boxShadow: '0px 0px 30px 0px #1281c3', bg: '#1281c3' }}
      >
        Buscar
      </Button>
    </Flex>
  )
}