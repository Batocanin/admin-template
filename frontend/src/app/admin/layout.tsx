import ReactQueryProvider from "@/lib/ReactQueryProvider";

async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}

export default layout;
