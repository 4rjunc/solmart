'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'; // Make sure to create or import a Select component
import { STYLED_BUTTON } from '@/constant/style';

const currencyOptions = [
  { value: 'USD', label: 'US Dollar (USD)' },
  { value: 'EUR', label: 'Euro (EUR)' },
  { value: 'NGN', label: 'Nigerian Naira (NGN)' },
  { value: 'GBP', label: 'British Pound (GBP)' },
  { value: 'JPY', label: 'Japanese Yen (JPY)' },
];

const formSchema = z.object({
  productName: z.string().min(1, {
    message: 'Product Name is required.',
  }),
  productPrice: z.number().min(0.01, {
    message: 'Product Price is required and must be greater than 0.',
  }),

  currency: z.string().min(1, {
    message: 'Currency selection is required.',
  }),
});

export function CreateBilling() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: {
    productName: string;
    productPrice: number;
    product: FileList;
    currency: string;
  }) => {
    console.log('Form Data:', data);
    form.reset();
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
                  <Input type="number" placeholder="Enter product price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Currency</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencyOptions.map((currency) => (
                        <SelectItem key={currency.value} value={currency.value}>
                          {currency.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

         

          <Button type="submit" className={`w-full ${STYLED_BUTTON}`}>
            Add Product
          </Button>
        </form>
      </Form>
    </>
  );
}
