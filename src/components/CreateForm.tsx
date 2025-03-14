"use client";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import Image from "next/image";
import { Button } from "./ui/button";
import { ImagePlus, LoaderCircle, X } from "lucide-react";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { TokenABI, TokenAddress, TokenAddressSonic } from "@/contracts/Token";
import {
  FactoryTokenABI,
  FactoryTokenAddress,
  FactoryTokenAddressSonic,
} from "@/contracts/FactoryToken";
import { parseUnits } from "viem";
import { useFormik } from "formik";
import * as Yup from "yup";
import WalletButton from "./WalletButton";
import Link from "next/link";

type valuesForm = {
  name: string;
  ticker: string;
  iconUrl: string;
  description: string;
  twitter: string;
  website: string;
  behavior: string;
  paymentAmount: string;
  chatStyle: string;
  topics: string;
  lore: string;
  generalStyle: string;
};

export default function CreateForm() {
  const { address, isConnected, chain } = useAccount();

  const { data: balanceIdleToken } = useReadContract({
    address: TokenAddress,
    abi: TokenABI,
    functionName: "balanceOf",
    args: [address],
  });

  const { data: balanceIdleTokenSonic } = useReadContract({
    address: TokenAddressSonic,
    abi: TokenABI,
    functionName: "balanceOf",
    args: [address],
  });

  const {
    data: transactionHash,
    isPending,
    writeContract,
    isSuccess,
  } = useWriteContract();

  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  const handleSubmit = async (values: valuesForm) => {
    if (chain?.id === 3441006) {
      try {
        const approvalTx = await writeContract({
          address: TokenAddress,
          abi: TokenABI,
          functionName: "approve",
          args: [
            FactoryTokenAddress,
            parseUnits(values.paymentAmount.toString(), 18),
          ],
        });

        const createTokenTx = await writeContract({
          address: FactoryTokenAddress,
          abi: FactoryTokenABI,
          functionName: "createTokenWithPayment",
          args: [
            values.name,
            values.ticker,
            values.iconUrl,
            values.description,
            values.twitter,
            values.website,
            values.behavior,
            parseUnits(values.paymentAmount.toString(), 18),
          ],
        });

        console.log("Approval Transaction:", approvalTx);
        console.log("Create Token Transaction:", createTokenTx);
        formik.resetForm();
      } catch (error) {
        console.error("Transaction failed:", error);
        alert("Transaction failed. Please try again.");
      }
    }

    if (chain?.id === 57054) {
      try {
        const approvalTx = await writeContract({
          address: TokenAddressSonic,
          abi: TokenABI,
          functionName: "approve",
          args: [
            FactoryTokenAddressSonic,
            parseUnits(values.paymentAmount.toString(), 18),
          ],
        });

        const createTokenTx = await writeContract({
          address: FactoryTokenAddressSonic,
          abi: FactoryTokenABI,
          functionName: "createTokenWithPayment",
          args: [
            values.name,
            values.ticker,
            values.iconUrl,
            values.description,
            values.twitter,
            values.website,
            values.behavior,
            parseUnits(values.paymentAmount.toString(), 18),
          ],
        });

        console.log("Approval Transaction:", approvalTx);
        console.log("Create Token Transaction:", createTokenTx);
      } catch (error) {
        console.error("Transaction failed:", error);
        alert("Transaction failed. Please try again.");
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      ticker: "",
      iconUrl: "",
      description: "",
      twitter: "",
      website: "",
      behavior: "",
      paymentAmount: "",
      chatStyle: "",
      topics: "",
      lore: "",
      generalStyle: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      ticker: Yup.string().required("Required"),
      iconUrl: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      twitter: Yup.string(),
      website: Yup.string(),
      paymentAmount: Yup.number().required("Required").positive().integer(),
      chatStyle: Yup.string().required("Required"),
      topics: Yup.string().required("Required"),
      lore: Yup.string().required("Required"),
      generalStyle: Yup.string().required("Required"),
    }),
    onSubmit: handleSubmit,
  });

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: transactionHash || undefined,
    });

  const uploadFile = async (file: File) => {
    try {
      const data = new FormData();
      data.set("file", file);
      const uploadRequest = await fetch("/api/pinata", {
        method: "POST",
        body: data,
      });
      const ipfsUrl = await uploadRequest.json();

      formik.setFieldValue("iconUrl", ipfsUrl);
      console.log("ipfsUrl", ipfsUrl);
      return ipfsUrl;
    } catch (e) {
      console.error(e);
      alert("Error uploading file");
      return null;
    }
  };

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        formik.setFieldValue("file", file);
      };
      reader.readAsDataURL(file);
      await uploadFile(file);
    }
  };

  if (!isConnected) {
    return (
      <div className="h-[calc(100vh-20vh)] flex flex-col items-center justify-center gap-5">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Connect Your Wallet</h1>
          <p className="text-gray-400 font-light">
            Please connect your wallet to create an agent
          </p>
        </div>
        <WalletButton />
      </div>
    );
  }

  return (
    <form className="space-y-10" onSubmit={formik.handleSubmit}>
      {/* USER ELIGIBLE */}
      <div className="bg-primary/15 p-3 rounded grid grid-cols-2 place-content-center place-items-center">
        <p
          className={`${
            Number(balanceIdleToken || balanceIdleTokenSonic) > 0
              ? "text-green-500 text-sm"
              : "text-red-500 text-sm"
          }`}
        >
          {Number(balanceIdleToken || balanceIdleTokenSonic) > 0
            ? "Eligible to create an AI AGENT"
            : "Please buy IDLE tokens."}
        </p>
        <p className="text-sm">
          {(Number(balanceIdleToken || balanceIdleTokenSonic) / 1e18).toFixed(
            0
          )}{" "}
          IDLE
        </p>
      </div>
      {/* AGENT DETAILS */}
      <div className="grid grid-cols-2 gap-5">
        <section className="space-y-1">
          <p className="text-sm font-light">Agent Image *</p>
          <div className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-gray-300 rounded cursor-pointer bg-background hover:bg-primary hover:text-primary-foreground duration-150 hover:border-none">
            {imagePreview ? (
              <div className="relative">
                <Image
                  src={imagePreview}
                  alt="Agent Image"
                  className="object-cover w-full h-full rounded aspect-square"
                  width={200}
                  height={200}
                />
                <Button
                  onClick={() => void setImagePreview(null)}
                  className="absolute top-2 right-2 text-white text-xs rounded"
                  variant="destructive"
                  size={"icon"}
                >
                  <X strokeWidth={3} />
                </Button>
              </div>
            ) : (
              <Label className="flex flex-col items-center justify-center w-full h-full">
                <ImagePlus size={30} />
                <p className="text-sm text-muted-foreground mt-2 font-medium">
                  Click to browse
                </p>
                <p className="text-xs text-muted-foreground font-medium">
                  JPG, JPEG, PNG, WEBP
                </p>
                <Input
                  type="file"
                  id="image"
                  name="image"
                  className="hidden"
                  accept="image/jpeg, image/png, image/jpg, image/webp"
                  onChange={handleChangeImage}
                  required
                />
              </Label>
            )}
            {formik.touched.iconUrl && formik.errors.iconUrl ? (
              <div className="text-red-500 text-sm">
                {formik.errors.iconUrl}
              </div>
            ) : null}
          </div>
        </section>

        <section className="space-y-5">
          <div className="grid gap-2">
            <Label>Agent Name *</Label>
            <Input
              placeholder="Agent Name"
              className="rounded duration-300"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="grid gap-2">
            <Label>Agent Ticker *</Label>
            <Input
              placeholder="Agent Ticker"
              className="rounded duration-300"
              id="ticker"
              name="ticker"
              value={formik.values.ticker}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.ticker && formik.errors.ticker ? (
              <div className="text-red-500 text-sm">{formik.errors.ticker}</div>
            ) : null}
          </div>
          <div className="grid gap-2">
            <Label>Agent Description *</Label>
            <Textarea
              placeholder="Agent Description"
              className="rounded duration-300 resize-none"
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={5}
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500 text-sm">
                {formik.errors.description}
              </div>
            ) : null}
          </div>
          <div className="grid gap-2">
            <Label>X or Twitter (optional)</Label>
            <Input
              placeholder="Agent Twitter"
              className="rounded duration-300"
              id="twitter"
              name="twitter"
              value={formik.values.twitter}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="grid gap-2">
            <Label>Website (optional)</Label>
            <Input
              placeholder="Agent Website"
              className="rounded duration-300"
              id="website"
              name="website"
              value={formik.values.website}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </section>
      </div>
      {/* AGENT SETTINGS */}
      <div className="grid grid-cols-2 gap-5">
        <section className="space-y-5">
          <div className="grid gap-2">
            <Label>Agent Lore *</Label>
            <Textarea
              className="rounded duration-300 resize-none"
              placeholder='example: "The Crypto Agent is a bot that tweets about crypto..."'
              id="lore"
              name="lore"
              value={formik.values.lore}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={5}
            />
            {formik.touched.lore && formik.errors.lore ? (
              <div className="text-red-500 text-sm">{formik.errors.lore}</div>
            ) : null}
          </div>
          <div className="grid gap-2">
            <Label>Agent Topics *</Label>
            <Textarea
              className="rounded duration-300 resize-none"
              placeholder='example: "topics: DeFi, NFTs, Crypto, Developer, SEO, Marketing, etc."'
              id="topics"
              name="topics"
              value={formik.values.topics}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={5}
            />
            {formik.touched.topics && formik.errors.topics ? (
              <div className="text-red-500 text-sm">{formik.errors.topics}</div>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="paymentAmount">IDLE Amount *</Label>
            <div className="flex items-center relative">
              <Input
                id="paymentAmount"
                name="paymentAmount"
                value={formik.values.paymentAmount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="example: 10"
                className="resize-none rounded duration-200 ease-in-out"
                required
              />
              <span className="absolute right-1 bg-secondary p-1 px-3 rounded text-primary">
                IDLE
              </span>
            </div>
            {formik.touched.paymentAmount && formik.errors.paymentAmount ? (
              <div className="text-red-500 text-sm">
                {formik.errors.paymentAmount}
              </div>
            ) : null}
          </div>
        </section>

        <section className="space-y-5">
          <div className="grid gap-2">
            <Label htmlFor="generalStyle">Agent General Style *</Label>
            <Textarea
              id="generalStyle"
              name="generalStyle"
              value={formik.values.generalStyle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder='example: "generalStyle: emphasizing authenticity and realness, etc."'
              className="resize-none rounded duration-200 ease-in-out"
              rows={5}
              required
            />
            {formik.touched.generalStyle && formik.errors.generalStyle ? (
              <div className="text-red-500 text-sm">
                {formik.errors.generalStyle}
              </div>
            ) : null}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="chatStyle">Agent Chat Style *</Label>
            <Textarea
              id="chatStyle"
              name="chatStyle"
              value={formik.values.chatStyle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder='example: "direct, casual, and friendly, etc."'
              className="resize-none rounded duration-200 ease-in-out"
              rows={5}
              required
            />
            {formik.touched.chatStyle && formik.errors.chatStyle ? (
              <div className="text-red-500 text-sm">
                {formik.errors.chatStyle}
              </div>
            ) : null}
          </div>
        </section>
      </div>
      <section className="flex items-center justify-center">
        <Button
          className="rounded font-bold uppercase shadow-md shadow-primary border-background border-2"
          type="submit"
          disabled={
            isPending ||
            isConfirming ||
            isConfirmed ||
            !formik.isValid ||
            // !file ||
            formik.isSubmitting ||
            isSuccess ||
            !formik.values.name ||
            !formik.values.ticker ||
            !formik.values.iconUrl ||
            !formik.values.description ||
            !formik.values.twitter ||
            !formik.values.website ||
            !formik.values.behavior ||
            !formik.values.paymentAmount ||
            !formik.values.chatStyle ||
            !formik.values.topics ||
            !formik.values.lore ||
            !formik.values.generalStyle ||
            !formik.values.chatStyle
          }
          size={"lg"}
        >
          {isPending || isConfirming ? (
            <div className="flex items-center gap-2">
              <span>Creating Agent</span>
              <LoaderCircle className="animate-spin" />
            </div>
          ) : (
            "Create Agent"
          )}
        </Button>
      </section>

      <section className="flex flex-col items-center justify-center space-y-5">
        {isConfirming && (
          <p className="text-sm text-muted-foreground text-center">
            Creating your AI AGENT...
          </p>
        )}
        {isConfirmed && (
          <p className="text-muted-foreground">Creating AI Success!</p>
        )}
        {chain?.id === 3441006 && isConfirmed && (
          <Button asChild className="rounded" variant={"outline"}>
            <Link
              href={`https://pacific-explorer.sepolia-testnet.manta.network/tx/${transactionHash}`}
              target="_blank"
            >
              View Transaction Manta Explorer
            </Link>
          </Button>
        )}

        {chain?.id === 57054 && isConfirmed && (
          <Button asChild className="rounded" variant={"outline"}>
            <Link
              href={`https://testnet.sonicscan.org/tx/${transactionHash}`}
              target="_blank"
            >
              View Transaction Sonic Explorer
            </Link>
          </Button>
        )}
      </section>
    </form>
  );
}
