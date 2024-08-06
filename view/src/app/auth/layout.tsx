import { redirect } from "next/navigation";

export default function ShopLayout({
 children
}: {
 children: React.ReactNode;
}) {
  // redirect('/auth/login')
  return (
    <main className="flex justify-center">
      <div className="w-full sm:w-[450px] px-10">
      {children}
      </div>
        
    </main>
  );
}