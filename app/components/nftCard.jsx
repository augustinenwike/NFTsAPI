import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons'

export const NFTCard = ({nft}) => {
  const [copyIcon, setCopyIcon] = useState(<FontAwesomeIcon icon={faCopy}/>)
  
  const copyToClibBoard = (contractAddress) => {

    navigator.clipboard.writeText(contractAddress)
    .then(() => {
      setCopyIcon(<FontAwesomeIcon icon={faCheck} />);
      setTimeout(()=> {
        setCopyIcon(<FontAwesomeIcon icon={faCopy} />);
      }, 1000);
      alert("Copied:" +contractAddress)
    }, 
    () => console.log("error copying text"));

  }


  return (
    <div className="flex w-1/5 flex-col">
      <div className="rounded-md">
        <img className="h-128 w-full rounded-t-md object-cover"src={nft.media[0].gateway}></img>
      </div>
      <div className="y-gap-2 h-110 flex flex-col rounded-b-md bg-slate-100 px-2 py-4">
        <div className="">
          <h2 className="text-xl text-gray-800">{nft.title}</h2>
          <p className="text-gray-600">
            {nft.id.tokenId.substr(nft.id.tokenId.length - 4)}
          </p>
          <p className="text-gray-600">{`${nft.contract.address.substr(0,4)}...${nft.contract.address.substr(nft.contract.address.length - 4)}`}
          &nbsp; <span onClick={() => copyToClibBoard(nft.contract.address)}>{copyIcon}</span></p>
        </div>
      </div>
      <div className="mt-2 flex-grow">
        <p className="text-gray-600">{nft.description?.substr(0, 150)}</p>
      </div>
      <div className="mb-1 flex justify-center">
        <a className="rounded-m w-1/2 cursor-pointer bg-blue-500 py-2 px-4 text-center text-white"target={'blank'}href={`https://etherscan.io/token/${nft.contract.address}`}>
          View on etherscan
        </a>
      </div>
    </div>
  )
}