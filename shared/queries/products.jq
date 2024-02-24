(map(.brand) | unique_by(.) | [to_entries[] | { (.value): (.key+1) }] | add) as $brands |
(map(.category) | unique_by(.) | [to_entries[] | { (.value): (.key+1) }] | add) as $categories |
map({
    id: .id,
    title: .title,
    description: .description,
    brand: $brands[.brand],
    category: $categories[.category],
    price: { 
        "value": .price, 
        "currency": "USD" 
    },
    thumbnail: .thumbnail,
    images: .images,
    properties: [],
    variations: [],
})