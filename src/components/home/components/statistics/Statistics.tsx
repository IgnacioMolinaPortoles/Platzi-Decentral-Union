import { useEffect, useState } from "react"
import { depositData } from "../../../../react-app-env"
import "./statistics.css"

interface StatisticsProps {
  data: depositData | undefined
}

const Statistics = ({ data }: StatisticsProps) => {
  const copyToClipboard = () => {
    if (data?.note) {
      navigator.clipboard.writeText(data?.note).then(function() {
      alert("Copied! keep this in a safe place")
    }, function(err) {
        console.error('Async: Could not copy text: ', err);
      });
      // navigator.clipboard.writeText(data?.note)
    }
  }

  const goToEtherscan = () => {
    if (data?.txHash)
      window.open("https://rinkeby.etherscan.io/tx/" + data?.txHash)
  }

  return (
    <div className="statisticsWrapper">
      <h5 className="statisticsTitle">Note</h5>
      <div
        title="Click to copy!"
        onClick={copyToClipboard}
        className="statisticsNote"
      >
        {data?.note ?? "Here we show your note to withdraw your eth."}
      </div>
      {data?.txHash && (
        <>
          <h5 className="statisticsSubtitle">Transaction: </h5>
          <div onClick={goToEtherscan} className="txLink">
            {data?.txHash}
          </div>
        </>
      )}
    </div>
  )
}

export default Statistics
