import { useState } from 'react'
import {
  Heading,
  Alert,
  AlertIcon,
  Link,
  Text,
  Box,
  Flex,
} from '@chakra-ui/react'
import popcorn from 'public/android-chrome-192x192.png'
import movieLogo from 'public/movielogo.png'
import { ButtonApp } from './Button'
import Image from 'next/image'

export const Header = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const handleLoginClick = () => {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      }, 3000)
    }, 2000)
  }

  return (
    <>
      <Flex
        bg="background.gray900"
        align="center"
        justify="space-between"
        alignItems="center"
        padding={6}
        gap={3}
        wrap={['wrap']}
        flexDirection={['column-reverse', 'row', 'row', 'row']}
        width={['100%']}
      >
        <Link href={'/'} title="Página inicial">
          <Flex align="center" justify="start" gap={2} borderRadius="10px">
            <Box borderRadius="50%" bgColor="white" p={1}>
              <Image src={movieLogo} alt="Movie Logo" width={40}></Image>
            </Box>
            <Heading color="base.red" as="h1" fontSize={[20, 25, 40]}>
              Movie Info
            </Heading>
          </Flex>
        </Link>

        <Flex>
          <ButtonApp
            background="background.red"
            color="base.gray500"
            onClick={handleLoginClick}
            isLoading={isLoading}
            colorHover="#ffce1f"
            title="Entrar"
          >
            <Image src={popcorn} alt="popcorn icon" width={20}></Image>
            <Text as="span" color="background.white">
              Login
            </Text>
          </ButtonApp>
        </Flex>
      </Flex>

      {showAlert && (
        <Flex
          justify="center"
          alignItems="start"
          position="fixed"
          width="100%"
          marginTop={5}
        >
          <Alert
            status="error"
            background="feedback.danger"
            variant="solid"
            borderRadius="md"
            textAlign="center"
            width="auto"
            p={4}
          >
            <AlertIcon />
            Funcionalidade em desenvolvimento.
          </Alert>
        </Flex>
      )}
    </>
  )
}
