/// <reference types="react-scripts" />
import { ExternalProvider } from "@ethersproject/providers";

declare global {
  interface Window{
    ethereum?: ExternalProvider
  }
}

interface depositData {
  note: string, 
  txHash: string
}