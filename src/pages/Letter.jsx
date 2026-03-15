import { motion } from 'framer-motion'
import FlowerCanvas from '../components/FlowerCanvas'
import PageTransition from '../components/PageTransition'

const paragraphs = [
  `Bunları necə sözlə ifadə edəcəyimi düşünürdüm və həqiqət budur ki, heç bir söz kifayət deyil. Amma yenə də çalışacam`,
  `Biz bir-birimizi 2016-cı ildən tanıyırdıq. Doqquz il keçdi. Həyat davam etdi. Və sonra, nədənsə, 2025-ci ilin avqustunda yenidən bir-birimizi tapdıq - həqiqətən də bir-birimizi tapdıq.`,
  `Dəfələrlə demişəm, amma yenə də indi keçən zamana baxıram. Çox uzun bir vaxt olmasa da, ilk danışdığımız və ilk görüşdüyümüz zaman məsələnin buralara gəlib çıxacağını heç düşünməmişdim. Hər bir münasibətin çətin və xoş anları olur. Nəinki münasibətin — həyatın mənası elə bundan ibarətdir. Lakin bu gün hələ də biz birlikdə qalmağa davam ediriksə, bu bizim zəhmətimizin bəhrəsidir. Desələr belə inanmazdım, lakin həyat bizim düşüncələrimiz və planlarımız zamanı başımıza gələn hadisələrdən ibarətdir və sən də başıma gələn ən gözəl hadisəsən.`,
  `Sənə canının sağlam olmasını başda olmaqla, həyatda bütün gözəllikləri arzu edirəm. Bol şans, xoşbəxtlik heç zaman sənin yaxanı buraxmasın. Hər birimiz bir həyat yaşayırıq və nə qədər yaşayacağımızdan bixəbərik. Sənə əsas diləyim yaşayacağın həyatın xoşbəxtliklərlə dolu olmasıdır. Sən hər şeyin ən gözəlinə layiqsən gözəlim. (Bu arada gallerydə olmayan şəkillər və datelərimiz var bəzilərini unutmuşam yada qoymağa content tapmamışam, amma sən niyyətimi bilirsəndəə :D İnşallah o qədər çox xoş zamanlarımız olsun ki, doldurmağa yer tapmayaq.)`,
  `Mən təsadüflərə inanmadığımı demişəm. Həyatda hər bir şeyin səbəbi var — uzun və ya qısa zamanda bunu anlayırıq deyə düşünürəm. Lakin təsadüf, səbəb, qismət və ya adına hər nə demək istəyirsənsə o olmasaydı, mən yenə eyni şəkildə, lakin hər şeydən xəbərsiz yaşamağıma davam edəcəkdim. Sən mənə dünyada başqa bir həyatın da olduğunu, mənim də ruhum olduğunu xatırlatdın və öyrətdin.`,
  `Hələ qarşımızda duran hər macəra çoxdu. Bu, yalnız başlanğıcdı. Səni çox sevirəm. Yaxşı ki, mənimləsən. Ad günün mübarək ❤️`,
]

export default function Letter() {
  return (
    <PageTransition key="letter">
      <FlowerCanvas count={26} />
      <div style={styles.page}>
        <motion.div style={{ textAlign: 'center', marginBottom: '2.5rem' }}
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}>
          <span className="label">From My Heart</span>
          <h2 className="display-title" style={{ fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)' }}>
            A letter<br /><em>just for you</em>
          </h2>
        </motion.div>

        <motion.div style={styles.envelope}
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}>

          {/* Corner roses */}
          {['topLeft', 'topRight', 'botLeft', 'botRight'].map((pos, i) => (
            <div key={pos} style={{ ...styles.corner, ...(pos === 'topLeft' ? { top: '1rem', left: '1.2rem' } : pos === 'topRight' ? { top: '1rem', right: '1.2rem' } : pos === 'botLeft' ? { bottom: '1rem', left: '1.2rem' } : { bottom: '1rem', right: '1.2rem' }) }}>
              🌹
            </div>
          ))}

          <div style={styles.bigQuote}>"</div>

          <p style={styles.greeting}>My dearest Saadet,</p>

          <div>
            {paragraphs.map((p, i) => (
              <motion.p key={i} style={styles.para}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.13, duration: 0.55 }}>
                {p}
              </motion.p>
            ))}
          </div>

          <motion.div style={styles.signRow}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
            <span style={styles.hearts}>♡  ♡  ♡</span>
            <p style={styles.sign}>Forever yours</p>
            <p style={styles.sign}>Mujun..</p>
          </motion.div>
        </motion.div>

        <motion.div style={styles.seal}
          initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 2.1, duration: 0.5, type: 'spring', stiffness: 200 }}>
          🌹
        </motion.div>
      </div>
    </PageTransition>
  )
}

const styles = {
  page: { minHeight: '100vh', background: 'radial-gradient(ellipse at 40% 60%, #200810 0%, #0e0608 70%)', padding: '7rem 1.5rem 6rem', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  envelope: {
    background: 'rgba(14,4,8,0.92)', borderRadius: 24,
    padding: 'clamp(2rem,5vw,3.5rem) clamp(1.8rem,5vw,3.8rem)',
    maxWidth: 620, width: '100%',
    boxShadow: '0 16px 60px rgba(0,0,0,0.6), 0 0 40px rgba(107,26,42,0.2), inset 0 1px 0 rgba(201,146,74,0.1)',
    border: '1px solid rgba(155,45,66,0.25)',
    position: 'relative', overflow: 'hidden', backdropFilter: 'blur(12px)',
  },
  corner: { position: 'absolute', fontSize: '1rem', opacity: 0.4 },
  bigQuote: { position: 'absolute', top: '0.3rem', left: '1.5rem', fontFamily: "'Cormorant Garamond', serif", fontSize: '7rem', color: 'rgba(107,26,42,0.3)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' },
  greeting: { fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(1.3rem,3.5vw,1.8rem)', color: 'var(--rose-soft)', marginBottom: '1.6rem', position: 'relative', zIndex: 1 },
  para: { fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1rem,2.2vw,1.15rem)', lineHeight: 1.9, color: 'var(--text)', marginBottom: '1.1rem', position: 'relative', zIndex: 1 },
  signRow: { textAlign: 'right', marginTop: '2rem', position: 'relative', zIndex: 1 },
  hearts: { display: 'block', color: 'var(--rose)', fontSize: '0.9rem', letterSpacing: '0.5em', marginBottom: '0.4rem' },
  sign: { fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(1.3rem,3vw,1.7rem)', color: 'var(--gold-light)' },
  seal: { fontSize: '3rem', marginTop: '-1rem', filter: 'drop-shadow(0 0 16px rgba(180,40,60,0.7))', display: 'block', textAlign: 'center', position: 'relative', zIndex: 2 },
}
