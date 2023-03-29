import { NavBar } from "@/components/NavBar";
import { ProductCard } from "@/components/ProductCard";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <NavBar />
      <ProductCard />
    </div>
  );
}
