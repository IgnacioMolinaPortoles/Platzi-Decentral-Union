import { ethers } from "ethers"
import { useRef } from "react"
import { ContractManager } from "../../../../helpers/ContractManager"
import "./withdraw.css"

interface WithdrawProps {
  onWithdrawClick: (address: string, note: string) => {}
  setIsLoading: (e: boolean) => void
  isLoading: boolean
  contract: ContractManager | undefined
}

const Withdraw = ({ onWithdrawClick, isLoading, contract, setIsLoading }: WithdrawProps) => {
  const noteRef = useRef<HTMLInputElement | null>(null)
  const addressRef = useRef<HTMLInputElement | null>(null)

  const handleWithdrawClick = () => {
    let note = noteRef.current?.value
    let address = addressRef.current?.value
    if (note && address) {
      onWithdrawClick(address, note)
      if (contract) {
        contract.subscribe("Withdraw", (e: any) => {
          console.log(e)
          const ethValue = ethers.utils.formatEther(e[1]);
          alert(`Successfully withdrawn ${ethValue} eth`)
          addressRef.current!.value = ""
          noteRef.current!.value = ""
        })
      }
    }
  }

  return (
    <div className="withdrawWrapper">
      <div>
        <h4 className="titleWithdrawWrapper">Make a withdrawal</h4>
        <input
          ref={noteRef}
          placeholder="DescUnion-eth-0.0.1-0x00000000"
          className="withdrawTextInput"
          type="text"
        />
        {/* <div className="withdrawDescription">Note value is 0.1 ETH</div>
        <div className="withdrawDescription">
          It's been 2 days after deposit
        </div> */}
      </div>

      <div className="widthdrawSeparator"></div>

      <div>
        <h4 className="titleWithdrawWrapper">Recipient address</h4>
        <div>
          <div className="withdrawDescription">
            <div>Gas fee: 0.01 ETH</div>
          </div>
          <br />
          <input
            ref={addressRef}
            placeholder="0x0000000000000000000000000000000000000000"
            className="withdrawTextInput"
            type="text"
          />
        </div>

        <button onClick={handleWithdrawClick} className="depositButton">
          {isLoading ? "Minting..." : "Withdraw"}
        </button>
      </div>
    </div>
  )
}

export default Withdraw
