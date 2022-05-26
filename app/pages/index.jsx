import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import {NFTCard} from "../components/nftCard"

const Home = () => {
  const[wallet, setWallet] = useState("");
  const [collection, setCollection] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);
  const [startToken, setStartToken] = useState("");


  const fetchNFTs = async () => {
    let nfts;
    console.log("fetching nfts");
    const api_key = 'H849O18WN0ilaARB9aadJi6n8wPy1vsK';
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;

    if(!collection.length) {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };

      const fetchURL = `${baseURL}?owner=${wallet}`;
      nfts = await fetch(fetchURL,requestOptions).then(data => data.json())
    } else {
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      console.log("fetching nfts for collections owned by an address");
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json())
    }

    if (nfts) {
      console.log("getNFTs",nfts);
      setNFTs(nfts.ownedNfts);
    }
  }

  const fetchNFTsForCollection = async () => {
    if(collection.length) {
       var requestOptions = {
         method: 'GET',
         redirect: 'follow',
       }
      const api_key = 'H849O18WN0ilaARB9aadJi6n8wPy1vsK';
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
      let fetchURL;
      if (startToken.length) {
        fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}&startToken=${startToken}`;

      }else {
        fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      }
      const nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
      if(nfts) {
        console.log("NFTs in collections:",nfts);
        setNFTs(nfts.nfts);
        if (nfts?.nextToken?.length) {
          setStartToken(nfts.nextToken)
        } else {
          setStartToken('')
        }
      }
    }
 }


  return (
    <div className="flex flex-col items-center justify-center gap-y-3 py-8">
      <div className="flex w-full flex-col items-center justify-center gap-y-2">
        <input
          disabled={fetchForCollection}
          className="w-2/5 rounded-lg bg-slate-100 py-2 px-2 text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
          onChange={(e) => {
            setWallet(e.target.value)
          }}
          value={wallet}
          type={'text'}
          placeholder="Add your wallet address"
        ></input>
        <input
          className="w-2/5 rounded-lg bg-slate-100 py-2 px-2 text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
          onChange={(e) => {
            setCollection(e.target.value)
          }}
          value={collection}
          type={'text'}
          placeholder="Add collection wallet address"
        ></input>
        <label className="text-gray-600 ">
          <input
            className="mr-2"
            onChange={(e) => {
              setFetchForCollection(e.target.checked)
            }}
            type={'checkbox'}
          ></input>
          Fetch for collection
        </label>
        <button
          className={
            'mt-3 w-1/5 rounded-sm bg-blue-400 px-4 py-2 text-white disabled:bg-slate-500'
          }
          onClick={() => {
            if (fetchForCollection) {
              fetchNFTsForCollection()
            } else {
              fetchNFTs()
            }
          }}
        >
          Let's go!
        </button>
      </div>
      <div className="mt-4 flex w-5/6 flex-wrap justify-center gap-y-12 gap-x-2">
        {NFTs.length &&
          NFTs.map((nft) => {
            return <NFTCard nft={nft}></NFTCard>
          })}
      </div>
        {startToken.length ? 
        <>
        <div className='text-white bg-blue-800 cursor-pointer px-2 py-2 mt-3 rounded-sm'
        onClick={() => fetchNFTsForCollection()}>
          View next 100 NFTs
        </div>
        </>
        : ''}
    </div>
  )
}

export default Home
