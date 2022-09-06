import { BaseContract, BigNumber, ContractInterface, ethers } from "ethers"
import { createNote } from "./NoteManager"

export class ContractManager {
  private contract: any

  constructor(address: string, abi: ContractInterface) {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const connectedContract = new ethers.Contract(address, abi, signer)
      this.contract = connectedContract
      console.log("Contract initialized", this.contract)
    }
  }

  subscribe(name: string, callback: any) {
    this.contract.on(name, (...args: any[]) => {
      callback(args)
    })
  }

  async createDeposit(note: string, value: string): Promise<string> {
    let overrides = {
      value: ethers.utils.parseEther(value),
    }
    let txn = await this.contract.setDeposit(note, overrides)
    console.log("Mining...please wait.")
    await txn.wait()
    console.log(
      `Mined, see transaction: https://rinkeby.etherscan.io/tx/${txn.hash}`
    )
    console.log(txn)
    return txn.hash
  }

  async withdrawTo(address: string, note: string): Promise<string> {
    let txn = await this.contract.setWithdraw(address, note)
    console.log("Mining...please wait.")
    await txn.wait()
    console.log(txn)
    return txn.hash
  }

  async getNoteBalance(note: string): Promise<any> {
    let _balance = await this.contract.getMemoBalance(note)
    console.log("Mining...please wait.")
    const ethValue = ethers.utils.formatEther(_balance);

    return ethValue
  }
}
