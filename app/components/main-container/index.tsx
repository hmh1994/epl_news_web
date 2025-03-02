export default function MainContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='container mx-auto min-h-[100vh] flex flex-col max-w-screen-xl'>
      {children}
    </main>
  );
}
