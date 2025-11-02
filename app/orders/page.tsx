'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Package, ShoppingBag, User, Phone, MapPin } from 'lucide-react';

export default function OrderHistoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Redirect if not logged in
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/orders/history');
      return;
    }

    // Fetch orders if authenticated
    if (status === 'authenticated') {
      fetchOrders();
    }
  }, [status, router]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/orders');
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('ऑर्डर्स लोड करने में समस्या हुई। कृपया पुनः प्रयास करें।');
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleDateString('hi-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format time for display
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('hi-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  // Get payment status badge color
  const getPaymentStatusBadgeColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (status === 'loading') {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">आपके ऑर्डर्स</h1>
        <p className="text-gray-600">अपने सभी ऑर्डर्स की जानकारी यहां देखें</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-900"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">
          {error}
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-lg p-8 text-center">
          <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-amber-500" />
          <h3 className="text-xl font-medium mb-2">आपने अभी तक कोई ऑर्डर नहीं किया है</h3>
          <p className="mb-4">हमारे उत्पादों को देखें और अपना पहला ऑर्डर करें</p>
          <Button 
            onClick={() => router.push('/')}
            className="bg-amber-900 hover:bg-amber-800 text-white"
          >
            उत्पाद देखें
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <Card key={order.orderId} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 pb-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    <CardTitle className="text-xl mb-1">
                      ऑर्डर #{order.orderId}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(order.timestamp)}</span>
                      <Clock className="h-4 w-4 ml-2" />
                      <span>{formatTime(order.timestamp)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={`px-3 py-1 ${getPaymentStatusBadgeColor(order.paymentStatus)}`}>
                      {order.paymentStatus === "completed" 
                        ? "भुगतान पूर्ण" 
                        : order.paymentStatus === "failed"
                          ? "भुगतान विफल"
                          : "भुगतान लंबित"}
                    </Badge>
                    <Badge className={`px-3 py-1 ${getStatusBadgeColor(order.orderStatus)}`}>
                      {order.orderStatus === "completed" 
                        ? "पूर्ण" 
                        : order.orderStatus === "processing"
                          ? "प्रक्रियाधीन"
                          : order.orderStatus === "cancelled"
                            ? "रद्द"
                            : "लंबित"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Customer Information */}
                  <div>
                    <h3 className="font-semibold text-lg mb-3">ग्राहक जानकारी</h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <User className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium">{order.customerInfo.name}</p>
                          <p className="text-sm text-gray-600">{order.customerInfo.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                        <p>{order.customerInfo.phone}</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                        <p className="text-sm">{order.customerInfo.address}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Order Details */}
                  <div>
                    <h3 className="font-semibold text-lg mb-3">ऑर्डर विवरण</h3>
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>आइटम</TableHead>
                            <TableHead className="text-right">मात्रा</TableHead>
                            <TableHead className="text-right">कीमत</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {order.items.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item.name}</TableCell>
                              <TableCell className="text-right">{item.quantity}</TableCell>
                              <TableCell className="text-right">₹{item.price * item.quantity}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="mt-4 flex justify-between items-center font-medium">
                      <span>कुल राशि:</span>
                      <span className="text-lg">₹{order.total}</span>
                    </div>
                    <div className="mt-2 flex justify-between items-center text-sm">
                      <span>भुगतान विधि:</span>
                      <span>{order.paymentMethod === 'cash' ? 'कैश ऑन डिलीवरी' : 'ऑनलाइन'}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="bg-gray-50 px-6 py-4 flex justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-amber-700" />
                  <span className="text-sm text-gray-600">
                    {order.orderStatus === "completed" 
                      ? "आपका ऑर्डर पूरा हो गया है" 
                      : order.orderStatus === "processing"
                        ? "आपका ऑर्डर प्रक्रियाधीन है"
                        : order.orderStatus === "cancelled"
                          ? "आपका ऑर्डर रद्द कर दिया गया है"
                          : "आपका ऑर्डर लंबित है"}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(`https://wa.me/919179677292?text=मेरे ऑर्डर (${order.orderId}) के बारे में पूछताछ`, '_blank')}
                >
                  सहायता प्राप्त करें
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}