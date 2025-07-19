import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import {
    Grid3X3,
    List,
    RotateCcw,
    Search,
    SlidersHorizontal,
} from 'lucide-react';

interface FilterOptions {
    searchQuery: string;
    selectedCategory: string;
    selectedBrand: string;
    sortBy: string;
    viewMode: 'grid' | 'list';
}

interface ProductFiltersProps {
    filters: FilterOptions;
    onFiltersChange: (filters: Partial<FilterOptions>) => void;
    categories: { id: string; name: string }[];
    brands: { id: string; name: string }[];
    resultsCount: number;
    totalCount: number;
    onClearFilters: () => void;
}

export default function ProductFilters({
    filters,
    onFiltersChange,
    categories,
    brands,
    resultsCount,
    totalCount,
    onClearFilters,
}: ProductFiltersProps) {
    const handleFilterChange = (key: keyof FilterOptions, value: any) => {
        onFiltersChange({ [key]: value });
    };

    return (
        <div className="space-y-6">
            {/* Filters Card */}
            <Card className="border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <SlidersHorizontal className="h-5 w-5" />
                            Filters & Search
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClearFilters}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Clear All
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search products..."
                            value={filters.searchQuery}
                            onChange={(e) =>
                                handleFilterChange(
                                    'searchQuery',
                                    e.target.value,
                                )
                            }
                            className="pl-10"
                        />
                    </div>

                    {/* Filter Controls */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        <div>
                            <Label>Category</Label>
                            <Select
                                value={filters.selectedCategory}
                                onValueChange={(value) =>
                                    handleFilterChange(
                                        'selectedCategory',
                                        value,
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="All Categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Categories
                                    </SelectItem>
                                    {categories.map((category) => (
                                        <SelectItem
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label>Brand</Label>
                            <Select
                                value={filters.selectedBrand}
                                onValueChange={(value) =>
                                    handleFilterChange('selectedBrand', value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="All Brands" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Brands
                                    </SelectItem>
                                    {brands.map((brand) => (
                                        <SelectItem
                                            key={brand.id}
                                            value={brand.id}
                                        >
                                            {brand.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label>Sort By</Label>
                            <Select
                                value={filters.sortBy}
                                onValueChange={(value) =>
                                    handleFilterChange('sortBy', value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="name">
                                        Name (A-Z)
                                    </SelectItem>
                                    <SelectItem value="price-low">
                                        Price (Low to High)
                                    </SelectItem>
                                    <SelectItem value="price-high">
                                        Price (High to Low)
                                    </SelectItem>
                                    <SelectItem value="rating">
                                        Rating
                                    </SelectItem>
                                    <SelectItem value="newest">
                                        Newest First
                                    </SelectItem>
                                    <SelectItem value="popular">
                                        Most Popular
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-end gap-2">
                            <Button
                                variant={
                                    filters.viewMode === 'grid'
                                        ? 'default'
                                        : 'outline'
                                }
                                size="icon"
                                onClick={() =>
                                    handleFilterChange('viewMode', 'grid')
                                }
                            >
                                <Grid3X3 className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={
                                    filters.viewMode === 'list'
                                        ? 'default'
                                        : 'outline'
                                }
                                size="icon"
                                onClick={() =>
                                    handleFilterChange('viewMode', 'list')
                                }
                            >
                                <List className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Results Header */}
            <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                    Showing {resultsCount} of {totalCount} products
                </p>
                {resultsCount !== totalCount && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClearFilters}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        Show all products
                    </Button>
                )}
            </div>
        </div>
    );
}
