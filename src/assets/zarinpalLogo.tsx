import React, { useEffect } from 'react'

const ZarinPalLogo: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://www.zarinpal.com/webservice/TrustCode'
    script.type = 'text/javascript'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return null
}

export default ZarinPalLogo
