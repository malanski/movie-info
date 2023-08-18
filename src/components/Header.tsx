import { useState } from 'react'
import { Flex, Button, Heading, Alert, AlertIcon } from '@chakra-ui/react'
import { BiCameraMovie } from 'react-icons/bi'
import Link from 'next/link'

import { ButtonApp } from './Button'

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
        padding={6}
        gap={3}
      >
        <Link href={'/'}>
          <Flex align="center" justify="start" gap={2}>
            <BiCameraMovie size={40} color="#ffce1f" />
            <Heading color="base.yellow500" as="h1" fontSize={[20, 25, 40]}>
              Movie Catalog
            </Heading>
          </Flex>
        </Link>

        <ButtonApp
          background="background.yellow"
          color="base.gray500"
          onClick={handleLoginClick}
          isLoading={isLoading}
          colorHover="#ffce1f"
        >
          Entrar
        </ButtonApp>
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