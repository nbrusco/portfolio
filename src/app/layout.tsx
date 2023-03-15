import "./globals.css";

export const metadata = {
  title: "Nicolas Brusco | Full Stack MERN dev",
  description: "This is my personal portfolio, enjoy!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
