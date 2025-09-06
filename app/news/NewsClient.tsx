"use client";

import { useEffect, useState } from "react";

type Article = {
    title : string;
    description: string;
    url: string;
    image?: string;
    publishedAt: string;
    source?: {name: string; url:string}
}

const TOPICS = [
    {key: "", label:"全て"},
    {key: "business", label:"ビジネス"},
    {key: "tecnology", label:"テクノロジー"},
    {key: "entertainment", label:"エンタメ"},
    {key: "soprts", label:"スポーツ"},
    {key: "science", label:"サイエンス"},
    {key: "health", label:"ヘルス"},
]

export default function NewsClient(){
    const [q, setQ] = useState("")
    const [topic, setTopic] = useState("");
    const [loading, setLoading] = useState(false);
    const [articles, setArticles] = useState<Article[]>([]);
    const [error, setError] = useState<string | null>(null);

    async function load() {
        setLoading(true); setError(null);
        const p = new  URLSearchParams ({lang: "ja", country: "jp", max:"10"})
        if(q.trim()) p.set("q", q.trim())
        if(topic) p.set("topic", topic)
            try {
        const res = await fetch(`/api/news?${p.toString()}`, {cache: "no-store"})
        const data = await res.json();
                if(!res.ok) throw new Error(data?.error ?? "not fetched")
                setArticles(data.articles ?? [])
        }catch (e:any){
            setError(e?.message ?? "エラーが発生しました")
        }finally{
            setLoading(false)
        }
    } 

    useEffect(() => {load}, []) 

    return(
        <div className="max-w-5xl mx-auto px-4 py-8">
            <form 
            onSubmit={(e)=> {
                e.preventDefault();
                load();
            }}
            className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center"
            aria-label="ニューズ検索フォーム"
            >
                <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="キーワード検索"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500"
                aria-label="キーワード"
                />
                <select 
                value = {topic}
                onChange={(e) => setTopic(e.target.value)}
                aria-label="トピック"
                className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 "
                >
                {TOPICS.map((t)=> (
                 <option key={t.key} value={t.key}>
                    {t.label}
                </option>
                ))}
                </select>
                <button
                type="submit"
                className="rounded-md bu-blue-600 px-4 py-2 font-medium text-white hover:bu-blue-700 active:bg-blue-800"
                >
                    検索
                </button>
            </form>
            {loading && (
                <p className="py-2 text-sm text-gray-500">
                    読み込み中。。。
                </p>
            )}

            {error && (
                <p className="py-2 text-sm text-red-600">
                    {error}
                </p>
            )}

            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {articles.map((a, i)=>(
                 <li
                 className="rounded-lg border border-gray-200 p-4 shadow-sm transition hover:shadow-md "
                    key={a.url || String(i)}
                 >
                    {a.image && (
                      <img
                      src={a.image}
                      alt=""
                      loading="lazy"
                      className="mb-3 h-48 w-full rounded-md object-cover"
                      />
                    )}
                 {a.title}
                    <a/>
                    {a.description && (
                         <p className="mt-2 text-gray-500 ">
                            {a.description}
                         </p>
                    )}
                  
                    <div className="mt-3 flex flex-wrap items-center gap-x-2 text-xs text-gray-500">
                        {a.source?.name && <span>{a.source.name}</span>}
                        {a.publishedAt && (
                            <span>
                                / {new Date(a.publishedAt).toLocaleString("ja-JP")}
                            </span>
                        )}
                    </div>
                </li>
                ))}
            </ul>
        </div>
    )
}



    

