
import "./globals.css";

export const metadata = { title : "Next.js x Gnews"}

export default function RootLayout({children}: {children: React.ReactNode;}) {
  return (
    <html lang="ja">
      <body style={{ fontFamily :"sans-serif, system-ui", margin: 0}}>
        <header style={{padding: "12px 16px", borderBottom:"1px solid #eee"}}>
            <strong>Next.js x Gnews</strong>
       
        </header>
        <main style={{ maxWidth: "960", margin:"16px auto", padding: "0 12px"}}>
        {children}
           
        </main>
      </body>
    </html>
  );
}
