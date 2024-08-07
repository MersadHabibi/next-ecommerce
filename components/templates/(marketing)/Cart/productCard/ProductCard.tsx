"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import Image from "next/image";

import { notoSans } from "@/config/fonts";
import Link from "next/link";
import { useState } from "react";
import Color from "./Color";
import Quantity from "./Quantity";
import Size from "./Size";
import { TCartItem, TProduct } from "@/types";

type ProductProps = {
  cartItem: TCartItem;
  product: Omit<TProduct, "Category">;
};

export default function ProductCard({ cartItem, product }: ProductProps) {
  const [isImageError, setImageError] = useState(false);

  return (
    <div className="grid grid-cols-3 gap-x-6 rounded-lg border border-secondary p-3 dark:border-secondary-dark md:grid-cols-4 xl:grid-cols-5">
      <div className="flex-center col-span-3 mb-2 max-h-56 overflow-hidden rounded-md sm:col-span-1 sm:mb-0 sm:max-h-none">
        <AspectRatio ratio={16 / 16} className="flex-center">
          <Image
            className={cn(
              "h-full w-full overflow-visible rounded-md object-contain p-2",
            )}
            src={`/${isImageError ? "images/no-image.jpg" : product.mainImage}`}
            alt="product"
            width={400}
            height={400}
            onError={(event) => {
              setImageError(true);
            }}
          />
        </AspectRatio>
      </div>
      <div className="col-span-3 flex h-full w-full justify-between pt-2 sm:col-span-2 md:col-span-3 xl:col-span-4">
        <div>
          <Link
            href={`/product/${product.id}`}
            className="line-clamp-1 text-3xl font-medium">
            {product.title}
          </Link>
          <span
            className={cn(
              "block pt-2 text-2xl font-bold text-gray-700 opacity-70 dark:text-gray-300",
              notoSans.className,
            )}>
            ${product.price}
          </span>
          <div className="space-y-2 pt-4 text-gray-700 dark:text-gray-300">
            <Color
              cartItemId={cartItem.id}
              color={cartItem.color}
              productColors={product.colors}
            />
            <Size
              cartItemId={cartItem.id}
              size={cartItem.size}
              productSizes={product.sizes}
            />
          </div>
        </div>
        <Quantity cartItem={cartItem} maxQuantity={product.quantity} />
      </div>
    </div>
  );
}
