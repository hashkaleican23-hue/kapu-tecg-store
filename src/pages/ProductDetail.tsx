import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, MessageCircle, Star, ShieldCheck, Truck, Zap, Flame, Eye, ChevronRight, ChevronLeft, ArrowLeft, Share2, Heart, Maximize2, ArrowRight } from 'lucide-react';
import { doc, getDoc, collection, query, where, orderBy, onSnapshot, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { SAMPLE_PRODUCTS, WHATSAPP_NUMBER } from '../constants';
import { formatPrice, cn } from '../utils';
import { useCart } from '../CartContext';
import ProductCard from '../components/ProductCard';
import Lightbox from '../components/Lightbox';
import { Product, Review } from '../types';
import { ProductDetailSkeleton } from '../components/Skeleton';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, setConfirmingProduct } = useCart();
  const [product, setProduct] = useState<Product | null>(SAMPLE_PRODUCTS.find(p => p.id === id) || null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: ''
  });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser || !reviewForm.comment || !id) return;

    setIsSubmittingReview(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        productId: id,
        customerName: auth.currentUser.displayName || 'Anonymous',
        customerEmail: auth.currentUser.email,
        uid: auth.currentUser.uid,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
        createdAt: new Date().toISOString() // Using ISO string to match the type, though serverTimestamp is better for rules
      });

      setReviewForm({ rating: 5, comment: '' });
      setShowReviewForm(false);
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Failed to submit review. Please try again.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  useEffect(() => {
    if (!id) return;

    const q = query(
      collection(db, 'reviews'),
      where('productId', '==', id),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedReviews = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Review[];
      setReviews(fetchedReviews);
      setReviewsLoading(false);
    }, (err) => {
      console.error('Error fetching reviews:', err);
      setReviewsLoading(false);
    });

    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
    setSelectedImage(0);
  }, [id]);

  const [showPurchaseToast, setShowPurchaseToast] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomPos({ x, y });
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowPurchaseToast(true), 3000);
    const hideTimer = setTimeout(() => setShowPurchaseToast(false), 8000);
    return () => { clearTimeout(timer); clearTimeout(hideTimer); };
  }, []);

  if (loading && !product) {
    return (
      <div className="bg-white min-h-screen pt-20">
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
        <h1 className="text-4xl font-black text-text-primary uppercase tracking-tighter">Product Not Found</h1>
        <p className="text-text-secondary font-bold">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft size={20} />
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleWhatsAppInquiry = () => {
    const message = encodeURIComponent(`Hi, I'm interested in the ${product.name}. Is it available?`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const handleBuyNow = () => {
    addItem(product, quantity, false);
    navigate('/checkout');
  };

  const recommendedProducts = SAMPLE_PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="bg-white min-h-screen relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full -mr-[25vw] -mt-[25vw] blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-primary/5 rounded-full -ml-[20vw] -mb-[20vw] blur-[100px] pointer-events-none"></div>

      {/* Mock Purchase Notification */}
      {showPurchaseToast && (
        <div className="fixed bottom-20 left-4 z-50 bg-white p-3 rounded-xl shadow-xl border border-border-light flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg overflow-hidden flex-shrink-0">
            <img src="https://picsum.photos/seed/user1/100/100" alt="User" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-0">
            <p className="text-[9px] font-black text-text-primary uppercase tracking-tight">Someone from Colombo</p>
            <p className="text-[8px] font-bold text-text-secondary uppercase tracking-widest">Just purchased a {product.name}</p>
            <p className="text-[7px] font-black text-primary uppercase tracking-widest">2 minutes ago</p>
          </div>
          <button onClick={() => setShowPurchaseToast(false)} className="text-text-secondary hover:text-primary p-1">
            <ChevronRight size={14} />
          </button>
        </div>
      )}

      {/* Page Header / Breadcrumbs */}
      <div className="pt-20 pb-4 border-b border-border-light">
        <div className="container-max">
          <nav className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary overflow-x-auto no-scrollbar whitespace-nowrap">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link to="/products" className="hover:text-primary transition-colors">Shop</Link>
            <ChevronRight size={10} />
            <Link to={`/products?category=${product.category}`} className="hover:text-primary transition-colors">{product.category}</Link>
            <ChevronRight size={10} />
            <span className="text-text-primary truncate max-w-[150px]">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container-max py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
          {/* Image Gallery */}
          <div className="space-y-4 lg:sticky lg:top-20">
            <div 
              ref={imageRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              className="aspect-square bg-bg-section rounded-[2rem] overflow-hidden border border-border-light shadow-sm group relative cursor-zoom-in"
            >
              <img 
                src={product.images[selectedImage]} 
                alt={product.name} 
                onClick={() => setIsLightboxOpen(true)}
                style={{
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transform: isZooming ? 'scale(2)' : 'scale(1)'
                }}
                className="w-full h-full object-cover transition-transform duration-200"
                referrerPolicy="no-referrer"
              />
              
              {/* Navigation Arrows */}
              <div className="absolute inset-0 flex items-center justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedImage(prev => (prev === 0 ? product.images.length - 1 : prev - 1)); }}
                  className="w-8 h-8 bg-white/90 backdrop-blur-xl rounded-lg flex items-center justify-center text-text-primary hover:text-primary transition-all shadow-md active:scale-90 pointer-events-auto"
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedImage(prev => (prev === product.images.length - 1 ? 0 : prev + 1)); }}
                  className="w-8 h-8 bg-white/90 backdrop-blur-xl rounded-lg flex items-center justify-center text-text-primary hover:text-primary transition-all shadow-md active:scale-90 pointer-events-auto"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button 
                  onClick={() => setIsLightboxOpen(true)}
                  className="w-10 h-10 bg-white/90 backdrop-blur-xl rounded-lg text-text-secondary hover:text-primary transition-all shadow-md flex items-center justify-center"
                >
                  <Maximize2 size={18} />
                </button>
                <button className="w-10 h-10 bg-white/90 backdrop-blur-xl rounded-lg text-text-secondary hover:text-red-500 transition-all shadow-md flex items-center justify-center">
                  <Heart size={18} />
                </button>
                <button className="w-10 h-10 bg-white/90 backdrop-blur-xl rounded-lg text-text-secondary hover:text-primary transition-all shadow-md flex items-center justify-center">
                  <Share2 size={18} />
                </button>
              </div>
              
              {product.isBestSeller && (
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-[0.2em] flex items-center gap-1.5 shadow-md">
                    <Flame size={10} className="fill-white" />
                    Best Seller
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
              {product.images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "w-20 h-20 flex-shrink-0 bg-bg-section rounded-xl overflow-hidden border-2 transition-all shadow-sm",
                    i === selectedImage ? "border-primary shadow-md shadow-primary/10" : "border-transparent hover:border-border-light"
                  )}
                >
                  <img src={img} alt={`${product.name} ${i}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="bg-primary/5 text-primary text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-[0.3em] border border-primary/10">
                  {product.category}
                </span>
                <div className="flex items-center gap-0.5 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={12} 
                      fill={i < Math.round(Number(reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1))) ? "currentColor" : "none"} 
                    />
                  ))}
                  <span className="ml-2 text-[8px] font-black text-text-secondary uppercase tracking-widest">
                    {(reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)).toFixed(1)} ({reviews.length} Reviews)
                  </span>
                </div>
              </div>
              
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-text-primary leading-[0.95] tracking-tighter uppercase">
                {product.name}
              </h1>
              
              <div className="flex items-baseline gap-3 sm:gap-4">
                <span className="text-4xl sm:text-5xl font-black text-primary tracking-tighter">{formatPrice(product.price)}</span>
                <span className="text-lg sm:text-2xl text-text-secondary line-through font-bold opacity-20 tracking-tighter">{formatPrice(product.price * 1.2)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="bg-orange-50/50 border border-orange-100/50 p-3 rounded-2xl space-y-0.5">
                <div className="flex items-center gap-1.5 text-orange-600">
                  <Flame size={14} className="fill-orange-600" />
                  <span className="text-[7px] font-black uppercase tracking-widest">Trending Now</span>
                </div>
                <p className="text-[10px] font-black text-orange-900 leading-tight">{product.soldThisWeek} Sold Today</p>
              </div>
              <div className="bg-primary/5 border border-primary/10 p-3 rounded-2xl space-y-0.5">
                <div className="flex items-center gap-1.5 text-primary">
                  <Eye size={14} />
                  <span className="text-[7px] font-black uppercase tracking-widest">High Demand</span>
                </div>
                <p className="text-[10px] font-black text-primary leading-tight">{product.viewsToday} People Viewing</p>
              </div>
              <div className="bg-red-50/50 border border-red-100/50 p-3 rounded-2xl space-y-0.5">
                <div className="flex items-center gap-1.5 text-red-600">
                  <Zap size={14} className="fill-red-600" />
                  <span className="text-[7px] font-black uppercase tracking-widest">Limited Stock</span>
                </div>
                <p className="text-[10px] font-black text-red-900 leading-tight">Only {product.stockCount} Left!</p>
              </div>
            </div>

            {/* Free Delivery Banner */}
            <div className="bg-text-primary text-white p-3 sm:p-4 rounded-xl flex items-center justify-between group overflow-hidden relative shadow-md">
              <div className="flex items-center gap-3 sm:gap-4 relative z-10">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Truck size={18} className="sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest leading-tight">Free Delivery Today</h4>
                  <p className="text-[7px] sm:text-[8px] font-bold text-white/60 uppercase tracking-widest">Order in the next 2h 45m</p>
                </div>
              </div>
              <div className="text-right relative z-10 hidden sm:block">
                <span className="text-[8px] font-black uppercase tracking-[0.3em] bg-white/10 px-2.5 py-1 rounded-full">Island-wide</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch gap-2">
                <div className="flex items-center justify-between sm:justify-start bg-bg-section border border-border-light rounded-lg p-0.5">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-black text-lg hover:bg-white rounded-md transition-all active:scale-90"
                  >
                    -
                  </button>
                  <span className="w-8 sm:w-10 text-center font-black text-sm sm:text-base">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-black text-lg hover:bg-white rounded-md transition-all active:scale-90"
                  >
                    +
                  </button>
                </div>
                <button 
                  onClick={() => setConfirmingProduct({ product, quantity })}
                  className="btn-secondary flex-1 py-2.5 sm:py-3 text-xs flex items-center justify-center gap-2 shadow-md group"
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button 
                  onClick={handleBuyNow}
                  className="btn-primary py-2.5 sm:py-3 text-xs flex items-center justify-center gap-2 shadow-lg shadow-primary/20 group"
                >
                  Buy It Now
                  <ArrowRight size={16} />
                </button>
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I'm interested in the ${product.name}. Is it available?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white py-2.5 sm:py-3 rounded-lg font-black text-xs flex items-center justify-center gap-2 hover:bg-green-600 transition-all active:scale-95 shadow-md shadow-green-500/10 group"
                >
                  <MessageCircle size={16} />
                  WhatsApp Inquiry
                </a>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-border-light">
              <div className="flex items-center gap-1 text-text-secondary">
                <ShieldCheck size={14} className="text-primary" />
                <span className="text-[7px] font-black uppercase tracking-widest">Genuine Warranty</span>
              </div>
              <div className="flex items-center gap-1 text-text-secondary">
                <Truck size={14} className="text-primary" />
                <span className="text-[7px] font-black uppercase tracking-widest">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-1 text-text-secondary">
                <Zap size={14} className="text-primary" />
                <span className="text-[7px] font-black uppercase tracking-widest">7-Day Return</span>
              </div>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-border-light">
              <div className="flex items-start gap-2 group">
                <div className="w-8 h-8 bg-primary/5 rounded-lg flex items-center justify-center text-primary shrink-0">
                  <Truck size={16} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-tight">Fast Delivery</h4>
                  <p className="text-[7px] font-bold text-text-secondary uppercase tracking-widest leading-relaxed">Island-wide in 24h. Free over Rs. 5000.</p>
                </div>
              </div>
              <div className="flex items-start gap-2 group">
                <div className="w-8 h-8 bg-primary/5 rounded-lg flex items-center justify-center text-primary shrink-0">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-tight">Genuine Warranty</h4>
                  <p className="text-[7px] font-bold text-text-secondary uppercase tracking-widest leading-relaxed">1-Year Local Warranty. 100% Original.</p>
                </div>
              </div>
            </div>

            {/* Tabs Section */}
            <div className="pt-6 border-t border-border-light">
              <div className="flex items-center gap-3 border-b border-border-light mb-4 overflow-x-auto no-scrollbar whitespace-nowrap">
                {(['description', 'specs', 'reviews'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "pb-2 text-[7px] font-black uppercase tracking-[0.3em] transition-all relative",
                      activeTab === tab ? "text-primary" : "text-text-secondary hover:text-primary"
                    )}
                  >
                    {tab}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
                    )}
                  </button>
                ))}
              </div>

              <div className="min-h-[150px]">
                {activeTab === 'description' && (
                  <div className="space-y-4">
                    <p className="text-sm text-text-secondary leading-relaxed">{product.description}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <img src="https://picsum.photos/seed/tech1/800/600" alt="Feature 1" className="rounded-xl border border-border-light shadow-sm" referrerPolicy="no-referrer" />
                      <img src="https://picsum.photos/seed/tech2/800/600" alt="Feature 2" className="rounded-xl border border-border-light shadow-sm" referrerPolicy="no-referrer" />
                    </div>
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div className="bg-bg-section rounded-xl overflow-hidden border border-border-light">
                    <table className="w-full text-left border-collapse">
                      <tbody>
                        {Object.entries(product.specs).map(([key, value], i) => (
                          <tr key={key} className={cn(i % 2 === 0 ? "bg-white" : "bg-bg-section", "border-b border-border-light last:border-0")}>
                            <th className="px-4 py-2 text-[8px] font-black uppercase tracking-[0.1em] text-primary w-1/3">{key}</th>
                            <td className="px-4 py-2 text-xs font-black text-text-primary">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between bg-bg-section p-4 rounded-2xl border border-border-light gap-4">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <h4 className="text-3xl font-black text-text-primary tracking-tighter leading-none">
                            {(reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)).toFixed(1)}
                          </h4>
                          <p className="text-[8px] font-black text-text-secondary uppercase tracking-widest mt-1">Rating</p>
                        </div>
                        <div className="h-8 w-px bg-border-light hidden sm:block"></div>
                        <div className="space-y-0.5">
                          <div className="flex gap-0.5 text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={12} 
                                fill={i < Math.round(reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)) ? "currentColor" : "none"} 
                              />
                            ))}
                          </div>
                          <p className="text-[8px] font-black text-text-secondary uppercase tracking-widest">{reviews.length} reviews</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          if (!auth.currentUser) {
                            alert('Please log in to write a review.');
                            return;
                          }
                          setShowReviewForm(!showReviewForm);
                        }}
                        className="btn-primary !py-2 !px-6 text-[8px] font-black uppercase tracking-widest"
                      >
                        {showReviewForm ? 'Cancel' : 'Write a Review'}
                      </button>
                    </div>

                    {showReviewForm && (
                      <div className="bg-white p-5 rounded-2xl border border-primary/20 space-y-4 shadow-md">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[8px] font-black uppercase tracking-widest text-text-secondary ml-2">Your Name</label>
                            <div className="w-full bg-bg-section border border-border-light rounded-lg py-2 px-4 text-xs font-bold text-text-secondary">
                              {auth.currentUser?.displayName || 'Anonymous'}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[8px] font-black uppercase tracking-widest text-text-secondary ml-2">Rating</label>
                            <div className="flex items-center gap-2 bg-bg-section rounded-lg p-2 border border-border-light">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                                  className={cn(
                                    "transition-all",
                                    star <= reviewForm.rating ? "text-yellow-400" : "text-text-secondary/20"
                                  )}
                                >
                                  <Star size={16} fill={star <= reviewForm.rating ? "currentColor" : "none"} />
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[8px] font-black uppercase tracking-widest text-text-secondary ml-2">Your Comment</label>
                          <textarea 
                            required
                            rows={3}
                            value={reviewForm.comment}
                            onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                            className="w-full bg-bg-section border border-border-light rounded-lg py-2 px-4 text-xs font-bold focus:outline-none focus:border-primary focus:bg-white transition-all resize-none"
                            placeholder="What did you think about this product?"
                          />
                        </div>
                        <button 
                          type="submit" 
                          disabled={isSubmittingReview}
                          className="btn-primary w-full py-3 text-[8px] font-black uppercase tracking-widest disabled:opacity-50"
                        >
                          {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                        </button>
                      </div>
                    )}
                    
                    <div className="space-y-3">
                      {reviewsLoading ? (
                        <div className="py-6 text-center">
                          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                          <p className="text-[8px] font-black text-text-secondary uppercase tracking-widest">Loading...</p>
                        </div>
                      ) : reviews.length === 0 ? (
                        <div className="py-12 text-center bg-bg-section rounded-2xl border border-dashed border-border-light">
                          <MessageCircle size={32} className="mx-auto text-text-secondary/20 mb-2" />
                          <p className="text-[9px] font-black text-text-secondary uppercase tracking-widest">No reviews yet.</p>
                        </div>
                      ) : (
                        reviews.map((review) => (
                          <div 
                            key={review.id} 
                            className="bg-white p-4 rounded-2xl border border-border-light shadow-sm hover:border-primary/10 transition-all"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-primary/5 rounded-lg flex items-center justify-center text-primary font-black text-xs border border-primary/10">
                                  {review.customerName.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                  <h5 className="text-xs font-black text-text-primary uppercase tracking-tight">{review.customerName}</h5>
                                  <div className="flex gap-0.5 text-yellow-400 mt-0.5">
                                    {[...Array(5)].map((_, i) => (
                                      <Star key={i} size={8} fill={i < review.rating ? "currentColor" : "none"} />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <span className="text-[7px] font-black text-text-secondary uppercase tracking-widest opacity-40">
                                {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                            </div>
                            <p className="text-xs text-text-secondary font-medium leading-relaxed italic border-l-2 border-primary/10 pl-3 py-0.5">
                              "{review.comment}"
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="py-12 bg-bg-section">
        <div className="container-max">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-primary text-xs font-black uppercase tracking-[0.4em]">More Like This</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-text-primary uppercase tracking-tighter">You May Also Like</h2>
            </div>
            <Link to="/products" className="btn-outline !py-3 !px-8 text-center">
              View All Products
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {recommendedProducts.map((p) => (
              <div key={p.id}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox 
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={product.images}
        currentIndex={selectedImage}
        onNext={() => setSelectedImage(prev => (prev === product.images.length - 1 ? 0 : prev + 1))}
        onPrev={() => setSelectedImage(prev => (prev === 0 ? product.images.length - 1 : prev - 1))}
      />
    </div>
  );
}
