import React, { useEffect, useState } from "react"
import { SC_ADDRESS } from "../../web3/Constants"
import "./footer.css"

const Footer = () => {
  const [ipAddress, setIpAddress] = useState<string>("127.0.0.0")
  useEffect(() => {
    const getIP = async () => {
      const response = await fetch("https://ifconfig.me/all.json")
      const data = await response.json()
      setIpAddress(data.ip_addr)
    }
    getIP()
  }, [])

  return (
    <div className="footerWrapper">
      <span>
        IP address: <span className="highlight">{ipAddress}</span>
      </span>

      <span>
        Mixer contract:
        <span className="highlight">
          {` ${SC_ADDRESS}`}
        </span>
      </span>
    </div>
  )
}

export default Footer
