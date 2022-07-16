import { Layout } from '../components/Layout';
import Image from 'next/image';

//usunęliśmy starą strukturę
const Home = () => {
  return (
    <Layout>
      <main className="flex-grow max-w-2xl mx-auto grid p-6 sm:grid-cols-2 gap-6">
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Image
            src="https://picsum.photos/id/237/500/700"
            alt="Landscape picture"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <p>
          Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w
          przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez
          nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć
          wieków później zaczął być używany przemyśle elektronicznym, pozostając
          praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz
          z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, a
          ostatnio z zawierającym różne wersje Lorem Ipsum oprogramowaniem
          przeznaczonym do realizacji druków na komputerach osobistych, jak
          Aldus PageMaker
        </p>
      </main>
    </Layout>
  );
};

export default Home;
