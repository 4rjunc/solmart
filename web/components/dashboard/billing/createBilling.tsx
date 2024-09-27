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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'; // Import Dialog components

const formSchema = z.object({
  productName: z.string().min(1, { message: 'Product Name is required.' }),
  productPrice: z.string().min(1, { message: 'Product Price is required.' }),
  productQuantity: z.string().min(1, { message: 'Product Quantity is required.' }),
});

export function CreateBilling() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const [solanaPayUrl, setSolanaPayUrl] = useState<string | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setLoading] = useState(false); 
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // New error state

  const onSubmit = async (data: { productName: string; productPrice: string; productQuantity: string }) => {
    const price = parseFloat(data.productPrice);
    const quantity = parseFloat(data.productQuantity);

    console.log('Form Data:', { ...data, productPrice: price, productQuantity: quantity });

    setLoading(true); 
    setErrorMessage(null); 

    try {
      const response = await fetch('/api/solana', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: data.productName,
          productPrice: price,
          productQuantity: quantity,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create Solana Pay request');
      }

      const result = await response.json();
      const { url } = result;

      setSolanaPayUrl(url);
      setDialogOpen(true);
      form.reset();
    } catch (error) {
      setErrorMessage(error.message || 'An unexpected error occurred');
      console.error('Error creating Solana Pay request:', error);
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSolanaPayUrl(null);
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
          {errorMessage && <p className="text-red-500 text-center mt-2">{errorMessage}</p>} {/* Display error message */}
        </form>
      </Form>

      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Solana Pay URL</DialogTitle>
            <DialogDescription>
              Here is the payment URL generated for your transaction:
            </DialogDescription>
          </DialogHeader>
          <div className="p-4">
            {solanaPayUrl && <p className="break-words">{solanaPayUrl}</p>}
            <Button onClick={closeDialog} className="mt-4">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
