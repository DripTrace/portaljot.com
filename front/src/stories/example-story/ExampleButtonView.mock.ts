export interface ExampleButtonView {
    buttonViewId: number;
    userId: number;
    url: string;
    label: string;
}

export const exampleButtonViews: ExampleButtonView[] = [
    {
        buttonViewId: 1,
        userId: 1,
        url: "https://github.com/user1",
        label: "GitHub Profile",
    },
    {
        buttonViewId: 2,
        userId: 2,
        url: "https://twitter.com/user2",
        label: "Twitter Profile",
    },
    // Additional exampleButtonViews (links)...
];
