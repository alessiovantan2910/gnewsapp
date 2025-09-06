"use client";

export default function ({ error, reset}: {error: Error; reset: () => void}){
    return(
        <div className="py-10 text-center text-red-500">
            <h2 className="text-xl font-bold mb-4"></h2>
            <p className="mb-6">{error.message}</p>
            <button onClick={ () => reset()}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-800"
                >
              再試行  
            </button>
        </div>
    )
}