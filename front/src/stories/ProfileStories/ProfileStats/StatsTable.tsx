import * as React from "react";

interface Transaction {
    type: string;
    timestamp: string;
    collectionSrc: string;
    collectionAlt: string;
    collectionName: string;
    price: string;
}

interface TransactionRowProps {
    transaction: Transaction;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ transaction }) => (
    <div className="flex gap-5 p-0.5 w-full border-b border-solid bg-zinc-900 border-white border-opacity-10 max-md:flex-wrap max-md:max-w-full">
        <div className="flex flex-1 gap-2 py-4 pr-3.5 pl-9 whitespace-nowrap border border-solid bg-zinc-900 border-zinc-900 max-md:px-5">
            <div className="shrink-0 my-auto w-3 h-3 rounded border border-solid border-zinc-400" />
            <div>{transaction.type}</div>
        </div>
        <div className="flex-1 justify-center items-start px-4 py-7 border border-solid bg-zinc-900 border-zinc-900 max-md:pr-5">
            {transaction.timestamp}
        </div>
        <div className="flex flex-1 gap-2.5 px-4 py-5 border border-solid bg-zinc-900 border-zinc-900">
            <img
                loading="lazy"
                src={transaction.collectionSrc}
                alt={transaction.collectionAlt}
                className="shrink-0 w-7 rounded-full aspect-square"
            />
            <div className="flex-auto my-auto">
                {transaction.collectionName}
            </div>
        </div>
        <div className="flex-1 justify-center items-start px-4 py-7 border border-solid bg-zinc-900 border-zinc-900 max-md:pr-5">
            {transaction.price}
        </div>
    </div>
);

const transactions: Transaction[] = [
    {
        type: "Transfer",
        timestamp: "July 4, 15:20",
        collectionSrc:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/4b31c1183240f844cc6f37b6499a78577985164232bc6a2102bfcfc730fbff62?apiKey=305a6c025418439087e8bfc27b932f06&",
        collectionAlt: "Collection 1",
        collectionName: "Big Ape",
        price: "2 ETH",
    },
    {
        type: "Transfer",
        timestamp: "July 4, 15:20",
        collectionSrc:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/4b31c1183240f844cc6f37b6499a78577985164232bc6a2102bfcfc730fbff62?apiKey=305a6c025418439087e8bfc27b932f06&",
        collectionAlt: "Collection 2",
        collectionName: "Big Ape",
        price: "2 ETH",
    },
];

const StatsTable: React.FC = () => (
    <section className="flex flex-col self-stretch px-5 pt-10 pb-4 font-medium rounded-2xl border border-solid bg-zinc-900 border-white border-opacity-10 max-w-[983px]">
        <header className="text-sm uppercase text-zinc-500 max-md:max-w-full">
            Transaction History
        </header>
        <div className="flex flex-col py-0.5 mt-9 text-base rounded-xl border border-solid border-white border-opacity-10 text-neutral-200 max-md:max-w-full">
            <div className="flex gap-5 p-0.5 w-full whitespace-nowrap rounded-xl bg-neutral-900 leading-[162.5%] text-zinc-400 max-md:flex-wrap max-md:max-w-full">
                <div className="flex flex-1 gap-2 py-4 pr-3.5 pl-9 border border-solid bg-neutral-900 border-neutral-900 max-md:px-5">
                    <div className="shrink-0 my-auto w-3 h-3 rounded border border-solid border-zinc-400" />
                    <div>Type</div>
                </div>
                <div className="flex-1 justify-center items-start px-4 py-7 border border-solid bg-neutral-900 border-neutral-900 max-md:pr-5">
                    Timestamp
                </div>
                <div className="flex-1 justify-center items-start px-4 py-7 border border-solid bg-neutral-900 border-neutral-900 max-md:pr-5">
                    Collection
                </div>
                <div className="flex-1 justify-center py-4 pr-3.5 pl-4 border border-solid bg-neutral-900 border-neutral-900 max-md:pr-5">
                    Price
                </div>
            </div>
            {transactions.map((transaction, index) => (
                <TransactionRow key={index} transaction={transaction} />
            ))}
        </div>
    </section>
);

// export default TransactionHistory;
export default StatsTable;
