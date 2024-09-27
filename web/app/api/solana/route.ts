import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { encodeURL, findReference, validateTransfer } from "@solana/pay";
import BigNumber from "bignumber.js";

const walletAddress = process.env.NEXT_PUBLIC_SOL_WALLET;
if (!walletAddress) {
  throw new Error("Missing Wallet Address");
}

const recipient = new PublicKey(walletAddress);
const label = "Food Items"; 
const memo = "Enjoy your purchase";
const exchangeRate = new BigNumber(0.00012); 

const paymentHistory = new Map<
  string,
  { recipient: PublicKey; solAmount: BigNumber; memo: string }
>();

export async function POST(request: Request) {
  try {
    const { productName, productPrice, productQuantity } = await request.json();
    const price = parseFloat(productPrice);
    const quantity = parseFloat(productQuantity);
    
    const inrAmount = price * quantity;

    const solAmount = exchangeRate.multipliedBy(inrAmount);
    const reference = new Keypair().publicKey;
    const message = `Solpay - Total Checkout solAmount: ${solAmount.toString()}`;
    
    const urlData = await generateUrl(
      recipient,
      solAmount,
      reference,
      label,
      message,
      memo,
    );

    const ref = reference.toBase58();
    paymentHistory.set(ref, { recipient, solAmount, memo });
    const { url } = urlData;

    return Response.json({ url, ref });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get("reference");
  if (!reference) {
    return Response.json({ error: "Reference not found" }, { status: 404 });
  }

  try {
    const referencePublicKey = new PublicKey(reference);
    const response = await verifyTransaction(referencePublicKey);
    if (response) {
      return Response.json({ status: "verified" });
    } else {
      return Response.json({ status: "not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

async function generateUrl(
  recipient: PublicKey,
  solAmount: BigNumber,
  reference: PublicKey,
  label: string,
  message: string,
  memo: string,
) {
  const url: URL = encodeURL({
    recipient,
    amount: solAmount,
    reference,
    label,
    message,
    memo,
  });
  return { url };
}

async function verifyTransaction(reference: PublicKey) {
  const paymentData = paymentHistory.get(reference.toBase58());
  if (!paymentData) {
    throw new Error("Payment request not found");
  }
  const { recipient, solAmount, memo } = paymentData;
  const amount = solAmount;
  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed",
  );

  const found = await findReference(connection, reference);
  console.log(found.signature);

  const response = await validateTransfer(
    connection,
    found.signature,
    {
      recipient,
      amount,
      splToken: undefined,
      reference,
      // memo
    },
    { commitment: "confirmed" },
  );

  if (response) {
    paymentHistory.delete(reference.toBase58());
  }
  return response;
}
