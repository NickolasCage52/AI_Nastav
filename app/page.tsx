import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Ticker from '@/components/Ticker';
import Problem from '@/components/Problem';
import Transformation from '@/components/Transformation';
import Directions from '@/components/Directions';
import WhyNow from '@/components/WhyNow';
import WhoItIsFor from '@/components/WhoItIsFor';
import Stack from '@/components/Stack';
import Cases from '@/components/Cases';
import Payments from '@/components/Payments';
import FounderStory from '@/components/FounderStory';
import Agency from '@/components/Agency';
import Program from '@/components/Program';
import WhatsInside from '@/components/WhatsInside';
import WhyNotCourse from '@/components/WhyNotCourse';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import ApplicationForm from '@/components/ApplicationForm';

/**
 * LANDING STRUCTURE — conversion flow:
 *   Hero → … → Cases → Payments → FounderStory → Agency → Program → … → Final CTA
 */
export default function Page() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Ticker />
      <Problem />
      <Transformation />
      <Directions />
      <WhyNow />
      <WhoItIsFor />
      <Stack />
      <Cases />
      <Payments />
      <FounderStory />
      <Agency />
      <Program />
      <WhatsInside />
      <WhyNotCourse />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyCTA />
      <ApplicationForm />
    </main>
  );
}
