"use server";

import { z } from "zod";
import { getMeAction } from "./authActions";
import { TCartItem } from "@/types";
import { prisma } from "@/lib/utils";

const addToCartSchema = z.object({
  userId: z.string(),
  productId: z.string(),
  quantity: z.number(),
  color: z.string(),
  size: z.number(),
});

export async function addToCartAction(
  userId: string,
  productId: string,
  quantity: number,
  color: string,
  size: number,
) {
  const { isLogin }: { isLogin: boolean } = await getMeAction();

  if (!isLogin)
    return JSON.parse(
      JSON.stringify({
        status: 401,
        message: "You are not login",
      }),
    );

  // Validation

  const validatedFields = addToCartSchema.safeParse({
    userId,
    productId,
    quantity,
    color,
    size,
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return JSON.parse(
      JSON.stringify({
        errors: validatedFields.error.flatten().fieldErrors,
        message: "data invalid",
        status: 403,
      }),
    );
  }

  try {
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
      },
    });

    if ((product?.quantity as number) < quantity) {
      return JSON.parse(
        JSON.stringify({
          status: 204,
          message: "There are not enough product in stock",
        }),
      );
    }

    const cart = await prisma.cartItem.findMany({
      where: {
        userId,
      },
    });

    let isHaveInTheCart = cart?.some((cartItem) => {
      if (
        cartItem.productId === productId &&
        cartItem.color === color &&
        cartItem.size === size
      ) {
        return true;
      }
      return false;
    });

    if (isHaveInTheCart) {
      return JSON.parse(
        JSON.stringify({
          status: 409,
          message: "This product is added before",
        }),
      );
    }

    const cartItem = await prisma.cartItem.create({
      data: {
        quantity,
        color,
        size,
        productId,
        userId,
      },
    });

    return JSON.parse(
      JSON.stringify({
        status: 200,
        message: "New product added in your cart",
        cartItem,
      }),
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        status: 500,
        error,
      }),
    );
  }
}

export async function getCartItemsAction(userId: string) {
  const { isLogin }: { isLogin: boolean } = await getMeAction();

  if (!isLogin)
    return JSON.parse(
      JSON.stringify({
        status: 401,
        message: "You are not login",
      }),
    );

  try {
    const cart = await getCart(userId);

    return JSON.parse(
      JSON.stringify({
        status: 200,
        cart,
      }),
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        status: 500,
        error,
      }),
    );
  }
}

export async function changeCartItemQuantityAction(
  cartItemId: string,
  quantity: number,
) {
  if (!cartItemId || !quantity)
    return JSON.parse(
      JSON.stringify({
        status: 403,
        message: "Data invalid",
      }),
    );

  try {
    const cartItem = await prisma.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        quantity,
      },
    });

    const cart = await getCart(cartItem.userId);

    return JSON.parse(
      JSON.stringify({
        status: 204,
        cart,
      }),
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        status: 500,
        error,
      }),
    );
  }
}

export async function deleteCartItemAction(cartItemId: string) {
  try {
    const cartItem = await prisma.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });

    const cart = await getCart(cartItem.userId);

    return JSON.parse(
      JSON.stringify({
        status: 202,
        message: "Cart item deleted",
        cart,
      }),
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        status: 500,
        error,
      }),
    );
  }
}

export async function deleteAllCartItemsAction(userId: string) {
  if (!userId) {
    return JSON.parse(
      JSON.stringify({
        status: 403,
        message: "Data invalid",
      }),
    );
  }

  try {
    await prisma.cartItem.deleteMany({
      where: {
        userId,
      },
    });

    return JSON.parse(
      JSON.stringify({
        status: 204,
        message: "The shopping cart is empty",
      }),
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        status: 500,
        error,
        message: "There is a problem",
      }),
    );
  }
}

export async function changeCartItemSizeAction(
  cartItemId: string,
  size: number,
) {
  if (!cartItemId || !size) {
    return JSON.parse(
      JSON.stringify({
        status: 403,
        message: "Data invalid",
      }),
    );
  }

  try {
    const cartItem = await prisma.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        size,
      },
    });

    const cart = await getCart(cartItem.userId);

    return JSON.parse(
      JSON.stringify({
        status: 202,
        cart,
      }),
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        status: 500,
        error,
      }),
    );
  }
}

export async function changeCartItemColorAction(
  cartItemId: string,
  color: string,
) {
  if (!cartItemId || !color) {
    return JSON.parse(
      JSON.stringify({
        status: 403,
        message: "Data invalid",
      }),
    );
  }

  try {
    const cartItem = await prisma.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        color,
      },
    });

    const cart = await getCart(cartItem.userId);

    return JSON.parse(
      JSON.stringify({
        status: 202,
        cart,
      }),
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        status: 500,
        error,
      }),
    );
  }
}

export async function checkoutAction(address: string) {
  const { isLogin, id }: { isLogin: boolean; id: string } = await getMeAction();

  if (!isLogin)
    return JSON.parse(
      JSON.stringify({
        status: 401,
        message: "You are not login",
      }),
    );

  if (address.length < 10) {
    return JSON.parse(
      JSON.stringify({
        status: 403,
        message: "Address not entered",
      }),
    );
  }

  try {
    const cart = await getCart(id);

    if (cart.length < 1) {
      return JSON.parse(
        JSON.stringify({
          status: 204,
          message: "The cart is empty",
        }),
      );
    }

    const cartGroupByProductId: Record<string, TCartItem[]> = {};

    cart.forEach((cartItem) => {
      cartGroupByProductId[cartItem.Product.id] =
        cartGroupByProductId[cartItem.Product.id] || [];
      cartGroupByProductId[cartItem.Product.id].push(
        cartItem as unknown as TCartItem,
      );
    });

    for (let key in cartGroupByProductId) {
      const product = await prisma.product.findFirst({
        where: {
          id: key,
        },
      });
      let allQuantity = 0;

      cartGroupByProductId[key].forEach((cartItem) => {
        allQuantity += cartItem.quantity;
      });

      if ((product?.quantity as number) < allQuantity)
        return JSON.parse(
          JSON.stringify({
            status: 204,
            message: `There are not enough ${product?.title} in stock`,
          }),
        );

      await prisma.product.update({
        where: {
          id: key,
        },
        data: {
          quantity: (product?.quantity as number) - allQuantity,
          sales: (product?.sales || 0) + allQuantity,
        },
      });
    }

    let totalPrice = 0;

    cart.forEach((cartItem) => {
      totalPrice += Number(
        (
          ((cartItem.quantity * Number(cartItem.Product.price)) / 100) *
          91
        ).toFixed(2),
      );
    });

    const order = await prisma.order.create({
      data: {
        totalPrice: totalPrice.toString(),
        address,
        userId: id,
      },
    });

    cart.forEach(async (cartItem) => {
      await prisma.orderItem.create({
        data: {
          quantity: cartItem.quantity,
          color: cartItem.color,
          size: cartItem.size,
          productId: cartItem.Product.id,
          orderId: order.id,
        },
      });
    });

    await prisma.cartItem.deleteMany({
      where: {
        userId: id,
      },
    });

    return JSON.parse(
      JSON.stringify({
        status: 200,
        message: "Your order has been registered",
      }),
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        status: 500,
        error,
      }),
    );
  }
}

async function getCart(userId: string) {
  return await prisma.cartItem.findMany({
    where: {
      userId,
    },
    include: {
      Product: true,
    },
  });
}