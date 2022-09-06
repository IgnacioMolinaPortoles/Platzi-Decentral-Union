import { bigInt } from "snarkjs"
const crypto = require("crypto")

const rbigint = (nbytes) => bigInt.leBuff2int(crypto.randomBytes(nbytes))

const toHex = (number, length = 32) =>
  "0x" +
  (number instanceof Buffer
    ? number.toString("hex")
    : bigInt(number).toString(16)
  ).padStart(length * 2, "0")

export const createNote = () => {
  let noteToContract = Buffer.concat([
    rbigint(31).leInt2Buff(31),
    rbigint(31).leInt2Buff(31),
  ])
  let noteToUser = `DescUnion-eth-${toHex(noteToContract, 62)}`
  return noteToUser
}

export const withdraw = async (noteFinal, address) => {
  const noteRegex = /DescUnion-(?<currency>\w+)-0x(?<note>[0-9a-fA-F]{124})/g
  const match = noteRegex.exec(noteFinal)

  //SEND TO CONTRACT
  const buf = Buffer.from(match.groups.note, "hex")
  console.log("BYTES:\n", buf)
}
