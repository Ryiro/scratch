interface Props {
  params: {
    productId: string;
  };
}

async function ProductPage({ params }: Props) {
  const { productId } = await params;
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Product Details</h1>
      <p className="text-lg">You are viewing: {productId}</p>
    </div>
  );
}

export default ProductPage;
