'use client'
//グローバルスタイルを適用
import './styles/style.css';
import { AuthProvider } from '../context/AuthContext'; // パスを調整してください
import Header from './_components/Header';

// export const metadata = {
//   title: 'PicTweet',
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <AuthProvider>
            <Header />
            {children}
            <footer>
              <p>Copyright PicTweet 2023.</p>
            </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
