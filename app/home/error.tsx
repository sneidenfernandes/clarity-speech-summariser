"use client"; // Required because error handling uses client-side APIs

type ErrorPageProps = {
  reset: () => void; // A function to retry rendering the segment
};

function reset(){
  window.location.href = "/home";
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <div>
      <h2>Something went wrong!</h2> 
      <button onClick={reset}>Try again</button>
    </div>
  );
}