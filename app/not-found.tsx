import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] flex-col items-center justify-center px-5 text-center">
      <p className="eyebrow mb-6">404</p>
      <h1 className="font-display text-5xl font-light text-parchment md:text-7xl">
        This ground is <span className="italic text-brass">uncharted.</span>
      </h1>
      <p className="mt-5 max-w-md text-parchment/60">
        The page you&apos;re looking for has wandered off. Let&apos;s get you back
        to the coffee.
      </p>
      <div className="mt-10">
        <Button href="/" variant="solid">
          Back home
        </Button>
      </div>
    </section>
  );
}
