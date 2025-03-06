"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  useAccount,
  useChainId,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { motion } from "framer-motion";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import Image from "next/image";
import WalletButton from "@/components/WalletButton";
import Link from "next/link";
import { TokenABI, TokenAddress, TokenAddressSonic } from "@/contracts/Token";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FactoryTokenABI,
  FactoryTokenAddress,
  FactoryTokenAddressSonic,
} from "@/contracts/FactoryToken";
import { parseUnits } from "viem";
import { ChainConfig } from "@/config/RainbowkitConfig";

const steps = [
  { title: "Agent Details", component: "details" },
  { title: "Agent Socials", component: "socials" },
  { title: "Agent Settings", component: "settings" },
];

const pageVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

export default function CreateAgent() {
  const { address, isConnected } = useAccount();
  const chain = useChainId();
  const chainId = ChainConfig.chains.find((c) => c.id === chain)?.id;

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

  const [currentStep, setCurrentStep] = useState(0);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (chainId === 3441006) {
      try {
        const approvalTx = await writeContract({
          address: TokenAddress,
          abi: TokenABI,
          functionName: "approve",
          args: [
            FactoryTokenAddress,
            parseUnits(formik.values.paymentAmount.toString(), 18),
          ],
        });

        const createTokenTx = await writeContract({
          address: TokenAddress,
          abi: FactoryTokenABI,
          functionName: "createTokenWithPayment",
          args: [
            formik.values.name,
            formik.values.ticker,
            formik.values.iconUrl,
            formik.values.description,
            formik.values.twitter,
            formik.values.website,
            formik.values.behavior,
            parseUnits(formik.values.paymentAmount.toString(), 18),
          ],
        });

        console.log("Approval Transaction:", approvalTx);
        console.log("Create Token Transaction:", createTokenTx);
      } catch (error) {
        console.error("Transaction failed:", error);
        alert("Transaction failed. Please try again.");
      }
    }

    if (chainId === 57054) {
      try {
        const approvalTx = await writeContract({
          address: TokenAddressSonic,
          abi: TokenABI,
          functionName: "approve",
          args: [
            FactoryTokenAddressSonic,
            parseUnits(formik.values.paymentAmount.toString(), 18),
          ],
        });

        const createTokenTx = await writeContract({
          address: FactoryTokenAddressSonic,
          abi: FactoryTokenABI,
          functionName: "createTokenWithPayment",
          args: [
            formik.values.name,
            formik.values.ticker,
            formik.values.iconUrl,
            formik.values.description,
            formik.values.twitter,
            formik.values.website,
            formik.values.behavior,
            parseUnits(formik.values.paymentAmount.toString(), 18),
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

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.section
            key="details"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            className="space-y-5"
          >
            <div className="grid grid-cols-2 gap-5">
              <div>
                <h1 className="text-2xl font-semibold uppercase">
                  Agent Details
                </h1>
                <p className="text-muted-foreground text-sm">
                  Fill in the details of your AI Agent
                </p>
              </div>
              <div className="text-end">
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
                <span className="text-sm text-muted-foreground">
                  balance:{" "}
                  {(
                    Number(balanceIdleToken || balanceIdleTokenSonic) / 1e18
                  ).toFixed(0)}{" "}
                  IDLE
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Agent Image</Label>
              <div className="flex items-center gap-5">
                {imagePreview && (
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={150}
                    height={150}
                    className="rounded object-cover aspect-square"
                  />
                )}
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleChangeImage}
                  className="rounded duration-200 ease-in-out"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Agent Name</Label>
              <Input
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                placeholder='example: "The Crypto Agent"'
                className="rounded duration-200 ease-in-out"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ticker">Agent Ticker</Label>
              <Input
                id="ticker"
                name="ticker"
                value={formik.values.ticker}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                placeholder='example: "CRYPTO"'
                className="rounded duration-200 ease-in-out"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Agent Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="resize-none rounded duration-200 ease-in-out"
                rows={5}
                placeholder='example: "The Crypto Agent is a bot that tweets about crypto"'
                required
              />
            </div>
          </motion.section>
        );
      case 1:
        return (
          <motion.section
            key="socials"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            className="space-y-5"
          >
            <h1 className="text-2xl font-semibold uppercase">Agent Socials</h1>
            <div className="space-y-2">
              <Label>X or Twitter Link (optional)</Label>
              <Input
                name="twitter"
                value={formik.values.twitter}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                placeholder='example: "https://x.com/TheCryptoAgent"'
                className="rounded duration-200 ease-in-out"
              />
            </div>
            <div className="space-y-2">
              <Label>Website Link (optional)</Label>
              <Input
                name="website"
                value={formik.values.website}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                placeholder='example: "https://website.com/TheCryptoAgent"'
                className="rounded duration-200 ease-in-out"
              />
            </div>
          </motion.section>
        );
      case 2:
        return (
          <motion.section
            key="settings"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            className="space-y-5"
          >
            <h1 className="text-2xl font-semibold uppercase">Agent Settings</h1>
            <div className="space-y-2">
              <Label htmlFor="behavior">Agent Behavior</Label>
              <Textarea
                id="behavior"
                name="behavior"
                value={formik.values.behavior}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='example: "Always talks like a boss. drops a slang and crypto buzzwords nonstop..."'
                className="resize-none rounded duration-200 ease-in-out"
                rows={5}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lore">Agent Lore</Label>
              <Textarea
                id="lore"
                name="lore"
                value={formik.values.lore}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='example: "The Crypto Agent is a bot that tweets about crypto"'
                className="resize-none rounded duration-200 ease-in-out"
                rows={5}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="topics">Agent Topics</Label>
              <Input
                id="topics"
                name="topics"
                value={formik.values.topics}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='example: "topics: crypto nft defi"'
                className="resize-none rounded duration-200 ease-in-out"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="generalStyle">Agent General Style</Label>
              <Textarea
                id="generalStyle"
                name="generalStyle"
                value={formik.values.generalStyle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='example: "generalStyle: emphasizing authenticity and realness"'
                className="resize-none rounded duration-200 ease-in-out"
                rows={5}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="chatStyle">Agent Chat Style</Label>
              <Textarea
                id="chatStyle"
                name="chatStyle"
                value={formik.values.chatStyle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='example: "direct, casual, and friendly"'
                className="resize-none rounded duration-200 ease-in-out"
                rows={5}
                required
              />
            </div>
            <div className="space-y-2 w-fit">
              <Label htmlFor="paymentAmount">IDLE Amount</Label>
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
            </div>
          </motion.section>
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-[calc(100vh-25vh)] flex items-center justify-center">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded p-5 my-10 xl:w-1/3 2xl:w-1/4 bg-secondary/60"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center 
                                    ${
                                      index <= currentStep
                                        ? "bg-primary text-primary-foreground font-bold"
                                        : "bg-primary/20"
                                    }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                >
                  {index + 1}
                </motion.div>
                {index < steps.length - 1 && (
                  <motion.div
                    className={`h-1 w-24 mx-2 ${
                      index < currentStep ? "bg-primary" : "bg-primary/20"
                    }`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: index * 0.2 }}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.form
          onSubmit={formik.handleSubmit}
          className="space-y-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {renderStep()}

          <div className="flex justify-between mt-8">
            <Button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`${
                currentStep === 0 ? "hidden" : "rounded font-bold uppercase"
              }`}
              variant={"ghost"}
              size={"icon"}
            >
              <ArrowLeft />
            </Button>

            <Button
              type="submit"
              onClick={nextStep}
              className="rounded font-bold uppercase"
              disabled={
                currentStep === steps.length - 1 &&
                (isPending || isConfirming || isSuccess || isConfirmed)
              }
            >
              {currentStep === steps.length - 1 ? (
                isPending || isConfirming ? (
                  <div className="flex items-center gap-2">
                    <span>Creating Agent</span>
                    <LoaderCircle className="animate-spin" />
                  </div>
                ) : (
                  "Create Agent"
                )
              ) : (
                "Next"
              )}
            </Button>
          </div>

          <div className="grid place-content-center gap-2">
            {isConfirming && (
              <p className="text-sm text-muted-foreground text-center">
                Creating your AI AGENT...
              </p>
            )}
            {isConfirmed && (
              <p className="text-muted-foreground">Creating AI Success!</p>
            )}
            {chainId === 3441006 && isConfirmed && (
              <Button asChild className="rounded" variant={"outline"}>
                <Link
                  href={`https://pacific-explorer.sepolia-testnet.manta.network/tx/${transactionHash}`}
                  target="_blank"
                >
                  View Transaction Manta Explorer
                </Link>
              </Button>
            )}

            {chainId === 57054 && isConfirmed && (
              <Button asChild className="rounded" variant={"outline"}>
                <Link
                  href={`https://testnet.sonicscan.org/tx/${transactionHash}`}
                  target="_blank"
                >
                  View Transaction Sonic Explorer
                </Link>
              </Button>
            )}
          </div>
        </motion.form>
      </motion.main>
    </main>
  );
}
