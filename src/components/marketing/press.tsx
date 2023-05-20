"use client";
const pressArticles: {
  id: number;
  title: string;
  body: string;
  href: string;
}[] = [
  {
    id: 1,
    title: "Secondary Watch Market to Top New Sales by 2033 at $85 Billion",
    body: "Sales of second-hand luxury watches will overtake new models within a decade as buyers seek out scarce Rolex, Patek Philippe and Audemars Piguet timepieces, according to a new industry report...",
    href: "https://www.bloomberg.com/news/articles/2023-01-12/secondary-watch-market-to-top-new-sales-by-2033-at-85-billion",
  },
  {
    id: 2,
    title: "How One Guy’s Car Blog Became a $1 Billion Marketplace",
    body: "Bring a Trailer is where obsessives buy, sell and geek out over classic cars. The company pops open its hood after 100,000 auctions to explain why.",
    href: "https://www.wsj.com/articles/bring-a-trailer-car-auctions-randy-nonnenberg-fa23e131",
  },
  {
    id: 3,
    title: "Rolex Now Has a Resale Program. The Watch World Quakes.",
    body: "The privately owned Swiss brand dominates the market by virtually every measure. Will it swallow up resales, too?",
    href: "https://www.nytimes.com/2023/01/18/fashion/watches-rolex-resales.html",
  },
  {
    id: 4,
    title: "VCs to recommerce startups: Let’s pop some tags",
    body: "Ecommerce is a concept as old as trade itself. Everyone knows thrift stores or has bought a used product before — it’s not a new concept. Yet, today it’s become one of the hottest topics for consumers, brands and investors alike with a record ~$6 billion of venture capital funding pouring into recommerce companies in 2021 and the market projected to reach $250 billion+ by 2027. That’s 5x faster growth than the overall retail market.",
    href: "https://techcrunch.com/2023/04/07/vcs-to-recommerce-startups-lets-pop-some-tags/",
  },
  {
    id: 5,
    title: "OfferUp Recommerce Report 2022",
    body: "The growth of recommerce shows us the potential we’ve always known at OfferUp — the future of recommerce is bright.",
    href: "https://recommercereport.com/",
  },
];

export default function Press() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            Supporting press
          </h2>
        </div>
        <div className="mt-20">
          <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:grid-cols-3 lg:gap-x-10">
            {pressArticles.map((article) => (
              <div key={article.id}>
                <a
                  target="_blank"
                  href={article.href}
                  className="text-base font-semibold leading-7 text-indigo-600 hover:text-indigo-500"
                >
                  {article.title}
                </a>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {article.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
