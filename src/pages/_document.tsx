import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body
        style={{ boxSizing: 'border-box', padding: '0', overflowX: 'hidden' }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
