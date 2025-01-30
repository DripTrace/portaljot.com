export interface LinkView {
    linkId: number;
    userId: number;
    url: string;
    label: string;
}

export const linkViews: LinkView[] = [
    {
        linkId: 1,
        userId: 1,
        url: "https://github.com/user1",
        label: "GitHub Profile",
    },
    {
        linkId: 2,
        userId: 2,
        url: "https://twitter.com/user2",
        label: "Twitter Profile",
    },
    // Additional links...
];
