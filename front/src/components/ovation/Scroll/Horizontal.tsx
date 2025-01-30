import ScrollTrap from "./ScrollTrap";

const HorizontalScrollCards = () => {
    const cards = Array.from({ length: 9 }, (_, index) => (
        <div
            key={index}
            className="inline-block min-w-[150px] h-20 bg-black border-2 border-red-600 mr-1"
        >
            <h2 className="text-white text-center">Card</h2>
        </div>
    ));

    return (
        <main className="bg-red-700 text-white font-sans min-h-screen p-4 max-w-[80rem]">
            <header className="text-center my-8">
                <h1 className="text-4xl">Smooth Horizontal Scrolling</h1>
            </header>
            <section className="text-lg">
                <p>
                    In the era of responsive design, often times we will have a
                    series of card-like divs. While we may show them all on
                    desktop, on mobile things tend to be different. What if we
                    want to have an inner container where the user scrolls left
                    and right to view each card? How do we achieve that?
                </p>
                <p>
                    Here's a demo. There are more cards to the right that can be
                    scrolled to.
                </p>

                <div
                    className="overflow-x-auto whitespace-nowrap py-4"
                    style={{ WebkitOverflowScrolling: "touch" }}
                >
                    {cards}
                </div>

                <p>
                    The <code>overflow-x-auto</code> and{" "}
                    <code>whitespace-nowrap</code> ensure that the div only
                    scrolls horizontally. The setup of the cards ensures they
                    line up correctly.
                </p>
                <p>
                    We can also use Flexbox to achieve the same result. Below is
                    the flexbox implementation for comparison:
                </p>

                <div
                    className="flex overflow-x-auto py-4"
                    style={{ WebkitOverflowScrolling: "touch" }}
                >
                    {cards}
                </div>

                <p>
                    The result is the same, with all cards on a single line,
                    scrollable left to right.
                </p>
                <p>
                    On iOS, the addition of{" "}
                    <code>-webkit-overflow-scrolling: touch</code> enhances the
                    scrolling experience. This property is important for smooth
                    touch scrolling in mobile Safari.
                </p>
            </section>
            {/* <ScrollTrap /> */}
        </main>
    );
};

export default HorizontalScrollCards;
