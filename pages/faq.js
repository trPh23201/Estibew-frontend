import Head from "next/head";
import Link from "next/link";
import { Container, Table } from "react-bootstrap";
import Layout from "../components/Layout";
import styles from "../styles/faq.module.css";

export default function FAQ() {
    return (
        <Container>
            <div className={styles.wrapper}>
                <h3>FREQUENTLY ASKED QUESTIONS</h3>
                <br />
                <p className='fst-italic'>Last Update: August 18, 2021</p>
                <br />
                <p className='fw-bold'>
                    Which platforms does the Estibew Games Store support?
                </p>
                <p>
                    The Estibew Games Store currently offers PC and Mac support. You can check
                    platform compatibility for individual titles by referring to the “About
                    Game” section of any product page.
                </p>
                <br />
                <p className='fw-bold'>
                    What are the future plans for the Estibew Games Store?
                </p>
                <p>
                    You can find upcoming features, developer updates, and major known
                    issues on our Estibew Games Store Roadmap on Trello. We’ll also share
                    significant updates with you on our news feed and social media pages
                    such as <Link href='#'>Facebook</Link>, <Link href='#'>Twitter</Link>,{' '}
                    <Link href='#'>Instagram</Link>, and <Link href='#'>YouTube</Link>.
                </p>
                <br />
                <p className='fw-bold'>
                    Why does the Estibew Games Store make exclusivity deals?
                </p>
                <p>
                    Exclusives are a part of the growth of many successful platforms for
                    games and for other forms of digital entertainment, such as streaming
                    video and music.
                </p>
                <br />
                <p>
                    Estibew works in partnership with developers and publishers to offer games
                    exclusively on the store. In exchange for exclusivity, Estibew provides
                    them with financial support for development and marketing, which enables
                    them to build more polished games with significantly less uncertainty
                    for the creators.
                </p>
                <br />
                <p>
                    In addition, creators will earn 88% of all the revenue from their game,
                    while most stores only offer 70%.
                </p>
                <br />
                <p className='fw-bold'>What is the Support-A-Creator program?</p>
                <p>
                    The Support-A-Creator program enables content Creators to earn money
                    from games in the Estibew Games Store by using Creator Links and Creator
                    Tags. Learn more about the Support-A-Creator program{' '}
                    <Link href='#'>here</Link>.
                </p>
                <br />
                <p className='fw-bold'>What’s this about free games?</p>
                <p>
                    Estibew will be offering a new free game available each week throughout
                    2022. When you claim a free game, it’s yours to keep - even after the
                    game is no longer available to new customers for free.
                </p>
                <br />
                <p className='fw-bold'>
                    I claimed a free game but don’t see it on my account now, why?
                </p>
                <p>
                    Once you claim a free game, it’s yours to keep. If you come back later
                    and don’t see it your account, please check to see if you have multiple
                    accounts. If you created an Estibew account using an @gmail.com email
                    address, log in to it directly using your Gmail password; using the
                    Google login button will create a distinct account even if it’s tied to
                    the same @gmail.com email address. And check to see if you have both a
                    console-linked account (logging in via PlayStation, Xbox, or Nintendo
                    account) and a separate Estibew account. If you still encounter issues,
                    please contact player support here.
                </p>
                <br />
                <p className='fw-bold'>Can I try a game before I buy it?</p>
                <p>
                    Some publishers occasionally offer demos or free trial periods for
                    certain non-free games from time to time (for example, a Free Weekend
                    trial). During a free trial period, you can download and play a trial
                    version of the game before you decide to purchase, but you can no longer
                    access the game when the trial period ends.
                </p>
                <br />
                <p className='fw-bold'>How do refunds work on the Estibew Games Store?</p>
                <p>
                    All games are eligible for refund within 14 days of purchase for any
                    reason, as long as you’ve had the game running for less than 2 hours.
                    You will not be eligible for refunds for games from which you have been
                    banned or for which you have otherwise violated the Terms of Service.
                    Learn more about our refund policy <Link href='#'>here</Link>.
                </p>
                <br />
                <p className='fw-bold'>How do I contact support?</p>
                <p>
                    You can contact our support team <Link href='#'>here</Link>. We also
                    recommend browsing our support center articles, which may help answer
                    questions or resolve issues.
                </p>
                <br />
                <p className='fw-bold'>Is my Estibew Games account secure?</p>
                <p>
                    The Estibew account system powers Fortnite, Rocket League, the Estibew Games
                    Store, and Unreal Engine. This account system has never been
                    compromised. However, specific individual Estibew accounts have been
                    compromised by hackers using lists of email addresses and passwords
                    leaked from other sites which have been compromised.
                </p>
                <br />
                <p>
                    If you use the same email address and password on Estibew as you used on
                    another site which has been compromised, then your account is vulnerable
                    to attack. To secure your Estibew account, use a unique password, and
                    enable multi-factor authentication. You can learn more about the
                    measures we take to protect your account and what you can do to stay
                    safe <Link href='#'>here</Link>.
                </p>
                <br />
                <p className='fw-bold'>
                    What languages does the Estibew Games Store support?
                </p>
                <p>
                    The Estibew Games Store currently supports English, Arabic, German, Spanish
                    (Spain), Spanish (Latin America), French, Italian, Japanese, Korean,
                    Polish, Portuguese, Russian, Thai, Turkish, Simplified Chinese, and
                    Traditional Chinese. In-game language support varies per game, as
                    provided by the developer; check each game’s store page for language
                    availability.
                </p>
                <br />
                <p className='fw-bold'>
                    Does the Estibew Games Store support regional pricing?
                </p>
                <p>
                    Yes, we do support regional pricing in more than 190 countries and over
                    30 territories. We also have a set of suggested regional discounts for
                    developers based on local norms that are regularly reviewed.
                </p>
                <br />
                <p className='fw-bold'>Which payment methods are supported?</p>
                <p>
                    The Estibew Games Store supports credit cards, PayPal, and a variety of
                    alternative payment methods. This is a list of the alternative payment
                    methods we currently support. Methods carrying additional payment
                    processing fees are marked with an *asterisk.
                </p>
                <br />
                <p className='fw-bold'>Where is the Estibew Games store available?</p>
                <p>
                    The Estibew Games Store is available to players in most countries in the
                    world except where prohibited by US law, such as North Korea and Iran.
                    Certain regions may have additional legal requirements that you may need
                    to implement in your game in order to be compliant and to be distributed
                    there.
                </p>
                <br />
                <p className='fw-bold'>
                    Which currencies do you accept and in which currencies do you display
                    prices?
                </p>
                <p>
                    The Estibew Games Store currently accepts 43 currencies (USD, EUR, GBP,
                    PLN, BRL, UAH, RUB, KRW, JPY, TRY, AUD, CAD, DKK, NOK, SEK, CZK, ILS,
                    CHF, MXN, PEN, HUF, CLP, SAR, AED, RON, NZD, ZAR, INR, COP, CSC, UYU,
                    HKD, IDR, MYR, PHP, SGD, THB, VND, KZT, QAR, BGN, TWD, CNY). We’re
                    working to bring more currencies online.
                </p>
                <br />
                <p>
                    If your currency is not on the list, you’ll see the prices displayed in
                    US Dollars, but will still pay in your local currency according to the
                    current exchange rates. In some countries paying in US Dollars may incur
                    additional bank conversion fees. We are working on expanding the list of
                    supported currencies.
                </p>
                <br />

                {/* Table */}
                <Table striped bordered variant='dark'>
                    <thead>
                        <tr className='text-center align-middle'>
                            <th style={{ minWidth: '250px', height: '70px' }}>
                                Payment Method
                            </th>
                            <th>Countries and Regions Supported</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='fst-italic' colSpan={2}>
                                (*) with additional payment processing fees
                            </td>
                        </tr>
                        <tr>
                            <td>3 & OiSTER</td>
                            <td>DK</td>
                        </tr>
                        <tr>
                            <td>3Pay</td>
                            <td>GB, IE</td>
                        </tr>
                        <tr>
                            <td>ATM/Bank Transfer</td>
                            <td>ID</td>
                        </tr>
                        <tr>
                            <td>Alfamart</td>
                            <td>ID</td>
                        </tr>
                        <tr>
                            <td>Alipay HK</td>
                            <td>HK</td>
                        </tr>
                        <tr>
                            <td>Amazon Pay</td>
                            <td>
                                AD, AT, BE, CY, DE, ES, FR, GB, IE, IT, LU, MC, NL, PR, PT, SM, VA
                            </td>
                        </tr>
                        <tr>
                            <td>BLIK</td>
                            <td>PL</td>
                        </tr>
                        <tr>
                            <td>Banco Itau</td>
                            <td>BR</td>
                        </tr>
                        <tr>
                            <td>Banco de Credito *</td>
                            <td>PE</td>
                        </tr>
                        <tr>
                            <td>Bancontact</td>
                            <td>BE</td>
                        </tr>
                        <tr>
                            <td>Bancontact Card</td>
                            <td>BE</td>
                        </tr>
                        <tr>
                            <td>Blik</td>
                            <td>PL</td>
                        </tr>
                        <tr>
                            <td>Boleto Flash</td>
                            <td>BR</td>
                        </tr>
                        <tr>
                            <td>Ceska sporitelna</td>
                            <td>CZ</td>
                        </tr>
                        <tr>
                            <td>Citadele bank</td>
                            <td>LV</td>
                        </tr>
                        <tr>
                            <td>Credit Card</td>
                            <td>
                                AD, AE, AF, AG, AI, AL, AM, AN, AO, AQ, AR, AT, AU, AW, AX, AZ,
                                BA, BB, BD, BE, BF, BG, BH, BI, BJ, BL, BM, BN, BO, BQ, BR, BS,
                                BT, BV, BW, BY, BZ, CA, CC, CD, CF, CG, CH, CI, CK, CL, CM, CO,
                                CR, CV, CW, CX, CY, CZ, DE, DJ, DK, DM, DO, DZ, EC, EE, EG, EH,
                                ER, ES, ET, FI, FJ, FK, FM, FO, FR, GA, GB, GD, GE, GF, GG, GH,
                                GI, GL, GM, GN, GP, GQ, GR, GS, GT, GU, GW, GY, HK, HM, HN, HR,
                                HT, HU, IE, IL, IM, IN, IO, IQ, IS, IT, JE, JM, JO, JP, KE, KG,
                                KH, KI, KM, KN, KW, KY, KZ, LA, LB, LC, LI, LK, LR, LS, LT, LU,
                                LV, LY, MA, MC, MD, ME, MF, MG, MH, MK, ML, MM, MN, MO, MP, MQ,
                                MR, MS, MT, MU, MV, MW, MX, MY, MZ, NA, NC, NE, NF, NG, NI, NL,
                                NO, NP, NR, NU, NZ, OM, PA, PE, PF, PG, PH, PK, PL, PM, PN, PR,
                                PS, PT, PW, PY, QA, RE, RO, RS, RU, RW, SA, SB, SC, SD, SE, SG,
                                SH, SI, SJ, SK, SL, SM, SN, SO, SR, SS, ST, SV, SX, SZ, TC, TD,
                                TF, TG, TH, TJ, TK, TL, TM, TN, TO, TR, TT, TV, TW, TZ, UA, UG,
                                UM, US, UY, UZ, VA, VC, VE, VG, VI, VN, VU, WF, WS, XK, YE, YT,
                                ZA, ZM, ZW
                            </td>
                        </tr>
                        <tr>
                            <td>DANA</td>
                            <td>ID</td>
                        </tr>
                        <tr>
                            <td>DOKU Wallet</td>
                            <td>ID</td>
                        </tr>
                        <tr>
                            <td>DotPay Przelewy Online</td>
                            <td>PL</td>
                        </tr>
                        <tr>
                            <td>ERA</td>
                            <td>CZ</td>
                        </tr>
                        <tr>
                            <td>Elisa</td>
                            <td>EE, FI</td>
                        </tr>
                        <tr>
                            <td>FIO banka</td>
                            <td>CZ</td>
                        </tr>
                        <tr>
                            <td>GCash</td>
                            <td>PH</td>
                        </tr>
                        <tr>
                            <td>Giropay</td>
                            <td>DE</td>
                        </tr>
                        <tr>
                            <td>Globe Gcash</td>
                            <td>PH</td>
                        </tr>
                        <tr>
                            <td>Havale/ATM/PTT</td>
                            <td>TR</td>
                        </tr>
                        <tr>
                            <td>Ideal</td>
                            <td>NL</td>
                        </tr>
                        <tr>
                            <td>Ininal *</td>
                            <td>TR</td>
                        </tr>
                        <tr>
                            <td>International Credit Card</td>
                            <td>KR</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </Container>
    )
}

FAQ.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Head><title>FAQ</title></Head>
            {page}
        </Layout>
    )
}
