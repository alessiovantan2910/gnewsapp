import dynamic from "next/dynamic";

const NewsClient = dynamic (() =>import("./NewsClient"), {ssr:!!false})

type Article = {
    title : string;
    description: string;
    url: string;
    image?: string;
    publishedAt: string;
    source?: {name: string; url:string}
}

async function fetchTopHeadlines() {
 const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/news?lang=ja&country=jp&max=10`, {cache: "no-store"});
 if(!res.ok) throw new Error ("failed to fetch");
 return res.json();
}

export default async function NewsPage() {
    const data = await fetchTopHeadlines();;
    const articles : Article[] = data.articles ?? [];

    return(
        <div className="max-w3xl mx-auto px-4 py-8">
            <h1>ニュース検索</h1>
            <NewsClient/>
            <h1 className="text-2xl font-bold mb-6">最新ニュース</h1>
            <ul className="space-y-6">
      {articles.map((a, i)=> (
        <li
        key={i}
        className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
        >
            {a.image &&(
            <img 
            src={a.image}
            alt=""
            className="w-full rounded-md mb-4 object-cover"
            />
)}
<a href={a.url}
target="_blank"
rel="noreferrer"
className="text-lg font-semibold text-blue-600 hover:underline"
>
    {a.title}
</a>
{a.description && (
    <p className="mt-2 text-gray-600">{a.description}</p>
)}
<div className="mt-3 text-sm text-gray-500">
{a.source?.name}{""}
{a.publishedAt && `${new Date(a.publishedAt).toLocaleString("ja-JP")}`}
</div>
    </li>
      ))}
            </ul>
        </div>
    )
    
}
