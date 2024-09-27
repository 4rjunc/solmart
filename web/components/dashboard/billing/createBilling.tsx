'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { STYLED_BUTTON } from '@/constant/style';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'; 
import { createQR } from '@solana/pay';
import axios from 'axios';

const formSchema = z.object({
  productName: z.string().min(1, { message: 'Product Name is required.' }),
  productPrice: z.string().min(1, { message: 'Product Price is required.' }),
  productQuantity: z.string().min(1, { message: 'Product Quantity is required.' }),
});

export function CreateBilling() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null); 

  const onSubmit = async (data: { productName: string; productPrice: string; productQuantity: string }) => {
    const price = parseFloat(data.productPrice);
    const quantity = parseFloat(data.productQuantity);
    const currencyAmount = price * quantity; 

    console.log('Form Data:', { ...data, productPrice: price, productQuantity: quantity });

    setLoading(true); 
    setErrorMessage(null); 

    try {
      const res = await axios.post(
        '/api/solana',
        { currencyAmount },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { url, ref } = res.data;
      const qr = createQR(url);
      const qrBlob = await qr.getRawData('png');
      if (!qrBlob) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === 'string') {
          setQrCode(event.target.result);
        }
      };
      reader.readAsDataURL(qrBlob);
      setReference(ref);
      console.log('Reference:', reference); 
      setDialogOpen(true); 
      form.reset();
    } catch (error) {
      setErrorMessage(error.message || 'An unexpected error occurred');
      console.error('Error generating QR code:', error);
    } finally {
      setLoading(false);
    }
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setQrCode(null);
  };

  return (
    <>
      <Form {...form}>
        <FormDescription className="font-semibold mb-4 text-xl text-black text-center">
          Create Billing
        </FormDescription>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="productPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter product price"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="productQuantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter product quantity"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className={`w-full ${STYLED_BUTTON}`} disabled={isLoading}>
            {isLoading ? 'Creating Billing...' : 'Create Bill'}
          </Button>
          {errorMessage && <p className="text-red-500 text-center mt-2">{errorMessage}</p>}
        </form>
      </Form>

      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Solana Pay URL</DialogTitle>
            <DialogDescription>
              Here is the payment QR code generated for your transaction:
            </DialogDescription>
          </DialogHeader>
          <div className="p-4">
            {qrCode && <img src={qrCode} alt="QR Code" className="w-full h-auto" />} 
            <Button onClick={closeDialog} className="mt-4">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
