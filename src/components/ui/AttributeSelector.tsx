
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AttributeSelectorProps {
  onAttributeChange?: (type: string, value: string[]) => void;
}

const AttributeSelector = ({ onAttributeChange }: AttributeSelectorProps) => {
  const [selectedSkus, setSelectedSkus] = React.useState<string[]>([]);
  const [keyword, setKeyword] = React.useState<string>('');
  const [categories, setCategories] = React.useState<string[]>([]);
  const [excludeKeywords, setExcludeKeywords] = React.useState<string>('');

  const handleSkuChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const skus = e.target.value.split('\n').filter(sku => sku.trim() !== '');
    setSelectedSkus(skus);
    if (onAttributeChange) {
      onAttributeChange('sku', skus);
    }
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    if (onAttributeChange) {
      onAttributeChange('keyword', [e.target.value]);
    }
  };

  const handleExcludeKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExcludeKeywords(e.target.value);
    if (onAttributeChange) {
      onAttributeChange('excludeKeyword', [e.target.value]);
    }
  };

  // Dummy category hierachy for demo
  const categoryHierarchy = [
    { id: 'l1_1', name: 'Electrónica', level: 1 },
    { id: 'l2_1', name: 'Accesorios', level: 2, parentId: 'l1_1' },
    { id: 'l2_2', name: 'Computadoras', level: 2, parentId: 'l1_1' },
    { id: 'l3_1', name: 'Audio', level: 3, parentId: 'l2_1' },
    { id: 'l3_2', name: 'Video', level: 3, parentId: 'l2_1' },
    { id: 'l3_3', name: 'Laptops', level: 3, parentId: 'l2_2' },
    { id: 'l3_4', name: 'Desktops', level: 3, parentId: 'l2_2' },
  ];

  const handleCategorySelect = (categoryId: string) => {
    const isSelected = categories.includes(categoryId);
    const newCategories = isSelected 
      ? categories.filter(c => c !== categoryId)
      : [...categories, categoryId];
    
    setCategories(newCategories);
    if (onAttributeChange) {
      onAttributeChange('category', newCategories);
    }
  };

  const getCategoryBreadcrumb = (categoryId: string): string => {
    const category = categoryHierarchy.find(c => c.id === categoryId);
    if (!category) return '';
    
    if (!category.parentId) return category.name;
    
    return `${getCategoryBreadcrumb(category.parentId)} > ${category.name}`;
  };

  return (
    <Tabs defaultValue="sku" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="sku">SKU</TabsTrigger>
        <TabsTrigger value="keyword">Keyword</TabsTrigger>
        <TabsTrigger value="category">Categoría</TabsTrigger>
        <TabsTrigger value="keycat">KeyCat</TabsTrigger>
      </TabsList>

      <TabsContent value="sku" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="skus">Lista de SKUs (uno por línea)</Label>
          <textarea
            id="skus"
            className="w-full min-h-[150px] p-2 border rounded-md"
            placeholder="SKU-001&#10;SKU-002&#10;SKU-003"
            onChange={handleSkuChange}
          />
        </div>
        
        {selectedSkus.length > 0 && (
          <div className="text-sm text-gray-500">
            {selectedSkus.length} SKUs seleccionados
          </div>
        )}
      </TabsContent>

      <TabsContent value="keyword" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="keyword">Palabra clave</Label>
          <Input 
            id="keyword" 
            placeholder="Ej: Bluetooth" 
            value={keyword}
            onChange={handleKeywordChange}
          />
        </div>
      </TabsContent>

      <TabsContent value="category" className="space-y-4">
        <div className="space-y-2">
          <Label>Seleccione categorías</Label>
          <div className="border rounded-md p-2 max-h-[300px] overflow-y-auto">
            <ul className="space-y-1">
              {categoryHierarchy
                .filter(c => c.level === 1)
                .map(category => (
                  <li key={category.id} className="text-sm">
                    <div className="flex items-center space-x-2 p-1 hover:bg-gray-100 rounded">
                      <input
                        type="checkbox"
                        id={category.id}
                        checked={categories.includes(category.id)}
                        onChange={() => handleCategorySelect(category.id)}
                        className="rounded text-am-purple"
                      />
                      <label htmlFor={category.id} className="font-medium cursor-pointer">
                        {category.name}
                      </label>
                    </div>
                    <ul className="ml-6 space-y-1 mt-1">
                      {categoryHierarchy
                        .filter(c => c.parentId === category.id)
                        .map(subCat => (
                          <li key={subCat.id}>
                            <div className="flex items-center space-x-2 p-1 hover:bg-gray-100 rounded">
                              <input
                                type="checkbox"
                                id={subCat.id}
                                checked={categories.includes(subCat.id)}
                                onChange={() => handleCategorySelect(subCat.id)}
                                className="rounded text-am-purple"
                              />
                              <label htmlFor={subCat.id} className="cursor-pointer">
                                {subCat.name}
                              </label>
                            </div>
                            <ul className="ml-6 space-y-1 mt-1">
                              {categoryHierarchy
                                .filter(c => c.parentId === subCat.id)
                                .map(thirdCat => (
                                  <li key={thirdCat.id}>
                                    <div className="flex items-center space-x-2 p-1 hover:bg-gray-100 rounded">
                                      <input
                                        type="checkbox"
                                        id={thirdCat.id}
                                        checked={categories.includes(thirdCat.id)}
                                        onChange={() => handleCategorySelect(thirdCat.id)}
                                        className="rounded text-am-purple"
                                      />
                                      <label htmlFor={thirdCat.id} className="cursor-pointer">
                                        {thirdCat.name}
                                      </label>
                                    </div>
                                  </li>
                                ))}
                            </ul>
                          </li>
                        ))}
                    </ul>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {categories.map(catId => (
              <div key={catId} className="bg-gray-100 px-2 py-1 rounded-md text-sm flex items-center">
                <span>{getCategoryBreadcrumb(catId)}</span>
                <button
                  onClick={() => handleCategorySelect(catId)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="keycat" className="space-y-4">
        <div className="space-y-4">
          {/* Category selection (reuse from category tab) */}
          <div className="space-y-2">
            <Label>Seleccione categorías</Label>
            <div className="border rounded-md p-2 max-h-[200px] overflow-y-auto">
              {/* Same category tree as above */}
              <ul className="space-y-1">
                {categoryHierarchy
                  .filter(c => c.level === 1)
                  .map(category => (
                    <li key={category.id} className="text-sm">
                      <div className="flex items-center space-x-2 p-1 hover:bg-gray-100 rounded">
                        <input
                          type="checkbox"
                          id={`kc-${category.id}`}
                          checked={categories.includes(category.id)}
                          onChange={() => handleCategorySelect(category.id)}
                          className="rounded text-am-purple"
                        />
                        <label htmlFor={`kc-${category.id}`} className="font-medium cursor-pointer">
                          {category.name}
                        </label>
                      </div>
                      {/* Nested categories */}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          
          {/* Keywords */}
          <div className="space-y-2">
            <Label htmlFor="keycat-include">Palabras clave de inclusión</Label>
            <Input 
              id="keycat-include" 
              placeholder="Ej: Bluetooth" 
              value={keyword}
              onChange={handleKeywordChange}
            />
          </div>
          
          {/* Exclusion keywords */}
          <div className="space-y-2">
            <Label htmlFor="keycat-exclude">Palabras clave de exclusión (opcional)</Label>
            <Input 
              id="keycat-exclude" 
              placeholder="Ej: accesorio" 
              value={excludeKeywords}
              onChange={handleExcludeKeywordChange}
            />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default AttributeSelector;
