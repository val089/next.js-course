import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

const AboutPage = () => {
  return (
    <div>
      <Header />
      <main>ABOUT</main>
      <Footer />
    </div>
  );
};

export default AboutPage; //tylko export default działa w pages, bo tego wymaga Next.js
