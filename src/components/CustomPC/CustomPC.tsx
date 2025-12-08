import { useState } from "react";
import { useProductContext } from "../../context/ProductContext";
import { useCategoryContext } from "../../context/CategotyContext";
import { ChevronDown, ChevronUp, X } from "lucide-react";

type Category = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  name: string;
  image: string;
  image_urls?: string[];
  price: number;
  specs: string;
  category: number;
};

type SelectedComponents = {
  [categoryId: number]: Product[];
};

const CustomPcBuild = () => {
  const { products } = useProductContext() as { products: Product[] };
  const { category: categoryList } = useCategoryContext() as { category: Category[] };

  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const [selectedComponents, setSelectedComponents] = useState<SelectedComponents>({});

  const categoryMap: { [key: number]: string } = categoryList?.reduce((acc, cat) => {
    acc[cat.id] = cat.name;
    return acc;
  }, {} as { [key: number]: string });

  const cleanCategoryName = (name: string) =>
    name?.endsWith("FTDC") ? name.replace(/ FTDC$/, "") : name;

  const toggleCategory = (categoryId: number) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  const handleSelection = (categoryId: number, component: Product) => {
    setSelectedComponents((prev) => {
      const currentSelection = prev[categoryId] || [];
      const exists = currentSelection.some((p) => p.id === component.id);

      const updatedSelection = exists
        ? currentSelection.filter((p) => p.id !== component.id)
        : [...currentSelection, component];

      return {
        ...prev,
        [categoryId]: updatedSelection,
      };
    });
  };

  const handleRemoveSelection = (categoryId: number, productId: number) => {
    setSelectedComponents((prev) => {
      const updated = { ...prev };
      updated[categoryId] = updated[categoryId].filter((p) => p.id !== productId);

      if (updated[categoryId].length === 0) {
        delete updated[categoryId];
      }

      return updated;
    });
  };

  const handleConfirmSelection = () => {
    const allSelectedComponents = Object.values(selectedComponents).flat();
    console.log("Selected Components in One Array:", allSelectedComponents);
  };
  const totalPrice = Object.values(selectedComponents)
    .flat()
    .reduce((acc, component) => acc + (Number(component?.price) || 0), 0);

  return (
    <section className="section-pt px-2 md:px-32">
      <h2 className="text-2xl sm:text-3xl font-bold font-squares text-center mt-6 mb-2 text-white">
        Select Your Custom PC
      </h2>
      <p className="text-md sm:text-lg font-medium text-gray-300 text-center mb-6">
        Build the perfect PC tailored to your needs. Choose your components, optimize performance, and create a machine that fits your workflow.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Selector */}
        <div>
          {Array.from(new Set(products?.map((item) => item.category))).map((categoryId) => (
            <div key={categoryId} className="mb-4">
              <div
                className="flex justify-between items-center bg-zinc-900 hover:bg-zinc-800 transition-colors duration-200 text-white p-4 cursor-pointer border border-primary rounded-xl shadow-sm"
                onClick={() => toggleCategory(categoryId)}
              >
                <h2 className="text-md sm:text-lg font-squares flex items-center">
                  {cleanCategoryName(categoryMap[categoryId] || "Unknown Category")}
                </h2>
                {openCategory === categoryId ? <ChevronUp /> : <ChevronDown />}
              </div>

              {openCategory === categoryId && (
                <div className="bg-zinc-800 text-white p-4 border border-primary rounded-b-xl shadow-inner">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {products
                      .filter((item) => item.category === categoryId)
                      .map((component) => (
                        <div
                          key={component.id}
                          className={`p-4 rounded-xl cursor-pointer transition-transform duration-200 transform hover:scale-105 shadow-md border
                            ${selectedComponents[categoryId]?.some((p) => p.id === component.id)
                              ? "border-primary border-2 text-white"
                              : "bg-gray-800"
                            }`}
                          onClick={() => handleSelection(categoryId, component)}
                        >
                          <img
                            src={component.image_urls?.[0] || component.image}
                            alt={component.name}
                            className="w-full h-24 object-cover mb-2 rounded"
                          />
                          <p className="text-sm font-semibold truncate">{component.name}</p>
                          <p className="text-xs text-gray-400 truncate">{component.specs}</p>
                          <p className="text-brandColor-600 font-bold mt-1">₹{component.price}/-</p>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Selected Items */}
        <div className="p-4 bg-zinc-900 text-white border border-primary rounded-xl shadow-lg">
          <h3 className="text-lg font-bold font-squares mb-4">Selected Items</h3>
          {Object.keys(selectedComponents).length > 0 ? (
            <>
              {Object.entries(selectedComponents).map(([categoryId, components]) =>
                components.map((component) => (
                  <div
                    key={component.id}
                    className="flex items-center justify-between bg-zinc-800 rounded-lg p-3 mb-3 shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={component?.image_urls?.[0] || component.image}
                        alt={component.name}
                        className="w-12 sm:w-16 h-12 sm:h-16 object-cover rounded"
                      />
                      <div>
                        <p className="text-sm sm:text-md font-medium">{component.name}</p>
                        <p className="text-red-500 font-bold">₹{component.price}/-</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveSelection(Number(categoryId), component.id)}
                      className="ml-4 text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                    >
                      <X />
                    </button>
                  </div>
                ))
              )}

              <div className="mt-4 p-3 border-t border-primary">
                <h4 className="text-lg font-semibold font-squares">
                  Total Price:
                  <span className="text-red-500 font-bold text-xl ml-2">₹{totalPrice}/-</span>
                </h4>
              </div>

              <button
                className="mt-6 w-full bg-primary transition-colors text-black font-bold py-2 px-4 rounded-xl shadow-md"
                onClick={handleConfirmSelection}
              >
                Add to Cart
              </button>
            </>
          ) : (
            <p className="text-gray-400 text-sm sm:text-base">No components selected</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CustomPcBuild;
