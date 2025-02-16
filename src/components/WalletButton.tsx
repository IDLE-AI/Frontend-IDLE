'use client'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '@/components/ui/button';
import { Circle } from 'lucide-react';

export default function WalletButton() {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                // Note: If your app doesn't use authentication, y ou
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                        authenticationStatus === 'authenticated');
                return (
                    <div
                        {...(!ready && {
                            'aria-hidden': true,
                            'style': {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <Button onClick={openConnectModal} type="button"
                                        className='rounded font-bold'
                                        size={'lg'}>
                                        Connect Wallet
                                    </Button>
                                );
                            }
                            if (chain.unsupported) {
                                return (
                                    <Button onClick={openChainModal} type="button"
                                        className='rounded font-bold'
                                        size={'lg'}
                                        variant={"destructive"}
                                    >
                                        Wrong network
                                    </Button>
                                );
                            }
                            return (
                                <div className='flex gap-5'>
                                    {/* <Button
                                        onClick={openChainModal}
                                        style={{ display: 'flex', alignItems: 'center' }}
                                        type="button"
                                        variant={'ghost'}
                                        className='rounded font-bold'
                                        size={'lg'}
                                        disabled={true}
                                    >
                                        {chain.hasIcon && (
                                            <div
                                                style={{
                                                    background: chain.iconBackground,
                                                    width: 20,
                                                    height: 20,
                                                    borderRadius: 999,
                                                    overflow: 'hidden',
                                                    marginRight: 4,
                                                }}
                                            >
                                                {chain.iconUrl && (
                                                    <img
                                                        alt={chain.name ?? 'Chain icon'}
                                                        src={chain.iconUrl}
                                                        style={{ width: 20, height: 20 }}
                                                    />
                                                )}
                                            </div>
                                        )}
                                    </Button> */}
                                    {chain.hasIcon && (
                                        <div className='flex items-center gap-1'>
                                            <div
                                                style={{
                                                    background: chain.iconBackground,
                                                    width: 25,
                                                    height: 25,
                                                    borderRadius: 999,
                                                    overflow: 'hidden',
                                                    marginRight: 4,
                                                }}
                                            >
                                                {chain.iconUrl && (
                                                    <img
                                                        alt={chain.name ?? 'Chain icon'}
                                                        src={chain.iconUrl}
                                                        style={{ width: 25, height: 25, }}
                                                    />
                                                )}
                                            </div>
                                            <div className='flex items-center gap-1'>
                                                <p className='text-sm text-muted-foreground'>{chain.name} Network</p>
                                                <Circle className='w-2 h-2 animate-ping opacity-75' fill='#22c55e' strokeWidth={0} />
                                            </div>
                                        </div>
                                    )}
                                    <Button onClick={openAccountModal} type="button" variant={'outline'} className='rounded font-bold'
                                        size={'lg'}>
                                        {account.displayName}
                                        {account.displayBalance
                                            ? ` (${account.displayBalance})`
                                            : ''}
                                    </Button>
                                </div>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
};