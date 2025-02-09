import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PreBuiltPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Pre-Built Gaming PCs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Starter Gaming PC</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Entry level gaming experience
            </p>
          </CardContent>
        </Card>
        {/* Add more pre-built PC cards */}
      </div>
    </div>
  );
}
