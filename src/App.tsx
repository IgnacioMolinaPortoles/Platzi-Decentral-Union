import { useEffect, useState } from "react"
import "./App.css"
import Home from "./components/home/Home"
import ConnectWallet from "./components/connectWallet/ConnectWallet"
import { ethers } from "ethers"
import Footer from "./components/footer/Footer"
import { SC_ADDRESS } from "./web3/Constants"
import { ContractManager } from "./helpers/ContractManager"
import ABI from "./web3/abi.json"

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [walletBalance, setWalletBalance] = useState<string>("")

  useEffect(() => {
    const isConnected = async () => {
      if (window.ethereum) {
        setIsLoading(true)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
        const signer = provider.getSigner()

        setWalletAddress(await signer.getAddress())

        const balance = await signer.getBalance()
        const newBalance = Number(balance) / 1000000000000000000
        setWalletBalance(newBalance.toString())
        setIsLoading(false)
      }
    }
    isConnected()
  }, [])

  return (
    <div className="App">
      {!isLoading &&
        (walletAddress !== "" ? (
          <Home walletAddress={walletAddress} walletBalance={walletBalance} />
        ) : (
          <ConnectWallet
            setWalletAddress={setWalletAddress}
            setWalletBalance={setWalletBalance}
          />
        ))}
      <Footer />
    </div>
  )
}

export default App
