import { createContext, useContext, useState, useEffect } from 'react';
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from '../api/axios';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [loadingCart, setLoadingCart] = useState(false);

  const fetchCart = async () => {
    if (!user) { setCart({ items: [] }); return; }
    try {
      setLoadingCart(true);
      const { data } = await getCart();
      setCart(data);
    } catch {
      setCart({ items: [] });
    } finally {
      setLoadingCart(false);
    }
  };

  useEffect(() => { fetchCart(); }, [user]);

  const addItem = async (productId, quantity = 1) => {
    if (!user) { toast.error('Please login to add items to cart'); return; }
    try {
      const { data } = await addToCart({ productId, quantity });
      setCart(data);
      toast.success('Added to cart!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add to cart');
    }
  };

  const updateItem = async (itemId, quantity) => {
    try {
      const { data } = await updateCartItem(itemId, { quantity });
      setCart(data);
    } catch (err) {
      toast.error('Failed to update cart');
    }
  };

  const removeItem = async (itemId) => {
    try {
      const { data } = await removeFromCart(itemId);
      setCart(data);
      toast.success('Item removed');
    } catch {
      toast.error('Failed to remove item');
    }
  };

  const emptyCart = async () => {
    try {
      await clearCart();
      setCart({ items: [] });
    } catch {}
  };

  const cartCount = cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const cartTotal = cart.items?.reduce((sum, item) => {
    const dp = item.price - (item.price * item.discount) / 100;
    return sum + dp * item.quantity;
  }, 0) || 0;

  return (
    <CartContext.Provider value={{ cart, loadingCart, addItem, updateItem, removeItem, emptyCart, cartCount, cartTotal, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
