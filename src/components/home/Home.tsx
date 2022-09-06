import { useEffect, useState } from "react"
import Deposit from "./components/deposit/Deposit"
import Withdraw from "./components/withdraw/Withdraw"
import { ContractManager } from "../../helpers/ContractManager"
import { SC_ADDRESS } from "../../web3/Constants"
import ABI from "../../web3/abi.json"
import "./home.css"
import { createNote } from "../../helpers/NoteManager"
import Statistics from "./components/statistics/Statistics"
import { depositData } from "../../react-app-env"

interface HomeProps {
  walletAddress: string
  walletBalance: string
}

const Home = ({ walletAddress, walletBalance }: HomeProps) => {
  const [showDeposit, setShowDeposit] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentDepositData, setCurrentDepositData] = useState<depositData>()
  const [contract, setContract] = useState<ContractManager>()

  useEffect(() => {
    let contract = new ContractManager(SC_ADDRESS, ABI)
    setContract(contract)
  }, [])

  const formatWallet = (address: string) => {
    let start = address.substring(0, 5)
    let end = address.slice(-4)

    return start + "..." + end
  }

  useEffect(() => {
    // setCurrentDepositData({
    //   note: "DescUnion-eth-0x342717ad64ed8aa431be47e15511ad9b8908dc3a282278bc17c6a7d20bffc6bace03b41bdc4bee5d124c95142c39cf4bd171a1c6a79035517e3959cea902",
    //   txHash: "0xd3c0118e6bdf09cfbcd150a82e5823abb4b4ab58",
    // })
  }, [])

  const onDepositClick = async (ethValue: string) => {
    if (contract) {
      let note = createNote()
      setIsLoading(true)
      let txHash = await contract.createDeposit(note, ethValue)
      setCurrentDepositData({
        note,
        txHash,
      })
      setIsLoading(false)
    }
  }

  const onWithdrawClick = async (address: string, note: string) => {
    let contract = new ContractManager(SC_ADDRESS, ABI)
    setIsLoading(true)
    let txHash = await contract.withdrawTo(address, note)
    console.log(txHash)
    setIsLoading(false)
  }

  return (
    <div className="homeWrapper">
      <div className="panelWrapper">
        <div className="infoWrapper">
          {walletAddress !== "" ? (
            <span>{formatWallet(walletAddress)}</span>
          ) : null}
        </div>
        <div className="selectorWrapper">
          <span
            className={`selectorButton ${
              !showDeposit ? "selectorButton-opacity" : ""
            }`}
            onClick={() => setShowDeposit(true)}
          >
            Deposit
          </span>
          <span
            className={`selectorButton ${
              showDeposit ? "selectorButton-opacity" : ""
            }`}
            onClick={() => setShowDeposit(false)}
          >
            Withdraw
          </span>
        </div>
        {showDeposit ? (
          <Deposit isLoading={isLoading} onDepositClick={onDepositClick} />
        ) : (
          <Withdraw
            onWithdrawClick={onWithdrawClick}
            isLoading={isLoading}
            contract={contract}
            setIsLoading={setIsLoading}
          />
        )}
      </div>
      <Statistics data={currentDepositData} />
    </div>
  )
}

export default Home
