module.exports = (face, label) => {
    const ANIMALS = new Set(['animal', 'mammal', 'cat', 'dog', 'alpaca', 'ant', 'bird', 'ferret', 'fish', 'frog', 'toad', 'gecko', 'gerbil', 'goat', 'guinea pig', 'hamster', 'hedgehog', 'hermit crab', 'horse', 'iguana', 'mantis', 'mouse', 'newt', 'pig', 'rabbit', 'rat', 'salamander', 'sheep', 'snake', 'spider', 'stick-bug', 'turtle', 'tortoise'])
    const NATURES = new Set(['Canal', 'Bridge', 'Dam', 'Lighthouse', 'Island', 'Bay', 'Riverbank', 'Beach', 'Sea', 'Ocean', 'Coast', 'Ground', 'Dune', 'Desert', 'Cliff', 'Park', 'Meadow', 'Jungle', 'Forest', 'Glacier', 'Land', 'Hill', 'Field', 'Grass', 'Soil', 'Sea', 'shell', 'Mushroom', 'Pebble', 'Rock', 'Stone', 'Smoke', 'Pond', 'River', 'Wave', 'Sky', 'Water', 'Tree', 'Plant', 'Moss', 'Flower', 'Bush', 'Sand', 'Mud', 'Stars', 'Planet', 'Mine', 'Path', 'Road', 'Tunnel', 'Volcano', 'Cave'])
    const FOODS = new Set(['Dish', 'Food', 'Cuisine', 'Ingredient', 'Comfort Food', 'Sashimi', 'Samgyeopsal', 'Meat', 'Pizza'])
    const res = {}
    if (face.length && face[0].detectionConfidence >= 0.8) {
        res.face = true
    }
    const labelCandidate = label.filter(i => i.score >= 0.8)
    // eslint-disable-next-line no-restricted-syntax
    for (const i of labelCandidate) {
        const description = i.description.toLowerCase()
        if (ANIMALS.has(description)) {
            res.animal = true
        }
        if (NATURES.has(description)) {
            res.nature = true
        }
        if (FOODS.has(description)) {
            res.foods = true
        }
    }
    if (res.length === 0) {
        res.others = true
    }
    return res
}
