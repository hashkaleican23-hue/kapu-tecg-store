import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, ChevronDown, Search, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { SAMPLE_PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { Category, Product } from '../types';
import { cn } from '../utils';

import { ProductCardSkeleton } from '../components/Skeleton';

export default function ProductListing() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get('category') as Category | null;
  const searchParam = searchParams.get('search') || '';
  const focusParam = searchParams.get('focus');

  const [products, setProducts] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>(categoryParam || 'All');
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high'>('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focusParam === 'search' && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [focusParam]);

  useEffect(() => {
    setSearchQuery(searchParam);
  }, [searchParam]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product)));
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('All');
    }
  }, [categoryParam]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, priceRange, sortBy]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesSearch && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [products, selectedCategory, searchQuery, priceRange, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-bg-section min-h-screen">
      {/* Page Header */}
      <div className="bg-white border-b border-border-light pt-16 pb-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="container-max relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-primary">
              <Link to="/" className="text-[7px] font-black uppercase tracking-[0.2em] hover:text-text-primary transition-colors">Home</Link>
              <ChevronRight size={8} />
              <span className="text-[7px] font-black uppercase tracking-[0.2em] text-text-secondary">Shop</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black text-text-primary uppercase tracking-tighter">
              {selectedCategory === 'All' ? 'Our Collection' : selectedCategory}
            </h1>
            <p className="text-[10px] sm:text-xs text-text-secondary font-medium max-w-xl">
              Discover premium tech components and gaming gear curated for the ultimate experience.
            </p>
          </div>
        </div>
      </div>

      <div className="container-max py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-56 space-y-6 shrink-0">
            <div className="space-y-5">
              <div>
                <h3 className="text-[8px] font-black uppercase tracking-[0.3em] mb-3 text-text-secondary flex items-center justify-between">
                  Categories
                  <span className="w-6 h-px bg-border-light"></span>
                </h3>
                <div className="space-y-1">
                  {['All', 'Keyboard', 'Mouse', 'Monitor', 'Speaker', 'RAM', 'SSD'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat as any)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all group flex items-center justify-between",
                        selectedCategory === cat 
                          ? "bg-primary text-white shadow-sm shadow-primary/20" 
                          : "text-text-primary hover:bg-white hover:shadow-sm"
                      )}
                    >
                      {cat}
                      {selectedCategory !== cat && (
                        <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[8px] font-black uppercase tracking-[0.3em] mb-4 text-text-secondary flex items-center justify-between">
                  Price Range
                  <span className="w-6 h-px bg-border-light"></span>
                </h3>
                <div className="space-y-3 px-1">
                  <div className="relative h-1 bg-white rounded-full border border-border-light overflow-hidden">
                    <div 
                      style={{ width: `${(priceRange[1] / 200000) * 100}%` }}
                      className="absolute top-0 left-0 h-full bg-primary transition-all duration-300"
                    ></div>
                    <input
                      type="range"
                      min="0"
                      max="200000"
                      step="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="bg-white border border-border-light px-2 py-1 rounded-md">
                      <span className="text-[7px] font-black text-text-secondary uppercase block mb-0.5">Min</span>
                      <span className="text-[9px] font-black">Rs. 0</span>
                    </div>
                    <div className="w-2 h-px bg-border-light"></div>
                    <div className="bg-white border border-border-light px-2 py-1 rounded-md text-right">
                      <span className="text-[7px] font-black text-text-secondary uppercase block mb-0.5">Max</span>
                      <span className="text-[9px] font-black">Rs. {priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {(selectedCategory !== 'All' || priceRange[1] < 200000) && (
                <button 
                  onClick={() => {
                    setSelectedCategory('All');
                    setPriceRange([0, 200000]);
                  }}
                  className="w-full py-2.5 text-[8px] font-black uppercase tracking-widest text-primary border border-primary/20 rounded-lg hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                >
                  <X size={10} />
                  Clear Filters
                </button>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-5">
            {/* Toolbar */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 bg-white p-3 rounded-xl border border-border-light shadow-sm">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="w-8 h-8 bg-primary/5 rounded-lg flex items-center justify-center text-primary">
                    <SlidersHorizontal size={16} />
                  </div>
                  <div>
                    <h2 className="text-[9px] font-black text-text-primary uppercase tracking-tight">
                      {filteredProducts.length} Results
                    </h2>
                    <p className="text-[7px] font-bold text-text-secondary uppercase tracking-widest">
                      {selectedCategory}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button 
                    onClick={() => setIsFilterOpen(true)}
                    className="lg:hidden flex-1 flex items-center justify-center gap-2 bg-bg-section px-3 py-2 rounded-lg text-[7px] font-black text-text-primary uppercase tracking-widest border border-border-light"
                  >
                    <Filter size={10} />
                    Filters
                  </button>
                  <div className="relative flex-1 sm:flex-none">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="w-full bg-bg-section border border-border-light rounded-lg py-2 pl-3 pr-8 text-[7px] font-black uppercase tracking-widest focus:outline-none focus:border-primary appearance-none cursor-pointer"
                    >
                      <option value="newest">Newest First</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" size={10} />
                  </div>
                </div>
              </div>

              {/* Search Bar on Listing Page */}
              <div className="relative group">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search within these products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-border-light rounded-lg py-2.5 pl-9 pr-5 text-xs font-bold focus:outline-none focus:border-primary transition-all shadow-sm"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors" size={14} />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
              {loading ? (
                [...Array(itemsPerPage)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))
              ) : (
                paginatedProducts.map((product) => (
                  <div key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-border-light bg-white text-text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:border-primary hover:text-primary transition-all"
                >
                  <ChevronLeft size={18} />
                </button>
                
                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={cn(
                          "w-10 h-10 flex items-center justify-center rounded-xl text-[10px] font-black transition-all",
                          currentPage === page
                            ? "bg-primary text-white shadow-lg shadow-primary/20"
                            : "bg-white border border-border-light text-text-primary hover:border-primary hover:text-primary"
                        )}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-border-light bg-white text-text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:border-primary hover:text-primary transition-all"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

            {filteredProducts.length === 0 && !loading && (
              <div className="bg-white rounded-3xl border border-border-light p-12 text-center space-y-6 shadow-sm max-w-2xl mx-auto my-12">
                <div className="w-20 h-20 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto text-primary animate-pulse">
                  <Search size={40} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-black text-text-primary uppercase tracking-tighter">No matches found</h3>
                  <p className="text-xs text-text-secondary font-bold leading-relaxed">
                    We couldn't find any products matching your current selection. 
                    {searchQuery && <span> Try searching for something else or </span>}
                    {selectedCategory !== 'All' && <span> check other categories.</span>}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  <button 
                    onClick={() => {
                      setSelectedCategory('All');
                      setPriceRange([0, 200000]);
                      setSearchQuery('');
                    }}
                    className="btn-primary py-3 text-[10px] uppercase tracking-widest font-black"
                  >
                    Reset All Filters
                  </button>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="bg-bg-section border border-border-light text-text-primary py-3 rounded-xl text-[10px] uppercase tracking-widest font-black hover:bg-white transition-all"
                  >
                    Clear Search Only
                  </button>
                </div>

                <div className="pt-6 border-t border-border-light">
                  <p className="text-[8px] font-black text-text-secondary uppercase tracking-[0.2em] mb-4">Popular Categories</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['Keyboard', 'Mouse', 'Monitor'].map(cat => (
                      <button 
                        key={cat}
                        onClick={() => setSelectedCategory(cat as any)}
                        className="px-4 py-2 bg-bg-section border border-border-light rounded-lg text-[9px] font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-all"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[100] bg-text-primary/80 backdrop-blur-sm flex items-end">
          <div className="bg-white w-full rounded-t-3xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-text-primary uppercase tracking-tighter">Filters</h2>
              <button 
                onClick={() => setIsFilterOpen(false)} 
                className="w-8 h-8 bg-bg-section rounded-lg flex items-center justify-center text-text-primary hover:bg-border-light transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-[9px] font-black uppercase tracking-[0.3em] mb-3 text-text-secondary">Categories</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['All', 'Keyboard', 'Mouse', 'Monitor', 'Speaker', 'RAM', 'SSD'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat as any)}
                      className={cn(
                        "px-3 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                        selectedCategory === cat 
                          ? "bg-primary text-white shadow-md shadow-primary/20" 
                          : "bg-bg-section text-text-primary border border-border-light"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[9px] font-black uppercase tracking-[0.3em] mb-3 text-text-secondary">Price Range</h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full h-1 bg-bg-section rounded-full appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex items-center justify-between text-[9px] font-black text-text-secondary uppercase tracking-widest">
                    <span>Rs. 0</span>
                    <span>Rs. {priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setIsFilterOpen(false)}
              className="btn-primary w-full py-3 text-xs"
            >
              Show {filteredProducts.length} Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
