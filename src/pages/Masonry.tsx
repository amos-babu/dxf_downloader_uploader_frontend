const Masonry = () => {
  const items = [
    { item:  "Item 1", style: "item1"},
    { item:  "Item 2", style: "item2"},
    { item:  "Item 3", style: "item3"},
    { item:  "Item 4", style: "item4"},
    { item:  "Item 5", style: "item5"},
    { item:  "Item 6", style: "item6"},
    { item:  "Item 7", style: "item7"},
    { item:  "Item 8", style: "item8"},
    { item:  "Item 9", style: "item9"},
    { item:  "Item 10", style: "item10"},
  ]
  return (
    <div className="masonry">
      {items.map((item, index) => (
          <div key={index} className={`item ${item.style}`}>{item.item}</div>
      ))}
    </div>
  );
};

export default Masonry;
