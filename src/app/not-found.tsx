import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="container">
        <span className="eyebrow">Pagina niet gevonden</span>
        <h1>Deze pagina bestaat niet of is nog niet gepubliceerd.</h1>
        <p>
          Controleer de Storyblok-content of ga terug naar de startpagina om verder te navigeren.
        </p>
        <Link className="button" href="/">
          Naar home
        </Link>
      </div>
    </main>
  );
}
