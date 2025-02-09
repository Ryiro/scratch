export default function AboutPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">About Us</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg mb-4">
          Welcome to our PC building community. We&apos;re passionate about
          helping you build the perfect computer for your needs.
        </p>
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground">
              To provide high-quality PC components and expert guidance for
              builders of all levels.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-muted-foreground">
              To be the go-to platform for PC enthusiasts and builders
              worldwide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
