# <img src="https://zeevector.com/wp-content/uploads/Nike-Logo-PNG-White.png" alt="✔️" style="width:50px;" /> Next-ecommerce 

[View online](https://next-ecommerce-murex-mu.vercel.app/) | Login with { admin , admin } to see admin panel (dont change data`s)

![Stars](https://img.shields.io/github/stars/MersadHabibi/next-ecommerce.svg)
<br/>
![Watchers](https://img.shields.io/github/watchers/MersadHabibi/next-ecommerce.svg)
<br/>
![Forks](https://img.shields.io/github/forks/MersadHabibi/next-ecommerce.svg)

## Features 🛠️

<ol>
  <li>
    Authentication
    <ul>
      <li>SignIn</li>
      <li>SignUp</li>
    </ul>
  </li>
  <li>
    Filter products by
    <ul>
      <li>Category</li>
      <li>Gender</li>
      <li>Size</li>
      <li>Search</li>
      <li>...</li>
    </ul>
  </li>
  <li>
    Cart
    <ul>
      <li>Add to cart</li>
      <li>Delete from cart</li>
      <li>Edit product in cart(color , size , quantity)</li>
      <li>Checkout</li>
    </ul>
  </li>
  <li>
    Order
    <ul>
      <li>Create order</li>
      <li>Cancel order</li>
      <li>Reject order (ADMIN)</li>
      <li>Accept order (ADMIN)</li>
    </ul>
  </li>
  <li>
    Create product (ADMIN)
    <ul>
      <li>Product images</li>
      <li>Title and description</li>
      <li>Product Price</li>
      <li>Colors and Sizes</li>
      <li>Quantity</li>
    </ul>
  </li>
  <li>
    Create category (ADMIN)
    <ul>
      <li>images</li>
      <li>Title</li>
    </ul>
  </li>
  <li>
    Edit and delete product (ADMIN)
  </li>
  <li>
    Show daily information and month income chart (ADMIN)
  </li>
  <li>
    Send email
  </li>
</ol>

### Built With 🧩

![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Radix UI](https://img.shields.io/badge/radix%20ui-161618.svg?style=for-the-badge&logo=radix-ui&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![ESlint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)

## Getting Started

First, install dependencies:

```bash
npm install
# or
npm i
```

Second, create .env file and fill values:

```bash
DATABASE_URL=<mongodb database>

SECRET_KEY="weofnweofmw-weoncweoinow2343t5349wnkdc"

# Mail server 
MAIL_HOST=<host>
MAIL_PORT=<port>
MAIL_USER=<username>
MAIL_PASSWORD=<password>
```

Third, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Project Shots 📸

### SignIn & SignUp page `/sign-in` , `/sign-up`
<img src="https://github.com/MersadHabibi/next-ecommerce/blob/master/public/README-files/sign-in.png?raw=true" alt="sign-in" />
<img src="https://github.com/MersadHabibi/next-ecommerce/blob/master/public/README-files/sign-up.png?raw=true" alt="sign-up" />

### Home page `/`
<img src="https://github.com/MersadHabibi/next-ecommerce/blob/master/public/README-files/home-dark.png?raw=true" alt="home-dark" />
<img src="https://github.com/MersadHabibi/next-ecommerce/blob/master/public/README-files/home-light.png?raw=true" alt="home-light" />

### Product page `/product/:id`
<img src="https://github.com/MersadHabibi/next-ecommerce/blob/master/public/README-files/product.png?raw=true" alt="product" />

### Filters page `/category`
<img src="https://github.com/MersadHabibi/next-ecommerce/blob/master/public/README-files/category.png?raw=true" alt="category" />

### Cart page `/cart`
<img src="https://github.com/MersadHabibi/next-ecommerce/blob/master/public/README-files/cart.png?raw=true" alt="sign-in" />

### Orders page `/orders`
<img src="https://github.com/MersadHabibi/next-ecommerce/blob/master/public/README-files/orders.png?raw=true" alt="sign-in" />

### Search
<img src="https://github.com/MersadHabibi/next-ecommerce/blob/master/public/README-files/search.png?raw=true" alt="sign-in" />

### Admin home page `/admin`
<img src="https://github.com/MersadHabibi/next-ecommerce/blob/master/public/README-files/admin-home.png?raw=true" alt="sign-in" />

### Admin products page `/admin/products`
<img src="https://github.com/MersadHabibi/next-ecommerce/blob/master/public/README-files/admin-products.png?raw=true" alt="sign-in" />

### Admin edit product `/admin/products`
<img src="https://github.com/MersadHabibi/next-ecommerce/blob/master/public/README-files/admin-edit-product.png?raw=true" alt="sign-in" />

### Admin add product page `/admin/add-product`
<img src="https://github.com/MersadHabibi/next-ecommerce/blob/master/public/README-files/admin-add-product.png?raw=true" alt="sign-in" />

### Admin categories page `/admin/categories`
<img src="https://github.com/MersadHabibi/next-ecommerce/blob/master/public/README-files/admin-categories.png?raw=true" alt="sign-in" />

### Admin add category `/admin/categories`
<img src="https://github.com/MersadHabibi/next-ecommerce/blob/master/public/README-files/admin-add-category.png?raw=true" alt="sign-in" />

### Admin orders page `/admin/orders`
<img src="https://github.com/MersadHabibi/next-ecommerce/blob/master/public/README-files/admin-orders.png?raw=true" alt="sign-in" />


![](http://ForTheBadge.com/images/badges/built-with-love.svg)
