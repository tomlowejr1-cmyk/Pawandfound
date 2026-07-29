import re

# Update the route path in the moved file
with open('src/routes/product.$slug.tsx', 'r') as f:
    content = f.read()
content = content.replace('createFileRoute("/products/$slug")', 'createFileRoute("/product/$slug")')

# Update all links in the file from /products/ to /product/
content = content.replace('href={`/products/${product.slug}`}', 'href={`/product/${product.slug}`}')
content = content.replace('href={`/products/${r.slug}`}', 'href={`/product/${r.slug}`}')
content = content.replace("/products/${product.slug}", "/product/${product.slug}")
content = content.replace("SITE_URL}/products/", "SITE_URL}/product/")

with open('src/routes/product.$slug.tsx', 'w') as f:
    f.write(content)

# Update all product links in products listing page
with open('src/routes/products.tsx', 'r') as f:
    content = f.read()
content = content.replace('/products/${product.slug}', '/product/${product.slug}')
with open('src/routes/products.tsx', 'w') as f:
    f.write(content)

# Update all product links in homepage
with open('src/routes/index.tsx', 'r') as f:
    content = f.read()
content = content.replace('/products/${product.slug}', '/product/${product.slug}')
with open('src/routes/index.tsx', 'w') as f:
    f.write(content)

# Now regenerate routeTree.gen.ts properly
# Read the file
with open('src/routeTree.gen.ts', 'r') as f:
    content = f.read()

# Replace the old import path
content = content.replace("./routes/products.$slug", "./routes/product.$slug")

# Write back
with open('src/routeTree.gen.ts', 'w') as f:
    f.write(content)

print("Done - route files updated")