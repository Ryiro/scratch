export default function BrandsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Our Brands</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Add brand logos and links */}
        <div className="flex items-center justify-center p-6 bg-card rounded-lg">
          {/* Example brand card */}
          <p className="text-muted-foreground">Brand Logo</p>
        </div>
      </div>
    </div>
  );
}
