import { error } from "console";
import { NextResponse } from "next/server";

const BASE = "https://gnews.io/api/v4/top-headlines"

export async function GET(req: Request) {

    const {searchParams} = new URL(req.url)
    const q = searchParams.get("q") || "";
    const topic = searchParams.get("topic") || "";
    const lang =searchParams.get("lang") || "ja";
    const country = searchParams.get("country") || "jp";
    const max = searchParams.get("max") || "10";

const token = process.env.GNEWS_API_KEY;
if(!token){
    return NextResponse.json({error:"missing api key"}, {status: 500})
}

const params = new URLSearchParams({
    lang, country, topic, max, token
})
if (q) params.set("q", q);
if (topic) params.set("topic", topic)

const url = `${BASE}?${params.toString()}`


try {
    const res = await fetch(url, {cache: "no-store"})
    if(!res.ok){
        return NextResponse.json({error :  `Upstream error : ${res.status}`},  {status: 500})
    }
    const data = await res.json();
    return NextResponse.json(data, {status: 200})
}catch (e: any){
return NextResponse.json({ error: e?.message ?? "Unkwow error"}, {status: 500})
}

}