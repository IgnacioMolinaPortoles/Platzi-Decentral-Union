import { ethers } from "ethers"

interface ConnectWalletProps {
  setWalletAddress: (value: string) => void
  setWalletBalance: (value: string) => void
}

const ConnectWallet = ({
  setWalletAddress,
  setWalletBalance,
}: ConnectWalletProps) => {
  return (
    <div>
      ConnectWallet
      <br />
      <button
        onClick={async () => {
          if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            await provider.send("eth_requestAccounts", [])
            const signer = provider.getSigner()
            console.log("here:" + (await signer.getAddress()))
            await signer.signMessage("Torbellino Ca$h")
            setWalletAddress(await signer.getAddress())
            const balance = await await signer.getBalance()
            const newBalance = Number(balance) / 1000000000000000000
            setWalletBalance(newBalance.toString())
          } else {
            alert("Install Metamask please")
          }
        }}
      >
        Conectar
      </button>
    </div>
  )
}

export default ConnectWallet
