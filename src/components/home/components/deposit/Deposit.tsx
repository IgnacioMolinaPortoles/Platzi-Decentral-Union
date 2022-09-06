import { useState } from "react"
import "./deposit.css"

const AMOUNTS = [0.01, 0.1, 0.5, 1]

interface DepositProps {
  onDepositClick: (ethValue: string) => {},
  isLoading: boolean
}

const Deposit = (props: DepositProps) => {
  const [selectedValue, setSelectedValue] = useState<number>(AMOUNTS[0])

  return (
    <div className="depositWrapper">
      <div>
        <div className="depositHeaderWrapper">
          <div className="depositTitle">Amount</div>
          <span className="depositInfo">i</span>
        </div>
        <div className="amountWrapper">
          {AMOUNTS.map((amount) => {
            return (
              <span
                key={amount}
                className={`pill ${
                  selectedValue === amount && "pill-selected"
                }`}
                onClick={() => setSelectedValue(amount)}
              >
                {amount} ETH
              </span>
            )
          })}
        </div>
      </div>
      <div className="depositDescription">
        Please select an amount that you would like to mix
      </div>
      <button onClick={() => props.onDepositClick(selectedValue.toString())} className="depositButton">
        {props.isLoading ? "Mining..." : "Deposit"}
      </button>
    </div>
  )
}

export default Deposit
