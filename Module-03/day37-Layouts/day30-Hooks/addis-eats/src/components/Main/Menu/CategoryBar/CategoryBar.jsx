import "./CategoryBar.css";

const CategoryBar = ({ categories, selected, onSelect }) => {
  return (
    <div className="category-bar">
      {categories.map((category) => (
        <button
          key={category}
          className={selected === category ? "chip active" : "chip"}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;