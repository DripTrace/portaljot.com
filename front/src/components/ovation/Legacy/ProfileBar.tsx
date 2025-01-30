import React, { useEffect, useState } from "react";

type User = {
    id: string;
    username: string;
    rank: number;
    name: string;
    user: string;
    pfp_image: string;
    pfp: string;
    badge_count: number;
    followers: number;
    walletValue: string;
    nftCount: number;
    portfoliovalue: number;
    fnftholder: boolean;
};

type SortCriteria = "rank" | "followers" | "portfoliovalue";
const ProfileBar: React.FC = () => {
    const [users, setUsers] = useState<User[] | null>(null);
    const [sortCriteria, setSortCriteria] = useState<SortCriteria>("rank");
    const [isAscending, setIsAscending] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch("/api/users");
            const data = await res.json();
            const usersData = data[0].map((user: User, index: number) => ({
                rank: index + 1,
                id: user.id,
                name: user.username,
                user: user.username,
                pfp: user.pfp_image,
                badges: user.badge_count,
                followers: user.followers,
                portfoliovalue: parseFloat(user.walletValue),
                fnftholder: user.nftCount > 0,
            }));
            setUsers(usersData);
        };

        fetchUsers();
    }, []);

    const toggleSort = (criteria: SortCriteria) => {
        if (sortCriteria === criteria) {
            setIsAscending(!isAscending);
        } else {
            setSortCriteria(criteria);
            setIsAscending(true); // reset to ascending when criteria changes
        }
    };

    const sortedUsers =
        users &&
        [...users].sort((a, b) => {
            const valueA = a[sortCriteria];
            const valueB = b[sortCriteria];
            if (isAscending) {
                return valueA < valueB ? -1 : 1;
            } else {
                return valueA > valueB ? -1 : 1;
            }
        });

    return (
        <div className="w-full">
            <div className="w-full flex bg-ovtealdull h-12 sticky top-40 z-10 items-center text-center justify-center pr-7">
                <div className="w-20">
                    <button onClick={() => toggleSort("rank")}>#</button>
                </div>
                <div className="w-[310px] flex">Profile</div>
                <div className="w-[125px]">Badges</div>
                <div className="w-[80px] text-center">
                    <button onClick={() => toggleSort("followers")}>
                        Followers
                    </button>
                </div>
                <div className="w-[225px] text-center">
                    <button onClick={() => toggleSort("portfoliovalue")}>
                        Portfolio Value
                    </button>
                </div>
                <div className="w-[184px] text-center">Founder NFT Holder</div>
            </div>

            {sortedUsers &&
                sortedUsers.map((user, index) => (
                    <div
                        key={index}
                        className="h-20 flex border-b border-ovtealdull items-center font-light"
                    >
                        <div className="w-20"># {user.rank}</div>
                        <div className="w-[310px] flex">
                            <img
                                src={`/images/users/${user.id}/${user.pfp}`}
                                alt="Profile"
                                className="rounded-full bg-ovteal w-12 h-12 object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                        "/defaultPfp.svg";
                                }}
                            />
                            <div className="ml-2">
                                <div className="">{user.name}</div>
                                <div className="text-sm text-neutral-500">
                                    {user.user}
                                </div>
                            </div>
                        </div>
                        <div className="w-[125px]">
                            Badges: {user.badge_count}
                        </div>
                        <div className="w-[80px] text-center">
                            {user.followers}
                        </div>
                        <div className="w-[225px] text-center">
                            ${user.portfoliovalue}
                        </div>
                        <div className="w-[184px] text-center">
                            {user.fnftholder ? "Yes" : "No"}
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default ProfileBar;
