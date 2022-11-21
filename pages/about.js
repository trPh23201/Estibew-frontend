import Head from "next/head";
import Link from "next/link";
import { Container } from "react-bootstrap";
import Layout from "../components/Layout";
import styles from "../styles/about.module.css";

export default function About() {
  return (
    <Container>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>About Estibew Game</h2>
        <hr />
        <h4>Corporate Headquarters</h4>
        <h4>Cary, North Carolina</h4>
        <p>
          Founded in 1991, Estibew Games is an American company founded by CEO Tim
          Sweeney. The company is headquartered in Cary, North Carolina and has
          more than 40 offices worldwide. Today Estibew is a leading interactive
          entertainment company and provider of 3D engine technology. Estibew
          operates <Link href='#'>Fortnite</Link>, one of the world’s largest games
          with over 350 million accounts and 2.5 billion friend connections. Estibew
          also develops <Link href='#'>Unreal Engine</Link>, which powers the world’s
          leading games and is also adopted across industries such as film and
          television, architecture, automotive, manufacturing, and simulation.
          Through Unreal Engine, <Link href='#'>Estibew Games Store</Link>, and{' '}
          <Link href='#'>Estibew Online Services</Link>, Estibew provides an end-to-end
          digital ecosystem for developers and creators to build, distribute, and
          operate games and other content.
        </p>
        <br />

        {/* CONTACT */}
        <h4>Contact</h4>
        <hr />
        <p className='fw-bold'>
          Interested in employment opportunities with Estibew?
        </p>
        <p>
          We’re hiring! Visit the <Link href='#'>Estibew Games Careers</Link> portal.
        </p>
        <br />
        <p className='fw-bold'>Interested using Unreal Engine technology?</p>
        <p>
          Download <Link href='#'>Unreal Engine</Link> for free. Contact us for{' '}
          <Link href='#'>custom licensing</Link> terms.
        </p>
        <br />
        <p className='fw-bold'>
          Need help with Fortnite or your Estibew Games account?
        </p>
        <p>
          Visit <Link href='#'>our support center</Link>.
        </p>
        <br />
        <p className='fw-bold'>Estibew Games, Inc.</p>
        <p>620 Crossroads Blvd.</p>
        <p>Cary, NC USA</p>
        <p>Tel +1 919 854 0070</p>
        <br />

        {/* FREQUENTLY ASKED QUESTIONS */}
        <h4>Frequently Asked Questions</h4>
        <hr />
        <p className='fw-bold'>Can I have a studio tour?</p>
        <p>
          We do not offer studio tours as a general policy. While we would love to
          give you the full Estibew experience, we’re committed to providing the most
          conducive working environment for our folks so they can stay focused and
          keep making great games and technology.
        </p>
        <br />
        <p className='fw-bold'>Does Estibew have any job openings?</p>
        <p>
          Yes! Our current openings will be posted on our career portal. Once
          registered, you may apply for open positions and/or submit your resume.
        </p>
        <br />
        <p className='fw-bold'>How do I learn more about Estibew?</p>
        <p>
          For an overview of Estibew visit our <Link href='#'>careers page</Link> and
          follow us on{' '}
          <Link href='#'>LinkedIn</Link>.
        </p>
        <p>
          For information regarding the Transparency in Coverage rule for the US,
          click <Link href='#'>here</Link>.
        </p>
        <br />
        <p className='fw-bold'>Do you offer internships?</p>
        <p>
          Any summer jobs or internships will be posted on{' '}
          <Link href='#'>our career portal</Link>.
        </p>
        <br />
        <p className='fw-bold'>
          I am having trouble with my game. Where do I go for support?
        </p>
        <p>
          Please visit <Link href='#'>help.Estibewgames.com</Link> for support on all of
          our current products. For classic games in the Unreal series, visit{' '}
          <Link href='#'>help.unrealtournament.com</Link>.
        </p>
        <br />
        <p className='fw-bold'>What about Gears of War?</p>
        <p>
          Microsoft purchased the Gears of War IP from Estibew Games, and they own
          the franchise now. For the <Link href='#'>Gears of War series</Link>, contact{' '}
          <Link href='#'>Xbox Support</Link>.
        </p>
        <br />
        <p className='fw-bold'>
          We are music/art/mocap/testing/monetization professionals. Can we talk
          with someone at Estibew to discuss our products or services?
        </p>
        <p>
          We create our internal games in-house and with the help of contractors
          and teams with whom we have established relationships. We are not
          looking for new vendors at this time.
        </p>
        <br />
        <p className='fw-bold'>Can I make a fan site based on your game?</p>
        <p>
          We’d love for you to do this! We just ask that you follow our{' '}
          <Link href='#'>Fan Art and Fan site policy</Link>.
        </p>
        <br />
        <p className='fw-bold'>
          I have a great game idea or a great idea for Estibew. Can we discuss it?
        </p>
        <p>
          We are unable to accept outside submissions of any kind. Please do not
          send us ideas, stories, artwork, game levels, music, etc. We are legally
          unable to review them.
        </p>
        <br />
        <p className='fw-bold'>Where can I access your games?</p>
        <p>
          Download our games and more for free. The download button for the Estibew
          Games launcher is in the top right corner of this page. Legacy titles
          such as Unreal Tournament 3 Black, Unreal Tournament 2004 ECE, Unreal
          Tournament GOTY and The Unreal Deal Pack are also available on{' '}
          <Link href='#'>Steam</Link>.
        </p>
        <br />
        <p className='fw-bold'>
          Can I monetize my gameplay videos featuring your games?
        </p>
        <p>Yes, we allow this.</p>
        <br />
        <p className='fw-bold'>
          Will Estibew Games sponsor my clan for an upcoming tournament?
        </p>
        <p>
          We currently do not offer sponsorships for gaming competitions and
          tournaments.
        </p>
        <br />
        <p className='fw-bold'>Does Estibew Games offer scholarships?</p>
        <p>We do not offer scholarships at this time.</p>
        <br />
        <p className='fw-bold'>
          I am a student doing an assignment on the video game industry. May I
          interview one of your developers?
        </p>
        <p>
          We appreciate your interest in interviewing our developers. Due the
          sheer volume of requests it’s our general policy to not do student
          interviews. Feel free to reference the many interviews with our team
          members that have been published over the years.
        </p>
        <br />
        <p className='fw-bold'>
          My company would like to make a
          movie/book/song/soundtrack/merchandise/TV show/comic based on your game.
          Can we talk about it?
        </p>
        <p>
          Thank you for your interest. Although we are not looking for additional
          licensing partners at this time, you may want to check out our{' '}
          <Link href='#'>Fan Art and Fan site policy</Link>.
        </p>
        <br />
        <br />
      </div>
    </Container>
  )
}

About.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Head><title>About</title></Head>
      {page}
    </Layout>
  )
}
