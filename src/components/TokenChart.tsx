import React from 'react';

const TokenChart: React.FC = () => {
    return (
        <div className='w-full h-full col-span-2'>
            <iframe
                src="https://s.tradingview.com/embed-widget/advanced-chart/?symbol=BINANCE%3ABTCUSDT&interval=D&hidesidetoolbar=1&theme=dark&style=1&timezone=Etc%2FUTC"
                frameBorder="0"
                scrolling="no"
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                }}
            ></iframe>
        </div>
    );
};

export default TokenChart;