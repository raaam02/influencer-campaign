export function HeroSection() {
  return (
    <section className="bg-linear-to-br from-primary/10 via-background to-background py-16 px-4 text-center">
      <div className="max-w-3xl mx-auto space-y-5">
        <h1 className="text-4xl font-bold tracking-tight">
          Manage Campaigns Effortlessly
        </h1>
        <p className="text-muted-foreground text-lg">
          Plan, assign, and track influencer campaigns — all in one intuitive dashboard.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <a
            href="#campaigns"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition"
          >
            View Campaigns
          </a>
          <a
            href="/campaign/add"
            className="px-6 py-3 border rounded-full font-medium hover:bg-muted transition"
          >
            + Add Campaign
          </a>
        </div>
      </div>
    </section>
  );
}
