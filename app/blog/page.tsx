import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BlogPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">PC Building Blog</h1>
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Latest PC Building Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Stay updated with the latest in PC building.
            </p>
          </CardContent>
        </Card>
        {/* Add more blog post cards */}
      </div>
    </div>
  );
}
